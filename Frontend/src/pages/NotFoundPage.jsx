import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[30%] w-[40%] h-[50%] rounded-full bg-primary/5 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[40%] rounded-full bg-error/5 blur-[120px] pointer-events-none"></div>

      <div className="text-center relative z-10 page-fade-in max-w-md">
        {/* 404 Number */}
        <div className="mb-6">
          <span className="text-[120px] md:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-on-surface/20 to-on-surface/5">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-on-surface-variant text-4xl">
            search_off
          </span>
        </div>

        <h1 className="text-headline-lg text-on-surface mb-3">Page Not Found</h1>
        <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 transition-all no-underline flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Go to Dashboard</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-outline-variant text-on-surface text-label-md font-semibold hover:bg-surface-variant/50 transition-all no-underline flex items-center justify-center gap-2"
          >
            <span>Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
