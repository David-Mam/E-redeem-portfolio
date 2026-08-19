import { useState } from 'react'
import Button from '../../systems/redeem/components/Button.tsx'
import Modal from '../../shared/components/Modal.tsx'

interface PollOption {
  id: string
  label: string
  votes: number
}

const INITIAL_OPTIONS: PollOption[] = [
  { id: '1', label: 'Instant Mobile Airtime & Data', votes: 1420 },
  { id: '2', label: 'Shopping & Supermarket Vouchers', votes: 890 },
  { id: '3', label: 'Cash Back via Bank Transfer', votes: 1150 },
  { id: '4', label: 'VIP Concert & Sports Tickets', votes: 410 },
]

interface PollModalProps {
  isOpen: boolean
  onClose?: () => void
}

export default function PollModal({ isOpen, onClose }: PollModalProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [options, setOptions] = useState<PollOption[]>(INITIAL_OPTIONS)

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0)

  const handleVote = () => {
    if (!selected) return
    setOptions((prev) =>
      prev.map((opt) => (opt.id === selected ? { ...opt, votes: opt.votes + 1 } : opt))
    )
    setHasVoted(true)
  }

  const handleReset = () => {
    setSelected(null)
    setHasVoted(false)
    setOptions(INITIAL_OPTIONS)
  }

  const handleClose = () => {
    handleReset()
    onClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="poll-modal-title"
      className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-r-signal">
            Live Consumer Poll
          </span>
          <h2 id="poll-modal-title" className="mt-1 font-r-display text-xl text-r-ink">
            What is your preferred loyalty reward?
          </h2>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-r-ink-muted transition-colors hover:bg-r-signal-tint hover:text-r-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {!hasVoted ? (
        <div className="space-y-4">
          <p className="font-r-body text-sm text-r-ink-muted">
            Vote in this quick poll to see live audience sentiment and unlock instant reward points.
          </p>

          <div className="space-y-2.5">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 text-left font-r-body text-sm font-medium transition-all ${
                  selected === opt.id
                    ? 'border-r-signal bg-r-signal-tint text-r-ink shadow-sm'
                    : 'border-r-border text-r-ink hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    selected === opt.id ? 'border-r-signal bg-r-signal text-white' : 'border-slate-300'
                  }`}
                >
                  {selected === opt.id && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            className="mt-6 w-full"
            disabled={!selected}
            onClick={handleVote}
          >
            Submit Poll Vote
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-r-win/30 bg-r-win/10 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-r-win">
              Vote Recorded · Reward Credited
            </span>
            <p className="mt-1 font-r-display text-lg text-r-ink">
              ₦200 Airtime Dispatched to Your Profile
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Results ({totalVotes.toLocaleString()} total responses)
            </div>
            {options.map((opt) => {
              const pct = Math.round((opt.votes / totalVotes) * 100)
              const isUserChoice = opt.id === selected
              return (
                <div key={opt.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-medium text-slate-800">
                    <span className="flex items-center gap-1.5">
                      {opt.label}
                      {isUserChoice && (
                        <span className="rounded bg-r-signal-tint px-1.5 py-0.5 text-[10px] font-bold text-r-signal">
                          Your choice
                        </span>
                      )}
                    </span>
                    <span className="font-bold">{pct}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: isUserChoice ? 'var(--primary)' : 'oklch(0.45 0 0)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="w-full" onClick={handleReset}>
              Vote Again
            </Button>
            <Button variant="primary" className="w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
