import { REGRET } from '../../data.ts'

/** Regret Theory sobre el capitolio, con el mismo parallax fijo que en escritorio. */
export function Regret() {
  return (
    <section className="m-regret m-section">
      <div className="m-regret__bg" aria-hidden="true">
        <img src={REGRET.background} alt="" loading="lazy" width={1676} height={938} />
      </div>
      <div className="m-wrap m-regret__inner">
        <p className="m-label" data-reveal>
          {REGRET.label}
        </p>
        <h2 className="m-regret__title" data-reveal>
          <span className="m-regret__title-1">{REGRET.titleLight}</span>
          <span className="m-regret__title-2">{REGRET.titleGold}</span>
        </h2>
        <div className="m-regret__body" data-reveal>
          <p className="m-regret__theory">
            <em>{REGRET.theory}</em> <em>{REGRET.theoryNote}</em>
          </p>
          {REGRET.paragraphs.map((lines, i) => (
            <p key={i}>{lines.join(' ')}</p>
          ))}
        </div>
        <span className="m-regret__hr" data-line aria-hidden="true" />
        <figure className="m-regret__quote" data-reveal>
          <img className="m-regret__mark m-regret__mark--open" src={REGRET.quoteOpen} alt="" width={60} height={40} />
          <blockquote>
            <span className="m-regret__quote-line">{REGRET.quote[0]}</span>{' '}
            <span className="m-regret__quote-line">
              {REGRET.quote[1]} <span className="m-regret__gold">{REGRET.quoteGold}</span>
            </span>
          </blockquote>
          <img className="m-regret__mark m-regret__mark--close" src={REGRET.quoteClose} alt="" width={60} height={40} />
          <img className="m-regret__signature" src={REGRET.signature} alt="Firma de Roberto Bazán" width={314} height={66} />
        </figure>
      </div>
    </section>
  )
}
