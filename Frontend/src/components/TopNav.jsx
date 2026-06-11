import { Link, useNavigate, useLocation } from 'react-router-dom'
import { createNote } from '../utils/notesStore.js'
import { useState } from 'react'

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [localSearch, setLocalSearch] = useState('')

  const handleNewNote = () => {
    const note = createNote()
    navigate(`/note/${note.id}`)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (localSearch.trim()) {
      navigate(`/dashboard?q=${encodeURIComponent(localSearch.trim())}`)
    } else {
      navigate('/dashboard')
    }
  }

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value)
  }

  const clearSearch = () => {
    setLocalSearch('')
    if (location.pathname === '/dashboard') {
      navigate('/dashboard')
    }
  }

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-30 surface-level-1 border-b border-outline-variant">
      <div className="flex items-center flex-1">
        {/* Mobile Logo */}
        <Link to="/dashboard" className="md:hidden no-underline">
          <h2 className="text-headline-md font-bold text-primary mr-4">Notula</h2>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm">
            search
          </span>
          <input
            className="w-full pl-12 pr-10 py-2.5 rounded-xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-body-sm placeholder-on-surface-variant/50"
            placeholder="Search notes... (press Enter)"
            type="text"
            id="search-notes"
            value={localSearch}
            onChange={handleSearchChange}
          />
          {localSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </form>
      </div>

      <div className="flex items-center space-x-4">
        {/* Mobile Search */}
        <button className="p-2 text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-full md:hidden">
          <span className="material-symbols-outlined">search</span>
        </button>

        {/* Notifications */}
        <button className="p-2 text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {/* Settings - Desktop */}
        <Link
          to="/profile"
          className="p-2 text-on-surface-variant hover:bg-surface-variant/50 transition-colors rounded-full hidden md:block no-underline"
        >
          <span className="material-symbols-outlined">settings</span>
        </Link>

        {/* New Note Button */}
        <button
          onClick={handleNewNote}
          className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-xl text-label-md transition-colors hidden md:flex items-center space-x-2 shadow-sm cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            add
          </span>
          <span>New Note</span>
        </button>

        {/* Avatar */}
        <Link to="/profile">
          <div className="w-9 h-9 rounded-full border border-outline-variant cursor-pointer bg-primary-container flex items-center justify-center ml-2">
            <span className="material-symbols-outlined text-on-primary-container text-lg">person</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
