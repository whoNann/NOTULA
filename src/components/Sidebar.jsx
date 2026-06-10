import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { icon: 'description', label: 'All Notes', path: '/dashboard' },
  { icon: 'star', label: 'Favorites', path: '/dashboard?filter=favorites' },
  { icon: 'folder', label: 'Notebooks', path: '/dashboard?filter=notebooks' },
  { icon: 'archive', label: 'Archive', path: '/dashboard?filter=archive' },
]

const bottomItems = [
  { icon: 'help', label: 'Help', path: '#' },
  { icon: 'logout', label: 'Logout', path: '/login' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard' && !location.search) return true
    if (path.includes('?') && location.pathname + location.search === path) return true
    return false
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
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all no-underline ${
              isActive(item.path)
                ? 'bg-secondary-container text-on-secondary-container font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="text-label-md">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant/30">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.path === '/login') {
                localStorage.removeItem('notula_user')
                navigate('/login')
              }
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all rounded-xl cursor-pointer bg-transparent border-none text-left"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-label-md">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
