import { useId, useRef, useState, type MouseEvent } from 'react'

/**
 * Condición del banner de La Orden del Susurro: los botones de compra solo
 * abren WhatsApp con la casilla marcada. Sin marcarla, el clic se detiene,
 * la casilla recibe el foco y aparece el aviso (`warn`).
 */
export function useSusurroPact() {
  const checkbox = useRef<HTMLInputElement>(null)
  const [accepted, setAccepted] = useState(false)
  const [warn, setWarn] = useState(false)
  const hintId = useId()

  const onAcceptedChange = (value: boolean) => {
    setAccepted(value)
    if (value) setWarn(false)
  }

  const onBuy = (event: MouseEvent<HTMLAnchorElement>) => {
    if (accepted) return
    event.preventDefault()
    setWarn(true)
    checkbox.current?.focus()
  }

  return { checkbox, accepted, warn, hintId, onAcceptedChange, onBuy }
}
