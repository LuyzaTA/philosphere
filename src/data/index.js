export const philosophers = [
  {
    id: 'socrates',
    name: 'Socrates',
    born: -470, died: -399,
    location: { lat: 37.98, lng: 23.72, city: 'Athens', country: 'Greece' },
    era: 'ancient-greece',
    tradition: 'Western',
    quote: 'The unexamined life is not worth living.',
    concept: 'Truth emerges only through relentless questioning of what we think we know.',
    ideas: ['knowledge', 'virtue', 'self', 'truth'],
    influences: ['plato'],
    influencedBy: [],
    color: '#6B46FF'
  },
  {
    id: 'plato',
    name: 'Plato',
    born: -428, died: -348,
    location: { lat: 37.98, lng: 23.72, city: 'Athens', country: 'Greece' },
    era: 'ancient-greece',
    tradition: 'Western',
    quote: 'Reality is merely an illusion, albeit a very persistent one.',
    concept: 'Behind every visible thing lies a perfect, invisible Form — the true reality.',
    ideas: ['truth', 'knowledge', 'justice', 'being', 'good'],
    influences: ['aristotle'],
    influencedBy: ['socrates'],
    color: '#6B46FF'
  },
  {
    id: 'aristotle',
    name: 'Aristotle',
    born: -384, died: -322,
    location: { lat: 40.53, lng: 23.53, city: 'Stageira', country: 'Greece' },
    era: 'ancient-greece',
    tradition: 'Western',
    quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    concept: 'The good life is achieved through virtuous activity in accordance with reason.',
    ideas: ['virtue', 'knowledge', 'good', 'being', 'self'],
    influences: ['averroes', 'aquinas'],
    influencedBy: ['plato'],
    color: '#5538DD'
  },
  {
    id: 'confucius',
    name: 'Confucius',
    born: -551, died: -479,
    location: { lat: 35.59, lng: 116.99, city: 'Qufu', country: 'China' },
    era: 'ancient-east',
    tradition: 'East Asian',
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    concept: 'Social harmony flows from the cultivation of virtue in relationships.',
    ideas: ['virtue', 'self', 'good', 'justice'],
    influences: ['mencius'],
    influencedBy: [],
    color: '#FF8C42'
  },
  {
    id: 'laozi',
    name: 'Laozi',
    born: -600, died: -531,
    location: { lat: 34.00, lng: 114.00, city: 'Henan', country: 'China' },
    era: 'ancient-east',
    tradition: 'East Asian',
    quote: 'To know others is wisdom; to know yourself is enlightenment.',
    concept: 'The Tao that can be named is not the eternal Tao — reality exceeds all language.',
    ideas: ['being', 'self', 'truth', 'language'],
    influences: ['zhuangzi'],
    influencedBy: [],
    color: '#FF8C42'
  },
  {
    id: 'zhuangzi',
    name: 'Zhuangzi',
    born: -369, died: -286,
    location: { lat: 34.00, lng: 115.50, city: 'Meng', country: 'China' },
    era: 'ancient-east',
    tradition: 'East Asian',
    quote: 'Once upon a time, I dreamt I was a butterfly. Now I wonder: am I a man dreaming I am a butterfly?',
    concept: 'All fixed perspectives are traps; true freedom is the fluidity of transformation.',
    ideas: ['self', 'being', 'freedom', 'truth'],
    influences: [],
    influencedBy: ['laozi'],
    color: '#FF8C42'
  },
  {
    id: 'nagarjuna',
    name: 'Nāgārjuna',
    born: 150, died: 250,
    location: { lat: 16.50, lng: 80.00, city: 'Andhra', country: 'India' },
    era: 'ancient-india',
    tradition: 'Buddhist',
    quote: 'Whatever is dependently arisen, that is explained to be emptiness.',
    concept: 'Nothing has inherent existence — all things arise only in relation to other things.',
    ideas: ['being', 'self', 'truth', 'consciousness'],
    influences: [],
    influencedBy: [],
    color: '#FFC857'
  },
  {
    id: 'averroes',
    name: 'Ibn Rushd (Averroes)',
    born: 1126, died: 1198,
    location: { lat: 37.89, lng: -4.78, city: 'Córdoba', country: 'Spain' },
    era: 'medieval',
    tradition: 'Islamic',
    quote: 'The most perfect of souls is the one that philosophizes most.',
    concept: 'Reason and revelation are not rivals — they illuminate the same truth from different angles.',
    ideas: ['truth', 'knowledge', 'being', 'god'],
    influences: ['aquinas'],
    influencedBy: ['aristotle'],
    color: '#00D4AA'
  },
  {
    id: 'aquinas',
    name: 'Thomas Aquinas',
    born: 1225, died: 1274,
    location: { lat: 41.50, lng: 13.72, city: 'Roccasecca', country: 'Italy' },
    era: 'medieval',
    tradition: 'Western',
    quote: 'To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.',
    concept: 'Faith and reason are two wings of the same flight toward truth.',
    ideas: ['god', 'knowledge', 'good', 'truth', 'being'],
    influences: [],
    influencedBy: ['aristotle', 'averroes'],
    color: '#00D4AA'
  },
  {
    id: 'descartes',
    name: 'René Descartes',
    born: 1596, died: 1650,
    location: { lat: 46.92, lng: 0.62, city: 'La Haye', country: 'France' },
    era: 'early-modern',
    tradition: 'Western',
    quote: 'I think, therefore I am.',
    concept: 'The only certainty is the existence of a thinking self — everything else must be rebuilt from doubt.',
    ideas: ['consciousness', 'knowledge', 'truth', 'self', 'god'],
    influences: ['spinoza', 'leibniz', 'kant'],
    influencedBy: [],
    color: '#7B61FF'
  },
  {
    id: 'spinoza',
    name: 'Baruch Spinoza',
    born: 1632, died: 1677,
    location: { lat: 52.37, lng: 4.90, city: 'Amsterdam', country: 'Netherlands' },
    era: 'early-modern',
    tradition: 'Western',
    quote: 'I have striven not to laugh at human actions, not to weep at them, nor to hate them, but to understand them.',
    concept: 'God and Nature are the same infinite substance — there is no separation between the sacred and the real.',
    ideas: ['god', 'freedom', 'being', 'good'],
    influences: [],
    influencedBy: ['descartes'],
    color: '#7B61FF'
  },
  {
    id: 'locke',
    name: 'John Locke',
    born: 1632, died: 1704,
    location: { lat: 51.37, lng: -2.70, city: 'Wrington', country: 'England' },
    era: 'enlightenment',
    tradition: 'Western',
    quote: 'No man\'s knowledge here can go beyond his experience.',
    concept: 'The mind begins as a blank slate — all knowledge arises from sensory experience.',
    ideas: ['knowledge', 'freedom', 'justice', 'self'],
    influences: ['hume', 'rousseau'],
    influencedBy: [],
    color: '#4BA3C3'
  },
  {
    id: 'hume',
    name: 'David Hume',
    born: 1711, died: 1776,
    location: { lat: 55.95, lng: -3.19, city: 'Edinburgh', country: 'Scotland' },
    era: 'enlightenment',
    tradition: 'Western',
    quote: 'Reason is, and ought only to be, the slave of the passions.',
    concept: 'Causality is a habit of mind, not a law of nature — we cannot rationally justify induction.',
    ideas: ['knowledge', 'self', 'consciousness', 'truth'],
    influences: ['kant'],
    influencedBy: ['locke'],
    color: '#4BA3C3'
  },
  {
    id: 'rousseau',
    name: 'Jean-Jacques Rousseau',
    born: 1712, died: 1778,
    location: { lat: 46.20, lng: 6.15, city: 'Geneva', country: 'Switzerland' },
    era: 'enlightenment',
    tradition: 'Western',
    quote: 'Man is born free, and everywhere he is in chains.',
    concept: 'Civilization corrupts the natural goodness of humanity — society itself is the disease.',
    ideas: ['freedom', 'justice', 'self', 'good'],
    influences: ['marx'],
    influencedBy: ['locke'],
    color: '#4BA3C3'
  },
  {
    id: 'kant',
    name: 'Immanuel Kant',
    born: 1724, died: 1804,
    location: { lat: 54.71, lng: 20.51, city: 'Königsberg', country: 'Prussia' },
    era: 'idealism',
    tradition: 'Western',
    quote: 'Act only according to that maxim by which you can at the same time will that it should become a universal law.',
    concept: 'The mind does not mirror reality — it constructs it, imposing space, time, and causality.',
    ideas: ['knowledge', 'freedom', 'good', 'consciousness', 'truth'],
    influences: ['hegel', 'schopenhauer', 'nietzsche'],
    influencedBy: ['hume', 'descartes'],
    color: '#9B6EE8'
  },
  {
    id: 'hegel',
    name: 'G.W.F. Hegel',
    born: 1770, died: 1831,
    location: { lat: 48.78, lng: 9.18, city: 'Stuttgart', country: 'Germany' },
    era: 'idealism',
    tradition: 'Western',
    quote: 'The rational alone is real.',
    concept: 'History is Spirit becoming conscious of itself — contradiction drives all progress.',
    ideas: ['being', 'freedom', 'truth', 'consciousness', 'time'],
    influences: ['marx', 'kierkegaard'],
    influencedBy: ['kant'],
    color: '#9B6EE8'
  },
  {
    id: 'schopenhauer',
    name: 'Arthur Schopenhauer',
    born: 1788, died: 1860,
    location: { lat: 54.35, lng: 18.65, city: 'Danzig', country: 'Prussia' },
    era: 'idealism',
    tradition: 'Western',
    quote: 'Life swings like a pendulum backward and forward between pain and boredom.',
    concept: 'Beneath all appearances lies a blind, irrational will — the source of all suffering.',
    ideas: ['consciousness', 'self', 'being', 'good'],
    influences: ['nietzsche'],
    influencedBy: ['kant'],
    color: '#9B6EE8'
  },
  {
    id: 'kierkegaard',
    name: 'Søren Kierkegaard',
    born: 1813, died: 1855,
    location: { lat: 55.68, lng: 12.57, city: 'Copenhagen', country: 'Denmark' },
    era: 'crisis',
    tradition: 'Western',
    quote: 'Life can only be understood backwards; but it must be lived forwards.',
    concept: 'Truth is subjectivity — only the individual\'s passionate commitment makes life meaningful.',
    ideas: ['self', 'freedom', 'god', 'consciousness', 'time'],
    influences: ['heidegger', 'sartre', 'camus'],
    influencedBy: ['hegel'],
    color: '#E85D5D'
  },
  {
    id: 'marx',
    name: 'Karl Marx',
    born: 1818, died: 1883,
    location: { lat: 49.75, lng: 6.64, city: 'Trier', country: 'Germany' },
    era: 'crisis',
    tradition: 'Western',
    quote: 'The philosophers have only interpreted the world. The point, however, is to change it.',
    concept: 'Ideas are weapons of power — philosophy must become praxis to transform real conditions.',
    ideas: ['freedom', 'justice', 'power', 'truth'],
    influences: [],
    influencedBy: ['hegel', 'rousseau'],
    color: '#E85D5D'
  },
  {
    id: 'nietzsche',
    name: 'Friedrich Nietzsche',
    born: 1844, died: 1900,
    location: { lat: 51.25, lng: 12.01, city: 'Röcken', country: 'Germany' },
    era: 'crisis',
    tradition: 'Western',
    quote: 'God is dead. God remains dead. And we have killed him.',
    concept: 'Without God, humanity must create its own values — or perish in nihilism.',
    ideas: ['power', 'truth', 'self', 'god', 'good', 'freedom'],
    influences: ['heidegger', 'sartre', 'foucault'],
    influencedBy: ['kant', 'schopenhauer'],
    color: '#E85D5D'
  },
  {
    id: 'husserl',
    name: 'Edmund Husserl',
    born: 1859, died: 1938,
    location: { lat: 49.73, lng: 13.39, city: 'Prostějov', country: 'Czech Republic' },
    era: 'modern',
    tradition: 'Western',
    quote: 'To the things themselves!',
    concept: 'Philosophy must return to lived experience — consciousness is always consciousness of something.',
    ideas: ['consciousness', 'truth', 'self', 'time'],
    influences: ['heidegger', 'sartre', 'merleau-ponty'],
    influencedBy: [],
    color: '#3BB8A0'
  },
  {
    id: 'wittgenstein',
    name: 'Ludwig Wittgenstein',
    born: 1889, died: 1951,
    location: { lat: 48.21, lng: 16.37, city: 'Vienna', country: 'Austria' },
    era: 'modern',
    tradition: 'Western',
    quote: 'The limits of my language mean the limits of my world.',
    concept: 'Most philosophical problems are illusions created by language misuse — dissolve them, don\'t solve them.',
    ideas: ['language', 'truth', 'knowledge', 'self'],
    influences: [],
    influencedBy: [],
    color: '#3BB8A0'
  },
  {
    id: 'heidegger',
    name: 'Martin Heidegger',
    born: 1889, died: 1976,
    location: { lat: 47.96, lng: 8.34, city: 'Meßkirch', country: 'Germany' },
    era: 'modern',
    tradition: 'Western',
    quote: 'Every man is born as many men and dies as a single one.',
    concept: 'We are thrown into existence without choosing it — authentic life means owning this thrownness.',
    ideas: ['being', 'time', 'self', 'truth', 'consciousness'],
    influences: [],
    influencedBy: ['nietzsche', 'kierkegaard', 'husserl'],
    color: '#3BB8A0'
  },
  {
    id: 'sartre',
    name: 'Jean-Paul Sartre',
    born: 1905, died: 1980,
    location: { lat: 48.86, lng: 2.35, city: 'Paris', country: 'France' },
    era: 'modern',
    tradition: 'Western',
    quote: 'Existence precedes essence.',
    concept: 'We are condemned to freedom — there is no pre-given nature, only the self we choose to become.',
    ideas: ['freedom', 'self', 'consciousness', 'being', 'good'],
    influences: [],
    influencedBy: ['heidegger', 'kierkegaard', 'husserl'],
    color: '#3BB8A0'
  },
  {
    id: 'camus',
    name: 'Albert Camus',
    born: 1913, died: 1960,
    location: { lat: 36.15, lng: 6.36, city: 'Mondovi', country: 'Algeria' },
    era: 'modern',
    tradition: 'Western',
    quote: 'One must imagine Sisyphus happy.',
    concept: 'Life is absurd, but revolt against meaninglessness is itself a form of meaning.',
    ideas: ['freedom', 'self', 'good', 'consciousness'],
    influences: [],
    influencedBy: ['kierkegaard', 'nietzsche'],
    color: '#3BB8A0'
  },
  {
    id: 'de-beauvoir',
    name: 'Simone de Beauvoir',
    born: 1908, died: 1986,
    location: { lat: 48.86, lng: 2.35, city: 'Paris', country: 'France' },
    era: 'modern',
    tradition: 'Western',
    quote: 'One is not born, but rather becomes, a woman.',
    concept: 'The Other is constructed — freedom requires dismantling the systems that produce it.',
    ideas: ['freedom', 'self', 'justice', 'consciousness'],
    influences: ['foucault'],
    influencedBy: ['sartre', 'hegel'],
    color: '#3BB8A0'
  },
  {
    id: 'foucault',
    name: 'Michel Foucault',
    born: 1926, died: 1984,
    location: { lat: 46.58, lng: 0.34, city: 'Poitiers', country: 'France' },
    era: 'contemporary',
    tradition: 'Western',
    quote: 'Knowledge is not for knowing: knowledge is for cutting.',
    concept: 'Power and knowledge are inseparable — every truth-claim is also an exercise of control.',
    ideas: ['power', 'knowledge', 'truth', 'self', 'language'],
    influences: [],
    influencedBy: ['nietzsche', 'de-beauvoir'],
    color: '#FF6B9D'
  },

  // ── Eastern ─────────────────────────────────────────────────────────────────
  {
    id: 'mencius',
    name: 'Mencius',
    born: -372, died: -289,
    location: { lat: 35.41, lng: 117.00, city: 'Zoucheng', country: 'China' },
    era: 'ancient-east',
    tradition: 'East Asian',
    quote: 'The great man is he who does not lose his child\'s heart.',
    concept: 'Human nature is inherently good; evil arises only when that original goodness is neglected.',
    ideas: ['virtue', 'good', 'self', 'knowledge'],
    influences: [],
    influencedBy: ['confucius'],
    color: '#FF8C42'
  },
  {
    id: 'avicenna',
    name: 'Ibn Sina (Avicenna)',
    born: 980, died: 1037,
    location: { lat: 39.77, lng: 64.42, city: 'Bukhara', country: 'Uzbekistan' },
    era: 'medieval',
    tradition: 'Islamic',
    quote: 'The world is divided into men who have wit and no religion, and men who have religion and no wit.',
    concept: 'The soul is self-aware even in total isolation from the body — the self knows itself before it knows the world.',
    ideas: ['consciousness', 'self', 'god', 'knowledge', 'being'],
    influences: ['averroes'],
    influencedBy: ['aristotle'],
    color: '#00D4AA'
  },
  {
    id: 'al-ghazali',
    name: 'Al-Ghazālī',
    born: 1058, died: 1111,
    location: { lat: 36.33, lng: 59.50, city: 'Tus', country: 'Iran' },
    era: 'medieval',
    tradition: 'Islamic',
    quote: 'He who knows himself knows God.',
    concept: 'Reason alone cannot reach God — mystical experience (dhawq) is the only true philosophy.',
    ideas: ['god', 'knowledge', 'truth', 'self', 'consciousness'],
    influences: [],
    influencedBy: ['avicenna'],
    color: '#00D4AA'
  },
  {
    id: 'shankara',
    name: 'Adi Śaṅkara',
    born: 788, died: 820,
    location: { lat: 10.19, lng: 76.41, city: 'Kalady', country: 'India' },
    era: 'ancient-india',
    tradition: 'Hindu',
    quote: 'Brahman alone is real; the world is illusion; the individual self is non-different from Brahman.',
    concept: 'Beneath apparent multiplicity there is only one undivided consciousness — Brahman = Atman.',
    ideas: ['self', 'being', 'consciousness', 'truth', 'god'],
    influences: [],
    influencedBy: ['nagarjuna'],
    color: '#FFC857'
  },
  {
    id: 'dogen',
    name: 'Dōgen Zenji',
    born: 1200, died: 1253,
    location: { lat: 35.01, lng: 135.76, city: 'Kyoto', country: 'Japan' },
    era: 'medieval',
    tradition: 'Zen Buddhist',
    quote: 'To study the Way is to study the self. To study the self is to forget the self.',
    concept: 'Sitting in meditation is not a path to awakening — it IS awakening. Being and practice are one.',
    ideas: ['self', 'time', 'being', 'consciousness'],
    influences: [],
    influencedBy: ['nagarjuna'],
    color: '#A8DADC'
  },
  {
    id: 'zhu-xi',
    name: 'Zhu Xi',
    born: 1130, died: 1200,
    location: { lat: 27.33, lng: 117.85, city: 'Fujian', country: 'China' },
    era: 'medieval',
    tradition: 'East Asian',
    quote: 'Investigate things to extend knowledge.',
    concept: 'Every thing contains an inherent principle (li) — moral knowledge comes from investigating the world, not withdrawing from it.',
    ideas: ['knowledge', 'virtue', 'good', 'self'],
    influences: [],
    influencedBy: ['confucius', 'mencius'],
    color: '#FF8C42'
  },
  {
    id: 'nishida',
    name: 'Nishida Kitarō',
    born: 1870, died: 1945,
    location: { lat: 36.72, lng: 136.71, city: 'Kahoku', country: 'Japan' },
    era: 'modern',
    tradition: 'Kyoto School',
    quote: 'Pure experience is prior to the distinction of subject and object.',
    concept: 'Where East meets West: pure experience — before thought divides it — is the absolute ground of all reality.',
    ideas: ['consciousness', 'self', 'being', 'truth'],
    influences: [],
    influencedBy: ['husserl', 'nagarjuna'],
    color: '#A8DADC'
  },

  // ── Brazilian ─────────────────────────────────────────────────────────────
  {
    id: 'freire',
    name: 'Paulo Freire',
    born: 1921, died: 1997,
    location: { lat: -8.05, lng: -34.88, city: 'Recife', country: 'Brazil' },
    era: 'contemporary',
    tradition: 'Latin American',
    quote: 'The oppressed, having internalized the image of the oppressor, are fearful of freedom.',
    concept: 'Education is never neutral — it either domesticates or liberates. The oppressed must name the world to change it.',
    ideas: ['freedom', 'justice', 'power', 'knowledge', 'language'],
    influences: [],
    influencedBy: ['marx', 'sartre', 'de-beauvoir'],
    color: '#00C875'
  },
  {
    id: 'unger',
    name: 'Roberto Mangabeira Unger',
    born: 1947, died: null,
    location: { lat: -22.90, lng: -43.17, city: 'Rio de Janeiro', country: 'Brazil' },
    era: 'contemporary',
    tradition: 'Latin American',
    quote: 'The future does not have to be a rearrangement of the present.',
    concept: 'Nothing in social life is necessary — every structure can be challenged, interrupted, and remade.',
    ideas: ['freedom', 'justice', 'power', 'self'],
    influences: [],
    influencedBy: ['marx', 'hegel', 'foucault'],
    color: '#00C875'
  },

  // ── Russian ───────────────────────────────────────────────────────────────
  {
    id: 'solovyov',
    name: 'Vladimir Solovyov',
    born: 1853, died: 1900,
    location: { lat: 55.75, lng: 37.62, city: 'Moscow', country: 'Russia' },
    era: 'crisis',
    tradition: 'Russian',
    quote: 'Love is the only force that can transform an enemy into a friend.',
    concept: 'Knowledge, ethics, and mystical experience must be reunited — philosophy divorced from love is a corpse.',
    ideas: ['god', 'being', 'good', 'truth', 'consciousness'],
    influences: ['berdyaev'],
    influencedBy: ['hegel', 'schopenhauer', 'plato'],
    color: '#FF4D4D'
  },
  {
    id: 'berdyaev',
    name: 'Nikolai Berdyaev',
    born: 1874, died: 1948,
    location: { lat: 50.45, lng: 30.52, city: 'Kyiv', country: 'Ukraine' },
    era: 'modern',
    tradition: 'Russian',
    quote: 'Bread for myself is a material question; bread for my neighbor is a spiritual one.',
    concept: 'Freedom is not granted by God — it precedes God. The creative act is humanity\'s highest calling.',
    ideas: ['freedom', 'self', 'god', 'consciousness', 'being'],
    influences: [],
    influencedBy: ['solovyov', 'kierkegaard', 'nietzsche'],
    color: '#FF4D4D'
  },
  {
    id: 'kropotkin',
    name: 'Peter Kropotkin',
    born: 1842, died: 1921,
    location: { lat: 55.75, lng: 37.62, city: 'Moscow', country: 'Russia' },
    era: 'crisis',
    tradition: 'Russian',
    quote: 'Mutual aid is as much a law of nature as mutual struggle.',
    concept: 'Cooperation — not competition — is evolution\'s deepest law. Anarchism is nature\'s own politics.',
    ideas: ['justice', 'freedom', 'good', 'power'],
    influences: [],
    influencedBy: ['rousseau', 'marx'],
    color: '#FF4D4D'
  }
]

