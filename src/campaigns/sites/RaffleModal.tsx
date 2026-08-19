import { useRef, useState } from 'react'
import Button from '../../systems/redeem/components/Button.tsx'
import Modal from '../../shared/components/Modal.tsx'
import './raffleWheel.css'

interface Segment {
  label: string
  type: 'prize' | 'blank'
}

// 6 slots: 4 prizes, 2 blanks — structure only, restyle freely later.
const SEGMENTS: Segment[] = [
  { label: '₦500 Airtime', type: 'prize' },
  { label: 'Try Again', type: 'blank' },
  { label: '1GB Data', type: 'prize' },
  { label: '₦1,000 Cash', type: 'prize' },
  { label: 'Free Ticket', type: 'prize' },
  { label: 'No Win', type: 'blank' },
]

const SEGMENT_ANGLE = 360 / SEGMENTS.length
const SPIN_DURATION_MS = 6000
const STOP_DURATION_MS = 3500
const EXTRA_SPINS = 6

const conicBackground = SEGMENTS.map((seg, i) => {
  const start = i * SEGMENT_ANGLE
  const end = start + SEGMENT_ANGLE
  // Themed via CSS vars so the same file drops into a host with its own palette;
  // the fallbacks are this project's original fills.
  const color =
    seg.type === 'prize' ? 'var(--raffle-prize-fill, #ece8fe)' : 'var(--raffle-blank-fill, #f3e9ee)'
  return `${color} ${start}deg ${end}deg`
}).join(', ')

type SpinPhase = 'idle' | 'spinning' | 'stopping' | 'done'

interface RaffleWheelProps {
  phase: SpinPhase
  // Absolute wheel rotation in degrees; only ever increases.
  rotation: number
}

function RaffleWheel({ phase, rotation }: RaffleWheelProps) {
  const transition =
    phase === 'spinning'
      ? `transform ${SPIN_DURATION_MS}ms linear`
      : phase === 'stopping'
        ? `transform ${STOP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : 'none'

  return (
    <div className="raffle-wheel-wrap">
      <div className="raffle-wheel__pointer" aria-hidden="true" />
      <div
        className="raffle-wheel"
        style={{ background: `conic-gradient(${conicBackground})`, transform: `rotate(${rotation}deg)`, transition }}
      >
        {SEGMENTS.map((seg, i) => {
          const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2
          return (
            <div key={seg.label} className="raffle-wheel__segment" data-type={seg.type}>
              <span
                className="raffle-wheel__label"
                style={{ transform: `rotate(${angle}deg) translate(0, -105px) rotate(${-angle}deg) translateX(-50%)` }}
              >
                {seg.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface RaffleModalProps {
  isOpen: boolean
  onClose?: () => void
}

export default function RaffleModal({ isOpen, onClose }: RaffleModalProps) {
  const [phase, setPhase] = useState<SpinPhase>('idle')
  const [rotation, setRotation] = useState(0)
  // Index into SEGMENTS, chosen when Stop is pressed; null while no result.
  const winningIndexRef = useRef<number | null>(null)
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSpin = () => {
    setRotation((prev) => prev + EXTRA_SPINS * 360 + 360) // long constant spin, direction only
    setPhase('spinning')
  }

  const handleStop = () => {
    const winningIndex = Math.floor(Math.random() * SEGMENTS.length)
    winningIndexRef.current = winningIndex
    const targetOffset = 360 - (winningIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2)
    setRotation((prev) => {
      const base = Math.ceil(prev / 360) * 360
      return base + EXTRA_SPINS * 360 + targetOffset
    })
    setPhase('stopping')
    // Driven by a timer matched to the CSS transition duration rather than
    // the transitionend event — a mid-flight retarget (linear -> ease-out)
    // doesn't reliably fire transitionend in every environment.
    stopTimerRef.current = setTimeout(() => setPhase('done'), STOP_DURATION_MS)
  }

  const clearStopTimer = () => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current)
      stopTimerRef.current = null
    }
  }

  const handleClose = () => {
    clearStopTimer()
    setPhase('idle')
    setRotation(0)
    winningIndexRef.current = null
    onClose?.()
  }

  const handlePlayAgain = () => {
    clearStopTimer()
    setPhase('idle')
    winningIndexRef.current = null
  }

  const winningSegment =
    phase === 'done' && winningIndexRef.current !== null ? SEGMENTS[winningIndexRef.current] : null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="raffle-modal-title"
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <h2 id="raffle-modal-title" className="font-r-display text-xl text-r-ink">
          Summer Raffle Draw
        </h2>
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

      <RaffleWheel phase={phase} rotation={rotation} />

      <div className="raffle-controls">
        {phase === 'idle' && (
          <Button variant="primary" onClick={handleSpin}>
            Spin
          </Button>
        )}
        {phase === 'spinning' && (
          <Button variant="primary" onClick={handleStop}>
            Stop
          </Button>
        )}
        {phase === 'stopping' && (
          <Button variant="primary" disabled>
            Stopping…
          </Button>
        )}
        {phase === 'done' && winningSegment && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className={`font-r-body text-base ${winningSegment.type === 'prize' ? 'text-r-win' : 'text-r-ink-muted'}`}>
              {winningSegment.type === 'prize'
                ? `You won: ${winningSegment.label}!`
                : `Landed on "${winningSegment.label}" — no win this time.`}
            </p>
            <Button variant="primary" onClick={handlePlayAgain}>
              Spin again
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
