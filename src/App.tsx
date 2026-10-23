import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  AUDIOBOOKS,
  BOOK_AUTOSCROLL_SPEED,
  BOOK_STEP,
  BOOKS,
  EXPERIENCE,
  EXPERIENCE_LAYOUT,
  FOOTER_COLUMNS,
  NAV,
  SERVICES,
  SOCIALS,
  WHATSAPP_URL,
} from './data.ts'
import { CarouselArrow } from './icons.tsx'
import { SIGNATURE_STROKES, SIGNATURE_VIEWBOX } from './signature.ts'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Convierte "linea 1\nlinea 2" en líneas con <br />. */
function Lines({ text }: { text: string }) {
  const parts = text.split('\n')
  return parts.map((line, i) => (
    <span key={i}>
      {line}
      {i < parts.length - 1 && <br />}
    </span>
  ))
}

function Header() {
  return (
    <header className="header">
      <div className="stage">
        <a href="#inicio" className="header__logo">
          Roberth Estratega
        </a>
        <nav aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.label} className="header__link" style={{ left: item.x }}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#conversemos" className="btn btn--outline header__cta">
          CONVERSEMOS
        </a>
      </div>
    </header>
  )
}

/** Ritmo de la escritura: unidades de contorno por milisegundo. */
const INK_SPEED = 1.3
/** La firma empieza a escribirse mientras Roberto entra al banner. */
const INK_START = 600

/**
 * El siguiente trazo arranca cuando el anterior va a la mitad, porque el
 * contorno de cada letra da ida y vuelta sobre ella.
 */
const SIGNATURE_TIMED = SIGNATURE_STROKES.reduce<{ delay: number; strokes: (typeof SIGNATURE_STROKES[number] & { timing: React.CSSProperties })[] }>(
  (acc, s) => {
    const duration = Math.max(240, s.len / INK_SPEED)
    const timing = { animationDuration: `${duration}ms`, animationDelay: `${acc.delay}ms` }
    return { delay: acc.delay + duration * 0.55, strokes: [...acc.strokes, { ...s, timing }] }
  },
  { delay: INK_START, strokes: [] },
).strokes

/**
 * Firma escrita a mano alzada. Cada trazo relleno se descubre con una máscara:
 * un trazo grueso que recorre el contorno del mismo path (pathLength=1), así el
 * "lápiz" avanza por donde va la letra.
 */
function HeroSignature() {
  const strokes = SIGNATURE_TIMED

  return (
    <svg
      className="signature"
      viewBox={SIGNATURE_VIEWBOX}
      width={662.94}
      height={138.58}
      role="img"
      aria-label="Roberto Bazán"
    >
      {strokes.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`}>
          <mask id={`signature-ink-${i}`} maskUnits="userSpaceOnUse">
            <path className="signature__ink" d={s.d} pathLength={1} style={s.timing} />
          </mask>
          <path d={s.d} fill="#f7f9fc" mask={`url(#signature-ink-${i})`} />
        </g>
      ))}
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__stage stage">
        <img className="hero__bg" src={asset('/img/hero-bg.webp')} alt="" width={1920} height={880} fetchPriority="high" />
        <div className="hero__shade" />
        <div className="hero__person">
          <img
            src={asset('/img/hero-roberto.webp')}
            alt="Roberto Bazán"
            width={661}
            height={993}
            fetchPriority="high"
          />
        </div>

        <h1 className="hero__title">
          <HeroSignature />
        </h1>
        <ul className="hero__roles">
          <li style={{ left: 200 }}>Consultor Político</li>
          <li style={{ left: 463 }}>Asesor Legal</li>
          <li style={{ left: 661 }}>Escritor conferencista</li>
        </ul>
        <span className="hero__dot" style={{ left: 425 }} />
        <span className="hero__dot" style={{ left: 623 }} />

        <a href="#publicaciones" className="btn btn--gold hero__btn hero__btn--books">
          <span className="hero__btn-label">Ver libros</span>
          <img className="btn__icons" src={asset('/svg/btn-verlibros-icons.svg')} alt="" />
        </a>
        <a href="#conversemos" className="btn btn--light hero__btn hero__btn--talks">
          <span className="hero__btn-label">Cotiza conferencias</span>
          <img className="btn__icons" src={asset('/svg/btn-cotiza-icons.svg')} alt="" />
        </a>
      </div>
    </section>
  )
}