export const ideas = [
  {
    id: 'truth',
    name: 'Truth',
    icon: '◎',
    color: '#6B46FF',
    description: 'What is the nature of reality, and how — or whether — it can be known?',
    centralQuestion: 'Is truth discovered or constructed?',
    philosophers: ['socrates', 'plato', 'descartes', 'kant', 'nietzsche', 'wittgenstein', 'heidegger', 'foucault', 'nagarjuna', 'laozi', 'al-ghazali'],
    relatedIdeas: ['knowledge', 'language', 'being', 'power'],
    tension: ['power']
  },
  {
    id: 'freedom',
    name: 'Freedom',
    icon: '↗',
    color: '#00F5FF',
    description: 'Are we truly free, or determined by forces beyond our control?',
    centralQuestion: 'Can free will coexist with causality?',
    philosophers: ['spinoza', 'locke', 'rousseau', 'kant', 'hegel', 'sartre', 'camus', 'de-beauvoir', 'nietzsche', 'zhuangzi', 'berdyaev', 'freire', 'kropotkin'],
    relatedIdeas: ['self', 'consciousness', 'justice', 'power'],
    tension: ['power', 'god']
  },
  {
    id: 'consciousness',
    name: 'Consciousness',
    icon: '◑',
    color: '#9B6EE8',
    description: 'What is it to be aware? Does mind arise from matter, or precede it?',
    centralQuestion: 'Why is there something it is like to be you?',
    philosophers: ['descartes', 'hume', 'kant', 'hegel', 'husserl', 'heidegger', 'sartre', 'nagarjuna', 'avicenna', 'shankara', 'nishida'],
    relatedIdeas: ['self', 'being', 'truth', 'language'],
    tension: ['being']
  },
  {
    id: 'god',
    name: 'God',
    icon: '✦',
    color: '#FFB347',
    description: 'Does the divine exist, and if so, what does that demand of us?',
    centralQuestion: 'If God is dead, what replaces him?',
    philosophers: ['descartes', 'spinoza', 'aquinas', 'averroes', 'kierkegaard', 'nietzsche', 'al-ghazali', 'shankara', 'solovyov', 'berdyaev'],
    relatedIdeas: ['truth', 'good', 'being', 'freedom'],
    tension: ['freedom', 'truth']
  },
  {
    id: 'self',
    name: 'Self',
    icon: '⊙',
    color: '#FF6B9D',
    description: 'Is there a stable self, or is identity a story we tell about flux?',
    centralQuestion: 'Are you the same person who woke up yesterday?',
    philosophers: ['socrates', 'hume', 'kant', 'kierkegaard', 'nietzsche', 'sartre', 'heidegger', 'zhuangzi', 'nagarjuna', 'wittgenstein', 'dogen', 'nishida', 'avicenna', 'shankara'],
    relatedIdeas: ['consciousness', 'freedom', 'truth', 'language', 'time'],
    tension: ['being']
  },
  {
    id: 'being',
    name: 'Being',
    icon: '◻',
    color: '#00D4AA',
    description: 'Why is there something rather than nothing?',
    centralQuestion: 'What does it mean to exist at all?',
    philosophers: ['plato', 'aristotle', 'hegel', 'heidegger', 'sartre', 'nagarjuna', 'laozi', 'shankara', 'dogen', 'nishida', 'spinoza', 'solovyov', 'berdyaev'],
    relatedIdeas: ['consciousness', 'time', 'truth', 'god'],
    tension: ['nothingness']
  },
  {
    id: 'power',
    name: 'Power',
    icon: '⚡',
    color: '#FF3366',
    description: 'Who decides what is true, just, or real — and how do they maintain that authority?',
    centralQuestion: 'Is every truth-claim a disguised will to power?',
    philosophers: ['nietzsche', 'marx', 'foucault', 'freire', 'unger', 'kropotkin'],
    relatedIdeas: ['truth', 'justice', 'language', 'knowledge'],
    tension: ['truth', 'good']
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    icon: '◈',
    color: '#4BA3C3',
    description: 'What can we know, and how certain can that knowledge be?',
    centralQuestion: 'How do you know what you know is real?',
    philosophers: ['socrates', 'plato', 'aristotle', 'descartes', 'locke', 'hume', 'kant', 'wittgenstein', 'foucault', 'freire'],
    relatedIdeas: ['truth', 'consciousness', 'language', 'self'],
    tension: ['power']
  },
  {
    id: 'justice',
    name: 'Justice',
    icon: '⊗',
    color: '#FFD700',
    description: 'What do we owe each other, and who decides the terms?',
    centralQuestion: 'Can a society be just while one person suffers unjustly?',
    philosophers: ['plato', 'aristotle', 'rousseau', 'locke', 'marx', 'de-beauvoir', 'freire', 'unger', 'kropotkin'],
    relatedIdeas: ['good', 'freedom', 'power', 'truth'],
    tension: ['power']
  },
  {
    id: 'time',
    name: 'Time',
    icon: '⟳',
    color: '#A8DADC',
    description: 'Is time a feature of reality, or a framework imposed by consciousness?',
    centralQuestion: 'Is the present moment all that exists?',
    philosophers: ['hegel', 'kierkegaard', 'heidegger', 'husserl'],
    relatedIdeas: ['being', 'consciousness', 'self'],
    tension: ['being']
  },
  {
    id: 'language',
    name: 'Language',
    icon: '〜',
    color: '#B8E0D2',
    description: 'Does language describe reality, or create it?',
    centralQuestion: 'What thoughts are you unable to think because you lack the words?',
    philosophers: ['wittgenstein', 'heidegger', 'foucault', 'laozi', 'freire'],
    relatedIdeas: ['truth', 'consciousness', 'self', 'knowledge', 'power'],
    tension: ['truth']
  },
  {
    id: 'good',
    name: 'The Good',
    icon: '◯',
    color: '#C8B1E4',
    description: 'What makes an action moral, a life well-lived, a society worth building?',
    centralQuestion: 'Is ethics discovered or invented?',
    philosophers: ['socrates', 'plato', 'aristotle', 'aquinas', 'kant', 'nietzsche', 'sartre', 'confucius', 'mencius', 'zhu-xi', 'spinoza', 'solovyov', 'kropotkin'],
    relatedIdeas: ['justice', 'freedom', 'self', 'god'],
    tension: ['power']
  },
  {
    id: 'virtue',
    name: 'Virtue',
    icon: '△',
    color: '#E8D5B7',
    description: 'Can character be cultivated, and is it the foundation of happiness?',
    centralQuestion: 'Is virtue its own reward?',
    philosophers: ['socrates', 'plato', 'aristotle', 'confucius', 'mencius', 'zhu-xi'],
    relatedIdeas: ['good', 'self', 'knowledge'],
    tension: ['power']
  }
]

