import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotes } from '../utils/notesStore.js'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ noteCount: 0, wordCount: 0, charCount: 0 })
  const [userName] = useState('Alex')
  const [userEmail] = useState('alex@notula.app')

  useEffect(() => {
    const notes = getNotes()
    const totalWords = notes.reduce((acc, n) => {
      const words = n.content.trim() ? n.content.trim().split(/\s+/).length : 0
      return acc + words
    }, 0)
    const totalChars = notes.reduce((acc, n) => acc + n.content.length, 0)
    setStats({ noteCount: notes.length, wordCount: totalWords, charCount: totalChars })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('notula_user')
    navigate('/login')
  }

  const statCards = [
    { icon: 'description', label: 'Total Notes', value: stats.noteCount, color: 'text-primary' },
    { icon: 'text_fields', label: 'Total Words', value: stats.wordCount.toLocaleString(), color: 'text-tertiary' },
    { icon: 'keyboard', label: 'Characters', value: stats.charCount.toLocaleString(), color: 'text-secondary' },
  ]

  return (
    <div className="flex-1 p-4 md:p-8 flex justify-center page-fade-in">
      <div className="w-full max-w-[700px] space-y-8">
        {/* Profile Header */}
        <section className="text-center py-8">
          <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20">
            <span className="material-symbols-outlined text-on-primary-container text-4xl">person</span>
          </div>
          <h2 className="text-headline-lg text-on-surface mb-1">{userName}</h2>
          <p className="text-body-md text-on-surface-variant">{userEmail}</p>
        </section>

        {/* Stats Cards */}
        <section>
          <h3 className="text-headline-sm text-on-surface mb-4">Your Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statCards.map((stat, i) => (
              <div
                key={i}
                className="surface-level-2 rounded-xl p-5 flex flex-col items-center text-center hover:bg-surface-variant/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mb-3">
                  <span className={`material-symbols-outlined ${stat.color} text-xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {stat.icon}
                  </span>
                </div>
                <span className="text-headline-md text-on-surface font-bold">{stat.value}</span>
                <span className="text-label-md text-on-surface-variant mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section>
          <h3 className="text-headline-sm text-on-surface mb-4">Settings</h3>
          <div className="surface-level-2 rounded-xl overflow-hidden">
            {/* Theme */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">dark_mode</span>
                <div>
                  <p className="text-body-md text-on-surface">Dark Mode</p>
                  <p className="text-label-md text-on-surface-variant">Always on — built for focus</p>
                </div>
              </div>
              <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1">
                <div className="w-5 h-5 rounded-full bg-on-primary ml-auto shadow-sm"></div>
              </div>
            </div>

            {/* Auto-save */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">save</span>
                <div>
                  <p className="text-body-md text-on-surface">Auto-Save</p>
                  <p className="text-label-md text-on-surface-variant">Notes save automatically as you type</p>
                </div>
              </div>
              <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1">
                <div className="w-5 h-5 rounded-full bg-on-primary ml-auto shadow-sm"></div>
              </div>
            </div>

            {/* AI Features */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">auto_awesome</span>
                <div>
                  <p className="text-body-md text-on-surface">AI Features</p>
                  <p className="text-label-md text-on-surface-variant">Summarize, grammar check & more</p>
                </div>
              </div>
              <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1">
                <div className="w-5 h-5 rounded-full bg-on-primary ml-auto shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pb-8">
          <h3 className="text-headline-sm text-on-surface mb-4">Account</h3>
          <div className="surface-level-2 rounded-xl p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-error/30 text-error hover:bg-error/10 transition-all text-label-md font-semibold cursor-pointer bg-transparent"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
