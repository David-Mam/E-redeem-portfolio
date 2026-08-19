import { useState } from 'react'
import Button from '../../systems/redeem/components/Button.tsx'
import Modal from '../../shared/components/Modal.tsx'
import { QUIZ_QUESTIONS, PASS_THRESHOLD } from './quizQuestions.ts'

const FADE_MS = 150

interface QuizResult {
  correct: number
  total: number
  passed: boolean
}

interface QuizModalProps {
  isOpen: boolean
  onClose?: () => void
}

// One entry per question; null until that question is answered.
type AnswerState = (number | null)[]

const emptyAnswers = (): AnswerState => Array(QUIZ_QUESTIONS.length).fill(null)

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerState>(emptyAnswers())
  const [visible, setVisible] = useState(true)
  const [result, setResult] = useState<QuizResult | null>(null)

  const question = QUIZ_QUESTIONS[currentIndex]
  const allAnswered = answers.every((a) => a !== null)
  const isLast = currentIndex === QUIZ_QUESTIONS.length - 1

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= QUIZ_QUESTIONS.length) return
    setVisible(false)
    setTimeout(() => {
      setCurrentIndex(nextIndex)
      setVisible(true)
    }, FADE_MS)
  }

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = optionIndex
      return next
    })
    if (!isLast) goTo(currentIndex + 1)
  }

  const handleSubmit = () => {
    const correct = answers.reduce<number>(
      (sum, answer, i) => sum + (answer === QUIZ_QUESTIONS[i].correctIndex ? 1 : 0),
      0,
    )
    const passed = correct / QUIZ_QUESTIONS.length >= PASS_THRESHOLD
    setResult({ correct, total: QUIZ_QUESTIONS.length, passed })
  }

  const handleClose = () => {
    setCurrentIndex(0)
    setAnswers(emptyAnswers())
    setResult(null)
    setVisible(true)
    onClose?.()
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setAnswers(emptyAnswers())
    setResult(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="quiz-modal-title"
      className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-6 flex items-start justify-between">
        <h2 id="quiz-modal-title" className="font-r-display text-xl text-r-ink">
          {result ? 'Quiz results' : 'Brand Trivia Challenge'}
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

      {result ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <p className="font-r-display text-3xl text-r-ink">
            {result.correct}/{result.total}
          </p>
          <p className={`font-r-body text-base ${result.passed ? 'text-r-win' : 'text-r-ink-muted'}`}>
            {result.passed
              ? 'You scored 80% or higher — you win!'
              : 'Not quite 80% this time — try again.'}
          </p>
          <div className="mt-2 flex gap-3">
            <Button variant="secondary" onClick={handleRetry}>
              Try again
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 font-r-body text-xs font-medium uppercase tracking-wider text-r-ink-muted">
            Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </div>

          <div
            className={`transition-opacity duration-150 ease-out motion-reduce:transition-none ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="mb-4 font-r-display text-lg text-r-ink">{question.question}</p>
            <div className="flex flex-col gap-2">
              {question.options.map((option, i) => (
                <button
                  key={option}
                  onClick={() => selectAnswer(i)}
                  aria-pressed={answers[currentIndex] === i}
                  className={`cursor-pointer rounded-lg border px-4 py-3 text-left font-r-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal ${
                    answers[currentIndex] === i
                      ? 'border-r-signal bg-r-signal-tint text-r-signal'
                      : 'border-r-border text-r-ink hover:bg-r-signal-tint/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="cursor-pointer font-r-body text-sm font-semibold text-r-ink-muted transition-colors hover:text-r-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={isLast}
              className="cursor-pointer font-r-body text-sm font-semibold text-r-ink-muted transition-colors hover:text-r-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>

          <Button
            variant="primary"
            className="mt-4 w-full"
            disabled={!allAnswered}
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
          {!allAnswered && (
            <p className="mt-2 text-center font-r-body text-xs text-r-ink-muted">
              Answer every question to submit.
            </p>
          )}
        </>
      )}
    </Modal>
  )
}
