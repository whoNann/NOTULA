import { useState, useEffect, useCallback } from 'react'

// Module-level subscriber pattern for cross-component toast
let toastListener = null

export function showToast(message, type = 'success') {
  if (toastListener) {
    toastListener({ id: Date.now(), message, type })
  }
}

export function useToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    toastListener = (toast) => {
      setToasts((prev) => [...prev, toast])
    }
    return () => {
      toastListener = null
    }
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (toasts.length === 0) return
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
    return () => clearTimeout(timer)
  }, [toasts])

  return { toasts, dismissToast }
}
