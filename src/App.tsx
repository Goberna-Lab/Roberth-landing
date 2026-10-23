import { useEffect, useRef, useState } from 'react'
import {
  AUDIOBOOKS,
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
import './App.css'

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

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__stage stage">
        <img className="hero__bg" src="/img/hero-bg.webp" alt="" width={1920} height={880} fetchPriority="high" />
        <div className="hero__shade" />
        <div className="hero__person">
          <img
            src="/img/hero-roberto.webp"
            alt="Roberto Bazán"
            width={661}
            height={993}
            fetchPriority="high"
          />
        </div>

        <h1 className="hero__title">
          <img src="/svg/firma-hero.svg" alt="Roberto Bazán" width={662.94} height={138.58} />
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
          <img className="btn__icons" src="/svg/btn-verlibros-icons.svg" alt="" />
        </a>
        <a href="#conversemos" className="btn btn--light hero__btn hero__btn--talks">
          <span className="hero__btn-label">Cotiza conferencias</span>
          <img className="btn__icons" src="/svg/btn-cotiza-icons.svg" alt="" />
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="roberth">
      <div className="stage">
        <img className="about__bg" src="/img/about-bg.webp" alt="" loading="lazy" />
        <p className="label about__label">UNA MIRADA MULTIDIMENSIONAL</p>
        <img className="about__icon" src="/svg/ico-columnas.svg" alt="" width={47.61} height={44.36} />
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
          <img src="/img/about-1.webp" alt="Roberto Bazán junto a autoridades y consultores" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--2">
          <img src="/img/about-2.webp" alt="Conferencia ante un auditorio" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--3">
          <img src="/img/about-3.webp" alt="Roberto Bazán exponiendo" loading="lazy" />
        </figure>
        <figure className="about__photo about__photo--4">
          <img src="/img/about-4.webp" alt="Roberto Bazán en un encuentro internacional" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

function Power() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    const clip = img?.parentElement
    if (!img || !clip) return
    let raf = 0

    const update = () => {
      raf = 0
      const rect = clip.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        img.style.transform = 'translate3d(0, 0, 0)'
        return
      }
      const scale = rect.width / 1672 || 1
      img.style.transform = `translate3d(0, ${-rect.top / scale}px, 0)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="power">
      <div className="stage">
        <div className="power__img">
          <img ref={imgRef} src="/img/capitolio.webp" alt="" loading="lazy" />
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
  return (
    <section className="exp" id="experiencia">
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
        {L.dotTop.map((top) => (
          <span key={top} className="exp__dot" style={{ top }} />
        ))}
        {L.dividerTop.map((top) => (
          <span key={top} className="exp__divider" style={{ top }} />
        ))}
        <ul>
          {EXPERIENCE.map((item, i) => (
            <li key={item.title}>
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

  const move = (dir: 1 | -1) => {
    const el = viewport.current
    if (!el) return
    const index = Math.round(el.scrollLeft / BOOK_STEP) + dir
    el.scrollTo({ left: Math.max(0, index * BOOK_STEP), behavior: 'smooth' })
  }

  return (
    <section className="books" id="publicaciones">
      <div className="stage">
        <div className="books__bg">
          <img src="/img/pilares.webp" alt="" loading="lazy" />
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
                  src={`/img/${book.cover}.webp`}
                  alt={book.title.replace('\n', ' ')}
                  loading="lazy"
                  width={317}
                  height={439}
                />
                <span className="book__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="book__title">
                  <Lines text={book.title} />
                </h3>
                <a href="#" className="more-link book__link">
                  {book.cta}
                  <img src="/svg/link-conocer.svg" alt="" width={13.18} height={10.98} />
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
              <img src="/svg/link-conocer.svg" alt="" width={13.18} height={10.98} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function Talks() {
  return (
    <section className="talks" id="conferencias">
      <div className="stage">
        <img className="talks__bg" src="/img/conferencias.webp" alt="" loading="lazy" />
        <div className="talks__shade-x" />
        <div className="talks__shade-y" />
        <p className="label talks__label">PENSAMIENTO EN VOZ ALTA</p>
        <h2 className="talks__title">
          <span className="talks__title-light">Ideas que salen del</span>
          <br />
          escritorio.
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
          <img className="btn__icons" src="/svg/btn-cotiza-icons.svg" alt="" />
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
          <img src="/img/roberto-retrato.webp" alt="Roberto Bazán" loading="lazy" />
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
                src="/svg/ico-diag.svg"
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
        <img className="footer__sign" src="/svg/firma-footer.svg" alt="Roberto Bazán" width={346.84} height={72.5} />
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
          <img src="/img/qr.png" alt="Código QR de contacto" width={110} height={110} />
        </div>
      </div>
    </footer>
  )
}

function WhatsApp() {
  return (
    <a className="whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
      <img src="/img/whatsapp.webp" alt="" width={108} height={108} />
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
