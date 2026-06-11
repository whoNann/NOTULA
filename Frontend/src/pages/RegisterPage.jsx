import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showMismatch, setShowMismatch] = useState(false)

  const passwordsMatch = password === confirmPassword
  const passwordLongEnough = password.length >= 6

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value)
    // Show mismatch only after user has typed something in confirm field
    if (e.target.value.length > 0) {
      setShowMismatch(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!passwordsMatch) {
      setShowMismatch(true)
      return
    }
    const formData = new FormData(e.target)
    const name = formData.get('fullName') || 'Alex'
    const email = formData.get('email') || 'alex@notula.app'
    localStorage.setItem('notula_user', JSON.stringify({ name, email }))
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
          <h2 className="text-headline-lg font-semibold text-on-surface mb-2 mt-0">Create an account</h2>
          <p className="text-body-md text-on-surface-variant m-0">Start capturing thoughts without friction.</p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-2">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  person
                </span>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg pl-10 pr-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-outline/40" 
                  id="fullName" 
                  name="fullName"
                  placeholder="Jane Doe" 
                  required 
                  type="text"
                />
              </div>
            </div>

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
                  name="email"
                  placeholder="name@company.com" 
                  required 
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input 
                  className={`w-full bg-surface-container-lowest border rounded-lg pl-10 pr-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-outline/40 ${
                    password.length > 0 && !passwordLongEnough
                      ? 'border-error focus:border-error focus:ring-error/30'
                      : 'border-outline-variant/50 focus:border-primary focus:ring-primary/30'
                  }`}
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
              {password.length > 0 && !passwordLongEnough && (
                <p className="text-label-md text-error flex items-center gap-1 m-0">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock_reset
                </span>
                <input 
                  className={`w-full bg-surface-container-lowest border rounded-lg pl-10 pr-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-1 transition-all placeholder:text-outline/40 ${
                    showMismatch && !passwordsMatch
                      ? 'border-error focus:border-error focus:ring-error/30'
                      : 'border-outline-variant/50 focus:border-primary focus:ring-primary/30'
                  }`}
                  id="confirmPassword" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmChange}
                />
              </div>
              {showMismatch && !passwordsMatch && (
                <p className="text-label-md text-error flex items-center gap-1 m-0">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  Passwords do not match
                </p>
              )}
              {showMismatch && passwordsMatch && confirmPassword.length > 0 && (
                <p className="text-label-md text-[#4caf50] flex items-center gap-1 m-0">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Passwords match
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4">
              <button 
                className={`w-full font-semibold text-label-md py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer border-none transition-all ${
                  !passwordsMatch || !passwordLongEnough
                    ? 'bg-outline-variant text-on-surface-variant/50 cursor-not-allowed'
                    : 'bg-primary text-on-primary hover:opacity-90'
                }`}
                type="submit"
                disabled={!passwordsMatch || !passwordLongEnough}
              >
                <span>Register</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pb-4">
            <p className="text-body-sm text-on-surface-variant m-0">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline transition-all text-label-md font-semibold ml-1 no-underline hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
