import { motion } from 'framer-motion'
import { useT, useLang } from '../i18n/index.jsx'

const VIEW_IDS = [
  { id: 'globe',    icon: '◎' },
  { id: 'timeline', icon: '⟳' },
  { id: 'ideas',    icon: '◈' },
  { id: 'compare',  icon: '⇌' }
]

export default function Navigation({ current, onNavigate }) {
  const t = useT()
  const { lang, setLang } = useLang()

  return (
    <header style={{
      height: 'var(--nav-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(5,5,16,0.85)',
      backdropFilter: 'blur(16px)',
      flexShrink: 0,
      position: 'relative',
      zIndex: 50
    }}>
      {/* Wordmark */}
      <button
        onClick={() => onNavigate('globe')}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'none', border: 'none', cursor: 'pointer'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 22, height: 22,
            border: '1.5px solid var(--violet)',
            borderRadius: '50%',
            borderTopColor: 'var(--cyan)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--violet)'
          }} />
        </motion.div>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'var(--text)'
        }}>
          Philosphere
        </span>
      </button>

      {/* Nav tabs */}
      <nav style={{ display: 'flex', gap: 4 }}>
        {VIEW_IDS.map(v => (
          <NavTab
            key={v.id}
            id={v.id}
            icon={v.icon}
            label={t(`nav_${v.id}`)}
            active={current === v.id}
            onClick={() => onNavigate(v.id)}
          />
        ))}
      </nav>

      {/* Right slot: hint + language toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: 'var(--text-faint)',
          textTransform: 'uppercase'
        }}>
          {t(`hint_${current}`) ?? ''}
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
          style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            background: 'rgba(107,70,255,0.1)',
            border: '1px solid rgba(107,70,255,0.3)',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-sans)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.borderColor = 'rgba(107,70,255,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-dim)'
            e.currentTarget.style.borderColor = 'rgba(107,70,255,0.3)'
          }}
        >
          {lang === 'en' ? 'PT' : 'EN'}
        </button>
      </div>
    </header>
  )
}

function NavTab({ icon, label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative',
        padding: '6px 18px',
        background: active ? 'rgba(107,70,255,0.15)' : 'transparent',
        border: `1px solid ${active ? 'rgba(107,70,255,0.5)' : 'transparent'}`,
        borderRadius: 4,
        color: active ? 'var(--text)' : 'var(--text-dim)',
        fontSize: '12px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 7,
        cursor: 'pointer',
        transition: 'color 0.2s, background 0.2s, border-color 0.2s'
      }}
    >
      <span style={{ fontSize: '10px', color: active ? 'var(--violet)' : 'var(--text-faint)' }}>
        {icon}
      </span>
      {label}

      {active && (
        <motion.div
          layoutId="nav-indicator"
          style={{
            position: 'absolute',
            bottom: -1, left: 0, right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--violet), transparent)'
          }}
        />
      )}
    </motion.button>
  )
}
