import { HERO } from '../../data.ts'
import { HeroSignature } from '../../shared/HeroSignature.tsx'
import { IconArrowRight, IconBook, IconCalendar } from '../icons.tsx'

/**
 * Hero vertical: firma y roles arriba, Roberto entrando desde la derecha en la
 * mitad inferior y los dos CTA al pie, sobre un degradado que los hace legibles.
 */
export function Hero() {
  return (
    <section className="m-hero" id="inicio">
      <div className="m-hero__media" aria-hidden="true">
        <div className="m-hero__bg" data-parallax="18">
          <img src={HERO.background} alt="" width={1920} height={880} fetchPriority="high" />
        </div>
        <img className="m-hero__person" src={HERO.person} alt="" width={1024} height={1536} fetchPriority="high" />
        <div className="m-hero__shade" />
      </div>

      <div className="m-wrap m-hero__content">
        <h1 className="m-hero__title">
          <HeroSignature />
        </h1>
        <ul className="m-hero__roles">
          {HERO.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>

        <div className="m-hero__ctas">
          <a href={HERO.ctaBooks.href} className="m-btn m-btn--gold">
            <IconBook />
            <span>{HERO.ctaBooks.label}</span>
            <IconArrowRight size={20} />
          </a>
          <a href={HERO.ctaTalks.href} className="m-btn m-btn--light">
            <IconCalendar />
            <span>{HERO.ctaTalks.label}</span>
            <IconArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
