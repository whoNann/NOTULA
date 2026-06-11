import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createNote } from '../utils/notesStore.js'
import { useState } from 'react'

const mainItems = [
  { icon: 'home', label: 'Home', path: '/dashboard' },
  { icon: 'search', label: 'Search', path: '/dashboard?focus=search' },
  { icon: 'add_circle', label: 'New', action: 'create' },
  { icon: 'menu', label: 'Menu', action: 'menu' },
  { icon: 'person', label: 'Profile', path: '/profile' },
]

const menuItems = [
  { icon: 'description', label: 'All Notes', path: '/dashboard' },
  { icon: 'star', label: 'Favorites', path: '/dashboard?filter=favorites' },
  { icon: 'folder', label: 'Notebooks', path: '/dashboard?filter=notebooks' },
  { icon: 'archive', label: 'Archive', path: '/dashboard?filter=archive' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const isActive = (path) => {
    if (!path) return false
    if (path === '/dashboard' && location.pathname === '/dashboard' && !location.search) return true
    if (path === '/profile' && location.pathname === '/profile') return true
    return false
  }

  const isMenuItemActive = (item) => {
    if (item.path === '/dashboard' && location.pathname === '/dashboard' && !location.search.includes('filter=')) return true
    const filterMatch = item.path.match(/filter=(\w+)/)
    if (filterMatch) {
      const searchParams = new URLSearchParams(location.search)
      return searchParams.get('filter') === filterMatch[1]
    }
    return false
  }

  const handleItemClick = (item) => {
    if (item.action === 'menu') {
      setShowMenu(true)
    } else if (item.action === 'create') {
      const note = createNote()
      navigate(`/note/${note.id}`)
    }
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-4 pt-2 bg-surface-container-highest/90 backdrop-blur-md border-t border-outline-variant/30 shadow-lg">
        {mainItems.map((item) =>
          item.action ? (
            <button
              key={item.label}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center justify-center px-3 py-1.5 transition-colors no-underline bg-transparent border-none cursor-pointer ${
                item.action === 'create'
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={item.action === 'create' ? { fontVariationSettings: "'FILL' 1", fontSize: '28px' } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-md mt-0.5">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className={
                isActive(item.path)
                  ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5 scale-90 duration-150 no-underline'
                  : 'flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors no-underline px-3 py-1.5'
              }
            >
              <span
                className="material-symbols-outlined"
                style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-md mt-0.5">{item.label}</span>
            </Link>
          )
        )}
      </nav>

      {/* Bottom Sheet Menu Overlay */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 z-[60] bottom-sheet-overlay"
          onClick={() => setShowMenu(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>

          {/* Sheet Panel */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface-container-high border-t border-outline-variant/30 rounded-t-2xl bottom-sheet-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-outline-variant/50"></div>
            </div>

            {/* Menu Header */}
            <div className="px-6 pb-3 pt-1">
              <h3 className="text-headline-sm text-on-surface">Navigation</h3>
            </div>

            {/* Menu Items */}
            <div className="px-4 pb-6 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all no-underline ${
                    isMenuItemActive(item)
                      ? 'bg-secondary-container text-on-secondary-container font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={isMenuItemActive(item) ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-body-md">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Safe area padding for bottom */}
            <div className="h-4"></div>
          </div>
        </div>
      )}
    </>
  )
}
