import { TALKS } from '../../data.ts'
import { Words } from '../../shared/Words.tsx'
import { IconArrowRight, IconCalendar } from '../icons.tsx'

/** Mismo revelado que en escritorio: foto con parallax corto y título que se entinta. */
export function Talks() {
  return (
    <section className="m-talks" id="conferencias">
      <div className="m-talks__media" aria-hidden="true">
        <div className="m-talks__bg" data-parallax="22">
          <img src={TALKS.background} alt="" loading="lazy" width={1920} height={1075} />
        </div>
      </div>
      <div className="m-wrap m-talks__body">
        <p className="m-label" data-reveal>
          {TALKS.label}
        </p>
        <h2 className="m-talks__title" data-words>
          <span className="m-talks__title-light">
            <Words text={TALKS.titleLight} className="m-word" />
          </span>{' '}
          <Words text={TALKS.titleGold} className="m-word" />
        </h2>
        <p className="m-text" data-reveal>
          {TALKS.text}
        </p>
        <a href={TALKS.cta.href} className="m-btn m-btn--light" data-reveal>
          <IconCalendar />
          <span>{TALKS.cta.label}</span>
          <IconArrowRight size={20} />
        </a>
      </div>
    </section>
  )
}
