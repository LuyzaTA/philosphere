import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, Stars, Line, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { philosophers, getInfluenceConnections } from '../data/index.js'
import { useT } from '../i18n/index.jsx'

// ── helpers ──────────────────────────────────────────────────────────────────

function latLngToVec3(lat, lng, r = 1) {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  )
}

function createArc(latA, lngA, latB, lngB, numPts = 60, lift = 0.28) {
  const s = latLngToVec3(latA, lngA, 1.01)
  const e = latLngToVec3(latB, lngB, 1.01)
  const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(1 + lift)
  const curve = new THREE.QuadraticBezierCurve3(s, mid, e)
  return curve.getPoints(numPts)
}

// ── Globe surface shaders ─────────────────────────────────────────────────────

const GLOBE_VERT = `
  varying vec3  vNormal;
  varying vec2  vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv     = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GLOBE_FRAG = `
  uniform float uTime;
  varying vec3  vNormal;
  varying vec2  vUv;

  void main() {
    // Grid lines
    float linesU = step(0.97, fract(vUv.x * 36.0));
    float linesV = step(0.97, fract(vUv.y * 18.0));
    float grid   = max(linesU, linesV);

    // Rim glow (fresnel-like)
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    float rim    = 1.0 - abs(dot(vNormal, viewDir));
    rim          = pow(rim, 2.5);

    // Slow pulsing highlight near equator
    float band   = smoothstep(0.08, 0.0, abs(vUv.y - 0.5)) * 0.3;
    float pulse  = 0.5 + 0.5 * sin(uTime * 0.4 + vUv.x * 6.28);

    vec3 base   = vec3(0.015, 0.03, 0.14);
    vec3 grid_c = vec3(0.12, 0.28, 0.85);
    vec3 rim_c  = vec3(0.2,  0.55, 1.0);
    vec3 band_c = vec3(0.05, 0.18, 0.5);

    vec3 col = mix(base, grid_c, grid * 0.28);
    col      = mix(col,  rim_c,  rim  * 0.45);
    col     += band_c * band * pulse;

    gl_FragColor = vec4(col, 0.88);
  }
`

// ── Atmosphere shader ──────────────────────────────────────────────────────────

const ATMOS_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const ATMOS_FRAG = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.45 - dot(vNormal, vec3(0,0,1)), 4.5);
    gl_FragColor = vec4(0.15, 0.45, 1.0, 1.0) * intensity;
  }
`

// ── GlobeMesh ────────────────────────────────────────────────────────────────

function GlobeMesh() {
  const matRef = useRef()
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={GLOBE_VERT}
          fragmentShader={GLOBE_FRAG}
          uniforms={uniforms}
          transparent
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.18, 64, 32]} />
        <shaderMaterial
          vertexShader={ATMOS_VERT}
          fragmentShader={ATMOS_FRAG}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ── CountryLines ──────────────────────────────────────────────────────────────
// Fetches a simplified world GeoJSON and draws country borders as a single
// lineSegments mesh (one draw call, runs on the GPU).

const WORLD_GEOJSON_URL =
  'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'

function CountryLines() {
  const meshRef = useRef()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then(r => r.json())
      .then(geojson => {
        const positions = []
        for (const feature of geojson.features) {
          const { type, coordinates } = feature.geometry
          const polys = type === 'Polygon' ? [coordinates] : coordinates
          for (const polygon of polys) {
            for (const ring of polygon) {
              for (let i = 0; i < ring.length - 1; i++) {
                const [lng1, lat1] = ring[i]
                const [lng2, lat2] = ring[i + 1]
                // Lift borders clearly off the surface (was 1.004, which sat so
                // close to the r=1 globe that depth-buffer precision caused
                // z-fighting — borders dropped out over whole regions as the
                // globe rotated). Nodes live at 1.025 and never had this issue.
                const v1 = latLngToVec3(lat1, lng1, 1.015)
                const v2 = latLngToVec3(lat2, lng2, 1.015)
                positions.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
              }
            }
          }
        }
        const arr = new Float32Array(positions)
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
        if (meshRef.current) {
          meshRef.current.geometry.dispose()
          meshRef.current.geometry = geo
          setReady(true)
        }
      })
      .catch(err => console.warn('CountryLines fetch failed:', err))
  }, [])

  return (
    <lineSegments ref={meshRef} renderOrder={1}>
      <bufferGeometry />
      <lineBasicMaterial
        color="#3a88e0"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </lineSegments>
  )
}

// ── PhilosopherNode ───────────────────────────────────────────────────────────

