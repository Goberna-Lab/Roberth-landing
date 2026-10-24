import { useEffect, useRef } from 'react'
import { HEADER, NAV, QUOTE, SOCIALS } from '../data.ts'
import { goToAnchor } from './anchors.ts'
import { IconClose, IconMenu } from './icons.tsx'

type Props = {
  menuOpen: boolean
  onMenuChange: (open: boolean) => void
}

export function MobileHeader({ menuOpen, onMenuChange }: Props) {
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <>
      <header className="m-header" inert={menuOpen}>
        <a href="#inicio" className="m-header__logo">
          {HEADER.logo}
        </a>
        <button
          ref={menuButton}
          type="button"
          className="m-header__menu-btn"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="m-menu"
          onClick={() => onMenuChange(true)}
        >
          <IconMenu size={26} />
        </button>
      </header>
      {menuOpen && <MobileMenu onClose={() => onMenuChange(false)} returnFocus={menuButton} />}
    </>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Menú a pantalla completa. Se cierra con Escape, con la X, tocando fuera de
 * la lista o eligiendo un destino. Bloquea el scroll de fondo, contiene el
 * foco (el resto de la página queda `inert`) y lo devuelve al botón al cerrar.
 */
function MobileMenu({ onClose, returnFocus }: { onClose: () => void; returnFocus: React.RefObject<HTMLButtonElement | null> }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const button = returnFocus.current
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      button?.focus({ preventScroll: true })
    }
  }, [onClose, returnFocus])

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    onClose()
    // "#" = enlace aún sin destino (p. ej. BLOG): solo cierra el menú.
    if (href.length < 2) return
    // Tras cerrar (scroll desbloqueado y página sin `inert`) se navega al ancla.
    requestAnimationFrame(() => goToAnchor(href))
  }

  return (
    <div
      ref={panel}
      id="m-menu"
      className="m-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      onClick={(e) => {
        if (!(e.target as Element).closest('a, button, li')) onClose()
      }}
    >
      <div className="m-menu__bar">
        <span className="m-header__logo">{HEADER.logo}</span>
        <button type="button" className="m-header__menu-btn" aria-label="Cerrar menú" onClick={onClose}>
          <IconClose size={26} />
        </button>
      </div>
      <nav className="m-menu__nav" aria-label="Principal">
        <ul>
          {NAV.map((item, i) => (
            <li key={item.label} style={{ '--i': i } as React.CSSProperties}>
              <a href={item.href} onClick={(e) => choose(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* QuoteModal abre el formulario al hacer clic en cualquier enlace a #cotizar. */}
        <a href={QUOTE.anchor} className="m-btn m-btn--gold m-menu__cta" onClick={onClose}>
          {HEADER.cta}
        </a>
      </nav>
      <ul className="m-menu__socials">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
              <img src={s.icon} alt="" width={24} height={24} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