export const eras = [
  {
    id: 'ancient-greece',
    name: 'The Greek Miracle',
    range: [-600, -300],
    label: '600–300 BC',
    color: '#6B46FF',
    paradigmShift: 'The birth of reason — humanity dares to question the gods.',
    description: 'In the agora of Athens, a new mode of inquiry emerged: instead of myth, argument. Instead of tradition, evidence. Philosophy was born as a form of dangerous conversation.',
    philosophers: ['socrates', 'plato', 'aristotle'],
    keyIdea: 'What is the Good?',
    visual: 'marble'
  },
  {
    id: 'ancient-east',
    name: 'The Eastern Axis',
    range: [-600, -200],
    label: '600–200 BC',
    color: '#FF8C42',
    paradigmShift: 'Simultaneously, in China and India: different answers to the same silence.',
    description: 'While Socrates questioned Athenians, Confucius reformed Chinese courts, Laozi vanished into paradox, and the Buddha sat beneath a tree. The East did not separate philosophy from practice.',
    philosophers: ['confucius', 'laozi', 'zhuangzi'],
    keyIdea: 'How should one live in harmony?',
    visual: 'ink'
  },
  {
    id: 'ancient-india',
    name: 'The Indian Void',
    range: [-500, 500],
    label: '500 BC – 500 AD',
    color: '#FFC857',
    paradigmShift: 'Emptiness as foundation — the most radical critique of selfhood ever conceived.',
    description: 'Buddhist philosophy dismantled the self entirely. Nāgārjuna\'s Madhyamaka showed that even emptiness is empty. The project was not despair but liberation.',
    philosophers: ['nagarjuna'],
    keyIdea: 'What remains when the self dissolves?',
    visual: 'void'
  },
  {
    id: 'medieval',
    name: 'The Synthesis',
    range: [500, 1400],
    label: '500–1400',
    color: '#00D4AA',
    paradigmShift: 'Faith and reason locked in a dance — each era swinging the balance.',
    description: 'Medieval philosophy was not stagnation but translation: Arabic scholars preserved and transformed Greek thought, scholastics fused it with theology, creating cathedral-like systems of total explanation.',
    philosophers: ['averroes', 'aquinas'],
    keyIdea: 'Can God be proven by reason?',
    visual: 'manuscript'
  },
  {
    id: 'early-modern',
    name: 'The Cartesian Break',
    range: [1580, 1720],
    label: '1580–1720',
    color: '#7B61FF',
    paradigmShift: 'Doubt as method — tearing down everything to rebuild on certain ground.',
    description: 'Descartes demolished inherited knowledge and rebuilt from the one undeniable fact: that he was doubting. The individual thinking subject moved to the center of philosophy.',
    philosophers: ['descartes', 'spinoza'],
    keyIdea: 'What can survive radical doubt?',
    visual: 'geometry'
  },
  {
    id: 'enlightenment',
    name: 'The Enlightenment',
    range: [1680, 1800],
    label: '1680–1800',
    color: '#4BA3C3',
    paradigmShift: 'Reason against tradition — the authority of kings and churches challenged.',
    description: 'The project of the Enlightenment: replace superstition with science, tyranny with rights, myth with reason. Its optimism changed the world. Its contradictions haunted the next century.',
    philosophers: ['locke', 'hume', 'rousseau'],
    keyIdea: 'What are the natural rights of man?',
    visual: 'light'
  },
  {
    id: 'idealism',
    name: 'German Idealism',
    range: [1780, 1860],
    label: '1780–1860',
    color: '#9B6EE8',
    paradigmShift: 'Mind does not mirror nature — it constitutes it.',
    description: 'Kant\'s revolution: the mind is not a blank slate but an active constructor of reality. Hegel pushed further: reality itself thinks through us. History is Spirit becoming self-aware.',
    philosophers: ['kant', 'hegel', 'schopenhauer'],
    keyIdea: 'Is mind prior to matter?',
    visual: 'spiral'
  },
  {
    id: 'crisis',
    name: 'The Rupture',
    range: [1813, 1900],
    label: '1813–1900',
    color: '#E85D5D',
    paradigmShift: 'God is dead. The self is a fiction. History is class struggle. Nothing survives.',
    description: 'Three hammer blows: Kierkegaard attacked rationalism with the absurd leap of faith; Marx revealed ideas as weapons of class; Nietzsche announced the death of God and the coming nihilism.',
    philosophers: ['kierkegaard', 'marx', 'nietzsche', 'solovyov', 'kropotkin'],
    keyIdea: 'What remains after all foundations collapse?',
    visual: 'fracture'
  },
  {
    id: 'modern',
    name: 'After the Abyss',
    range: [1900, 1970],
    label: '1900–1970',
    color: '#3BB8A0',
    paradigmShift: 'Two wars, the death of progress, the birth of existential freedom.',
    description: 'In the ruins of optimism, philosophers chose: Husserl returned to experience, Wittgenstein silenced pseudo-problems, Heidegger confronted death, Sartre declared freedom, Camus demanded revolt. From Russia, Berdyaev declared that freedom precedes even God.',
    philosophers: ['husserl', 'wittgenstein', 'heidegger', 'sartre', 'camus', 'de-beauvoir', 'berdyaev'],
    keyIdea: 'How do we live without foundations?',
    visual: 'ruins'
  },
  {
    id: 'contemporary',
    name: 'The Unraveling',
    range: [1960, 2000],
    label: '1960–2000',
    color: '#FF6B9D',
    paradigmShift: 'Power is everywhere. Truth is contested. The subject is constructed.',
    description: 'Foucault showed how power flows through knowledge. Freire showed how it flows through classrooms. The postmodern and liberation projects converged: every structure of "truth" conceals an act of domination.',
    philosophers: ['foucault', 'freire', 'unger'],
    keyIdea: 'Who benefits from what we call truth?',
    visual: 'network'
  }
]

