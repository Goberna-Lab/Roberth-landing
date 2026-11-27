import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SUSURRO, susurroOrderUrl } from '../../data.ts'
import { useSusurroPact } from '../../shared/useSusurroPact.ts'

/**
 * Preventa de La Orden del Susurro. El XD solo trae la versión de escritorio:
 * aquí los libros sobre el pedestal van arriba y la compra debajo, en una columna.
 */
export function Susurro() {
  const { checkbox, accepted, warn, hintId, onAcceptedChange, onBuy } = useSusurroPact()
  const root = useRef<HTMLElement>(null)

  // Los mismos efectos que en escritorio: el fondo se asienta con el scroll
  // (anclado en la base de los libros) y aura y niebla corren solo a la vista.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.fromTo(
          q('.m-susurro__bg'),
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            transformOrigin: '54% 84%',
            scrollTrigger: { trigger: q('.m-susurro__books')[0], start: 'top bottom', end: 'top 30%', scrub: 1 },
          },
        )
        ScrollTrigger.create({ trigger: root.current, start: 'top bottom', end: 'bottom top', toggleClass: 'is-live' })
      })
    },
    { scope: root },
  )

  const fog = { backgroundImage: `url(${SUSURRO.fog})` }

  return (
    <section className="m-susurro m-section" id="susurro" ref={root} aria-label={`Preventa de ${SUSURRO.title}`}>
      <figure className="m-susurro__books" data-reveal>
        <img className="m-susurro__bg" src={SUSURRO.backgroundMobile} alt="" width={1040} height={933} loading="lazy" />
        <div className="m-susurro__aura" aria-hidden="true" />
        <div className="m-susurro__mist" aria-hidden="true">
          <span className="m-susurro__fog m-susurro__fog--back" style={fog} />
        </div>
        <img className="m-susurro__book" src={SUSURRO.books} alt={SUSURRO.booksAlt} width={1475} height={1066} loading="lazy" />
        <div className="m-susurro__mist m-susurro__mist--front" aria-hidden="true">
          <span className="m-susurro__fog m-susurro__fog--front" style={fog} />
        </div>
      </figure>
      <div className="m-wrap m-susurro__inner">
        <p className="m-susurro__price" data-reveal>
          <span className="m-susurro__now">{SUSURRO.price}</span>
          <s className="m-susurro__was">
            <span className="sr-only">Antes </span>
            {SUSURRO.oldPrice}
          </s>
        </p>
        <p className="m-susurro__details" data-reveal>
          {/* El punto separador viaja con la palabra anterior: ninguna línea empieza con "·". */}
          {SUSURRO.details.join(' ').replaceAll(' · ', '\u00a0· ')}
        </p>
        <span className="m-susurro__hr" data-line aria-hidden="true" />
        <label className={`m-susurro__pact${warn ? ' is-warn' : ''}`} data-reveal>
          <input
            ref={checkbox}
            type="checkbox"
            checked={accepted}
            onChange={(e) => onAcceptedChange(e.target.checked)}
            aria-describedby={warn ? hintId : undefined}
          />
          <span className="m-susurro__box" aria-hidden="true" />
          <span>{SUSURRO.pact.join(' ')}</span>
        </label>
        <p className="m-susurro__hint" id={hintId} role="status">
          {warn ? SUSURRO.pactHint : ''}
        </p>
        <div className="m-btns m-susurro__btns" data-reveal>
          <a
            className="m-btn m-susurro__buy--gold"
            href={susurroOrderUrl(SUSURRO.buy.format)}
            target="_blank"
            rel="noreferrer"
            onClick={onBuy}
          >
            {SUSURRO.buy.label}
          </a>
        </div>
        <p className="m-susurro__note" data-reveal>
          <strong>{SUSURRO.noteGold}</strong>
          {SUSURRO.note.join(' ')}
        </p>
      </div>
    </section>
  )
}
