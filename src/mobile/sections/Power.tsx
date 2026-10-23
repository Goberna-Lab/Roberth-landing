import { POWER } from '../../data.ts'

export function Power() {
  return (
    <section className="m-power">
      <div className="m-power__bg" data-parallax="24" aria-hidden="true">
        <img src={POWER.background} alt="" loading="lazy" width={1676} height={938} />
      </div>
      <h2 className="m-wrap m-power__title">
        <span className="m-power__lead" data-reveal>
          {POWER.lead}
        </span>{' '}
        <span className="m-power__word" data-reveal data-reveal-delay="0.15">
          {POWER.word}
        </span>
      </h2>
    </section>
  )
}
