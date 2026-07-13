import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { philosophers, getPhilosopherById } from '../data/index.js'
import { useT, useLang } from '../i18n/index.jsx'

// ── Data ──────────────────────────────────────────────────────────────────────

const DIALOGUES = [
  {
    id: 'self',
    concept: 'The Self',
    icon: '⊙',
    question: 'Is there a stable, persistent self — or is "I" just a useful fiction?',
    west: {
      stance: 'The individual self is the foundation of all knowledge and ethics.',
      detail: 'From Descartes\' "I think therefore I am" to Kant\'s transcendental subject, Western philosophy placed the unified self at the center. Even critics like Hume, who dissolved personal identity into bundles of perceptions, still debated it as the fundamental question.',
      philosophers: ['descartes', 'kant', 'hume', 'sartre'],
      quote: { text: 'I think, therefore I am.', author: 'Descartes' },
      color: '#6B46FF'
    },
    east: {
      stance: 'The self is a process, not a substance — clinging to it is the root of suffering.',
      detail: 'Buddhism\'s anattā (no-self) teaches that what we call "I" is a river of arising and passing moments, never a fixed thing. Dōgen pushed further: to study the self is ultimately to forget the self and realise its identity with all things.',
      philosophers: ['nagarjuna', 'dogen', 'zhuangzi', 'nishida'],
      quote: { text: 'To study the self is to forget the self.', author: 'Dōgen' },
      color: '#FF8C42'
    },
    bridge: 'Both traditions agree the naive, unreflected self is not what it appears. They diverge on whether something remains.'
  },
  {
    id: 'reality',
    concept: 'Ultimate Reality',
    icon: '◻',
    question: 'What is the deepest nature of what exists?',
    west: {
      stance: 'Reality is grounded in God, Forms, or material substance — something permanent underlies flux.',
      detail: 'Plato\'s eternal Forms, Aristotle\'s primary substance, the God of the medieval tradition, Descartes\' two substances (mind and matter), Kant\'s thing-in-itself — Western metaphysics repeatedly sought a fixed ground beneath appearances.',
      philosophers: ['plato', 'aristotle', 'descartes', 'hegel'],
      quote: { text: 'The rational alone is real.', author: 'Hegel' },
      color: '#6B46FF'
    },
    east: {
      stance: 'Reality is Tao, Brahman, or Śūnyatā — groundless ground, beyond all categories.',
      detail: 'The Tao that can be named is not the Tao. Brahman is pure being-consciousness-bliss, indescribable. Nāgārjuna\'s Śūnyatā (emptiness) is not nothingness but the absence of any fixed essence in anything — including emptiness itself.',
      philosophers: ['laozi', 'shankara', 'nagarjuna', 'zhuangzi'],
      quote: { text: 'The Tao that can be named is not the eternal Tao.', author: 'Laozi' },
      color: '#FF8C42'
    },
    bridge: 'Both circle the same abyss. Western thought names it and builds systems around it. Eastern thought points at it and falls silent.'
  },
  {
    id: 'knowledge',
    concept: 'How We Know',
    icon: '◈',
    question: 'What is the supreme path to truth — reason, experience, or something else?',
    west: {
      stance: 'Reason and empirical observation are the royal roads to knowledge.',
      detail: 'Rationalists built certainty from pure reason; empiricists demanded sensory evidence. Kant synthesized both. In all cases, the method is systematic, argumentative, and public — a logic anyone can in principle follow.',
      philosophers: ['descartes', 'locke', 'hume', 'kant', 'wittgenstein'],
      quote: { text: 'No man\'s knowledge can go beyond his experience.', author: 'Locke' },
      color: '#6B46FF'
    },
    east: {
      stance: 'Direct experience, meditation, and embodied practice can reach what reason cannot.',
      detail: 'Al-Ghazālī declared that philosophical reason alone could never reach God — only mystical taste (dhawq) could. Dōgen\'s zazen is not reasoning about enlightenment; it is enlightenment. Nishida grounded all knowledge in pre-reflective pure experience.',
      philosophers: ['al-ghazali', 'dogen', 'nishida', 'zhu-xi'],
      quote: { text: 'He who knows himself knows God.', author: 'Al-Ghazālī' },
      color: '#FF8C42'
    },
    bridge: 'Both agree that knowledge requires discipline. They disagree on whether the highest knowledge is propositional or experiential.'
  },
  {
    id: 'ethics',
    concept: 'The Good Life',
    icon: '◯',
    question: 'What makes a life worth living, and what do we owe each other?',
    west: {
      stance: 'Ethics is grounded in universal reason, duty, or rights — principles that apply to everyone equally.',
      detail: 'Socrates sought virtue through reason; Kant derived morality from pure rational duty; utilitarians calculated the greatest happiness. The Western project grounds ethics in universal principles transcending culture, kinship, and tradition.',
      philosophers: ['socrates', 'aristotle', 'kant', 'nietzsche'],
      quote: { text: 'Act only according to that maxim by which you can will it to become a universal law.', author: 'Kant' },
      color: '#6B46FF'
    },
    east: {
      stance: 'Ethics flows from cultivated relationships, compassion, and harmony — not abstract principles.',
      detail: 'Confucius grounded ethics in ren (benevolence through relationships), not universal rules. Buddhist ethics begins with compassion for all sentient beings. Moral cultivation, not calculation, is the method. Context and relationship matter more than universality.',
      philosophers: ['confucius', 'mencius', 'dogen', 'zhu-xi'],
      quote: { text: 'The man of virtue, wishing to be established himself, seeks also to establish others.', author: 'Confucius' },
      color: '#FF8C42'
    },
    bridge: 'Western ethics asks: what rule should govern all? Eastern ethics asks: what kind of person should I become? Both questions are necessary.'
  },
  {
    id: 'freedom',
    concept: 'Freedom',
    icon: '↗',
    question: 'What does it mean to be truly free?',
    west: {
      stance: 'Freedom is the absence of external constraint and the power of rational self-determination.',
      detail: 'From Locke\'s natural rights to Kant\'s autonomy to Sartre\'s radical freedom — the Western tradition locates freedom in the individual\'s capacity to act against determination. We are free when no external force compels us.',
      philosophers: ['locke', 'rousseau', 'kant', 'sartre', 'camus'],
      quote: { text: 'Man is condemned to be free.', author: 'Sartre' },
      color: '#6B46FF'
    },
    east: {
      stance: 'True freedom is liberation from attachment — including attachment to the idea of a free self.',
      detail: 'Moksha (Hindu liberation) is freedom from the cycle of rebirth driven by desire. Nirvana is the extinction of craving. Zhuangzi\'s freedom is wu wei — effortless action without the ego\'s interference. Paradoxically, the freer the action, the less it feels like a choice.',
      philosophers: ['laozi', 'zhuangzi', 'shankara', 'nagarjuna'],
      quote: { text: 'Act without acting. Do without doing.', author: 'Laozi' },
      color: '#FF8C42'
    },
    bridge: 'Western freedom is about having more choices. Eastern freedom is about needing fewer of them. Both describe real aspects of liberation.'
  },
  {
    id: 'time',
    concept: 'Time',
    icon: '⟳',
    question: 'Does time flow forward, cycle endlessly, or is it an illusion of mind?',
    west: {
      stance: 'Time is a linear arrow: creation, history, progress, and end.',
      detail: 'The Judeo-Christian tradition gave Western thought linear time: a beginning (creation), a narrative (history), and an end (apocalypse or progress). Hegel\'s history moves dialectically forward. Heidegger\'s time is the horizon of being — we project forward toward death.',
      philosophers: ['hegel', 'kierkegaard', 'heidegger', 'husserl'],
      quote: { text: 'Life can only be understood backwards; but it must be lived forwards.', author: 'Kierkegaard' },
      color: '#6B46FF'
    },
    east: {
      stance: 'Time is cyclical, or the present moment alone is real — past and future are mental constructs.',
      detail: 'Hindu cosmology envisions vast cosmic cycles (kalpas). Buddhism teaches that past and future exist only as present mental events. Dōgen\'s "being-time" (uji) says each moment of existence IS time — there is no time apart from being, and no being outside the present.',
      philosophers: ['nagarjuna', 'dogen', 'laozi', 'zhuangzi'],
      quote: { text: 'For the time being, stand on top of the highest peak.', author: 'Dōgen' },
      color: '#FF8C42'
    },
    bridge: 'Linear time drives Western ethics (progress, accountability). Cyclical or present-focused time drives Eastern practice (acceptance, non-clinging). Both are true at different scales.'
  }
]

