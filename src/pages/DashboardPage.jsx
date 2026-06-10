import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NoteCard from '../components/NoteCard.jsx'
import { getNotes, createNote, deleteNote, searchNotes, formatTimeAgo } from '../utils/notesStore.js'

export default function DashboardPage() {
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setNotes(getNotes())
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setNotes(searchNotes(searchQuery))
    } else {
      setNotes(getNotes())
    }
  }, [searchQuery])

  const handleCreateNote = () => {
    const note = createNote()
    navigate(`/note/${note.id}`)
  }

  const handleDelete = (id) => {
    deleteNote(id)
    setNotes(getNotes())
    setDeleteConfirm(null)
  }

  return (
    <div className="flex-1 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-[1000px] space-y-6">
        {/* Welcome Section */}
        <section className="page-fade-in">
          <h2 className="text-headline-lg text-on-surface mb-2">Welcome back! 👋</h2>
          <p className="text-body-sm text-on-surface-variant">
            You have {notes.length} note{notes.length !== 1 ? 's' : ''} in your collection.
          </p>
        </section>

        {/* Search Bar (Mobile) */}
        <section className="md:hidden page-fade-in">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-sm placeholder-on-surface-variant/50"
              placeholder="Search notes..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Desktop search sync */}
        <section className="hidden md:block page-fade-in">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-sm placeholder-on-surface-variant/50"
              placeholder="Search notes..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="dashboard-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </section>

        {/* New Note Action Card */}
        <section className="page-fade-in">
          <button
            onClick={handleCreateNote}
            className="w-full h-32 surface-level-2 rounded-xl flex flex-col items-center justify-center hover:bg-surface-variant/30 transition-all group relative overflow-hidden border-dashed hover:border-solid hover:border-primary/50 cursor-pointer bg-transparent"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span
              className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform duration-300"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              add_circle
            </span>
            <span className="text-label-md text-on-surface-variant group-hover:text-primary transition-colors">
              Create New Note
            </span>
          </button>
        </section>

        {/* Search Results Info */}
        {searchQuery && (
          <section className="page-fade-in">
            <p className="text-body-sm text-on-surface-variant">
              {notes.length} result{notes.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
            </p>
          </section>
        )}

        {/* Notes Grid */}
        <section className="page-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-headline-sm text-on-surface">
              {searchQuery ? 'Search Results' : 'Recent Notes'}
            </h3>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl mb-4 block">
                {searchQuery ? 'search_off' : 'note_add'}
              </span>
              <p className="text-body-md text-on-surface-variant/60">
                {searchQuery
                  ? 'No notes found matching your search.'
                  : 'No notes yet. Create your first note!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div key={note.id} className="relative group/card">
                  <Link to={`/note/${note.id}`} className="no-underline block">
                    <NoteCard
                      title={note.title || 'Untitled Note'}
                      snippet={note.content.slice(0, 150).replace(/[#*>\-\[\]]/g, '') || 'Empty note...'}
                      time={formatTimeAgo(note.updatedAt)}
                      icon="description"
                      isActive={false}
                      aiTag={note.aiTag}
                    />
                  </Link>
                  {/* Delete button overlay */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setDeleteConfirm(note.id)
                    }}
                    className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 p-2 rounded-lg bg-surface-container-high/90 text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-all cursor-pointer z-10 border-none"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-outline-variant/30 rounded-xl p-6 w-full max-w-sm shadow-2xl page-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-error">delete</span>
              </div>
              <h3 className="text-headline-sm text-on-surface">Delete Note?</h3>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-6">
              This action cannot be undone. The note will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant text-label-md transition-colors cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2.5 rounded-lg bg-error text-on-error text-label-md hover:opacity-90 transition-opacity cursor-pointer border-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
