import { ABOUT } from '../../data.ts'

/** Desde dónde llega cada foto del mosaico (x, y, giro) antes de encajar. */
const PIECES = ['-40,-30,-4', '-36,40,5', '36,40,-5', '40,40,3']

export function About() {
  return (
    <section className="m-about m-section" id="roberth">
      <img className="m-about__bg" src={ABOUT.background} alt="" loading="lazy" width={1672} height={941} />
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          {ABOUT.label}
        </p>
        <img className="m-about__icon" src={ABOUT.icon} alt="" width={48} height={45} data-reveal />
        <h2 className="m-about__title" data-reveal>
          <span className="m-about__title-top">{ABOUT.titleTop}</span>
          <span className="m-about__title-bottom">{ABOUT.titleBottom}</span>
        </h2>
        <span className="m-rule" data-line aria-hidden="true" />
        <p className="m-lead" data-reveal>
          {ABOUT.lead.map((part) => (part.strong ? <strong key={part.text}>{part.text}</strong> : part.text))}
        </p>
        <p className="m-text" data-reveal>
          {ABOUT.text}
        </p>
        <div className="m-btns" data-reveal>
          {ABOUT.ctas.map((cta) => (
            <a key={cta.label} href={cta.href} className="m-btn m-btn--outline">
              {cta.label}
            </a>
          ))}
        </div>

        <div className="m-about__mosaic">
          {ABOUT.photos.map((photo, i) => (
            <figure key={photo.src} className={`m-about__photo m-about__photo--${i + 1}`} data-piece={PIECES[i]}>
              <img src={photo.src} alt={photo.alt} loading="lazy" width={photo.width} height={photo.height} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
