const STORAGE_KEY = 'notula_notes'

const defaultNotes = [
  {
    id: '1',
    title: 'Product Roadmap Q3',
    content: `# Product Roadmap Q3\n\nUpdate on the upcoming features for the next quarter.\n\n## Focus Areas\n- AI integrations and user onboarding flow improvements\n- Performance optimization across all modules\n- Mobile responsiveness enhancements\n\n> "Ship fast, iterate faster."\n\n## Timeline\n- **Week 1-2:** Research & prototyping\n- **Week 3-6:** Core development\n- **Week 7-8:** QA & polish`,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    aiTag: 'AI Summarized',
    folder: 'all',
  },
  {
    id: '2',
    title: 'Meeting Notes: Design Sync',
    content: `# Meeting Notes: Design Sync\n\nDiscussed the new dark mode color palette.\n\n## Key Decisions\n- Agreed to shift towards cooler grays and deeper purples for the active states\n- Glassmorphism will be used exclusively for AI-driven features\n- Typography scale finalized: Inter for UI, JetBrains Mono for editor\n\n## Action Items\n- [ ] Update Figma tokens\n- [ ] Create component library in Storybook\n- [ ] Review with engineering team`,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    aiTag: null,
    folder: 'all',
  },
  {
    id: '3',
    title: 'Blog Post Ideas',
    content: `# Blog Post Ideas\n\n1. Why minimalist UI is actually harder to design\n2. The psychology of dark mode in productivity apps\n3. The future of AI assistant integration in note-taking\n4. Building a design system from scratch — lessons learned\n5. How we reduced our bundle size by 60%\n\n## Priority\nStart with #1 — it has the most engagement potential.\n\n> Draft deadline: End of month`,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    aiTag: null,
    folder: 'all',
  },
]

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotes))
      return [...defaultNotes]
    }
    return JSON.parse(raw)
  } catch {
    return [...defaultNotes]
  }
}

function persist(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function getNotes() {
  return loadNotes().sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )
}

export function getNote(id) {
  return loadNotes().find((n) => n.id === id) || null
}

export function createNote() {
  const notes = loadNotes()
  const note = {
    id: Date.now().toString(),
    title: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aiTag: null,
    folder: 'all',
  }
  notes.push(note)
  persist(notes)
  return note
}

export function saveNote(id, updates) {
  const notes = loadNotes()
  const idx = notes.findIndex((n) => n.id === id)
  if (idx === -1) return null
  notes[idx] = { ...notes[idx], ...updates, updatedAt: new Date().toISOString() }
  persist(notes)
  return notes[idx]
}

export function deleteNote(id) {
  const notes = loadNotes().filter((n) => n.id !== id)
  persist(notes)
  return notes
}

export function searchNotes(query) {
  const q = query.toLowerCase().trim()
  if (!q) return getNotes()
  return getNotes().filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
  )
}

export function formatTimeAgo(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