function PhilosopherNode({ philosopher, onSelect, selectedId }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const isSelected = selectedId === philosopher.id

  const pos = useMemo(
    () => latLngToVec3(philosopher.location.lat, philosopher.location.lng, 1.025),
    [philosopher.location]
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    const scale = 1 + 0.25 * Math.sin(t * 1.8 + philosopher.location.lat)
    if (hovered || isSelected) {
      meshRef.current.scale.setScalar(scale * 1.5)
    } else {
      meshRef.current.scale.setScalar(0.8 + 0.15 * Math.sin(t * 1.2 + philosopher.location.lng))
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = (hovered || isSelected) ? 0.55 : 0.22
      glowRef.current.scale.setScalar((hovered || isSelected) ? 2.8 : 2.0)
    }
  })

  const color = hovered ? '#00F5FF' : isSelected ? '#FFB347' : (philosopher.color || '#6B46FF')

  return (
    <group position={pos}>
      {/* Core node */}
      <mesh
        ref={meshRef}
        onPointerOver={e => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={e => { e.stopPropagation(); onSelect(philosopher) }}
      >
        <sphereGeometry args={[0.010, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 4 : 2}
          roughness={0}
          metalness={0.1}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.010, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Hover / select label — fixed screen-pixel size, no distanceFactor */}
      {(hovered || isSelected) && (
        <Html
          center
          style={{ pointerEvents: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div style={{
            background: 'rgba(4,4,18,0.9)',
            border: `1px solid ${isSelected ? 'rgba(255,179,71,0.65)' : 'rgba(0,245,255,0.55)'}`,
            padding: '2px 6px',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 500,
            color: isSelected ? '#FFB347' : '#00F5FF',
            letterSpacing: '0.06em',
            pointerEvents: 'none',
            transform: 'translate(-50%, -160%)',
            lineHeight: 1.4,
            userSelect: 'none'
          }}>
            {philosopher.name}
            <span style={{ color: 'rgba(180,180,220,0.4)', marginLeft: 4, fontSize: '8px', fontWeight: 400 }}>
              {philosopher.tradition}
            </span>
          </div>
        </Html>
      )}
    </group>
  )
}

// ── InfluenceArc ──────────────────────────────────────────────────────────────

function InfluenceArc({ source, target, highlight }) {
  const points = useMemo(
    () => createArc(
      source.location.lat, source.location.lng,
      target.location.lat, target.location.lng
    ),
    [source, target]
  )
  const lineRef = useRef()

  useFrame(({ clock }) => {
    if (!lineRef.current) return
    lineRef.current.material.opacity = highlight
      ? 0.65 + 0.2 * Math.sin(clock.elapsedTime * 2)
      : 0.12
  })

  return (
    <Line
      ref={lineRef}
      points={points}
      color={highlight ? '#00F5FF' : '#6B46FF'}
      lineWidth={highlight ? 1.2 : 0.5}
      transparent
      opacity={0.12}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  )
}

// ── Scene ────────────────────────────────────────────────────────────────────

// Rotation that places Central Asia (≈lng 80°) toward the camera on load,
// making both European and East Asian philosophers visible simultaneously.
// Calculated: α ≈ π * 0.95 so that the globe faces Eurasia at start.
const INITIAL_Y = Math.PI * 0.95

function GlobeScene({ onSelectPhilosopher, selectedPhilosopher }) {
  const connections = useMemo(() => getInfluenceConnections(), [])
  const controlsRef = useRef()
  const autoRotateRef = useRef(true)

  const handleSelect = useCallback((p) => {
    autoRotateRef.current = false
    if (controlsRef.current) controlsRef.current.autoRotate = false
    onSelectPhilosopher(p)
  }, [onSelectPhilosopher])

  const selectedId = selectedPhilosopher?.id

  return (
    <>
      <color attach="background" args={['#050510']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#6B46FF" />
      <pointLight position={[-4, -2, -4]} intensity={0.8} color="#00F5FF" />

      <Stars radius={90} depth={60} count={3500} factor={3} saturation={0.4} fade speed={0.3} />

      {/* All globe content in one group so the initial orientation is consistent */}
      <group rotation={[0, INITIAL_Y, 0]}>
        <GlobeMesh />
        <CountryLines />

        {connections.map((conn, i) => (
          <InfluenceArc
            key={i}
            source={conn.source}
            target={conn.target}
            highlight={
              selectedId &&
              (conn.source.id === selectedId || conn.target.id === selectedId)
            }
          />
        ))}

        {philosophers.map(p => (
          <PhilosopherNode
            key={p.id}
            philosopher={p}
            onSelect={handleSelect}
            selectedId={selectedId}
          />
        ))}
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={1.5}
        maxDistance={3.8}
        autoRotate
        autoRotateSpeed={0.25}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

// ── Legend overlay ────────────────────────────────────────────────────────────

function GlobeLegend() {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      style={{
        position: 'absolute',
        bottom: 32, left: 32,
        display: 'flex', flexDirection: 'column', gap: 8
      }}
    >
      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 4 }}>
        {t('globe_how_to')}
      </p>
      {[
        { icon: '↔', text: t('globe_drag') },
        { icon: '⊕', text: t('globe_scroll') },
        { icon: '●', text: t('globe_click') }
      ].map(item => (
        <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--violet)', fontSize: '12px', width: 16, textAlign: 'center' }}>{item.icon}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{item.text}</span>
        </div>
      ))}
    </motion.div>
  )
}

// ── PhilosopherCount ──────────────────────────────────────────────────────────

function GlobeStats() {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      style={{
        position: 'absolute',
        bottom: 32, right: 32,
        display: 'flex', gap: 28
      }}
    >
      {[
        { value: philosophers.length, label: t('globe_thinkers') },
        { value: getInfluenceConnections().length, label: t('globe_arcs') }
      ].map(s => (
        <div key={s.label} style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text)', fontWeight: 300 }}>
            {s.value}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            {s.label}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function Globe({ onSelectPhilosopher }) {
  const t = useT()
  const [selected, setSelected] = useState(null)

  const handleSelect = useCallback((p) => {
    setSelected(p)
    onSelectPhilosopher(p)
  }, [onSelectPhilosopher])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <GlobeScene
            onSelectPhilosopher={handleSelect}
            selectedPhilosopher={selected}
          />
        </Suspense>
      </Canvas>

      <GlobeLegend />
      <GlobeStats />

      {/* Title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          position: 'absolute',
          top: 28, left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          fontWeight: 300,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)'
        }}>
          {t('globe_title')}
        </h1>
      </motion.div>
    </div>
  )
}
