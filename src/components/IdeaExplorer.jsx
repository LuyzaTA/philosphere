import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ideas, philosophers, getPhilosopherById } from '../data/index.js'
import { useT, useLang } from '../i18n/index.jsx'
import { tIdea } from '../i18n/data_pt.js'

// ── Force simulation ──────────────────────────────────────────────────────────

function buildGraph(W, H) {
  // Scale node size down on smaller canvases so the graph never overflows the
  // viewport, and cap the count contribution so busy ideas stay reasonable.
  const scale = Math.min(1, W / 760)
  const nodes = ideas.map((idea, i) => ({
    ...idea,
    x: W / 2 + (Math.random() - 0.5) * W * 0.5,
    y: H / 2 + (Math.random() - 0.5) * H * 0.5,
    vx: 0, vy: 0,
    r: (15 + Math.min(idea.philosophers.length, 14) * 2.6) * scale
  }))

  const edges = []
  for (const idea of ideas) {
    for (const relId of idea.relatedIdeas) {
      if (ideas.findIndex(i => i.id === relId) > ideas.findIndex(i => i.id === idea.id)) {
        edges.push({ source: idea.id, target: relId })
      }
    }
  }
  return { nodes, edges }
}

function tickSimulation(nodes, edges, W, H) {
  const alpha = 0.12
  // Repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x
      const dy = nodes[j].y - nodes[i].y
      const d = Math.sqrt(dx * dx + dy * dy) || 1
      const minD = nodes[i].r + nodes[j].r + 40
      if (d < minD) {
        const force = (minD - d) * 0.035
        nodes[i].vx -= (dx / d) * force
        nodes[i].vy -= (dy / d) * force
        nodes[j].vx += (dx / d) * force
        nodes[j].vy += (dy / d) * force
      }
    }
  }
  // Edge spring
  for (const e of edges) {
    const s = nodes.find(n => n.id === e.source)
    const t = nodes.find(n => n.id === e.target)
    if (!s || !t) continue
    const dx = t.x - s.x
    const dy = t.y - s.y
    const d = Math.sqrt(dx * dx + dy * dy) || 1
    const target = s.r + t.r + 90
    const f = (d - target) * 0.025
    s.vx += (dx / d) * f
    s.vy += (dy / d) * f
    t.vx -= (dx / d) * f
    t.vy -= (dy / d) * f
  }
  // Gravity to center
  for (const n of nodes) {
    n.vx += (W / 2 - n.x) * 0.003
    n.vy += (H / 2 - n.y) * 0.003
    // Damping
    n.vx *= 0.82
    n.vy *= 0.82
    n.x += n.vx
    n.y += n.vy
    // Bound
    const pad = n.r + 20
    n.x = Math.max(pad, Math.min(W - pad, n.x))
    n.y = Math.max(pad, Math.min(H - pad, n.y))
  }
}

// Pre-warm: run many ticks before first render
function warmSimulation(nodes, edges, W, H, ticks = 250) {
  for (let i = 0; i < ticks; i++) {
    tickSimulation(nodes, edges, W, H)
  }
}

// ── Canvas renderer ───────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

