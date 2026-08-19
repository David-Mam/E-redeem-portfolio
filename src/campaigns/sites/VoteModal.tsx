import { useState } from 'react'
import Button from '../../systems/redeem/components/Button.tsx'
import Modal from '../../shared/components/Modal.tsx'

interface Nominee {
  id: string
  name: string
  subtitle: string
  category: string
  votes: number
  tag: string
}

const INITIAL_NOMINEES: Nominee[] = [
  {
    id: '1',
    name: 'Citrus Pulse Energy',
    subtitle: 'Refreshing tangy lemon-lime blast',
    category: 'Product Flavor 2026',
    votes: 3420,
    tag: 'Trending #1',
  },
  {
    id: '2',
    name: 'Tropical Mango Surge',
    subtitle: 'Exotic Alphonso sweet aroma',
    category: 'Product Flavor 2026',
    votes: 3180,
    tag: 'Fan Favorite',
  },
  {
    id: '3',
    name: 'Wild Berry Fusion',
    subtitle: 'Rich dark berry antioxidant blend',
    category: 'Product Flavor 2026',
    votes: 2890,
    tag: 'Editor Choice',
  },
]

interface VoteModalProps {
  isOpen: boolean
  onClose?: () => void
}

export default function VoteModal({ isOpen, onClose }: VoteModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [nominees, setNominees] = useState<Nominee[]>(INITIAL_NOMINEES)

  const handleCastVote = () => {
    if (!selectedId) return
    setNominees((prev) =>
      prev.map((nom) => (nom.id === selectedId ? { ...nom, votes: nom.votes + 1 } : nom))
    )
    setHasVoted(true)
  }

  const handleReset = () => {
    setSelectedId(null)
    setHasVoted(false)
    setNominees(INITIAL_NOMINEES)
  }

  const handleClose = () => {
    handleReset()
    onClose?.()
  }

  const totalVotes = nominees.reduce((sum, n) => sum + n.votes, 0)
  const winningNominee = [...nominees].sort((a, b) => b.votes - a.votes)[0]

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="vote-modal-title"
      className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-r-signal">
            Brand Battle &amp; Fan Choice
          </span>
          <h2 id="vote-modal-title" className="mt-1 font-r-display text-xl text-r-ink">
            Vote for the Next Limited Edition
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
            Cast your vote for your favorite choice. High-volume fraud verification secures every entry and unlocks a raffle entry ticket.
          </p>

          <div className="space-y-3">
            {nominees.map((nom) => {
              const isSelected = selectedId === nom.id
              return (
                <div
                  key={nom.id}
                  onClick={() => setSelectedId(nom.id)}
                  className={`group cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-r-signal bg-r-signal-tint text-r-ink shadow-sm'
                      : 'border-r-border bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {nom.tag}
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected ? 'border-r-signal bg-r-signal text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  </div>
                  <div className="mt-2 font-r-display text-base font-bold text-slate-900">
                    {nom.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{nom.subtitle}</div>
                </div>
              )
            })}
          </div>

          <Button
            variant="primary"
            className="mt-6 w-full"
            disabled={!selectedId}
            onClick={handleCastVote}
          >
            Confirm &amp; Cast Vote
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-r-win/30 bg-r-win/10 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-r-win">
              Vote Verified · Anti-Fraud Encrypted
            </span>
            <p className="mt-1 font-r-display text-lg text-r-ink">
              Entered in ₦50,000 Grand Prize Draw
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>Leaderboard Standings</span>
              <span>{totalVotes.toLocaleString()} votes cast</span>
            </div>
            {nominees.map((nom) => {
              const pct = Math.round((nom.votes / totalVotes) * 100)
              const isSelected = nom.id === selectedId
              const isLeader = nom.id === winningNominee.id

              return (
                <div key={nom.id} className="space-y-1.5 rounded-lg border border-slate-100 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">
                      {nom.name}
                      {isSelected && (
                        <span className="ml-2 rounded bg-r-signal-tint px-1.5 py-0.5 text-[10px] font-bold text-r-signal">
                          Your Vote
                        </span>
                      )}
                      {isLeader && (
                        <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                          👑 Lead
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-700">{nom.votes.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: isSelected ? 'var(--primary)' : 'oklch(0.45 0 0)',
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
