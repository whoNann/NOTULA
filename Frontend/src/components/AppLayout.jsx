import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopNav from './TopNav.jsx'
import BottomNav from './BottomNav.jsx'
import Toast from './Toast.jsx'

export default function AppLayout() {
  return (
    <div className="text-on-background min-h-screen flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 relative min-h-screen bg-background">
        <TopNav />
        <main className="flex-1 flex flex-col pb-20 md:pb-0 page-fade-in">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  )
}
