interface WinToastProps {
  visible: boolean
  // Null while no toast is queued; callers derive `visible` from the same state.
  prizeName: string | null
  onClose?: () => void
}

export default function WinToast({ visible, prizeName, onClose }: WinToastProps) {
  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-[toast-in_220ms_ease-out] fixed bottom-20 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 rounded-xl border border-r-win/20 bg-white p-4 shadow-xl motion-reduce:animate-none"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-r-win/15 text-r-win">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-r-display text-sm text-r-ink">
            You&rsquo;ve won!
          </p>
          <p className="font-r-body text-sm text-r-ink-muted">{prizeName}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-r-ink-muted transition-colors hover:bg-r-signal-tint hover:text-r-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