// ── Portuguese dialogue translations ─────────────────────────────────────────

const DIALOGUES_PT = {
  self: {
    concept: 'O Eu',
    question: 'Existe um eu estável e persistente — ou "Eu" é apenas uma ficção útil?',
    west: {
      stance: 'O eu individual é o fundamento de todo conhecimento e ética.',
      detail: 'Do "Penso, logo existo" de Descartes ao sujeito transcendental de Kant, a filosofia ocidental colocou o eu unificado no centro. Até os críticos como Hume, que dissolveu a identidade pessoal em feixes de percepções, debatiam-na como a questão fundamental.',
      quote: { text: 'Penso, logo existo.' },
    },
    east: {
      stance: 'O eu é um processo, não uma substância — agarrar-se a ele é a raiz do sofrimento.',
      detail: 'O anattā budista (não-eu) ensina que o que chamamos de "Eu" é um rio de momentos que surgem e passam, nunca uma coisa fixa. Dōgen foi mais longe: estudar o eu é, em última análise, esquecer o eu e perceber sua identidade com todas as coisas.',
      quote: { text: 'Estudar o eu é esquecer o eu.' },
    },
    bridge: 'Ambas as tradições concordam que o eu ingênuo e irrefletido não é o que parece. Divergem sobre se algo permanece.'
  },
  reality: {
    concept: 'Realidade Última',
    question: 'Qual é a natureza mais profunda do que existe?',
    west: {
      stance: 'A realidade está fundada em Deus, Formas ou substância material — algo permanente subjaz ao fluxo.',
      detail: 'As Formas eternas de Platão, a substância primária de Aristóteles, o Deus da tradição medieval, as duas substâncias de Descartes (mente e matéria), a coisa-em-si de Kant — a metafísica ocidental buscou repetidamente um fundamento fixo sob as aparências.',
      quote: { text: 'Apenas o racional é real.' },
    },
    east: {
      stance: 'A realidade é Tao, Brahman ou Śūnyatā — fundamento sem fundamento, além de todas as categorias.',
      detail: 'O Tao que pode ser nomeado não é o Tao. Brahman é puro ser-consciência-beatitude, indescritível. A Śūnyatā de Nāgārjuna não é nada, mas a ausência de qualquer essência fixa em qualquer coisa — incluindo a própria vacuidade.',
      quote: { text: 'O Tao que pode ser nomeado não é o Tao eterno.' },
    },
    bridge: 'Ambas circundam o mesmo abismo. O pensamento ocidental o nomeia e constrói sistemas ao redor. O pensamento oriental aponta para ele e se cala.'
  },
  knowledge: {
    concept: 'Como Conhecemos',
    question: 'Qual é o caminho supremo para a verdade — razão, experiência ou algo mais?',
    west: {
      stance: 'Razão e observação empírica são os caminhos reais para o conhecimento.',
      detail: 'Os racionalistas construíram certeza a partir da razão pura; os empiristas exigiram evidência sensorial. Kant sintetizou ambos. Em todos os casos, o método é sistemático, argumentativo e público — uma lógica que qualquer um pode, em princípio, seguir.',
      quote: { text: 'O conhecimento humano não pode ir além da experiência.' },
    },
    east: {
      stance: 'A experiência direta, a meditação e a prática incorporada podem alcançar o que a razão não pode.',
      detail: 'Al-Ghazālī declarou que a razão filosófica sozinha nunca poderia alcançar Deus — apenas o gosto místico (dhawq) poderia. O zazen de Dōgen não é raciocinar sobre o despertar; é o próprio despertar. Nishida fundou todo conhecimento na experiência pura pré-reflexiva.',
      quote: { text: 'Quem se conhece conhece a Deus.' },
    },
    bridge: 'Ambos concordam que o conhecimento requer disciplina. Discordam se o conhecimento mais elevado é proposicional ou experiencial.'
  },
  ethics: {
    concept: 'A Vida Boa',
    question: 'O que torna uma vida digna de ser vivida, e o que devemos uns aos outros?',
    west: {
      stance: 'A ética está fundada na razão universal, no dever ou nos direitos — princípios que se aplicam a todos igualmente.',
      detail: 'Sócrates buscou a virtude pela razão; Kant derivou a moralidade do puro dever racional; os utilitaristas calcularam a maior felicidade. O projeto ocidental fundamenta a ética em princípios universais que transcendem cultura, parentesco e tradição.',
      quote: { text: 'Aja somente segundo aquela máxima pela qual possa ao mesmo tempo querer que ela se torne uma lei universal.' },
    },
    east: {
      stance: 'A ética flui de relações cultivadas, compaixão e harmonia — não de princípios abstratos.',
      detail: 'Confúcio fundou a ética no ren (benevolência através das relações), não em regras universais. A ética budista começa com a compaixão por todos os seres sencientes. O cultivo moral, não o cálculo, é o método. O contexto e o relacionamento importam mais do que a universalidade.',
      quote: { text: 'O homem virtuoso, querendo ser estabelecido, busca também estabelecer os outros.' },
    },
    bridge: 'A ética ocidental pergunta: qual regra deve governar a todos? A ética oriental pergunta: que tipo de pessoa devo me tornar? Ambas as perguntas são necessárias.'
  },
  freedom: {
    concept: 'Liberdade',
    question: 'O que significa ser verdadeiramente livre?',
    west: {
      stance: 'Liberdade é a ausência de coerção externa e o poder da autodeterminação racional.',
      detail: 'Dos direitos naturais de Locke à autonomia de Kant à liberdade radical de Sartre — a tradição ocidental localiza a liberdade na capacidade do indivíduo de agir contra a determinação. Somos livres quando nenhuma força externa nos compele.',
      quote: { text: 'O homem está condenado a ser livre.' },
    },
    east: {
      stance: 'A verdadeira liberdade é a libertação do apego — incluindo o apego à ideia de um eu livre.',
      detail: 'Moksha (libertação hindu) é a liberdade do ciclo de renascimento impulsionado pelo desejo. O Nirvana é a extinção do anseio. A liberdade de Zhuangzi é wu wei — ação sem esforço, sem a interferência do ego. Paradoxalmente, quanto mais livre a ação, menos ela parece uma escolha.',
      quote: { text: 'Aja sem agir. Faça sem fazer.' },
    },
    bridge: 'A liberdade ocidental é sobre ter mais escolhas. A liberdade oriental é sobre precisar de menos delas. Ambas descrevem aspectos reais da libertação.'
  },
  time: {
    concept: 'Tempo',
    question: 'O tempo flui para frente, cicla infinitamente ou é uma ilusão da mente?',
    west: {
      stance: 'O tempo é uma flecha linear: criação, história, progresso e fim.',
      detail: 'A tradição judaico-cristã deu ao pensamento ocidental o tempo linear: um começo (criação), uma narrativa (história) e um fim (apocalipse ou progresso). A história de Hegel avança dialeticamente. O tempo de Heidegger é o horizonte do ser — projetamo-nos para a frente em direção à morte.',
      quote: { text: 'A vida só pode ser compreendida para trás; mas tem de ser vivida para a frente.' },
    },
    east: {
      stance: 'O tempo é cíclico, ou apenas o momento presente é real — passado e futuro são construções mentais.',
      detail: 'A cosmologia hindu imagina vastos ciclos cósmicos (kalpas). O budismo ensina que passado e futuro existem apenas como eventos mentais presentes. O "ser-tempo" (uji) de Dōgen diz que cada momento de existência É tempo — não há tempo separado do ser, e nenhum ser fora do presente.',
      quote: { text: 'Por ora, fique no topo do pico mais alto.' },
    },
    bridge: 'O tempo linear impulsiona a ética ocidental (progresso, responsabilidade). O tempo cíclico ou centrado no presente impulsiona a prática oriental (aceitação, não-apego). Ambos são verdadeiros em escalas diferentes.'
  }
}

