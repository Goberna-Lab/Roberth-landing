import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  AUDIOBOOKS,
  BOOK_AUTOSCROLL_SPEED,
  BOOK_STEP,
  BOOKS,
  bookCover,
  EXPERIENCE,
  EXPERIENCE_LAYOUT,
  FOOTER_COLUMNS,
  HEADER,
  HERO,
  NAV,
  QUOTE,
  SERVICES,
  SOCIALS,
  TALKS,
  WHATSAPP_URL,
} from './data.ts'
import { ARTICLES, BLOG, articleHref, type Article } from './blog.ts'
import { CarouselArrow } from './icons.tsx'
import { HeroSignature } from './shared/HeroSignature.tsx'
import { QuoteModal } from './shared/QuoteModal.tsx'
import { RichText } from './shared/RichText.tsx'
import { ShareMenu } from './shared/ShareMenu.tsx'
import { useArticleRoute } from './shared/useArticleRoute.ts'
import { useIsMobile } from './shared/useIsMobile.ts'
import { Words } from './shared/Words.tsx'
import MobileApp from './mobile/MobileApp.tsx'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
import './App.css'
import './blog.css'

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

/** `active`: etiqueta del menú resaltada (BLOG dentro de un artículo). */
function Header({ active }: { active?: string }) {
  return (
    <header className="header">
      <div className="stage">
        <a href="#inicio" className="header__logo">
          Roberth Estratega
        </a>
        <nav aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li
                key={item.label}
                className={`header__link${item.label === active ? ' header__link--active' : ''}`}
                style={{ left: item.x }}
              >
                <a href={item.href} aria-current={item.label === active ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={QUOTE.anchor} className="btn btn--outline header__cta">
          {HEADER.cta}
        </a>
      </div>
    </header>
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
          {HERO.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>

        <a href="#publicaciones" className="btn btn--gold hero__btn hero__btn--books">
          <span className="hero__btn-label">Ver libros</span>
          <img className="btn__icons" src={asset('/svg/btn-verlibros-icons.svg')} alt="" />
        </a>
        <a href={HERO.ctaTalks.href} className="btn btn--light hero__btn hero__btn--talks">
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
        <p className="body18 about__p1">
          Es socio fundador del <strong>GRUPO GOBERNA</strong> y actual <strong>CEO</strong>
        </p>
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

  /*
   * Al pasar el mouse, la portada se inclina hacia el cursor y un brillo lo
   * sigue (--rx/--ry/--gx/--gy). Se mide sobre el <li>, que no se transforma,
   * para que la propia inclinación no altere la medida.
   */
  const tilt = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return
    const li = e.currentTarget
    const cover = li.querySelector<HTMLElement>('.book__media')
    if (!cover) return
    const r = li.getBoundingClientRect()
    const clamp = (v: number) => Math.min(1, Math.max(0, v))
    const x = clamp(((e.clientX - r.left) / r.width) * (li.offsetWidth / cover.offsetWidth))
    const y = clamp(((e.clientY - r.top) / r.height) * (li.offsetHeight / cover.offsetHeight))
    li.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(2)}deg`)
    li.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
    li.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    li.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }
  const untilt = (e: React.PointerEvent<HTMLLIElement>) => {
    for (const v of ['--rx', '--ry', '--gx', '--gy']) e.currentTarget.style.removeProperty(v)
  }

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
              <li key={book.cover} className="book" style={{ left: book.x }} onPointerMove={tilt} onPointerLeave={untilt}>
                {/* La portada también lleva a la tienda; para lectores de pantalla basta el enlace de abajo. */}
                <a
                  href={book.url}
                  className="book__media"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ '--cover': `url(${bookCover(book)})` } as React.CSSProperties}
                >
                  <img
                    className="book__cover"
                    src={bookCover(book)}
                    alt={book.title.replace('\n', ' ')}
                    loading="lazy"
                    width={317}
                    height={439}
                  />
                </a>
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
            <a href={item.url} className="more-link book__link" target="_blank" rel="noopener noreferrer">
              CONOCER PUBLICACIÓN
              <img src={asset('/svg/link-conocer.svg')} alt="" width={13.18} height={10.98} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
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
            <Words text="Ideas que salen del" className="talks__word" />
          </span>
          <br />
          <Words text="escritorio." className="talks__word" />
        </h2>
        <p className="body18 talks__p">
          Conferencias, medios, masterclasses y espacios especializados
          <br />
          donde comparte análisis y herramientas para comprender los
          <br />
          nuevos escenarios del poder y la toma de decisiones.
        </p>
        <a href={TALKS.cta.href} className="btn btn--light talks__btn">
          <span className="hero__btn-label">{TALKS.cta.label}</span>
          <img className="btn__icons" src={asset('/svg/btn-cotiza-icons.svg')} alt="" />
        </a>
      </div>
    </section>
  )
}

/**
 * Mismo revelado ligado al scroll que "Pensamiento en voz alta": etiqueta →
 * frase → servicios que se entintan uno tras otro mientras se dibujan sus
 * líneas → botón.
 */
function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const lines = q('.contact__line')
        const arrows = q('.contact__arrow')
        const services = q('.contact__service')

        // Estados iniciales explícitos: en un timeline con scrub, los tweens con
        // stagger solo aplican el estado inicial al primer elemento.
        gsap.set(q('.contact__label'), { autoAlpha: 0, x: -12 })
        gsap.set(q('.contact__lead'), { autoAlpha: 0, y: 12 })
        gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(arrows, { autoAlpha: 0, x: -10, y: 10 })
        gsap.set(services, { opacity: 0.25, x: -8 })
        gsap.set(q('.contact__btn'), { autoAlpha: 0, y: 10 })

        const tl = gsap
          .timeline({
            defaults: { ease: 'sine.out' },
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 5%', scrub: 1.5 },
          })
          .to(q('.contact__label'), { autoAlpha: 1, x: 0, duration: 0.6 }, 0)
          .to(q('.contact__lead'), { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15)
          .to(lines[0], { scaleX: 1, duration: 0.6 }, 0.6)

        // Cada servicio: flecha → texto → la línea que lo cierra por debajo.
        services.forEach((service: HTMLElement, i: number) => {
          const at = 0.85 + i * 0.45
          tl.to(arrows[i], { autoAlpha: 1, x: 0, y: 0, duration: 0.5 }, at)
            .to(service, { opacity: 1, x: 0, duration: 0.5 }, at + 0.05)
            .to(lines[i + 1], { scaleX: 1, duration: 0.6 }, at + 0.15)
        })

        tl.to(q('.contact__btn'), { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
      })
    },
    { scope: root },
  )

  return (
    <section className="contact" id="conversemos" ref={root}>
      <div className="stage">
        <div className="contact__photo">
          <img src={asset('/img/contacto-conferencia.webp')} alt="Roberto Bazán en una conferencia" loading="lazy" />
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
        <a className="footer__qr" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
          <img src={asset('/img/qr.png')} alt="Código QR de contacto" width={110} height={110} />
        </a>
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

const Calendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
  </svg>
)

const Clock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Fecha · minutos de lectura, en dorado (cabecera de artículo y tarjetas). */
function ArticleMeta({ article, className }: { article: Article; className: string }) {
  return (
    <p className={className}>
      <span>
        <Calendar />
        <time>{article.date}</time>
      </span>
      <span>
        <Clock />
        {article.minutes} MIN DE LECTURA
      </span>
    </p>
  )
}

/** Blog (XD): tres tarjetas de 482px que suben una tras otra al entrar en pantalla. */
function Blog() {
  const sectionRef = useRevealOnScroll<HTMLElement>('.blog__card', BLOG_CARD_REVEAL)

  return (
    <section className="blog" id="blog" ref={sectionRef}>
      <div className="stage">
        <p className="blog__label">{BLOG.label}</p>
        <h2 className="blog__title">
          <span>{BLOG.titleGold}</span>
          {'  '}
          {BLOG.title}
        </h2>
        <p className="blog__text">{BLOG.text}</p>
        {ARTICLES.map((article, i) => {
          const href = articleHref(article.slug)
          return (
            <article
              key={article.slug}
              className="blog__card"
              style={{ left: 200 + i * 519, transitionDelay: `${i * 120}ms` }}
            >
              <a href={href} className="blog__img" tabIndex={-1} aria-hidden="true">
                <img src={article.image} alt="" loading="lazy" style={{ objectPosition: article.cardPosition }} />
              </a>
              <p className="blog__day">{article.day}</p>
              <h3 className={`blog__card-title${article.cardCompact ? ' blog__card-title--compact' : ''}`}>
                <a href={href}>
                  {article.title[0]}
                  <br />
                  {article.title[1]}
                </a>
              </h3>
              <p className="blog__excerpt">{article.excerpt}</p>
              <span className="blog__rule" />
              <p className="blog__date">{article.dateLong}</p>
              <ShareMenu article={article} className="blog__share" />
              <a href={href} className="blog__more">
                {BLOG.cta}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const BLOG_CARD_REVEAL = { threshold: 0.3 }

const SITE_TITLE = 'Roberth Estratega | Roberto Bazán'

/** Página de artículo (blog.xd): título en franja clara, imagen y cuerpo de 1053px. */
function ArticlePage({ article }: { article: Article }) {
  useEffect(() => {
    document.title = `${article.title.join(' ')} | Roberth Estratega`
    return () => {
      document.title = SITE_TITLE
    }
  }, [article])

  return (
    <div className="page">
      <Header active="BLOG" />
      <main>
        <article className="post">
          <header className="post__head">
            <h1 className="post__title">
              {article.title[0]}
              <br />
              {article.title[1]}
            </h1>
            <ArticleMeta article={article} className="post__meta" />
          </header>
          <div className="post__hero">
            <img src={article.image} alt="" style={{ objectPosition: article.imagePosition }} />
          </div>
          <div className="post__body">
            <p className="post__lead">{article.lead}</p>
            {article.blocks.map((block, i) =>
              block.type === 'h2' ? (
                <h2 key={i} className="post__h2">
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="post__p">
                  <RichText text={block.text} />
                </p>
              ),
            )}
          </div>
        </article>
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}

function DesktopApp() {
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
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}

/**
 * Escritorio (lienzo de 1920px) desde 1024px; por debajo, la versión mobile.
 * Un hash #/blog/<slug> abre ese artículo en lugar de la landing.
 */
export default function App() {
  const article = useArticleRoute()
  const isMobile = useIsMobile()
  const desktop = article ? <ArticlePage key={article.slug} article={article} /> : <DesktopApp />

  return (
    <>
      {isMobile ? <MobileApp article={article} /> : desktop}
      <QuoteModal />
    </>
  )
}