/**
 * Marca con `is-in` la primera vez que entran en pantalla: el propio elemento
 * o, si se da `selector`, cada descendiente que coincida por separado.
 */
function useRevealOnScroll<T extends HTMLElement>(selector?: string, options: IntersectionObserverInit = { threshold: 0.25 }) {
  const ref = useRef<T>(null)
  const { threshold, rootMargin } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = selector ? [...el.querySelectorAll(selector)] : [el]
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [selector, threshold, rootMargin])

  return ref
}

/** Cada foto encaja cuando ella misma ya está bien dentro de la pantalla. */
const ABOUT_PHOTO_REVEAL = { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }

function About() {
  const sectionRef = useRevealOnScroll<HTMLElement>('.about__photo', ABOUT_PHOTO_REVEAL)

  return (
    <section className="about" id="roberth" ref={sectionRef}>
      <div className="stage">
        <img className="about__bg" src={asset('/img/about-bg.webp')} alt="" loading="lazy" />
        <p className="label about__label">UNA MIRADA MULTIDIMENSIONAL</p>
        <img className="about__icon" src={asset('/svg/ico-columnas.svg')} alt="" width={47.61} height={44.36} />
        <h2 className="about__title">
          <span className="about__title-1">Roberth</span>
          <span className="about__title-2">Estratega</span>
        </h2>
        <span className="about__rule" />
        <span className="about__rule-dot" />
        <p className="body18 about__p1">Es consultor político, abogado de políticos</p>
        <p className="body18 about__p2">
          Su carrera la desarrolla como escritor y conferencista en materia de
          <br />
          tecnología, inteligencia y operaciones psicológicas, y Lawfare.
        </p>
        <a href="#blog" className="btn btn--outline about__btn about__btn--1">
          LEER MIS ARTÍCULOS
        </a>
        <a href="#publicaciones" className="btn btn--outline about__btn about__btn--2">
          VER MIS LIBROS
        </a>
        <span className="about__hr" />

        <figure className="about__photo about__photo--1">
          <img src={asset('/img/about-1.webp')} alt="Roberto Bazán junto a autoridades y consultores" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--2">
          <img src={asset('/img/about-2.webp')} alt="Conferencia ante un auditorio" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--3">
          <img src={asset('/img/about-3.webp')} alt="Roberto Bazán exponiendo" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--4">
          <img src={asset('/img/about-4.webp')} alt="Roberto Bazán en un encuentro internacional" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

function Power() {
  return (
    <section className="power">
      <div className="stage">
        <div className="power__img">
          <img src={asset('/img/capitolio.webp')} alt="" loading="lazy" />
        </div>
        <h2 className="power__title">
          <span className="power__line-1">El poder se construye con </span>
          <span className="power__line-2">CONOCIMIENTO</span>
        </h2>
      </div>
    </section>
  )
}

function Experience() {
  const L = EXPERIENCE_LAYOUT
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section className="exp" id="experiencia" ref={sectionRef}>
      <div className="stage">
        <p className="label exp__label">TRAYECTORIA ESTRATÉGICA</p>
        <h2 className="h2 exp__title">
          Experiencia aplicada
          <br />
          donde la decisión
          <br />
          importa
        </h2>
        <span className="exp__hr" />
        <p className="body18 exp__p">
          Consultoría política · Estrategia · Gobierno · Campañas
          <br />
          electorales · Inteligencia · Operaciones psicológicas · Trabajo
          <br />
          internacional · Producción de conocimiento.
        </p>
        <a href="#conversemos" className="btn btn--outline exp__btn">
          CONVERSAR SOBRE UN PROYECTO
        </a>

        <span className="exp__timeline" />
        {L.dotTop.map((top, i) => (
          <span key={top} className="exp__dot" style={{ top, '--i': i } as React.CSSProperties} />
        ))}
        {L.dividerTop.map((top, i) => (
          <span key={top} className="exp__divider" style={{ top, '--i': i + 1 } as React.CSSProperties} />
        ))}
        <ul>
          {EXPERIENCE.map((item, i) => (
            <li key={item.title} style={{ '--i': i } as React.CSSProperties}>
              <img
                className="exp__icon"
                src={item.icon.src}
                alt=""
                loading="lazy"
                style={{ left: item.icon.x, top: item.icon.y, width: item.icon.w, height: item.icon.h }}
              />
              <h3 className="exp__item-title" style={{ top: L.titleTop[i] }}>
                {item.title}
              </h3>
              <p className="exp__item-text" style={{ top: L.textTop[i] }}>
                <strong>{item.strong}</strong>
                <Lines text={item.text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Books() {
  const viewport = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const update = () => {
      setCanPrev(el.scrollLeft > 2)
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [])

  /*
   * Scroll automático lento. Se detiene mientras el mouse está sobre los
   * libros o las flechas, con foco de teclado, mientras se arrastra o
   * fuera de pantalla. Al llegar al final espera y vuelve al inicio.
   */
  const carousel = useRef<HTMLElement>(null)
  const resumeAt = useRef(0)

  useEffect(() => {
    const el = viewport.current
    const area = carousel.current
    if (!el || !area || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let hovered = false
    let visible = false
    let raf = 0
    let last = 0
    // scrollLeft se redondea en algunos navegadores; acumulamos aparte.
    let pos = el.scrollLeft

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      const paused = hovered || !visible || !!area.querySelector(':focus-visible') || now < resumeAt.current
      if (paused) {
        pos = el.scrollLeft
        return
      }
      const end = el.scrollWidth - el.clientWidth
      if (pos >= end - 1) {
        resumeAt.current = now + 2500
        el.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }
      pos = Math.min(end, pos + (BOOK_AUTOSCROLL_SPEED * dt) / 1000)
      el.scrollLeft = pos
    }

    const pauseFor = (ms: number) => {
      resumeAt.current = performance.now() + ms
    }
    const onOver = (e: PointerEvent) => {
      hovered = !!(e.target as Element).closest('.books__viewport, .books__arrow')
    }
    const onLeave = () => (hovered = false)
    const onUserScroll = () => pauseFor(3000)

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(el)
    area.addEventListener('pointerover', onOver)
    area.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onUserScroll)
    el.addEventListener('wheel', onUserScroll, { passive: true })
    el.addEventListener('touchstart', onUserScroll, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      area.removeEventListener('pointerover', onOver)
      area.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onUserScroll)
      el.removeEventListener('wheel', onUserScroll)
      el.removeEventListener('touchstart', onUserScroll)
    }
  }, [])

  const move = (dir: 1 | -1) => {
    const el = viewport.current
    if (!el) return
    resumeAt.current = performance.now() + 4000
    const index = Math.round(el.scrollLeft / BOOK_STEP) + dir
    el.scrollTo({ left: Math.max(0, index * BOOK_STEP), behavior: 'smooth' })
  }

  return (
    <section className="books" id="publicaciones" ref={carousel}>
      <div className="stage">
        <div className="books__bg">
          <img src={asset('/img/pilares.webp')} alt="" loading="lazy" />
        </div>
        <p className="label books__label">PUBLICACIONES · LIBROS FÍSICOS</p>
        <h2 className="h2 books__title">Ideas que se convierten en libros.</h2>
        <p className="body20 books__p">
          Una producción editorial especializada en estrategia política, campañas electorales,
          <br />
          inteligencia, comunicación y los nuevos escenarios de disputa por el poder.
        </p>

        <button
          type="button"
          className={`books__arrow books__arrow--prev${canPrev ? ' is-active' : ''}`}
          onClick={() => move(-1)}
          aria-label="Libro anterior"
          disabled={!canPrev}
        >
          <CarouselArrow dir="prev" />
        </button>
        <button
          type="button"
          className={`books__arrow books__arrow--next${canNext ? ' is-active' : ''}`}
          onClick={() => move(1)}
          aria-label="Libro siguiente"
          disabled={!canNext}
        >
          <CarouselArrow dir="next" />
        </button>

        <div className="books__viewport" ref={viewport}>
          <ul className="books__track">
            {BOOKS.map((book, i) => (
              <li key={book.cover} className="book" style={{ left: book.x }}>
                <img
                  className="book__cover"
                  src={typeof book.cover === "string" && book.cover.startsWith("/") ? asset(book.cover) : asset(`/img/${book.cover}.webp`)}
                  alt={book.title.replace('\n', ' ')}
                  loading="lazy"
                  width={317}
                  height={439}
                />
                <span className="book__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="book__title">
                  <Lines text={book.title} />
                </h3>
                <a href={book.url} className="more-link book__link" target="_blank" rel="noopener noreferrer">
                  {book.cta}
                  <img src={asset('/svg/link-conocer.svg')} alt="" width={13.18} height={10.98} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Audiobooks() {
  return (
    <section className="audio">
      <div className="stage">
        <p className="label audio__label">PUBLICACIONES · AUDIOLIBROS</p>
        <h2 className="h2 audio__title">
          El conocimiento
          <br />
          también se escucha.
        </h2>
        <p className="body20 audio__p">
          Una forma de explorar ideas, ampliar perspectivas y
          <br />
          profundizar en el pensamiento político y estratégico.
        </p>
        <span className="audio__hr" />
        {AUDIOBOOKS.map((item, i) => (
          <article key={item.title} className="audio__item" style={{ top: item.top }}>
            <img
              className="audio__cover"
              src={item.cover}
              alt={item.title.replace('\n', ' ')}
              loading="lazy"
              style={{ left: item.img.x, top: item.img.y - item.top, width: item.img.w, height: item.img.h }}
            />
            <span className="book__num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="book__title">
              <Lines text={item.title} />
            </h3>
            <a href="#" className="more-link book__link">
              CONOCER PUBLICACIÓN
              <img src={asset('/svg/link-conocer.svg')} alt="" width={13.18} height={10.98} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

/** Separa un texto en palabras animables, conservando los espacios (mismo ajuste de línea). */
function Words({ text }: { text: string }) {
  return text.split(' ').map((w, i, all) => (
    <span key={i}>
      <span className="talks__word">{w}</span>
      {i < all.length - 1 ? ' ' : ''}
    </span>
  ))
}

/**
 * Mismo revelado que "El propósito" de la landing de Goberna: la foto flota con
 * un parallax mínimo y el contenido aparece en secuencia ligado al scroll
 * — etiqueta → título que se "entinta" palabra por palabra → párrafo → botón.
 */
function Talks() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)

        // Foto: deriva lenta de ±25px mientras la sección cruza la pantalla.
        // La escala 1.06 cubre ese margen sin dejar ver los bordes.
        gsap.fromTo(
          q('.talks__bg'),
          { y: -25, scale: 1.06 },
          {
            y: 25,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )

        // Estados iniciales explícitos: en un timeline con scrub, los tweens con
        // stagger solo aplican el estado inicial al primer elemento.
        gsap.set(q('.talks__label'), { autoAlpha: 0, x: -12 })
        gsap.set(q('.talks__word'), { opacity: 0.25 })
        gsap.set(q('.talks__p'), { autoAlpha: 0, y: 12 })
        gsap.set(q('.talks__btn'), { autoAlpha: 0, y: 10 })

        gsap
          .timeline({
            defaults: { ease: 'sine.out' },
            // scrub 1.5: la animación alcanza al scroll con suavidad ("flota")
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 10%', scrub: 1.5 },
          })
          .to(q('.talks__label'), { autoAlpha: 1, x: 0, duration: 0.6 }, 0)
          .to(q('.talks__word'), { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'none' }, 0.15)
          .to(q('.talks__p'), { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.4')
          .to(q('.talks__btn'), { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')
      })
    },
    { scope: root },
  )

  return (
    <section className="talks" id="conferencias" ref={root}>
      <div className="stage">
        <img className="talks__bg" src={asset('/img/conferencias.webp')} alt="" loading="lazy" />
        <div className="talks__shade-x" />
        <div className="talks__shade-y" />
        <p className="label talks__label">PENSAMIENTO EN VOZ ALTA</p>
        <h2 className="talks__title">
          <span className="talks__title-light">
            <Words text="Ideas que salen del" />
          </span>
          <br />
          <Words text="escritorio." />
        </h2>
        <p className="body18 talks__p">
          Conferencias, medios, masterclasses y espacios especializados
          <br />
          donde comparte análisis y herramientas para comprender los
          <br />
          nuevos escenarios del poder y la toma de decisiones.
        </p>
        <a href="#conversemos" className="btn btn--light talks__btn">
          <span className="hero__btn-label">Cotiza conferencias</span>
          <img className="btn__icons" src={asset('/svg/btn-cotiza-icons.svg')} alt="" />
        </a>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="conversemos">
      <div className="stage">
        <div className="contact__photo">
          <img src={asset('/img/roberto-retrato.webp')} alt="Roberto Bazán" loading="lazy" />
        </div>
        <div className="contact__shade" />
        <div className="contact__panel" />
        <p className="label contact__label">CONVERSEMOS</p>
        <p className="contact__lead">
          <strong>Cuando la decisión importa,</strong> comprender mejor cambia
          <br />
          el resultado.
        </p>
        <ul>
          {SERVICES.map((service, i) => (
            <li key={service}>
              <img
                className="contact__arrow"
                src={asset('/svg/ico-diag.svg')}
                alt=""
                style={{ top: 323.5 + [0, 85, 171, 256][i] }}
              />
              <span className="contact__service" style={{ top: 319 + i * 85 }}>
                {service}
              </span>
            </li>
          ))}
        </ul>
        {[291, 378, 465, 552, 639].map((top) => (
          <span key={top} className="contact__line" style={{ top }} />
        ))}
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn--outline contact__btn">
          SOLICITAR UNA CONVERSACIÓN ESTRATÉGICA
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="stage">
        <img className="footer__sign" src={asset('/svg/firma-footer.svg')} alt="Roberto Bazán" width={346.84} height={72.5} />
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="footer__col" style={{ left: col.x }}>
            <p className="footer__heading">{col.title}</p>
            <ul className="footer__links">
              {col.links.map((link) => (
                <li key={link}>
                  <a href={col.title === 'LIBROS' ? '#publicaciones' : '#conferencias'}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <ul>
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                <img className="footer__social-icon" src={s.icon} alt="" style={{ top: s.iconTop }} />
                <span className="footer__social-label" style={{ top: s.textTop }}>
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="footer__qr">
          <img src={asset('/img/qr.png')} alt="Código QR de contacto" width={110} height={110} />
        </div>
      </div>
    </footer>
  )
}

function WhatsApp() {
  return (
    <a className="whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
      <img src={asset('/img/whatsapp.webp')} alt="" width={108} height={108} />
    </a>
  )
}

export default function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <About />
        <Power />
        <Experience />
        <Books />
        <Audiobooks />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}
