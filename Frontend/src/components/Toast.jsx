import { useToast } from '../utils/useToast.js'

const iconMap = {
  success: 'check_circle',
  info: 'info',
  error: 'error',
}

const colorMap = {
  success: 'text-[#4caf50]',
  info: 'text-primary',
  error: 'text-error',
}

export default function Toast() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-slide-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest border border-outline-variant/30 shadow-2xl backdrop-blur-sm min-w-[260px] max-w-[380px]"
        >
          <span
            className={`material-symbols-outlined ${colorMap[toast.type] || colorMap.info} text-xl flex-shrink-0`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {iconMap[toast.type] || iconMap.info}
          </span>
          <span className="text-body-sm text-on-surface flex-1">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none p-0.5 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
