import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { NG, GH, KE, ZA, GB, US } from 'country-flag-icons/react/3x2'
import Button from './Button.tsx'
import CountrySelect from './CountrySelect.tsx'
import type { CountryOption } from './CountrySelect.tsx'
import useDelayedUnmount from '../../../shared/hooks/useDelayedUnmount.ts'

const TRANSITION_MS = 200

const CODE_LENGTH = 7
const MOBILE_LENGTH = 10

const COUNTRY_CODES: CountryOption[] = [
  { code: '+234', country: 'Nigeria', Flag: NG },
  { code: '+233', country: 'Ghana', Flag: GH },
  { code: '+254', country: 'Kenya', Flag: KE },
  { code: '+27', country: 'South Africa', Flag: ZA },
  { code: '+44', country: 'United Kingdom', Flag: GB },
  { code: '+1', country: 'United States', Flag: US },
]

const fieldClasses =
  'h-11 w-full rounded-lg border border-r-border px-3 font-r-body text-sm text-r-ink placeholder:text-r-ink-muted/60 focus:border-r-signal focus:outline-none focus:ring-2 focus:ring-r-signal-tint'
const labelClasses = 'font-r-body text-xs font-medium text-r-ink-muted'

export interface RedeemSubmission {
  firstName: string
  lastName: string
  // Country code and national number joined, e.g. "+2348161234567".
  mobile: string
  code: string
}

interface RedeemModalProps {
  isOpen: boolean
  onClose?: () => void
  onSubmit?: (submission: RedeemSubmission) => void
}

export default function RedeemModal({ isOpen, onClose, onSubmit }: RedeemModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code)
  const [mobile, setMobile] = useState('')
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  // One slot per digit input; null for any not currently mounted.
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const shouldRender = useDelayedUnmount(isOpen, TRANSITION_MS)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/[^0-9]/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleMobileChange = (value: string) => {
    setMobile(value.replace(/[^0-9]/g, '').slice(0, MOBILE_LENGTH))
  }

  const code = digits.join('')
  const isComplete =
    code.length === CODE_LENGTH &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    mobile.length === MOBILE_LENGTH

  const handleSubmit = () => {
    onSubmit?.({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile: `${countryCode}${mobile}`,
      code,
    })
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-r-ink/50 p-4 transition-opacity ease-out motion-reduce:transition-none ${
        isOpen ? 'opacity-100 duration-200' : 'opacity-0 duration-150'
      }`}
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="redeem-modal-title"
        className={`w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-all ease-out motion-reduce:transition-none ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'
        }`}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 id="redeem-modal-title" className="font-r-display text-xl text-r-ink">
                  Redeem your code
                </h2>
                <p className="mt-1 font-r-body text-sm text-r-ink-muted">
                  Fill in your details, then enter the 7-digit code exactly as shown on your voucher.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-r-ink-muted transition-colors hover:bg-r-signal-tint hover:text-r-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="redeem-first-name" className={labelClasses}>
                  First name
                </label>
                <input
                  id="redeem-first-name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={fieldClasses}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="redeem-last-name" className={labelClasses}>
                  Last name
                </label>
                <input
                  id="redeem-last-name"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={fieldClasses}
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-1.5">
              <label htmlFor="redeem-mobile" className={labelClasses}>
                Mobile number
              </label>
              <div className="flex">
                <CountrySelect options={COUNTRY_CODES} value={countryCode} onChange={setCountryCode} />
                <input
                  id="redeem-mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="8161234567"
                  maxLength={MOBILE_LENGTH}
                  value={mobile}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  className="h-11 w-full rounded-r-lg border border-r-border px-3 font-r-body text-sm text-r-ink placeholder:text-r-ink-muted/60 focus:z-10 focus:border-r-signal focus:outline-none focus:ring-2 focus:ring-r-signal-tint"
                />
              </div>
              <span className="font-r-body text-xs text-r-ink-muted">
                {mobile.length}/{MOBILE_LENGTH} digits
              </span>
            </div>

            <div className="mb-2 flex flex-col gap-1.5">
              <span className={labelClasses}>7-digit code</span>
              <div className="flex justify-between gap-1.5">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el
                    }}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
                    className="h-12 w-full rounded-lg border border-r-border text-center font-r-body text-lg font-semibold tabular-nums text-r-ink focus:border-r-signal focus:outline-none focus:ring-2 focus:ring-r-signal-tint"
                  />
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-6 w-full"
              disabled={!isComplete}
              onClick={handleSubmit}
            >
              Submit
            </Button>
      </div>
    </div>
  )
}
