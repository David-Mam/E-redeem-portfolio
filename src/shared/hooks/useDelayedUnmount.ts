import { useEffect, useState } from 'react'

// Keeps a node mounted for `duration` ms after `isVisible` goes false,
// so a CSS exit transition has time to play before removal.
export default function useDelayedUnmount(isVisible: boolean, duration: number): boolean {
  const [shouldRender, setShouldRender] = useState(isVisible)

  useEffect(() => {
    // Browser setTimeout returns a number, Node's returns a Timeout object, and
    // both typings are in scope here — ReturnType keeps this correct either way.
    let timer: ReturnType<typeof setTimeout> | undefined
    if (isVisible) {
      setShouldRender(true)
    } else {
      timer = setTimeout(() => setShouldRender(false), duration)
    }
    return () => clearTimeout(timer)
  }, [isVisible, duration])

  return shouldRender
}
