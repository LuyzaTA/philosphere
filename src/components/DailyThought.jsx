import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { dailyQuestions, getPhilosopherById } from '../data/index.js'
import { useT, useLang } from '../i18n/index.jsx'
import { tDailyQuestion } from '../i18n/data_pt.js'

const today = new Date()
const questionIndex = (today.getDate() + today.getMonth()) % dailyQuestions.length

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W = window.innerWidth
    let H = window.innerHeight

    canvas.width = W
    canvas.height = H

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.6 + 0.1,
      pulse: Math.random() * Math.PI * 2
    }))

    function draw(t) {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.008
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        const opacity = p.o * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(107, 70, 255, ${opacity})`
        ctx.fill()
      }

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(107, 70, 255, ${(1 - d / 110) * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    draw(0)

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

function GlowOrb({ size = 400, x = '50%', y = '50%', color = '#6B46FF', opacity = 0.08 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: 'translate(-50%, -50%)',
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity,
      pointerEvents: 'none',
      filter: 'blur(40px)'
    }} />
  )
}

const wordReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } }
}
const wordChar = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } }
}

function AnimatedText({ text, className, style, delay = 0 }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      style={{ display: 'block', ...style }}
      variants={wordReveal}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordChar}
          style={{ display: 'inline-block', marginRight: '0.27em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function DailyThought({ onEnter }) {
  const t = useT()
  const { lang, setLang } = useLang()
  const [phase, setPhase] = useState('question') // question | subtext | cta

  const baseQ = dailyQuestions[questionIndex]
  const ptQ = tDailyQuestion(questionIndex, lang)
  const question = ptQ?.question ?? baseQ.question
  const subtext = ptQ?.subtext ?? baseQ.subtext
  const philosopher = getPhilosopherById(baseQ.philosopher)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('subtext'), 2800)
    const t2 = setTimeout(() => setPhase('cta'), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(ellipse at 30% 40%, #0d0520 0%, #050510 60%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <ParticleField />

      <GlowOrb x="20%" y="30%" color="#6B46FF" opacity={0.07} size={600} />
      <GlowOrb x="80%" y="70%" color="#00F5FF" opacity={0.05} size={500} />
      <GlowOrb x="60%" y="20%" color="#FF3366" opacity={0.04} size={350} />

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          display: 'flex', alignItems: 'center', gap: 12
        }}
      >
        <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--violet)' }} />
        {t('daily_label')}
        <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--violet)' }} />
      </motion.div>

      {/* Language toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
        style={{
          position: 'absolute', top: 36, right: 36,
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          background: 'rgba(107,70,255,0.1)',
          border: '1px solid rgba(107,70,255,0.3)',
          padding: '5px 12px',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'all 0.2s'
        }}
        whileHover={{ borderColor: 'rgba(107,70,255,0.6)', color: 'var(--text)' }}
        whileTap={{ scale: 0.96 }}
      >
        {lang === 'en' ? 'PT' : 'EN'}
      </motion.button>

      {/* Main content */}
      <div style={{
        maxWidth: 780,
        padding: '0 40px',
        textAlign: 'center',
        zIndex: 1
      }}>
        <AnimatedText
          text={question}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.3,
            color: 'var(--text)',
            marginBottom: '1.6rem'
          }}
        />

        <AnimatePresence>
          {phase !== 'question' && (
            <motion.div
              key="subtext"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-dim)',
                marginBottom: '0.8rem',
                fontWeight: 300
              }}>
                {subtext}
              </p>

              {philosopher && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--violet)',
                    marginTop: '1rem'
                  }}
                >
                  — {philosopher.name}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enter CTA */}
      <AnimatePresence>
        {phase === 'cta' && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20
            }}
          >
            <EnterButton onClick={onEnter} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'var(--text-faint)',
                textTransform: 'uppercase'
              }}
            >
              {t('daily_tagline')}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, var(--violet) 50%, transparent 100%)',
          opacity: 0.3
        }}
      />
    </div>
  )
}

function EnterButton({ onClick }) {
  const t = useT()
  const [hover, setHover] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative',
        padding: '14px 48px',
        background: hover
          ? 'linear-gradient(135deg, rgba(107,70,255,0.25), rgba(0,245,255,0.12))'
          : 'transparent',
        border: `1px solid ${hover ? 'rgba(0,245,255,0.6)' : 'rgba(107,70,255,0.5)'}`,
        color: hover ? 'var(--cyan)' : 'var(--text)',
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(8px)'
      }}
    >
      {hover && (
        <motion.div
          layoutId="btn-glow"
          style={{
            position: 'absolute', inset: -1,
            background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      )}
      {t('daily_enter')}
    </motion.button>
  )
}
