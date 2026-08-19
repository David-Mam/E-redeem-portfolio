import { useEffect, useRef, useState } from 'react'
import type { ComponentType, HTMLAttributes, SVGAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import useDelayedUnmount from '../../../shared/hooks/useDelayedUnmount.ts'

const TRANSITION_MS = 150

// country-flag-icons types its flags against HTMLElement & SVGElement and does
// not export the component type, so mirror its prop shape here to stay
// assignable from the package's exports.
type FlagElement = HTMLElement & SVGElement

export type FlagComponent = ComponentType<
  HTMLAttributes<FlagElement> & SVGAttributes<FlagElement>
>

export interface CountryOption {
  // Dialling code, e.g. "+234".
  code: string
  country: string
  Flag: FlagComponent
}

interface CountrySelectProps {
  options: CountryOption[]
  // Dialling code of the selected option; falls back to options[0] if unmatched.
  value: string
  onChange: (code: string) => void
}

export default function CountrySelect({ options, value, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.code === value) ?? options[0]
  const shouldRenderList = useDelayedUnmount(open, TRANSITION_MS)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const SelectedFlag = selected.Flag

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code, currently ${selected.country} ${selected.code}`}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-l-lg border border-r-border border-r-0 bg-r-cloud px-2.5 font-r-body text-sm text-r-ink transition-colors hover:bg-r-signal-tint focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-r-signal"
      >
        <SelectedFlag className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" />
        <span>{selected.code}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-r-ink-muted transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {shouldRenderList && (
        <ul
          role="listbox"
          className={`absolute left-0 top-[calc(100%+6px)] z-20 max-h-64 w-56 origin-top overflow-auto rounded-lg border border-r-border bg-white py-1.5 shadow-xl transition-all ease-out motion-reduce:transition-none ${
            open ? 'scale-100 opacity-100' : '-translate-y-1 scale-95 opacity-0'
          }`}
          style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        >
          {options.map(({ code, country, Flag }) => (
            <li key={code} role="option" aria-selected={code === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(code)
                  setOpen(false)
                }}
                className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left font-r-body text-sm transition-colors hover:bg-r-signal-tint ${
                  code === value ? 'bg-r-signal-tint text-r-signal' : 'text-r-ink'
                }`}
              >
                <Flag className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" />
                <span className="flex-1 truncate">{country}</span>
                <span className="text-r-ink-muted">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
