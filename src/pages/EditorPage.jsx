import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AIModal from '../components/AIModal.jsx'
import { getNote, saveNote, createNote } from '../utils/notesStore.js'
import { getSettings } from '../utils/settingsStore.js'

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const textareaRef = useRef(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notebook, setNotebook] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveTimeout, setSaveTimeout] = useState(null)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [showNotebookInput, setShowNotebookInput] = useState(false)
  const [settings, setSettings] = useState(getSettings())

  // AI Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)
  const [aiModalTitle, setAiModalTitle] = useState('')
  const [aiModalContent, setAiModalContent] = useState(null)

  // Load note
  useEffect(() => {
    if (id === 'new') {
      const note = createNote()
      navigate(`/note/${note.id}`, { replace: true })
      return
    }

    const note = getNote(id)
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setNotebook(note.notebook || '')
      setIsFavorite(note.isFavorite || false)
    } else {
      navigate('/dashboard', { replace: true })
    }
  }, [id, navigate])

  // Refresh settings on focus
  useEffect(() => {
    const handleFocus = () => setSettings(getSettings())
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Word/char count
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0
    setWordCount(words)
    setCharCount(content.length)
  }, [content])

  // Save function
  const doSave = useCallback(
    (newTitle, newContent, extraUpdates = {}) => {
      saveNote(id, { title: newTitle, content: newContent, ...extraUpdates })
      setIsSaving(false)
    },
    [id]
  )

  // Auto-save with debounce
  const autoSave = useCallback(
    (newTitle, newContent, extraUpdates = {}) => {
      if (!settings.autoSave) return // Auto-save disabled
      if (saveTimeout) clearTimeout(saveTimeout)
      setIsSaving(true)
      const timeout = setTimeout(() => {
        doSave(newTitle, newContent, extraUpdates)
      }, 800)
      setSaveTimeout(timeout)
    },
    [settings.autoSave, saveTimeout, doSave]
  )

  // Manual save
  const handleManualSave = () => {
    setIsSaving(true)
    doSave(title, content, { notebook, isFavorite })
  }

  const handleTitleChange = (e) => {
    const val = e.target.value
    setTitle(val)
    autoSave(val, content)
  }

  const handleContentChange = (e) => {
    const val = e.target.value
    setContent(val)
    autoSave(title, val)
  }

  const handleNotebookChange = (val) => {
    setNotebook(val)
    saveNote(id, { notebook: val })
  }

  const handleToggleFavorite = () => {
    const newVal = !isFavorite
    setIsFavorite(newVal)
    saveNote(id, { isFavorite: newVal })
  }

  // Toolbar formatting functions
  const insertFormat = (before, after = '') => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)
    const newContent =
      content.substring(0, start) + before + selected + after + content.substring(end)
    setContent(newContent)
    autoSave(title, newContent)
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selected.length
    }, 0)
  }

  // Bold: *...* (user requested)
  const handleBold = () => insertFormat('*', '*')
  // Italic: _..._ (user requested)
  const handleItalic = () => insertFormat('_', '_')
  const handleStrikethrough = () => insertFormat('~~', '~~')
  const handleH1 = () => insertFormat('# ')
  const handleH2 = () => insertFormat('## ')
  const handleBullet = () => insertFormat('- ')
  const handleCode = () => insertFormat('```\n', '\n```')

  const handleSummarize = () => {
    setAiModalTitle('AI Results — Summarize')
    setAiModalContent(
      <>
        <p className="text-on-surface mb-2">
          Here is a concise summary of your note:
        </p>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start">
            <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
            <span>
              <strong className="text-on-surface">Core Paradigm Shift:</strong> Moving from binary
              state logic to superposition requires a fundamental rewrite of the error-correction
              algorithms, specifically targeting decoherence rates.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
            <span>
              <strong className="text-on-surface">Resource Allocation:</strong> The QPU demands
              significantly higher cooling resources (approx 40% increase) compared to initial
              estimates.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
            <span>
              <strong className="text-on-surface">Integration Timeline:</strong> The phase 2 API
              endpoints must be delayed by three weeks to accommodate the new security protocols.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
            <span>
              <strong className="text-on-surface">Action Item:</strong> Schedule a review with the
              hardware team to finalize specifications before Q3 procurement.
            </span>
          </li>
        </ul>
      </>
    )
    setIsAiModalOpen(true)
  }

  const handleFixGrammar = () => {
    setAiModalTitle('AI Results — Fix Grammar')
    setAiModalContent(
      <p className="text-on-surface mb-2">
        Grammar checks completed successfully. No major issues found in the selected text.
      </p>
    )
    setIsAiModalOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative page-fade-in">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-12 border-b border-outline-variant/30 bg-surface-container-low flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Save status */}
          <span className="text-label-md text-on-surface-variant flex items-center gap-1.5 opacity-80">
            {isSaving ? (
              <>
                <span className="w-2 h-2 rounded-full bg-primary-container inline-block animate-pulse"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-outline inline-block"></span>
                {settings.autoSave ? 'Saved' : 'Manual Save'}
              </>
            )}
          </span>

          {/* Manual save button (when auto-save is off) */}
          {!settings.autoSave && (
            <button
              onClick={handleManualSave}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 text-xs font-semibold cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">save</span>
              Save
            </button>
          )}

          <span className="text-label-md text-on-surface-variant/40 hidden sm:inline">
            {wordCount} words · {charCount} chars
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Favorite toggle */}
          <button
            onClick={handleToggleFavorite}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span
              className={`material-symbols-outlined text-lg ${isFavorite ? 'text-primary' : ''}`}
              style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              star
            </span>
          </button>

          {/* Notebook selector */}
          <div className="relative">
            <button
              onClick={() => setShowNotebookInput(!showNotebookInput)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors cursor-pointer bg-transparent border-none text-xs font-semibold"
              title="Set notebook"
            >
              <span className="material-symbols-outlined text-[16px]">folder</span>
              <span className="hidden sm:inline">{notebook || 'No folder'}</span>
            </button>
            {showNotebookInput && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-surface-container-high border border-outline-variant/30 rounded-lg shadow-xl p-3 w-56">
                <label className="text-label-md text-on-surface-variant mb-2 block">Notebook Name</label>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-outline/40"
                  placeholder="e.g. Work, Personal..."
                  type="text"
                  value={notebook}
                  onChange={(e) => handleNotebookChange(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  {['Work', 'Personal', 'Study'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        handleNotebookChange(preset)
                        setShowNotebookInput(false)
                      }}
                      className="px-2 py-1 rounded-md bg-surface-variant/50 text-on-surface-variant text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border-none"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNotebookInput(false)}
                  className="w-full mt-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors cursor-pointer border-none"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* AI Actions (only if AI features enabled) */}
          {settings.aiFeatures && (
            <>
              <button
                onClick={handleSummarize}
                className="flex items-center gap-1.5 bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20 border border-accent-purple/30 px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span className="hidden sm:inline">Summarize</span>
              </button>
              <button
                onClick={handleFixGrammar}
                className="flex items-center gap-1.5 bg-surface-variant text-on-surface hover:bg-surface-variant/80 border border-outline-variant/50 px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">spellcheck</span>
                <span className="hidden sm:inline">Fix Grammar</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Title Input */}
        <div className="px-4 md:px-8 pt-6 pb-2 max-w-[900px] mx-auto w-full flex-shrink-0">
          <input
            className="w-full bg-transparent border-none outline-none text-headline-xl text-on-background placeholder-on-surface-variant/30 focus:ring-0 px-0 transition-colors"
            placeholder="Untitled Note"
            type="text"
            value={title}
            onChange={handleTitleChange}
            id="editor-title"
          />
        </div>

        {/* Toolbar */}
        <div className="px-4 md:px-8 max-w-[900px] mx-auto w-full flex-shrink-0">
          <div className="h-10 flex items-center gap-1 text-on-surface-variant border-b border-outline-variant/20 pb-3 mb-4 overflow-x-auto">
            <button onClick={handleBold} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors cursor-pointer bg-transparent border-none" title="Bold (*text*)">
              <span className="material-symbols-outlined text-sm font-bold">format_bold</span>
            </button>
            <button onClick={handleItalic} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors cursor-pointer bg-transparent border-none" title="Italic (_text_)">
              <span className="material-symbols-outlined text-sm italic">format_italic</span>
            </button>
            <button onClick={handleStrikethrough} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors cursor-pointer bg-transparent border-none" title="Strikethrough">
              <span className="material-symbols-outlined text-sm">strikethrough_s</span>
            </button>
            <div className="w-px h-4 bg-outline-variant/50 mx-1"></div>
            <button onClick={handleH1} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors text-label-md font-bold cursor-pointer bg-transparent border-none" title="Heading 1">
              H1
            </button>
            <button onClick={handleH2} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors text-label-md font-bold cursor-pointer bg-transparent border-none" title="Heading 2">
              H2
            </button>
            <div className="w-px h-4 bg-outline-variant/50 mx-1"></div>
            <button onClick={handleBullet} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors cursor-pointer bg-transparent border-none" title="Bullet List">
              <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
            </button>
            <button onClick={handleCode} className="p-1.5 rounded-lg hover:bg-surface-variant hover:text-on-background transition-colors cursor-pointer bg-transparent border-none" title="Code Block">
              <span className="material-symbols-outlined text-sm">code</span>
            </button>
          </div>
        </div>

        {/* Editor Textarea */}
        <div className="flex-1 px-4 md:px-8 pb-8 max-w-[900px] mx-auto w-full">
          <textarea
            ref={textareaRef}
            className="w-full h-full min-h-[500px] bg-transparent border-none outline-none text-editor text-on-surface resize-none focus:ring-0 editor-textarea leading-relaxed"
            spellCheck="false"
            placeholder="Start writing your note..."
            value={content}
            onChange={handleContentChange}
            id="editor-content"
          ></textarea>
        </div>
      </div>

      {/* AI Modal Overlay */}
      <AIModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApply={() => setIsAiModalOpen(false)}
        title={aiModalTitle}
      >
        {aiModalContent}
      </AIModal>
    </div>
  )
}
