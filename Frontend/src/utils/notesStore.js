import { supabase } from './supabaseClient';

const STORAGE_KEY = 'notula_notes'

const defaultNotes = [
  {
    id: '1',
    title: 'Product Roadmap Q3',
    content: `# Product Roadmap Q3\n\nUpdate on the upcoming features for the next quarter.\n\n## Focus Areas\n- AI integrations and user onboarding flow improvements\n- Performance optimization across all modules\n- Mobile responsiveness enhancements\n\n> "Ship fast, iterate faster."\n\n## Timeline\n- *Week 1-2:* Research & prototyping\n- *Week 3-6:* Core development\n- *Week 7-8:* QA & polish`,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    aiTag: 'AI Summarized',
    isFavorite: true,
    isArchived: false,
    notebook: 'Work',
  },
  {
    id: '2',
    title: 'Meeting Notes: Design Sync',
    content: `# Meeting Notes: Design Sync\n\nDiscussed the new dark mode color palette.\n\n## Key Decisions\n- Agreed to shift towards cooler grays and deeper purples for the active states\n- Glassmorphism will be used exclusively for AI-driven features\n- Typography scale finalized: Inter for UI, JetBrains Mono for editor\n\n## Action Items\n- Update Figma tokens\n- Create component library in Storybook\n- Review with engineering team`,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    aiTag: null,
    isFavorite: false,
    isArchived: false,
    notebook: 'Work',
  },
  {
    id: '3',
    title: 'Blog Post Ideas',
    content: `# Blog Post Ideas\n\n1. Why minimalist UI is actually harder to design\n2. The psychology of dark mode in productivity apps\n3. The future of AI assistant integration in note-taking\n4. Building a design system from scratch — lessons learned\n5. How we reduced our bundle size by 60%\n\n## Priority\nStart with #1 — it has the most engagement potential.\n\n> Draft deadline: End of month`,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    aiTag: null,
    isFavorite: true,
    isArchived: false,
    notebook: 'Personal',
  },
  {
    id: '4',
    title: 'Old Sprint Retrospective',
    content: `# Sprint Retrospective - Sprint 12\n\n## What went well\n- Shipped the auth module on time\n- Good collaboration between frontend and backend\n\n## What didn't go well\n- Too many bugs in production\n- Deployment pipeline was flaky\n\n## Action items\n- Set up better E2E tests\n- Fix CI/CD pipeline`,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    aiTag: null,
    isFavorite: false,
    isArchived: true,
    notebook: 'Work',
  },
]

function hasSession() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
      return true
    }
  }
  return false
}

function loadNotesLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotes))
      return [...defaultNotes]
    }
    const notes = JSON.parse(raw)
    const migrated = notes.map((n) => ({
      isFavorite: false,
      isArchived: false,
      notebook: '',
      ...n,
    }))
    return migrated
  } catch {
    return [...defaultNotes]
  }
}