function drawFrame(ctx, nodes, edges, hoveredId, selectedId, t) {
  const W = ctx.canvas.width
  const H = ctx.canvas.height
  ctx.clearRect(0, 0, W, H)

  // Draw edges
  for (const e of edges) {
    const s = nodes.find(n => n.id === e.source)
    const t2 = nodes.find(n => n.id === e.target)
    if (!s || !t2) continue
    const active =
      hoveredId === s.id || hoveredId === t2.id ||
      selectedId === s.id || selectedId === t2.id
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(t2.x, t2.y)
    ctx.strokeStyle = active ? 'rgba(0,245,255,0.35)' : 'rgba(107,70,255,0.12)'
    ctx.lineWidth = active ? 1.5 : 0.8
    ctx.stroke()
  }

  // Draw tension arcs (opposing ideas)
  for (const idea of ideas) {
    const node = nodes.find(n => n.id === idea.id)
    if (!node) continue
    for (const tId of (idea.tension || [])) {
      const tNode = nodes.find(n => n.id === tId)
      if (!tNode) continue
      const active = selectedId === idea.id || selectedId === tId
      if (!active) continue
      ctx.beginPath()
      const mx = (node.x + tNode.x) / 2 + (node.y - tNode.y) * 0.3
      const my = (node.y + tNode.y) / 2 - (node.x - tNode.x) * 0.3
      ctx.moveTo(node.x, node.y)
      ctx.quadraticCurveTo(mx, my, tNode.x, tNode.y)
      ctx.strokeStyle = 'rgba(255,51,102,0.45)'
      ctx.setLineDash([4, 4])
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.setLineDash([])
    }
  }

  // Draw nodes
  for (const node of nodes) {
    const rgb = hexToRgb(node.color || '#6B46FF')
    const isH = node.id === hoveredId
    const isS = node.id === selectedId
    const pulse = 1 + 0.08 * Math.sin(t * 1.4 + node.philosophers.length)
    const r = node.r * (isH || isS ? 1.18 : 1) * pulse

    // Outer glow
    const grd = ctx.createRadialGradient(node.x, node.y, r * 0.3, node.x, node.y, r * 2.2)
    grd.addColorStop(0, `rgba(${rgb},${isH || isS ? 0.25 : 0.09})`)
    grd.addColorStop(1, `rgba(${rgb},0)`)
    ctx.beginPath()
    ctx.arc(node.x, node.y, r * 2.2, 0, Math.PI * 2)
    ctx.fillStyle = grd
    ctx.fill()

    // Ring
    ctx.beginPath()
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
    ctx.strokeStyle = isH || isS
      ? `rgba(${rgb},0.9)`
      : `rgba(${rgb},0.5)`
    ctx.lineWidth = isH || isS ? 1.8 : 1
    ctx.stroke()

    // Fill
    ctx.beginPath()
    ctx.arc(node.x, node.y, r - 1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},${isS ? 0.22 : 0.07})`
    ctx.fill()

    // Icon
    ctx.font = `${Math.round(r * 0.55)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = isH || isS ? `rgba(${rgb},1)` : `rgba(${rgb},0.7)`
    ctx.fillText(node.icon, node.x, node.y - 3)

    // Label
    ctx.font = `${isH || isS ? '500' : '400'} 11px Inter, sans-serif`
    ctx.fillStyle = isH || isS ? '#E8E8FF' : 'rgba(232,232,255,0.55)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(node.name, node.x, node.y + r + 5)
  }
}

// ── IdeaDetail panel ──────────────────────────────────────────────────────────

