import { Link } from 'react-router-dom'

const features = [
  {
    icon: 'auto_awesome',
    title: 'AI-Powered Insights',
    desc: 'Summarize long notes, fix grammar, and extract key points with one click using built-in AI tools.',
  },
  {
    icon: 'dark_mode',
    title: 'Dark-Mode First',
    desc: 'Engineered for deep focus with a carefully crafted dark palette that reduces eye strain during long sessions.',
  },
  {
    icon: 'edit_note',
    title: 'Markdown Editor',
    desc: 'Write in Markdown with a distraction-free editor. Formatting toolbar, live preview, and auto-save built in.',
  },
  {
    icon: 'devices',
    title: 'Responsive Design',
    desc: 'Seamlessly switch between desktop and mobile. Your notes are always accessible, wherever you are.',
  },
  {
    icon: 'bolt',
    title: 'Instant & Offline',
    desc: 'Lightning-fast local storage. No server delays — your notes are saved instantly and work offline.',
  },
  {
    icon: 'palette',
    title: 'Premium Aesthetic',
    desc: 'Glassmorphism accents, smooth animations, and a design system built for knowledge workers.',
  },
]

export default function LandingPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-hidden">
      {/* ──── Navigation Bar ──── */}
      <header className="w-full px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-outline-variant/20">
        <div className="flex items-center space-x-3">
          <span
            className="material-symbols-outlined text-primary text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="text-headline-sm font-black text-on-surface tracking-tight">Notula</span>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all no-underline hidden sm:block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 transition-opacity no-underline"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ──── Hero Section ──── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 relative">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[50%] rounded-full bg-primary/8 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[0%] right-[10%] w-[35%] h-[40%] rounded-full bg-tertiary/6 blur-[120px] pointer-events-none"></div>

        <div className="landing-fade-in relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span
              className="material-symbols-outlined text-primary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-label-md text-primary">Powered by AI</span>
          </div>

          <h1 className="text-headline-xl md:text-[56px] md:leading-[64px] font-black text-on-surface mb-6 tracking-tight">
            Your thoughts,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-primary-container">
              amplified
            </span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
            Notula is an AI-powered note-taking app built for focus. Capture ideas, summarize content, and
            organize knowledge — all in a beautiful, customizable interface with dark &amp; light modes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 transition-all no-underline flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <span>Start Writing Free</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-outline-variant text-on-surface text-label-md font-semibold hover:bg-surface-variant/50 transition-all no-underline flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        {/* App Preview Mockup */}
        <div className="landing-fade-in-delay relative z-10 mt-16 md:mt-24 w-full max-w-4xl mx-auto">
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden shadow-2xl bg-surface-container-low">
            {/* Fake title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-highest/50 border-b border-outline-variant/20">
              <div className="w-3 h-3 rounded-full bg-error/50"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffd54f]/50"></div>
              <div className="w-3 h-3 rounded-full bg-[#4caf50]/50"></div>
              <span className="text-label-md text-on-surface-variant/40 ml-3">Notula — Dashboard</span>
            </div>
            {/* Content preview */}
            <div className="p-6 md:p-8 flex gap-6">
              {/* Fake sidebar */}
              <div className="hidden md:flex flex-col gap-3 w-48 pr-6 border-r border-outline-variant/20">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-container/50">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                  <span className="text-label-md text-on-surface">All Notes</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">star</span>
                  <span className="text-label-md text-on-surface-variant">Favorites</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">folder</span>
                  <span className="text-label-md text-on-surface-variant">Notebooks</span>
                </div>
              </div>
              {/* Fake note cards */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { t: 'Product Roadmap Q3', s: 'Focus on AI integrations and onboarding...', tag: true },
                  { t: 'Design Sync Notes', s: 'Dark mode color palette decisions...', tag: false },
                  { t: 'Blog Post Ideas', s: 'Why minimalist UI is harder to design...', tag: false },
                ].map((card, i) => (
                  <div key={i} className={`p-4 rounded-lg border border-outline-variant/20 bg-surface-container/50 ${i === 0 ? 'border-primary/30 shadow-sm shadow-primary/10' : ''}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`material-symbols-outlined text-sm ${i === 0 ? 'text-primary' : 'text-on-surface-variant'}`}>description</span>
                      <span className="text-body-sm font-semibold text-on-surface truncate">{card.t}</span>
                    </div>
                    <p className="text-label-md text-on-surface-variant line-clamp-2">{card.s}</p>
                    {card.tag && (
                      <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '10px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        <span className="text-primary uppercase tracking-wider" style={{ fontSize: '9px', fontWeight: 600 }}>AI Summarized</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Features Section ──── */}
      <section className="px-6 md:px-12 py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-lowest/30 to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg md:text-headline-xl text-on-surface mb-4">
              Everything you need to <span className="text-primary">think clearly</span>
            </h2>
            <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
              A suite of tools designed for deep work — minimal distractions, maximum output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl border border-outline-variant/20 bg-surface-container-low/50 hover:bg-surface-container/80 hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-headline-sm text-on-surface mb-2">{f.title}</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA Section ──── */}
      <section className="px-6 md:px-12 py-20 relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="p-10 md:p-14 rounded-2xl border border-outline-variant/20 bg-surface-container-low relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tertiary to-primary-container"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-headline-lg text-on-surface mb-4">Ready to capture your best ideas?</h2>
              <p className="text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
                Join thousands of thinkers who use Notula to organize their thoughts with the power of AI.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 transition-all no-underline shadow-lg shadow-primary/20"
              >
                <span>Create Free Account</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Footer ──── */}
      <footer className="px-6 md:px-12 py-8 border-t border-outline-variant/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span
              className="material-symbols-outlined text-primary text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-label-md font-bold text-on-surface">Notula</span>
            <span className="text-label-md text-on-surface-variant">— Tubes Kapita Selekta Kelompok 2</span>
          </div>
          <p className="text-label-md text-on-surface-variant/60">
            © 2026 Notula. Built with React + Vite.
          </p>
        </div>
      </footer>
    </div>
  )
}
