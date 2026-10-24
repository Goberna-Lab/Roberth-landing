import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

type Props = {
  placeholder: string
  options: readonly string[]
  value: string | null
  onChange: (value: string) => void
  /** Alto que ocupa la lista abierta (0 al cerrarse), para que el hero crezca. */
  onListHeight?: (px: number) => void
  /** Clases del botón (por defecto, el estilo contorno de .m-select__button). */
  buttonClassName?: string
  /** Icono a la izquierda del texto del botón. */
  icon?: ReactNode
  /** Alto que aparece bajo el desplegable al abrirse (p. ej. un botón que se revela). */
  revealBelow?: number
}

/**
 * Desplegable accesible (botón + listbox) con el estilo de la marca; la lista
 * se abre debajo del botón, dentro del flujo. Teclado: flechas, Inicio/Fin,
 * Enter/Espacio para elegir y Escape para cerrar; también cierra al tocar fuera.
 */
export function TopicSelect({
  placeholder,
  options,
  value,
  onChange,
  onListHeight,
  buttonClassName = 'm-select__button',
  icon,
  revealBelow = 0,
}: Props) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const drop = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  /*
   * La lista siempre está en el DOM y se despliega con una transición de alto
   * (mobile.css); el hero crece lo mismo, con la misma curva, y la página se
   * desplaza a la vez: un solo movimiento y el botón tocado no se mueve.
   */
  useEffect(() => {
    const el = list.current
    const inner = drop.current?.firstElementChild
    if (!open || !el || !inner) {
      onListHeight?.(0)
      return
    }
    const height = inner.scrollHeight
    onListHeight?.(height)
    el.focus({ preventScroll: true })
    // Lo que quedará bajo la pantalla al terminar (lista + lo que hay debajo).
    const next = root.current?.nextElementSibling
    const bottom = (next ?? el).getBoundingClientRect().bottom + (next ? height : 0) + revealBelow
    const overflow = bottom + 16 - window.innerHeight
    if (overflow > 0) window.scrollBy({ top: overflow, behavior: 'smooth' })
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open, onListHeight, revealBelow])

  const show = () => {
    setActive(Math.max(0, value ? options.indexOf(value) : 0))
    setOpen(true)
  }

  const choose = (i: number) => {
    onChange(options[i])
    setOpen(false)
    button.current?.focus()
  }

  const onListKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1
    const moves: Record<string, number> = {
      ArrowDown: Math.min(last, active + 1),
      ArrowUp: Math.max(0, active - 1),
      Home: 0,
      End: last,
    }
    if (e.key in moves) {
      e.preventDefault()
      setActive(moves[e.key])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(active)
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') e.preventDefault()
      setOpen(false)
      if (e.key === 'Escape') button.current?.focus()
    }
  }

  return (
    <div className={`m-select${open ? ' is-open' : ''}`} ref={root}>
      <button
        ref={button}
        type="button"
        className={buttonClassName}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault()
            show()
          }
        }}
      >
        {icon}
        <span>{value ?? placeholder}</span>
        <svg className="m-select__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="m-select__drop" ref={drop} inert={!open}>
        <div className="m-select__drop-inner">
          <ul
            ref={list}
            id={`${id}-list`}
            className="m-select__list"
            role="listbox"
            tabIndex={-1}
            aria-label={placeholder}
            aria-activedescendant={`${id}-opt-${active}`}
            onKeyDown={onListKey}
          >
            {options.map((option, i) => (
              <li
                key={option}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={option === value}
                className={`m-select__option${i === active ? ' is-active' : ''}`}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
