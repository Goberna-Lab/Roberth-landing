import { useEffect, useState } from 'react'
import { WHATSAPP_ICON, WHATSAPP_URL } from '../../data.ts'

/**
 * Botón flotante. Se oculta mientras se ve el hero (tiene sus propios CTA) y
 * cuando aparecen el CTA de contacto o el pie, para no taparlos.
 */
export function WhatsApp() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const targets = [...document.querySelectorAll('#inicio, .m-contact__cta, .m-footer')]
    const showing = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) showing.add(e.target)
        else showing.delete(e.target)
      }
      setHidden(showing.size > 0)
    })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <a
      className={`m-whatsapp${hidden ? ' is-hidden' : ''}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
    >
      <img src={WHATSAPP_ICON} alt="" width={108} height={108} />
    </a>
  )
}
