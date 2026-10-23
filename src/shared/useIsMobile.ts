import { useSyncExternalStore } from 'react'
import { MOBILE_QUERY } from './breakpoint.ts'

const mql = typeof window === 'undefined' ? null : window.matchMedia(MOBILE_QUERY)

function subscribe(onChange: () => void) {
  mql?.addEventListener('change', onChange)
  return () => mql?.removeEventListener('change', onChange)
}

/** true mientras el viewport está por debajo de 1024px. */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => mql?.matches ?? false,
    () => false,
  )
}