function localizeDialogue(d, lang) {
  if (lang !== 'pt') return d
  const pt = DIALOGUES_PT[d.id]
  if (!pt) return d
  return {
    ...d,
    concept: pt.concept,
    question: pt.question,
    bridge: pt.bridge,
    west: { ...d.west, stance: pt.west.stance, detail: pt.west.detail, quote: { ...d.west.quote, text: pt.west.quote.text } },
    east: { ...d.east, stance: pt.east.stance, detail: pt.east.detail, quote: { ...d.east.quote, text: pt.east.quote.text } }
  }
}

const WEST_PHILOSOPHERS = philosophers.filter(p =>
  ['Western', 'Western'].includes(p.tradition)
).slice(0, 10)

const EAST_PHILOSOPHERS = philosophers.filter(p =>
  ['East Asian', 'Buddhist', 'Hindu', 'Islamic', 'Zen Buddhist', 'Kyoto School'].includes(p.tradition)
)

// ── Sub-components ─────────────────────────────────────────────────────────────

function TraditionBadge({ tradition }) {
  const colors = {
    Western: '#6B46FF',
    'East Asian': '#FF8C42',
    Buddhist: '#FFC857',
    'Zen Buddhist': '#A8DADC',
    Hindu: '#FF8C42',
    Islamic: '#00D4AA',
    'Kyoto School': '#A8DADC',
    'Latin American': '#00C875',
    Brazilian: '#00C875',
    'Afro-Brazilian': '#E0A800',
    Indigenous: '#7CB342',
    Russian: '#FF4D4D'
  }
  return (
    <span style={{
      fontSize: '9px', letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: colors[tradition] ?? '#6B46FF',
      border: `1px solid ${colors[tradition] ?? '#6B46FF'}44`,
      padding: '2px 6px'
    }}>
      {tradition}
    </span>
  )
}

