const SETTINGS_KEY = 'notula_settings'

const defaultSettings = {
  darkMode: true,
  autoSave: true,
  aiFeatures: true,
}

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))
      return { ...defaultSettings }
    }
    return { ...defaultSettings, ...JSON.parse(raw) }
  } catch {
    return { ...defaultSettings }
  }
}

export function updateSetting(key, value) {
  const settings = getSettings()
  settings[key] = value
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  return settings
}

export function applyTheme(isDark) {
  const html = document.documentElement
  if (isDark) {
    html.classList.remove('light')
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
  }
}

// Apply theme on load
export function initTheme() {
  const settings = getSettings()
  applyTheme(settings.darkMode)
}
