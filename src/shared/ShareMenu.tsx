import { useEffect, useId, useRef, useState } from 'react'
import { BLOG, articleHref, type Article } from '../blog.ts'
import './share-menu.css'

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" />
  </svg>
)

const ICONS = {
  whatsapp: (
    <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17.2a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.8 7.8 0 1 1 12 19.7Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3Z" />
  ),
  facebook: (
    <path d="M12 2.5a9.5 9.5 0 0 0-1.5 18.9v-6.7H8.1V12h2.4V9.9c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.7h-2.2v6.7A9.5 9.5 0 0 0 12 2.5Z" />
  ),
  x: <path d="M17.6 3.5h3l-6.6 7.5 7.7 10h-6l-4.7-6.1-5.4 6.1h-3l7-8L2.3 3.5h6.2l4.3 5.6 4.8-5.6Zm-1 15.7h1.6L7.5 5.2H5.8l10.8 14Z" />,
  link: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </g>
  ),
}

/**
 * "Compartir" de cada artículo: al pasar el cursor (o tocar, en pantallas
 * táctiles) abre el panel "Compartir artículo" con WhatsApp, Facebook, X y
 * copiar enlace. Se cierra con Escape o tocando fuera.
 */
export function ShareMenu({ article, className = '' }: { article: Article; className?: string }) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const url = `${location.origin}${location.pathname}${articleHref(article.slug)}`
  const title = article.title.join(' ')
  const links = [
    { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { key: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    {
      key: 'x',
      label: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
  ] as const

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copia el enlace:', url)
    }
  }

  return (
    <div
      ref={root}
      className={`share${open ? ' is-open' : ''} ${className}`}
      // Con ratón se abre al pasar por encima; en táctil, al tocar el botón.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
      <button type="button" className="share__btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <ShareIcon />
        {BLOG.share}
      </button>
      <div id={id} className="share__panel" role="group" aria-label="Compartir artículo" hidden={!open}>
        <div className="share__card">
          <p className="share__title">Compartir artículo</p>
          <ul className="share__list">
            {links.map((link) => (
              <li key={link.key}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {ICONS[link.key]}
                  </svg>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={copy}>
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                  {ICONS.link}
                </svg>
                <span aria-live="polite">{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
