import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('notula_user', JSON.stringify({ name: 'Alex', email: 'alex@notula.app' }))
    navigate('/dashboard')
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Atmospheric background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-[440px] bg-surface-container-low border border-outline-variant/30 rounded-lg shadow-2xl relative z-10 page-fade-in">
        {/* Header Section */}
        <div className="p-8 pb-6 text-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6 no-underline group">
            <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <h1 className="text-headline-md font-bold text-primary tracking-tight m-0">Notula</h1>
          </Link>
          <h2 className="text-headline-lg font-semibold text-on-surface mb-2 mt-0">Welcome back</h2>
          <p className="text-body-md text-on-surface-variant m-0">Enter your credentials to access your notes.</p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-2">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="flex flex-col space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  mail
                </span>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg pl-10 pr-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-outline/40" 
                  id="email" 
                  placeholder="name@company.com" 
                  required 
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                <Link to="#" className="text-primary hover:underline text-label-md font-semibold no-underline hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg pl-10 pr-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-outline/40" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4">
              <button 
                className="w-full bg-primary text-on-primary font-semibold text-label-md py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer border-none" 
                type="submit"
              >
                <span>Login</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pb-4">
            <p className="text-body-sm text-on-surface-variant m-0">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline transition-all text-label-md font-semibold ml-1 no-underline hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
