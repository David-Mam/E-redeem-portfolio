import { useState } from 'react'
import Button from '../../systems/redeem/components/Button.tsx'
import Modal from '../../shared/components/Modal.tsx'

interface SurveyQuestion {
  id: number
  title: string
  subtitle: string
  options: string[]
}

const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: 'How often do you participate in brand loyalty promotions?',
    subtitle: 'Step 1 of 3 · Consumer Frequency',
    options: ['Multiple times a week', 'Once every month', 'Only during holiday specials', 'First time today'],
  },
  {
    id: 2,
    title: 'Which channel do you find easiest for code entry?',
    subtitle: 'Step 2 of 3 · Channel Preference',
    options: ['Direct Web Page / QR Scan', 'Quick USSD String (*654*CODE#)', 'Instant WhatsApp Chatbot', 'Standard SMS'],
  },
  {
    id: 3,
    title: 'How would you rate instant airtime reward speed?',
    subtitle: 'Step 3 of 3 · Satisfaction Evaluation',
    options: ['⭐⭐⭐⭐⭐ Blazing fast (under 10s)', '⭐⭐⭐⭐ Quick (under 1 minute)', '⭐⭐⭐ Moderate (1-5 minutes)', '⭐⭐ Needs improvement'],
  },
]

interface SurveyModalProps {
  isOpen: boolean
  onClose?: () => void
}

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQ = SURVEY_QUESTIONS[step]
  const currentAnswer = answers[step]

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [step]: option }))
  }

  const handleNext = () => {
    if (step < SURVEY_QUESTIONS.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1)
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleClose = () => {
    handleReset()
    onClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="survey-modal-title"
      className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-r-signal">
            Structured Insight Survey
          </span>
          <h2 id="survey-modal-title" className="mt-1 font-r-display text-xl text-r-ink">
            {isCompleted ? 'Survey Completed!' : currentQ.title}
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

      {!isCompleted ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{currentQ.subtitle}</span>
            <span>
              {step + 1} / {SURVEY_QUESTIONS.length}
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((step + 1) / SURVEY_QUESTIONS.length) * 100}%`,
                background: 'var(--primary)',
              }}
            />
          </div>

          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 text-left font-r-body text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-r-signal bg-r-signal-tint text-r-ink shadow-sm'
                      : 'border-r-border text-r-ink hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      isSelected ? 'border-r-signal bg-r-signal text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="cursor-pointer font-r-body text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Back
            </button>
            <Button
              variant="primary"
              disabled={!currentAnswer}
              onClick={handleNext}
              className="px-6"
            >
              {step === SURVEY_QUESTIONS.length - 1 ? 'Complete Survey' : 'Next Step'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-r-win/30 bg-r-win/10 p-5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-r-win">
              Consumer Insight Profile Enriched
            </span>
            <p className="mt-1 font-r-display text-xl text-r-ink">
              ₦500 Shopping Voucher Voucher Unlocked
            </p>
            <div className="mt-3 inline-block rounded-md bg-white px-4 py-2 font-mono text-sm font-bold tracking-widest text-slate-900 shadow-sm">
              EXCITE-SURVEY-882
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600">
            <div className="font-bold uppercase tracking-wider text-slate-900">
              Survey Summary Captured
            </div>
            {SURVEY_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="flex justify-between border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                <span className="text-slate-500">Q{idx + 1}:</span>
                <span className="font-semibold text-slate-800">{answers[idx] || '—'}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="w-full" onClick={handleReset}>
              Retake Survey
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
