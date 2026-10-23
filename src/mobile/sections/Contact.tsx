import { CONTACT, SERVICES, WHATSAPP_URL } from '../../data.ts'
import { IconArrowDiag } from '../icons.tsx'

export function Contact() {
  return (
    <section className="m-contact" id="conversemos">
      <div className="m-contact__photo">
        <img src={CONTACT.portrait} alt="Roberto Bazán en una conferencia" loading="lazy" width={710} height={578} data-unveil />
      </div>
      <div className="m-contact__panel">
        <div className="m-wrap">
          <p className="m-label" data-reveal>
            {CONTACT.label}
          </p>
          <p className="m-contact__lead" data-reveal>
            <strong>{CONTACT.leadStrong}</strong> {CONTACT.lead}
          </p>
          <ul className="m-contact__services" data-list>
            {SERVICES.map((service, i) => (
              <li key={service}>
                {i === 0 && <span className="m-contact__rule m-contact__rule--top" data-list-rule aria-hidden="true" />}
                <span className="m-contact__icon" data-list-icon>
                  <IconArrowDiag size={22} />
                </span>
                <span data-list-text>{service}</span>
                <span className="m-contact__rule" data-list-rule aria-hidden="true" />
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="m-btn m-btn--outline m-btn--block m-contact__cta"
            data-reveal
          >
            {CONTACT.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
