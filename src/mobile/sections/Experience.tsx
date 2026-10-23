import { EXPERIENCE, EXPERIENCE_INTRO } from '../../data.ts'
import { oneLine } from '../text.ts'

export function Experience() {
  return (
    <section className="m-exp m-section" id="experiencia">
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          {EXPERIENCE_INTRO.label}
        </p>
        <h2 className="m-h2" data-reveal>
          {EXPERIENCE_INTRO.title}
        </h2>
        <span className="m-hr" data-line aria-hidden="true" />
        <ul className="m-exp__areas" data-reveal aria-label="Áreas de trabajo">
          {EXPERIENCE_INTRO.areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <a href={EXPERIENCE_INTRO.cta.href} className="m-btn m-btn--outline" data-reveal>
          {EXPERIENCE_INTRO.cta.label}
        </a>

        <div className="m-exp__timeline">
          <span className="m-exp__line" data-line="y" aria-hidden="true" />
          <ul>
            {EXPERIENCE.map((item) => (
              <li key={item.title} className="m-exp__item" data-reveal>
                <span className="m-exp__dot" aria-hidden="true" />
                <img
                  className="m-exp__icon"
                  src={item.icon.src}
                  alt=""
                  loading="lazy"
                  width={item.icon.w}
                  height={item.icon.h}
                />
                <div>
                  <h3 className="m-exp__title">{item.title}</h3>
                  <p className="m-exp__text">
                    <strong>{item.strong}</strong>
                    {oneLine(item.text)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
