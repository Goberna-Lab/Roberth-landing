import { AUDIOBOOKS, AUDIOBOOKS_INTRO } from '../../data.ts'
import { IconArrowRight } from '../icons.tsx'
import { oneLine } from '../text.ts'

export function Audiobooks() {
  return (
    <section className="m-audio m-section">
      <div className="m-wrap">
        <p className="m-label" data-reveal>
          {AUDIOBOOKS_INTRO.label}
        </p>
        <h2 className="m-h2" data-reveal>
          {AUDIOBOOKS_INTRO.title}
        </h2>
        <p className="m-text" data-reveal>
          {AUDIOBOOKS_INTRO.text}
        </p>
        <span className="m-hr" data-line aria-hidden="true" />
        <ul className="m-audio__list">
          {AUDIOBOOKS.map((item, i) => (
            <li key={item.title} className="m-audio__item" data-reveal>
              <img className="m-audio__cover" src={item.cover} alt="" loading="lazy" width={item.img.w} height={item.img.h} />
              <div>
                <span className="m-book__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="m-book__title">{oneLine(item.title)}</h3>
                <a href={item.url} className="m-more" target="_blank" rel="noopener noreferrer">
                  {AUDIOBOOKS_INTRO.cta}
                  <IconArrowRight size={16} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