function persistLocal(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

function mapDbNote(dbNote) {
  if (!dbNote) return null
  return {
    id: dbNote.id,
    title: dbNote.title || '',
    content: dbNote.content || '',
    notebook: dbNote.notebook || '',
    isFavorite: dbNote.is_favorite,
    isArchived: dbNote.is_archived,
    aiTag: dbNote.ai_tag,
    createdAt: dbNote.created_at,
    updatedAt: dbNote.updated_at
  }
}

// Get all active (non-archived) notes
export async function getNotes() {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data.map(mapDbNote)
  } else {
    return loadNotesLocal()
      .filter((n) => !n.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
}

// Get a single note by ID
export async function getNote(id) {
  if (hasSession()) {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return mapDbNote(data)
  } else {
    return loadNotesLocal().find((n) => n.id === id) || null
  }
}

// Get all notes regardless of status
export async function getAllNotes() {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data.map(mapDbNote)
  } else {
    return loadNotesLocal().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
}

// Get user favorite notes
export async function getFavorites() {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_favorite', true)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data.map(mapDbNote)
  } else {
    return loadNotesLocal()
      .filter((n) => n.isFavorite && !n.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
}

// Get archived notes
export async function getArchived() {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', true)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data.map(mapDbNote)
  } else {
    return loadNotesLocal()
      .filter((n) => n.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
}

// Group active notes by notebooks
export async function getNotebooks() {
  let notes = []
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return {}
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .neq('notebook', '')
    if (error) throw error
    notes = data.map(mapDbNote)
  } else {
    notes = loadNotesLocal().filter((n) => !n.isArchived && n.notebook)
  }

  const notebooks = {}
  notes.forEach((n) => {
    if (!notebooks[n.notebook]) {
      notebooks[n.notebook] = []
    }
    notebooks[n.notebook].push(n)
  })
  
  // Sort each notebook's notes
  Object.keys(notebooks).forEach((key) => {
    notebooks[key].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  })
  return notebooks
}

// Get notes belonging to a specific notebook
export async function getNotesByNotebook(notebook) {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('notebook', notebook)
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
    if (error) throw error
    return data.map(mapDbNote)
  } else {
    return loadNotesLocal()
      .filter((n) => n.notebook === notebook && !n.isArchived)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
}

// Create new note
export async function createNote(notebook = '') {
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("User not authenticated")
    const noteId = Date.now().toString() + Math.random().toString(36).substring(2, 6)
    const { data, error } = await supabase
      .from('notes')
      .insert({
        id: noteId,
        user_id: user.id,
        title: '',
        content: '',
        notebook: notebook
      })
      .select()
      .single()
    if (error) throw error
    return mapDbNote(data)
  } else {
    const notes = loadNotesLocal()
    const note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiTag: null,
      isFavorite: false,
      isArchived: false,
      notebook: notebook,
    }
    notes.push(note)
    persistLocal(notes)
    return note
  }
}

// Update an existing note
export async function saveNote(id, updates) {
  if (hasSession()) {
    const dbUpdates = {}
    if (updates.title !== undefined) dbUpdates.title = updates.title
    if (updates.content !== undefined) dbUpdates.content = updates.content
    if (updates.notebook !== undefined) dbUpdates.notebook = updates.notebook
    if (updates.isFavorite !== undefined) dbUpdates.is_favorite = updates.isFavorite
    if (updates.isArchived !== undefined) dbUpdates.is_archived = updates.isArchived
    if (updates.aiTag !== undefined) dbUpdates.ai_tag = updates.aiTag
    dbUpdates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('notes')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .maybeSingle()
    if (error) throw error
    return mapDbNote(data)
  } else {
    const notes = loadNotesLocal()
    const idx = notes.findIndex((n) => n.id === id)
    if (idx === -1) return null
    notes[idx] = { ...notes[idx], ...updates, updatedAt: new Date().toISOString() }
    persistLocal(notes)
    return notes[idx]
  }
}

// Delete a note
export async function deleteNote(id) {
  if (hasSession()) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
    if (error) throw error
    return await getAllNotes()
  } else {
    const notes = loadNotesLocal().filter((n) => n.id !== id)
    persistLocal(notes)
    return notes
  }
}

// Toggle favorite status
export async function toggleFavorite(id) {
  if (hasSession()) {
    const note = await getNote(id)
    if (!note) return null
    return await saveNote(id, { isFavorite: !note.isFavorite })
  } else {
    const notes = loadNotesLocal()
    const idx = notes.findIndex((n) => n.id === id)
    if (idx === -1) return null
    notes[idx].isFavorite = !notes[idx].isFavorite
    persistLocal(notes)
    return notes[idx]
  }
}

// Toggle archive status
export async function toggleArchive(id) {
  if (hasSession()) {
    const note = await getNote(id)
    if (!note) return null
    return await saveNote(id, { isArchived: !note.isArchived })
  } else {
    const notes = loadNotesLocal()
    const idx = notes.findIndex((n) => n.id === id)
    if (idx === -1) return null
    notes[idx].isArchived = !notes[idx].isArchived
    persistLocal(notes)
    return notes[idx]
  }
}

// Search notes
export async function searchNotes(query) {
  const q = query.toLowerCase().trim()
  if (!q) return getNotes()

  let notes = []
  if (hasSession()) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_archived', false)
    if (error) throw error
    notes = data.map(mapDbNote)
  } else {
    notes = loadNotesLocal().filter((n) => !n.isArchived)
  }

  return notes
    .filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

// Helper: Summarize note using Supabase Edge Function
export async function summarizeNote(text) {
  if (hasSession()) {
    const { data, error } = await supabase.functions.invoke('gemini', {
      body: { text, task: 'summarize' }
    })
    if (error) throw error
    return data.result
  } else {
    // Local fallback simulations if offline
    return `### AI Summary (Offline Simulation)
* **Summary capability active:** This is an offline simulation.
* **Backend Connection:** Please log in to your account to utilize real Google Gemini models via Supabase Edge Functions.`;
  }
}

// Helper: Fix grammar note using Supabase Edge Function
export async function fixGrammarNote(text) {
  if (hasSession()) {
    const { data, error } = await supabase.functions.invoke('gemini', {
      body: { text, task: 'grammar' }
    })
    if (error) throw error
    return data.result
  } else {
    return `${text}\n\n*(AI Note: Grammar check simulation - log in to use real Google Gemini via Supabase)*`;
  }
}

// Date formatter helper
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
