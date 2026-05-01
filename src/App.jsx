import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './i18n/index.jsx'
import DailyThought from './components/DailyThought.jsx'
import Navigation from './components/Navigation.jsx'
import Globe from './components/Globe.jsx'
import Timeline from './components/Timeline.jsx'
import IdeaExplorer from './components/IdeaExplorer.jsx'
import Compare from './components/Compare.jsx'
import PhilosopherPanel from './components/PhilosopherPanel.jsx'

export default function App() {
  const [view, setView] = useState('landing')
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(null)

  const handleEnter = useCallback(() => setView('globe'), [])
  const handleNav = useCallback((v) => {
    setView(v)
    setSelectedPhilosopher(null)
  }, [])
  const handleSelectPhilosopher = useCallback((p) => setSelectedPhilosopher(p), [])
  const handleClosePanel = useCallback(() => setSelectedPhilosopher(null), [])

  return (
    <LanguageProvider>
      <div className="app">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
              exit={{ opacity: 0, scale: 1.04, transition: { duration: 1.1, ease: 'easeInOut' } }}
            >
              <DailyThought onEnter={handleEnter} />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              className="main-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Navigation current={view} onNavigate={handleNav} />

              <div className="view-container">
                <AnimatePresence mode="wait">
                  {view === 'globe' && (
                    <motion.div
                      key="globe"
                      style={{ width: '100%', height: '100%' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Globe onSelectPhilosopher={handleSelectPhilosopher} />
                    </motion.div>
                  )}

                  {view === 'timeline' && (
                    <motion.div
                      key="timeline"
                      style={{ width: '100%', height: '100%' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Timeline onSelectPhilosopher={handleSelectPhilosopher} />
                    </motion.div>
                  )}

                  {view === 'ideas' && (
                    <motion.div
                      key="ideas"
                      style={{ width: '100%', height: '100%' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IdeaExplorer onSelectPhilosopher={handleSelectPhilosopher} />
                    </motion.div>
                  )}

                  {view === 'compare' && (
                    <motion.div
                      key="compare"
                      style={{ width: '100%', height: '100%' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Compare onSelectPhilosopher={handleSelectPhilosopher} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {selectedPhilosopher && (
                  <PhilosopherPanel
                    key={selectedPhilosopher.id}
                    philosopher={selectedPhilosopher}
                    onClose={handleClosePanel}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  )
}
