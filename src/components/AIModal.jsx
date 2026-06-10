export default function AIModal({ isOpen, onClose, onApply, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4 md:p-gutter">
      {/* AI Modal Container (Level 2 Elevated Surface) */}
      <div className="bg-surface-container-high border border-outline-variant/30 ai-glow rounded-lg w-full max-w-2xl z-50 flex flex-col overflow-hidden shadow-2xl relative">
        {/* Subtle gradient accent at top */}
        <div className="h-1 w-full bg-gradient-to-r from-primary to-tertiary-container absolute top-0 left-0"></div>
        
        {/* Modal Header */}
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <h2 className="text-headline-sm text-on-surface m-0">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 font-editor text-editor text-on-surface-variant space-y-4 max-h-[614px] overflow-y-auto">
          {children}
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-outline-variant/20 bg-surface-container flex justify-end space-x-3">
          {/* Ghost Button / Secondary */}
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant text-label-md transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            <span>Cancel</span>
          </button>
          {/* Primary Button */}
          <button 
            onClick={onApply}
            className="px-5 py-2.5 rounded-lg bg-[#7c5cfc] text-white text-label-md hover:opacity-90 transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">check</span>
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  )
}
