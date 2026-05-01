import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { eras, philosophers, getPhilosopherById } from '../data/index.js'
import { useT, useLang } from '../i18n/index.jsx'
import { tEra } from '../i18n/data_pt.js'

function ParticleGap({ color }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 80, H = canvas.offsetHeight || 600
    canvas.width = W
    canvas.height = H

    const pts = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.y += p.vy
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${Math.floor(p.o * 255).toString(16).padStart(2, '0')}`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [color])

  return (
    <div style={{
      width: 80, flexShrink: 0, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <div style={{
        position: 'relative', zIndex: 1,
        width: 40, height: 1,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`
      }} />
    </div>
  )
}

function EraCard({ era, onClick, index }) {
  const t = useT()
  const { lang } = useLang()
  const [hovered, setHovered] = useState(false)
  const cardPhilosophers = era.philosophers
    .map(id => getPhilosopherById(id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(era)}
      style={{
        width: 340,
        flexShrink: 0,
        background: hovered
          ? 'linear-gradient(160deg, rgba(13,13,43,0.95), rgba(8,8,30,0.95))'
          : 'rgba(8,8,30,0.7)',
        border: `1px solid ${hovered ? era.color + '88' : era.color + '33'}`,
        padding: '32px 28px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s, border-color 0.3s',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Background glow */}
      <motion.div
        animate={{ opacity: hovered ? 0.12 : 0.04 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 30% 40%, ${era.color} 0%, transparent 65%)`,
          pointerEvents: 'none'
        }}
      />

      {/* Era date range */}
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: era.color,
        marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{
          display: 'inline-block', width: 18, height: 1,
          background: era.color
        }} />
        {era.label}
      </div>

      {/* Era name */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.7rem',
        fontWeight: 300,
        color: 'var(--text)',
        lineHeight: 1.2,
        marginBottom: 14
      }}>
        {tEra(era, 'name', lang)}
      </h2>

      {/* Paradigm shift */}
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '0.9rem',
        color: hovered ? 'rgba(232,232,255,0.75)' : 'var(--text-dim)',
        lineHeight: 1.5,
        marginBottom: 20,
        transition: 'color 0.3s'
      }}>
        "{tEra(era, 'paradigmShift', lang)}"
      </p>

      {/* Key idea */}
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.08em',
        color: era.color,
        marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 6
      }}>
        <span>◈</span>
        <span>{tEra(era, 'keyIdea', lang)}</span>
      </div>

      {/* Philosopher chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cardPhilosophers.map(p => (
          <span key={p.id} style={{
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'var(--text-dim)',
            background: 'rgba(107,70,255,0.12)',
            border: '1px solid rgba(107,70,255,0.2)',
            padding: '3px 9px',
            borderRadius: 2
          }}>
            {p.name}
          </span>
        ))}
        {era.philosophers.length > 3 && (
          <span style={{
            fontSize: '10px', color: 'var(--text-faint)',
            padding: '3px 9px'
          }}>
            +{era.philosophers.length - 3} more
          </span>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${era.color}, transparent)`,
          transformOrigin: 'center'
        }}
      />

      {/* Expand hint */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', top: 16, right: 16,
          fontSize: '10px',
          color: era.color,
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}
      >
        {t('timeline_explore')}
      </motion.div>
    </motion.div>
  )
}

function EraDetail({ era, onClose, onSelectPhilosopher }) {
  const t = useT()
  const { lang } = useLang()
  const eraPhilosophers = era.philosophers
    .map(id => getPhilosopherById(id))
    .filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5,5,16,0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        backdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 780,
          width: '90%',
          maxHeight: '82vh',
          overflow: 'auto',
          background: 'linear-gradient(160deg, #0d0d2b, #080820)',
          border: `1px solid ${era.color}55`,
          padding: '48px 52px',
          position: 'relative'
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            color: 'var(--text-dim)', fontSize: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            lineHeight: 1
          }}
        >
          ×
        </button>

        {/* Glow bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 20% 20%, ${era.color}14 0%, transparent 60%)`,
        }} />

        <div style={{ position: 'relative' }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.25em',
            color: era.color, textTransform: 'uppercase',
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: era.color }} />
            {era.label}
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            marginBottom: 16,
            lineHeight: 1.15
          }}>
            {tEra(era, 'name', lang)}
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: era.color,
            marginBottom: 24,
            lineHeight: 1.4
          }}>
            "{tEra(era, 'paradigmShift', lang)}"
          </p>

          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(232,232,255,0.7)',
            lineHeight: 1.8,
            marginBottom: 36
          }}>
            {tEra(era, 'description', lang)}
          </p>

          <div style={{
            borderTop: `1px solid ${era.color}33`,
            paddingTop: 28
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--text-faint)',
              textTransform: 'uppercase', marginBottom: 18
            }}>
              {t('timeline_key')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {eraPhilosophers.map(p => (
                <button
                  key={p.id}
                  onClick={() => { onSelectPhilosopher(p); onClose() }}
                  style={{
                    background: 'rgba(107,70,255,0.1)',
                    border: `1px solid ${era.color}44`,
                    padding: '12px 18px',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    maxWidth: 200,
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontSize: '10px', color: era.color,
                    letterSpacing: '0.08em',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {p.concept.slice(0, 55)}…
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Central question */}
          <div style={{
            marginTop: 32,
            padding: 20,
            background: `${era.color}0d`,
            border: `1px solid ${era.color}33`,
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 10
            }}>
              {t('timeline_central_q')}
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--text)',
              fontWeight: 300
            }}>
              {tEra(era, 'keyIdea', lang)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Timeline({ onSelectPhilosopher }) {
  const t = useT()
  const [selectedEra, setSelectedEra] = useState(null)
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: 'radial-gradient(ellipse at 50% 0%, #0d0520 0%, #050510 60%)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '28px 40px 24px',
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            marginBottom: 4
          }}>
            {t('timeline_title')}
          </h1>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: 'var(--text-dim)',
            textTransform: 'uppercase'
          }}>
            {eras.length} {t('timeline_shifts')} · {t('timeline_scroll')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {['←', '→'].map((arrow, i) => (
            <button
              key={arrow}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              style={{
                width: 36, height: 36,
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Timeline track */}
      <div style={{
        flex: 1, minHeight: 0,
        position: 'relative'
      }}>
        {/* Horizontal axis line */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 40, right: 40,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(107,70,255,0.3) 10%, rgba(107,70,255,0.3) 90%, transparent)',
          zIndex: 0
        }} />

        <div
          ref={scrollRef}
          style={{
            width: '100%', height: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex',
            alignItems: 'center',
            padding: '20px 40px',
            gap: 0,
            scrollBehavior: 'smooth',
            position: 'relative', zIndex: 1
          }}
        >
          {eras.map((era, i) => (
            <div key={era.id} style={{ display: 'flex', alignItems: 'center' }}>
              <EraCard
                era={era}
                index={i}
                onClick={setSelectedEra}
              />
              {i < eras.length - 1 && (
                <ParticleGap color={era.color} />
              )}
            </div>
          ))}
          {/* End spacer */}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </div>

      {/* Era detail modal */}
      <AnimatePresence>
        {selectedEra && (
          <EraDetail
            era={selectedEra}
            onClose={() => setSelectedEra(null)}
            onSelectPhilosopher={onSelectPhilosopher}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