export const dailyQuestions = [
  {
    question: 'If you had to choose between knowing the truth and living a happy lie — which would you choose?',
    subtext: 'And does your answer reveal something about what you truly value?',
    philosopher: 'plato',
    idea: 'truth'
  },
  {
    question: 'Is the self that wakes up tomorrow the same self that went to sleep tonight?',
    subtext: 'Or is personal identity a story we tell to hold the pieces together?',
    philosopher: 'hume',
    idea: 'self'
  },
  {
    question: 'Can a society be just if even one person suffers unjustly within it?',
    subtext: 'And if not — are any of us actually living in a just society?',
    philosopher: 'plato',
    idea: 'justice'
  },
  {
    question: 'If language shapes thought — what thoughts are you unable to think?',
    subtext: 'The limits of your world are the limits of your language.',
    philosopher: 'wittgenstein',
    idea: 'language'
  },
  {
    question: 'If you had to live this exact moment forever — would you want to?',
    subtext: 'Nietzsche called this the ultimate test of whether you have truly said yes to your life.',
    philosopher: 'nietzsche',
    idea: 'time'
  },
  {
    question: 'Are you free? Or do you only feel free between the moments your conditioning acts?',
    subtext: 'Sartre said we are condemned to freedom. But condemned by what?',
    philosopher: 'sartre',
    idea: 'freedom'
  },
  {
    question: 'If God does not exist — does that make your courage more or less meaningful?',
    subtext: 'Camus thought the answer was: infinitely more.',
    philosopher: 'camus',
    idea: 'god'
  },
  {
    question: 'Can you truly know another person\'s mind — or only your idea of it?',
    subtext: 'And if you cannot, is love knowledge or projection?',
    philosopher: 'descartes',
    idea: 'consciousness'
  },
  {
    question: 'Why is there something rather than nothing?',
    subtext: 'Leibniz called it the first question. Heidegger called it the deepest. Neither answered it.',
    philosopher: 'heidegger',
    idea: 'being'
  },
  {
    question: 'If morality is just a social agreement — who agreed, and did you?',
    subtext: 'Nietzsche suspected the weak wrote the rules to protect themselves from the strong.',
    philosopher: 'nietzsche',
    idea: 'good'
  }
]

export function getPhilosopherById(id) {
  return philosophers.find(p => p.id === id)
}

export function getIdeaById(id) {
  return ideas.find(i => i.id === id)
}

export function getEraById(id) {
  return eras.find(e => e.id === id)
}

export function getInfluenceConnections() {
  const connections = []
  for (const p of philosophers) {
    for (const targetId of p.influences) {
      const target = getPhilosopherById(targetId)
      if (target) {
        connections.push({ source: p, target })
      }
    }
  }
  return connections
}
