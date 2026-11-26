import { SUSURRO, susurroOrderUrl } from '../../data.ts'
import { useSusurroPact } from '../../shared/useSusurroPact.ts'

/**
 * Preventa de La Orden del Susurro. El XD solo trae la versión de escritorio:
 * aquí los libros sobre el pedestal van arriba y la compra debajo, en una columna.
 */
export function Susurro() {
  const { checkbox, accepted, warn, hintId, onAcceptedChange, onBuy } = useSusurroPact()

  return (
    <section className="m-susurro m-section" id="susurro" aria-label={`Preventa de ${SUSURRO.title}`}>
      <figure className="m-susurro__books" data-reveal>
        <img src={SUSURRO.booksMobile} alt={SUSURRO.booksAlt} width={1040} height={933} loading="lazy" />
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
          {SUSURRO.buy.map((b) => (
            <a
              key={b.format}
              className={`m-btn ${b.variant === 'gold' ? 'm-susurro__buy--gold' : 'm-btn--light'}`}
              href={susurroOrderUrl(b.format)}
              target="_blank"
              rel="noreferrer"
              onClick={onBuy}
            >
              {b.label}
            </a>
          ))}
        </div>
        <p className="m-susurro__note" data-reveal>
          <strong>{SUSURRO.noteGold}</strong>
          {SUSURRO.note.join(' ')}
        </p>
      </div>
    </section>
  )
}
