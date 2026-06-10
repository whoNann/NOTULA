import { Link, useLocation } from 'react-router-dom'

const items = [
  { icon: 'home', label: 'Home', path: '/dashboard' },
  { icon: 'search', label: 'Search', path: '/dashboard?focus=search' },
  { icon: 'auto_awesome', label: 'AI Chat', path: '/dashboard' },
  { icon: 'person', label: 'Profile', path: '/profile' },
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true
    if (path === '/profile' && location.pathname === '/profile') return true
    return false
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-highest/90 backdrop-blur-md border-t border-outline-variant/30 shadow-lg">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={
            isActive(item.path)
              ? 'flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1.5 scale-90 duration-150 no-underline'
              : 'flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors no-underline'
          }
        >
          <span
            className="material-symbols-outlined"
            style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {item.icon}
          </span>
          <span className="text-label-md mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
