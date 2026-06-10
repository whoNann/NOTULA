export default function NoteCard({ title, snippet, time, icon, isActive, aiTag, isFavorite, onToggleFavorite, onToggleArchive, isArchived }) {
  return (
    <div
      className={`surface-level-2 rounded-xl p-6 flex flex-col h-56 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden ${
        isActive ? 'card-active' : ''
      }`}
    >
      {/* Hover Actions */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1.5 z-10">
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
            className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-surface-container-high/90"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span
              className={`material-symbols-outlined text-sm ${isFavorite ? 'text-primary' : ''}`}
              style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              star
            </span>
          </button>
        )}
        {onToggleArchive && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleArchive(); }}
            className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer border-none bg-surface-container-high/90"
            title={isArchived ? 'Unarchive' : 'Archive'}
          >
            <span className="material-symbols-outlined text-sm">
              {isArchived ? 'unarchive' : 'archive'}
            </span>
          </button>
        )}
      </div>

      {/* Favorite indicator */}
      {isFavorite && (
        <div className="absolute top-4 right-4 group-hover:opacity-0 transition-opacity">
          <span
            className="material-symbols-outlined text-primary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        </div>
      )}

      {/* Title */}
      <div className="flex items-center space-x-3 mb-4">
        <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          {icon || 'description'}
        </span>
        <h4 className="text-headline-sm text-on-surface line-clamp-1">{title}</h4>
      </div>

      {/* Snippet */}
      <p className="text-editor text-on-surface-variant line-clamp-3 mb-4 flex-1">
        {snippet}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-label-md text-on-surface-variant/60">{time}</span>
        {aiTag && (
          <div className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center space-x-1.5">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="text-primary uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: 600 }}>
              {aiTag}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
