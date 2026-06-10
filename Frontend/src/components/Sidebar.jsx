import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getNotes, getFavorites, getArchived, getNotebooks } from '../utils/notesStore.js'
import { useState, useEffect } from 'react'

const navItems = [
  { icon: 'description', label: 'All Notes', path: '/dashboard', filterKey: null },
  { icon: 'star', label: 'Favorites', path: '/dashboard?filter=favorites', filterKey: 'favorites' },
  { icon: 'folder', label: 'Notebooks', path: '/dashboard?filter=notebooks', filterKey: 'notebooks' },
  { icon: 'archive', label: 'Archive', path: '/dashboard?filter=archive', filterKey: 'archive' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [counts, setCounts] = useState({ all: 0, favorites: 0, notebooks: 0, archive: 0 })

  useEffect(() => {
    const updateCounts = () => {
      setCounts({
        all: getNotes().length,
        favorites: getFavorites().length,
        notebooks: Object.keys(getNotebooks()).length,
        archive: getArchived().length,
      })
    }
    updateCounts()
    // Refresh counts when navigating
    const interval = setInterval(updateCounts, 1000)
    return () => clearInterval(interval)
  }, [location])

  const currentFilter = searchParams.get('filter')

  const isActive = (item) => {
    if (location.pathname !== '/dashboard') return false
    if (item.filterKey === null && !currentFilter) return true
    if (item.filterKey === currentFilter) return true
    return false
  }

  const getCount = (item) => {
    switch (item.filterKey) {
      case null: return counts.all
      case 'favorites': return counts.favorites
      case 'notebooks': return counts.notebooks
      case 'archive': return counts.archive
      default: return 0
    }
  }

  return (
    <nav className="hidden md:flex flex-col h-screen py-6 px-4 space-y-2 surface-level-1 border-r border-outline-variant w-64 fixed left-0 top-0 z-40">
      {/* Logo */}
      <Link to="/dashboard" className="mb-8 px-4 flex items-center space-x-3 no-underline group">
        <span
          className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <div>
          <h1 className="text-headline-sm font-black text-on-surface">Notula</h1>
          <p className="text-label-md text-on-surface-variant">AI Note-taking</p>
        </div>
      </Link>

      {/* Nav Items */}
      <div className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all no-underline ${
              isActive(item)
                ? 'bg-secondary-container text-on-secondary-container font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span
                className="material-symbols-outlined"
                style={isActive(item) ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-md">{item.label}</span>
            </div>
            <span className={`text-label-md ${isActive(item) ? 'text-on-secondary-container/70' : 'text-on-surface-variant/40'}`}>
              {getCount(item)}
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant/30">
        <Link
          to="/profile"
          className={`w-full flex items-center space-x-3 px-4 py-3 transition-all rounded-xl no-underline ${
            location.pathname === '/profile'
              ? 'bg-secondary-container text-on-secondary-container font-bold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-label-md">Settings</span>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('notula_user')
            navigate('/login')
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all rounded-xl cursor-pointer bg-transparent border-none text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-md">Logout</span>
        </button>
      </div>
    </nav>
  )
}