function IdeaDetail({ idea, onClose, onSelectPhilosopher }) {
  const t = useT()
  const { lang } = useLang()
  const ideaPhilosophers = idea.philosophers
    .map(id => getPhilosopherById(id))
    .filter(Boolean)

  const tensionIdeas = (idea.tension || [])
    .map(id => ideas.find(i => i.id === id))
    .filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      style={{
        position: 'absolute',
        top: 20, right: 20,
        width: 'min(320px, calc(100vw - 24px))',
        maxHeight: 'calc(100% - 40px)',
        overflowY: 'auto',
        background: 'rgba(8,8,30,0.96)',
        border: `1px solid ${idea.color}55`,
        padding: '24px',
        backdropFilter: 'blur(16px)',
        zIndex: 10
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 12, right: 14,
          color: 'var(--text-dim)', fontSize: 18,
          background: 'none', border: 'none', cursor: 'pointer'
        }}
      >
        ×
      </button>

      {/* Icon + name */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16
      }}>
        <span style={{ fontSize: '1.6rem', color: idea.color }}>{idea.icon}</span>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem', fontWeight: 300,
            color: 'var(--text)'
          }}>
            {tIdea(idea, 'name', lang)}
          </h3>
          <div style={{
            fontSize: '10px', letterSpacing: '0.15em',
            color: idea.color, textTransform: 'uppercase', marginTop: 2
          }}>
            {idea.philosophers.length} {t('ideas_thinkers')}
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '0.85rem', color: 'rgba(232,232,255,0.65)',
        lineHeight: 1.7, marginBottom: 18
      }}>
        {tIdea(idea, 'description', lang)}
      </p>

      <div style={{
        padding: '12px 14px',
        background: `${idea.color}0e`,
        border: `1px solid ${idea.color}33`,
        marginBottom: 20
      }}>
        <p style={{
          fontSize: '10px', letterSpacing: '0.18em',
          color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 6
        }}>
          {t('ideas_central_q')}
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5
        }}>
          {tIdea(idea, 'centralQuestion', lang)}
        </p>
      </div>

      {tensionIdeas.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.18em',
            color: '#FF3366', textTransform: 'uppercase', marginBottom: 8
          }}>
            ⚡ {t('ideas_tension')}
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tensionIdeas.map(ti => (
              <span key={ti.id} style={{
                fontSize: '11px', color: '#FF3366',
                border: '1px solid rgba(255,51,102,0.35)',
                padding: '3px 8px'
              }}>
                {tIdea(ti, 'name', lang)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p style={{
          fontSize: '10px', letterSpacing: '0.18em',
          color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 10
        }}>
          {t('ideas_key')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ideaPhilosophers.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectPhilosopher(p)}
              style={{
                background: 'rgba(107,70,255,0.08)',
                border: '1px solid rgba(107,70,255,0.2)',
                padding: '9px 12px',
                color: 'var(--text)', cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s'
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>
                {p.name}
              </div>
              <div style={{
                fontSize: '10px', color: 'var(--text-dim)',
                marginTop: 2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
              }}>
                {p.quote.slice(0, 48)}…
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function IdeaExplorer({ onSelectPhilosopher }) {
  const t = useT()
  const { lang } = useLang()
  const canvasRef = useRef(null)
  const stateRef = useRef({ nodes: [], edges: [], raf: null, t: 0, settled: false })
  const [hoveredIdea, setHoveredIdea] = useState(null)
  const [selectedIdea, setSelectedIdea] = useState(null)

  // Init & animate
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setSize()

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    const { nodes, edges } = buildGraph(W, H)
    warmSimulation(nodes, edges, W, H, 400)
    stateRef.current.nodes = nodes
    stateRef.current.edges = edges

    function loop(ts) {
      stateRef.current.t = ts / 1000
      // Gentle live ticks
      tickSimulation(
        stateRef.current.nodes,
        stateRef.current.edges,
        canvas.offsetWidth,
        canvas.offsetHeight
      )
      drawFrame(
        ctx,
        stateRef.current.nodes,
        stateRef.current.edges,
        stateRef.current.hoveredId,
        stateRef.current.selectedId,
        stateRef.current.t
      )
      stateRef.current.raf = requestAnimationFrame(loop)
    }
    stateRef.current.raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      setSize()
      const W2 = canvas.offsetWidth
      const H2 = canvas.offsetHeight
      const g = buildGraph(W2, H2)
      warmSimulation(g.nodes, g.edges, W2, H2, 300)
      stateRef.current.nodes = g.nodes
      stateRef.current.edges = g.edges
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(stateRef.current.raf)
      ro.disconnect()
    }
  }, [])

  // Sync hover/select into the ref (avoids re-creating animation loop)
  useEffect(() => {
    stateRef.current.hoveredId = hoveredIdea
  }, [hoveredIdea])
  useEffect(() => {
    stateRef.current.selectedId = selectedIdea?.id ?? null
  }, [selectedIdea])

  // Update canvas node labels when language changes
  useEffect(() => {
    stateRef.current.nodes.forEach(node => {
      const idea = ideas.find(i => i.id === node.id)
      if (idea) node.name = tIdea(idea, 'name', lang)
    })
  }, [lang])

  const getNodeAt = useCallback((cx, cy) => {
    const nodes = stateRef.current.nodes
    for (const n of nodes) {
      const dx = n.x - cx
      const dy = n.y - cy
      if (Math.sqrt(dx * dx + dy * dy) < n.r + 8) return n
    }
    return null
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const n = getNodeAt(e.clientX - rect.left, e.clientY - rect.top)
    setHoveredIdea(n ? n.id : null)
    e.currentTarget.style.cursor = n ? 'pointer' : 'default'
  }, [getNodeAt])

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const n = getNodeAt(e.clientX - rect.left, e.clientY - rect.top)
    if (n) {
      setSelectedIdea(ideas.find(i => i.id === n.id) ?? null)
    } else {
      setSelectedIdea(null)
    }
  }, [getNodeAt])

  const handleMouseLeave = useCallback(() => setHoveredIdea(null), [])

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'radial-gradient(ellipse at 50% 50%, #0a0520 0%, #050510 70%)',
      overflow: 'hidden'
    }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute', top: 24, left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none', zIndex: 5
        }}
      >
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem', fontWeight: 300,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--text-dim)'
        }}>
          {t('ideas_title')}
        </h1>
        <p style={{
          fontSize: '10px', letterSpacing: '0.18em',
          color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: 4
        }}>
          {t('ideas_legend')}
        </p>
      </motion.div>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      <AnimatePresence>
        {selectedIdea && (
          <IdeaDetail
            key={selectedIdea.id}
            idea={selectedIdea}
            onClose={() => setSelectedIdea(null)}
            onSelectPhilosopher={(p) => {
              onSelectPhilosopher(p)
              setSelectedIdea(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
