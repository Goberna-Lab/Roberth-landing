import { useLayoutEffect, useRef, useState } from 'react'
import { FOOTER_COLUMNS, HERO, WHATSAPP_URL } from '../../data.ts'
import { HeroSignature } from '../../shared/HeroSignature.tsx'
import { IconArrowRight, IconBook, IconCalendar, IconChat } from '../icons.tsx'
import { TopicSelect } from '../TopicSelect.tsx'

/** Temas de conferencia: los mismos que la columna CONFERENCIAS del pie. */
const TOPICS = FOOTER_COLUMNS.find((col) => col.title === 'CONFERENCIAS')?.links ?? []

/** WhatsApp con el mensaje ya escrito, incluido el tema si se eligió. */
const quoteUrl = (topic: string | null) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(
    topic ? `Hola Roberto, quiero cotizar la conferencia "${topic}".` : 'Hola Roberto, quiero cotizar una conferencia.',
  )}`

/**
 * Hero vertical (Marca personal-RB-mobile.xd): arriba la firma y los roles;
 * abajo, sobre la oficina, los dos CTA de 300px centrados.
 * "Cotiza conferencias" es un desplegable de temas: al abrirlo aparece debajo
 * "Solicitar cotización", que abre WhatsApp con el tema elegido.
 */
export function Hero() {
  const [topic, setTopic] = useState<string | null>(null)
  // Alto de la lista de temas abierta: el hero crece hacia abajo en esa medida.
  const [listHeight, setListHeight] = useState(0)
  // "Solicitar cotización" se ve con la lista abierta o con un tema ya elegido.
  const showSend = listHeight > 0 || topic !== null
  const send = useRef<HTMLDivElement>(null)
  const [sendHeight, setSendHeight] = useState(0)
  useLayoutEffect(() => {
    // Alto del botón con su separación; se mide aunque esté plegado.
    const inner = send.current?.firstElementChild
    if (inner) setSendHeight(inner.scrollHeight)
  }, [])
  const extra = listHeight + (showSend ? sendHeight : 0)

  return (
    <section className="m-hero" id="inicio" style={{ '--m-hero-extra': `${extra}px` } as React.CSSProperties}>
      <div className="m-hero__media" aria-hidden="true">
        <div className="m-hero__bg" data-parallax="18">
          <picture>
            {/* Teléfono: foto vertical del XD mobile; tablet: la horizontal de escritorio. */}
            <source media="(min-width: 640px)" srcSet={HERO.background} width={1920} height={1081} />
            <img src={HERO.backgroundMobile} alt="" width={853} height={1844} fetchPriority="high" />
          </picture>
        </div>
        <div className="m-hero__shade" />
      </div>

      <div className="m-wrap m-hero__head">
        <div className="m-hero__intro">
          <h1 className="m-hero__title">
            <HeroSignature />
          </h1>
          <ul className="m-hero__roles">
            {HERO.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="m-hero__stage">
        <div className="m-wrap m-hero__ctas">
          <a href={HERO.ctaBooks.href} className="m-btn m-btn--gold">
            <IconBook />
            <span>{HERO.ctaBooks.label}</span>
            <IconArrowRight size={20} />
          </a>
          <TopicSelect
            placeholder={HERO.ctaTalks.label}
            options={TOPICS}
            value={topic}
            onChange={setTopic}
            onListHeight={setListHeight}
            buttonClassName="m-btn m-btn--light"
            icon={<IconCalendar />}
            revealBelow={topic === null ? sendHeight : 0}
          />
          <div className={`m-hero__send${showSend ? ' is-shown' : ''}`} ref={send} inert={!showSend}>
            <div className="m-hero__send-inner">
              <a href={quoteUrl(topic)} target="_blank" rel="noreferrer" className="m-btn m-btn--gold">
                <IconChat />
                <span>{HERO.ctaSend}</span>
                <IconArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
