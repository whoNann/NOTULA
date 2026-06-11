import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import NoteCard from '../components/NoteCard.jsx'
import {
  getNotes,
  createNote,
  deleteNote,
  searchNotes,
  formatTimeAgo,
  getFavorites,
  getArchived,
  getNotebooks,
  toggleFavorite,
  toggleArchive,
} from '../utils/notesStore.js'
import { showToast } from '../utils/useToast.js'

export default function DashboardPage() {
  const [notes, setNotes] = useState([])
  const [notebooks, setNotebooks] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const filter = searchParams.get('filter') || 'all'
  const urlQuery = searchParams.get('q') || ''

  // Sync URL ?q= param to local search state
  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery)
    }
  }, [urlQuery])

  const refreshNotes = () => {
    if (searchQuery.trim()) {
      setNotes(searchNotes(searchQuery))
      return
    }
    switch (filter) {
      case 'favorites':
        setNotes(getFavorites())
        break
      case 'archive':
        setNotes(getArchived())
        break
      case 'notebooks':
        setNotebooks(getNotebooks())
        setNotes([])
        break
      default:
        setNotes(getNotes())
    }
  }

  useEffect(() => {
    refreshNotes()
  }, [filter])

  useEffect(() => {
    if (searchQuery.trim()) {
      setNotes(searchNotes(searchQuery))
    } else {
      refreshNotes()
    }
  }, [searchQuery])

  const handleCreateNote = () => {
    const note = createNote()
    navigate(`/note/${note.id}`)
  }

  const handleDelete = (id) => {
    deleteNote(id)
    refreshNotes()
    setDeleteConfirm(null)
    showToast('Note deleted', 'info')
  }

  const handleToggleFavorite = (id) => {
    const updated = toggleFavorite(id)
    refreshNotes()
    showToast(updated?.isFavorite ? 'Added to favorites' : 'Removed from favorites', 'success')
  }

  const handleToggleArchive = (id) => {
    const updated = toggleArchive(id)
    refreshNotes()
    showToast(updated?.isArchived ? 'Note archived' : 'Note unarchived', 'success')
  }

  // Page title & info by filter
  const filterConfig = {
    all: { title: 'All Notes', icon: 'description', emptyIcon: 'note_add', emptyText: 'No notes yet. Create your first note!' },
    favorites: { title: 'Favorites', icon: 'star', emptyIcon: 'star_border', emptyText: 'No favorite notes yet. Star a note to see it here!' },
    archive: { title: 'Archive', icon: 'archive', emptyIcon: 'archive', emptyText: 'No archived notes. Archive notes you want to keep but hide from the main view.' },
    notebooks: { title: 'Notebooks', icon: 'folder', emptyIcon: 'folder_off', emptyText: 'No notebooks yet. Assign a notebook to notes in the editor.' },
  }

  const config = filterConfig[filter] || filterConfig.all

  // Render note grid
  const renderNoteGrid = (notesList, showArchiveAction = true) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notesList.map((note) => (
        <div key={note.id} className="relative group/card">
          <Link to={`/note/${note.id}`} className="no-underline block">
            <NoteCard
              title={note.title || 'Untitled Note'}
              snippet={note.content.slice(0, 150).replace(/[#*>\-\[\]_~`]/g, '') || 'Empty note...'}
              time={formatTimeAgo(note.updatedAt)}
              icon={note.notebook ? 'folder' : 'description'}
              isActive={false}
              aiTag={note.aiTag}
              isFavorite={note.isFavorite}
              isArchived={note.isArchived}
              onToggleFavorite={() => handleToggleFavorite(note.id)}
              onToggleArchive={showArchiveAction ? () => handleToggleArchive(note.id) : undefined}
            />
          </Link>
          {/* Delete button overlay */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDeleteConfirm(note.id)
            }}
            className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 p-2 rounded-lg bg-surface-container-high/90 text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-all cursor-pointer z-10 border-none"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex-1 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-[1000px] space-y-6">
        {/* Header Section */}
        <section className="page-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {config.icon}
            </span>
            <h2 className="text-headline-lg text-on-surface">{config.title}</h2>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            {filter === 'notebooks'
              ? `${Object.keys(notebooks).length} notebook${Object.keys(notebooks).length !== 1 ? 's' : ''}`
              : `${notes.length} note${notes.length !== 1 ? 's' : ''}`}
          </p>
        </section>

        {/* Search Bar */}
        {filter !== 'notebooks' && (
          <section className="page-fade-in">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm">
                search
              </span>
              <input
                className="w-full pl-12 pr-10 py-2.5 rounded-xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-sm placeholder-on-surface-variant/50"
                placeholder={`Search ${config.title.toLowerCase()}...`}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="dashboard-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </section>
        )}

        {/* New Note Action Card (only on All Notes) */}
        {filter === 'all' && !searchQuery && (
          <section className="page-fade-in">
            <button
              onClick={handleCreateNote}
              className="w-full h-28 surface-level-2 rounded-xl flex flex-col items-center justify-center hover:bg-surface-variant/30 transition-all group relative overflow-hidden border-dashed hover:border-solid hover:border-primary/50 cursor-pointer bg-transparent"
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
        )}

        {/* Search Results Info */}
        {searchQuery && (
          <section className="page-fade-in">
            <p className="text-body-sm text-on-surface-variant">
              {notes.length} result{notes.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
            </p>
          </section>
        )}

        {/* ──── Content by Filter ──── */}

        {/* Notebooks View */}
        {filter === 'notebooks' && !searchQuery && (
          <section className="page-fade-in space-y-8">
            {Object.keys(notebooks).length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl mb-4 block">
                  {config.emptyIcon}
                </span>
                <p className="text-body-md text-on-surface-variant/60">{config.emptyText}</p>
              </div>
            ) : (
              Object.entries(notebooks).map(([name, nbNotes]) => (
                <div key={name}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                    <h3 className="text-headline-sm text-on-surface">{name}</h3>
                    <span className="text-label-md text-on-surface-variant/60 ml-2">
                      {nbNotes.length} note{nbNotes.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {renderNoteGrid(nbNotes)}
                </div>
              ))
            )}
          </section>
        )}

        {/* Regular Notes Grid (All / Favorites / Archive) */}
        {filter !== 'notebooks' && (
          <section className="page-fade-in">
            {notes.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl mb-4 block">
                  {searchQuery ? 'search_off' : config.emptyIcon}
                </span>
                <p className="text-body-md text-on-surface-variant/60">
                  {searchQuery
                    ? 'No notes found matching your search.'
                    : config.emptyText}
                </p>
              </div>
            ) : (
              renderNoteGrid(notes, filter !== 'archive')
            )}
          </section>
        )}
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
