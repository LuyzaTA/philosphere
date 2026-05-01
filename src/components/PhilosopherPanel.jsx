import { motion } from 'framer-motion'
import { getPhilosopherById, getIdeaById, eras } from '../data/index.js'
import { useT, useLang } from '../i18n/index.jsx'
import { tPhilosopher, tIdea } from '../i18n/data_pt.js'

function IdeaTag({ ideaId }) {
  const idea = getIdeaById(ideaId)
  const { lang } = useLang()
  if (!idea) return null
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: '11px',
      border: `1px solid ${idea.color}55`,
      color: idea.color,
      padding: '3px 10px',
      letterSpacing: '0.08em'
    }}>
      <span style={{ fontSize: '9px' }}>{idea.icon}</span>
      {tIdea(idea, 'name', lang)}
    </span>
  )
}

function InfluenceChip({ philosopherId, label }) {
  const p = getPhilosopherById(philosopherId)

  if (!p) return null
  return (
    <div style={{
      fontSize: '11px', color: 'var(--text-dim)',
      background: 'rgba(107,70,255,0.1)',
      border: '1px solid rgba(107,70,255,0.2)',
      padding: '4px 10px',
      display: 'flex', flexDirection: 'column', gap: 1
    }}>
      <span style={{ fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text)' }}>
        {p.name}
      </span>
    </div>
  )
}

function YearDisplay({ born, died }) {
  const t = useT()
  const fmt = y => y == null ? t('panel_present') : y < 0 ? `${Math.abs(y)} BC` : `${y} AD`
  return (
    <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-sans)', fontSize: '11px' }}>
      {fmt(born)} — {fmt(died)}
    </span>
  )
}

export default function PhilosopherPanel({ philosopher, onClose }) {
  const t = useT()
  const { lang } = useLang()
  const era = eras.find(e => e.id === philosopher.era)
  const eraColor = era?.color ?? '#6B46FF'

  return (
    <motion.aside
      key={philosopher.id}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      style={{
        position: 'fixed',
        top: 'var(--nav-h)', right: 0, bottom: 0,
        width: 360,
        background: 'rgba(6,6,22,0.97)',
        borderLeft: `1px solid ${eraColor}33`,
        overflowY: 'auto',
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 300, height: 300,
        background: `radial-gradient(circle at 80% 10%, ${eraColor}12 0%, transparent 65%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', padding: '32px 28px 0' }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            color: 'var(--text-dim)', fontSize: 22,
            background: 'none', border: 'none', cursor: 'pointer',
            lineHeight: 1, padding: '2px 6px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
        >
          ×
        </button>

        {/* Tradition chip */}
        <div style={{
          fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: eraColor, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <span style={{ display: 'inline-block', width: 14, height: 1, background: eraColor }} />
          {philosopher.tradition} · {era?.name}
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem', fontWeight: 300,
          lineHeight: 1.1, marginBottom: 8
        }}>
          {philosopher.name}
        </h2>

        {/* Years + Location */}
        <div style={{ marginBottom: 6 }}>
          <YearDisplay born={philosopher.born} died={philosopher.died} />
        </div>
        <div style={{
          fontSize: '11px', color: 'var(--text-dim)',
          letterSpacing: '0.06em', marginBottom: 20
        }}>
          {philosopher.location.city}, {philosopher.location.country}
        </div>

        {/* Divider */}
        <div style={{
          height: 1, background: `linear-gradient(90deg, ${eraColor}44, transparent)`,
          marginBottom: 20
        }} />

        {/* Central concept */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.2em',
            color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 10
          }}>
            {t('panel_central')}
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem', fontWeight: 300,
            color: 'var(--text)', lineHeight: 1.6
          }}>
            {tPhilosopher(philosopher, 'concept', lang)}
          </p>
        </div>

        {/* Quote */}
        <div style={{
          marginBottom: 24,
          padding: '16px 18px',
          background: `${eraColor}0c`,
          border: `1px solid ${eraColor}30`,
          borderLeft: `3px solid ${eraColor}`,
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1rem', fontWeight: 300,
            color: 'rgba(232,232,255,0.82)',
            lineHeight: 1.6,
            marginBottom: 8
          }}>
            "{tPhilosopher(philosopher, 'quote', lang)}"
          </p>
          <p style={{
            fontSize: '10px', color: eraColor,
            letterSpacing: '0.12em', textTransform: 'uppercase'
          }}>
            — {philosopher.name}
          </p>
        </div>

        {/* Ideas */}
        {philosopher.ideas.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 10
            }}>
              {t('panel_key_ideas')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {philosopher.ideas.map(id => <IdeaTag key={id} ideaId={id} />)}
            </div>
          </div>
        )}

        {/* Influence network */}
        {(philosopher.influencedBy.length > 0 || philosopher.influences.length > 0) && (
          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.2em',
              color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 12
            }}>
              {t('panel_influence_net')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {philosopher.influencedBy.map(id => (
                <InfluenceChip key={id} philosopherId={id} label={t('panel_influenced_by')} />
              ))}
              {philosopher.influences.map(id => (
                <InfluenceChip key={id} philosopherId={id} label={t('panel_influenced')} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        height: 40, flexShrink: 0, marginTop: 'auto',
        background: 'linear-gradient(transparent, rgba(6,6,22,0.98))',
        pointerEvents: 'none'
      }} />
    </motion.aside>
  )
}
