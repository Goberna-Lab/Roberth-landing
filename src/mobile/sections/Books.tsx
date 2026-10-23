import { useEffect, useRef, useState } from 'react'
import { BOOKS, BOOKS_INTRO, bookCover } from '../../data.ts'
import { IconArrowLeft, IconArrowRight } from '../icons.tsx'
import { oneLine } from '../text.ts'

/** Cada cuánto avanza solo el carrusel (ms). */
const AUTOPLAY_EVERY = 4500
/** Pausa del avance automático tras tocar o usar los botones (ms). */
const AUTOPLAY_PAUSE = 8000

type ScrollState = { index: number; atStart: boolean; atEnd: boolean }

/**
 * Carrusel con scroll-snap nativo. El contador y los botones salen del límite
 * real del desplazamiento, así que "siguiente" se deshabilita al llegar al
 * final aunque quepan varias tarjetas (tablet).
 */
export function Books() {
  const track = useRef<HTMLUListElement>(null)
  const [state, setState] = useState<ScrollState>({ index: 0, atStart: true, atEnd: false })
  const pausedUntil = useRef(0)

  /** Distancia entre tarjetas (ancho + separación). */
  const step = () => {
    const el = track.current
    const card = el?.querySelector<HTMLElement>('.m-book')
    if (!el || !card) return 1
    return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)
  }

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const atEnd = el.scrollLeft >= max - 2
      setState({
        index: atEnd ? BOOKS.length - 1 : Math.round(el.scrollLeft / step()),
        atStart: el.scrollLeft <= 2,
        atEnd,
      })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Avance automático: solo visible, sin movimiento reducido y en pausa al tocar.
  useEffect(() => {
    const el = track.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = false
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    const pause = () => (pausedUntil.current = performance.now() + AUTOPLAY_PAUSE)
    el.addEventListener('pointerdown', pause)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('wheel', pause, { passive: true })
    el.addEventListener('focusin', pause)

    const timer = window.setInterval(() => {
      if (!visible || document.hidden || performance.now() < pausedUntil.current) return
      const max = el.scrollWidth - el.clientWidth
      const next = el.scrollLeft >= max - 2 ? 0 : Math.min(max, el.scrollLeft + step())
      el.scrollTo({ left: next, behavior: 'smooth' })
    }, AUTOPLAY_EVERY)

    return () => {
      window.clearInterval(timer)
      io.disconnect()
      el.removeEventListener('pointerdown', pause)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('wheel', pause)
      el.removeEventListener('focusin', pause)
    }
  }, [])

  const move = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    pausedUntil.current = performance.now() + AUTOPLAY_PAUSE
    const max = el.scrollWidth - el.clientWidth
    const target = (Math.round(el.scrollLeft / step()) + dir) * step()
    el.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: 'smooth' })
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="m-books m-section" id="publicaciones">
      <img className="m-books__bg" src={BOOKS_INTRO.background} alt="" loading="lazy" width={1715} height={917} />
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          {BOOKS_INTRO.label}
        </p>
        <h2 className="m-h2" data-reveal>
          {BOOKS_INTRO.title}
        </h2>
        <p className="m-text" data-reveal>
          {BOOKS_INTRO.text}
        </p>
      </div>

      <ul className="m-carousel" ref={track} aria-label="Libros" data-reveal>
        {BOOKS.map((book, i) => (
          <li key={book.cover} className="m-book">
            <img className="m-book__cover" src={bookCover(book)} alt="" loading="lazy" width={634} height={879} />
            <span className="m-book__num">{pad(i + 1)}</span>
            <h3 className="m-book__title">{oneLine(book.title)}</h3>
            <a href={book.url} className="m-more" target="_blank" rel="noopener noreferrer">
              {book.cta}
              <IconArrowRight size={16} />
            </a>
          </li>
        ))}
      </ul>

      <div className="m-wrap m-carousel__controls">
        <p className="m-carousel__count" aria-hidden="true">
          <strong>{pad(state.index + 1)}</strong> / {pad(BOOKS.length)}
        </p>
        <div className="m-carousel__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(state.index + 1) / BOOKS.length})` }} />
        </div>
        <button
          type="button"
          className="m-round-btn"
          onClick={() => move(-1)}
          disabled={state.atStart}
          aria-label="Libro anterior"
        >
          <IconArrowLeft />
        </button>
        <button
          type="button"
          className="m-round-btn"
          onClick={() => move(1)}
          disabled={state.atEnd}
          aria-label="Libro siguiente"
        >
          <IconArrowRight />
        </button>
      </div>
    </section>
  )
}