function PhilosopherMini({ philosopherId, onSelect }) {
  const p = getPhilosopherById(philosopherId)
  if (!p) return null
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={() => onSelect(p)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(107,70,255,0.14)' : 'rgba(107,70,255,0.06)',
        border: `1px solid ${hover ? 'rgba(107,70,255,0.5)' : 'rgba(107,70,255,0.18)'}`,
        padding: '6px 10px',
        color: hover ? 'var(--text)' : 'var(--text-dim)',
        cursor: 'pointer',
        fontSize: '11px',
        fontFamily: "'Cormorant Garamond', serif",
        transition: 'all 0.2s',
        whiteSpace: 'nowrap'
      }}
    >
      {p.name}
    </button>
  )
}

function DialogueRow({ dialogue, index, expanded, onToggle, onSelectPhilosopher }) {
  const t = useT()
  const { lang } = useLang()
  const d = localizeDialogue(dialogue, lang)
  const isOpen = expanded === d.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{ borderBottom: '1px solid rgba(107,70,255,0.15)' }}
    >
      {/* Row header — always visible */}
      <button
        onClick={() => onToggle(d.id)}
        style={{
          width: '100%', background: 'none', border: 'none',
          cursor: 'pointer', padding: '0',
          display: 'grid',
          gridTemplateColumns: '1fr 200px 1fr',
          alignItems: 'center',
          gap: 0,
          minHeight: isOpen ? 'auto' : 72
        }}
      >
        {/* West preview */}
        <div style={{
          padding: '18px 24px 18px 0',
          textAlign: 'right',
          borderRight: '1px solid rgba(107,70,255,0.2)'
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '0.88rem',
            color: 'rgba(232,232,255,0.55)',
            lineHeight: 1.4
          }}>
            "{d.west.quote.text.slice(0, 65)}{d.west.quote.text.length > 65 ? '…' : ''}"
          </p>
          <p style={{ fontSize: '10px', color: '#6B46FF', marginTop: 4, letterSpacing: '0.08em' }}>
            — {d.west.quote.author}
          </p>
        </div>

        {/* Center concept */}
        <div style={{
          padding: '0 24px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 5
        }}>
          <span style={{ fontSize: '18px', color: 'var(--text-dim)' }}>{d.icon}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)'
          }}>
            {d.concept}
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(107,70,255,0.6)' }}>
            {isOpen ? '▲' : '▼'}
          </span>
        </div>

        {/* East preview */}
        <div style={{
          padding: '18px 0 18px 24px',
          textAlign: 'left',
          borderLeft: '1px solid rgba(107,70,255,0.2)'
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '0.88rem',
            color: 'rgba(232,232,255,0.55)',
            lineHeight: 1.4
          }}>
            "{d.east.quote.text.slice(0, 65)}{d.east.quote.text.length > 65 ? '…' : ''}"
          </p>
          <p style={{ fontSize: '10px', color: '#FF8C42', marginTop: 4, letterSpacing: '0.08em' }}>
            — {d.east.quote.author}
          </p>
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px 1fr',
              gap: 0,
              paddingBottom: 28
            }}>
              {/* West detail */}
              <div style={{
                padding: '20px 28px 0 0',
                borderRight: '1px solid rgba(107,70,255,0.2)'
              }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#6B46FF', textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ display: 'inline-block', width: 14, height: 1, background: '#6B46FF' }} />
                  {t('compare_west_view')}
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem', fontWeight: 600,
                  color: 'var(--text)', marginBottom: 10, lineHeight: 1.4
                }}>
                  {d.west.stance}
                </p>
                <p style={{
                  fontSize: '0.82rem', color: 'rgba(232,232,255,0.58)',
                  lineHeight: 1.8, marginBottom: 14
                }}>
                  {d.west.detail}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {d.west.philosophers.map(id => (
                    <PhilosopherMini key={id} philosopherId={id} onSelect={onSelectPhilosopher} />
                  ))}
                </div>
              </div>

              {/* Bridge */}
              <div style={{
                padding: '20px 20px 0',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 12
              }}>
                <div style={{
                  width: 1, flex: 1,
                  background: 'linear-gradient(to bottom, rgba(107,70,255,0.3), rgba(255,140,66,0.3))'
                }} />
                <div style={{
                  padding: '14px 16px',
                  background: 'rgba(107,70,255,0.07)',
                  border: '1px solid rgba(107,70,255,0.22)',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '10px', letterSpacing: '0.15em',
                    color: 'var(--text-faint)', textTransform: 'uppercase',
                    marginBottom: 8
                  }}>
                    {t('compare_bridge')}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '0.82rem',
                    color: 'rgba(232,232,255,0.65)',
                    lineHeight: 1.6
                  }}>
                    {d.bridge}
                  </p>
                </div>
                <div style={{
                  padding: '10px 12px',
                  background: 'rgba(107,70,255,0.05)',
                  border: '1px solid rgba(107,70,255,0.15)',
                  textAlign: 'center', width: '100%'
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '0.78rem',
                    color: 'rgba(232,232,255,0.45)',
                    lineHeight: 1.5
                  }}>
                    {d.question}
                  </p>
                </div>
                <div style={{
                  width: 1, flex: 1,
                  background: 'linear-gradient(to bottom, rgba(255,140,66,0.3), rgba(107,70,255,0.3))'
                }} />
              </div>

              {/* East detail */}
              <div style={{
                padding: '20px 0 0 28px',
                borderLeft: '1px solid rgba(107,70,255,0.2)'
              }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#FF8C42', textTransform: 'uppercase',
                  marginBottom: 8,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ display: 'inline-block', width: 14, height: 1, background: '#FF8C42' }} />
                  {t('compare_east_view')}
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem', fontWeight: 600,
                  color: 'var(--text)', marginBottom: 10, lineHeight: 1.4
                }}>
                  {d.east.stance}
                </p>
                <p style={{
                  fontSize: '0.82rem', color: 'rgba(232,232,255,0.58)',
                  lineHeight: 1.8, marginBottom: 14
                }}>
                  {d.east.detail}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {d.east.philosophers.map(id => (
                    <PhilosopherMini key={id} philosopherId={id} onSelect={onSelectPhilosopher} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Philosopher Gallery ────────────────────────────────────────────────────────

function TraditionColumn({ title, color, phils, onSelect }) {
  const t = useT()
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: '10px', letterSpacing: '0.22em',
        textTransform: 'uppercase', color,
        marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{ display: 'inline-block', width: 20, height: 1, background: color }} />
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {phils.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              background: `${color}0d`,
              border: `1px solid ${color}33`,
              padding: '10px 14px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              minWidth: 140
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${color}1a`
              e.currentTarget.style.borderColor = `${color}66`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${color}0d`
              e.currentTarget.style.borderColor = `${color}33`
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1rem', color: 'var(--text)', marginBottom: 3
            }}>
              {p.name}
            </div>
            <TraditionBadge tradition={p.tradition} />
            <div style={{
              fontSize: '10px', color: 'rgba(232,232,255,0.4)',
              marginTop: 4
            }}>
              {p.born < 0 ? `${Math.abs(p.born)} BC` : p.born}
              {' – '}
              {p.died == null ? t('panel_present') : p.died < 0 ? `${Math.abs(p.died)} BC` : p.died}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Compare({ onSelectPhilosopher }) {
  const t = useT()
  const { lang } = useLang()
  const [expanded, setExpanded] = useState(null)

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  const westPhils = philosophers.filter(p => p.tradition === 'Western')
  const eastPhils = philosophers.filter(p =>
    ['East Asian', 'Buddhist', 'Zen Buddhist', 'Hindu', 'Islamic', 'Kyoto School'].includes(p.tradition)
  )
  // Everything outside the West/East binary — Brazilian, Afro-Brazilian, Indigenous,
  // Latin American and Russian thinkers, which would otherwise be hidden here.
  const restPhils = philosophers.filter(p => !westPhils.includes(p) && !eastPhils.includes(p))
  const restTitle = lang === 'pt' ? 'Sul Global e Descolonial' : 'Global South & Decolonial'

  return (
    <div style={{
      width: '100%', height: '100%',
      overflowY: 'auto',
      background: 'radial-gradient(ellipse at 50% 0%, #0a0618 0%, #050510 50%)'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 48, textAlign: 'center' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 14
          }}>
            <span style={{
              fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#6B46FF'
            }}>
              {t('compare_west')}
            </span>
            <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #6B46FF, #FF8C42)' }} />
            <span style={{
              fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#FF8C42'
            }}>
              {t('compare_east')}
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300, lineHeight: 1.15, marginBottom: 12
          }}>
            {t('compare_title')}
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem', color: 'var(--text-dim)',
            maxWidth: 600, margin: '0 auto', lineHeight: 1.7
          }}>
            {t('compare_subtitle')}
          </p>
        </motion.div>

        {/* Column labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px 1fr',
          gap: 0,
          marginBottom: 4,
          paddingBottom: 12,
          borderBottom: '1px solid rgba(107,70,255,0.3)'
        }}>
          <div style={{
            textAlign: 'right', paddingRight: 24,
            fontSize: '10px', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#6B46FF',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8
          }}>
            <span>{t('compare_west_col')}</span>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: '#6B46FF' }} />
          </div>
          <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-faint)', letterSpacing: '0.18em' }}>
            {t('compare_concept_col')}
          </div>
          <div style={{
            paddingLeft: 24,
            fontSize: '10px', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#FF8C42',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: '#FF8C42' }} />
            <span>{t('compare_east_col')}</span>
          </div>
        </div>

        {/* Dialogue rows */}
        <div>
          {DIALOGUES.map((d, i) => (
            <DialogueRow
              key={d.id}
              dialogue={d}
              index={i}
              expanded={expanded}
              onToggle={toggle}
              onSelectPhilosopher={onSelectPhilosopher}
            />
          ))}
        </div>

        {/* Philosopher Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 64 }}
        >
          <div style={{
            fontSize: '10px', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--text-faint)',
            marginBottom: 28, textAlign: 'center'
          }}>
            {t('compare_all')}
          </div>
          <div style={{ display: 'flex', gap: 40 }}>
            <TraditionColumn
              title={t('compare_west_trad')}
              color="#6B46FF"
              phils={westPhils}
              onSelect={onSelectPhilosopher}
            />
            <div style={{
              width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(107,70,255,0.3), rgba(255,140,66,0.3), transparent)'
            }} />
            <TraditionColumn
              title={t('compare_east_trad')}
              color="#FF8C42"
              phils={eastPhils}
              onSelect={onSelectPhilosopher}
            />
          </div>

          {restPhils.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(0,200,117,0.25)' }}>
              <TraditionColumn
                title={restTitle}
                color="#00C875"
                phils={restPhils}
                onSelect={onSelectPhilosopher}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
