import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { QUOTE, TALKS, WHATSAPP_URL } from '../data.ts'
import './quote-modal.css'

/** Solicitud en texto de WhatsApp (con *negritas*); omite los campos vacíos. */
function quoteMessage(data: FormData) {
  const field = (name: string) => String(data.get(name) ?? '').trim()
  const date = field('fecha') && new Date(`${field('fecha')}T12:00`).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
  const rows: [string, string][] = [
    ['Nombre', field('nombre')],
    ['Organización', field('organizacion')],
    ['Tipo de evento', field('tipo')],
    ['Tipo de conferencia', field('conferencia')],
    ['Modalidad', field('modalidad')],
    ['Fecha tentativa', date],
    ['Ciudad', field('ciudad')],
    ['Correo', field('correo')],
    ['Teléfono', field('telefono')],
  ]
  const lines = ['Hola Roberto, quiero cotizar una conferencia.', '']
  for (const [label, value] of rows) if (value) lines.push(`*${label}:* ${value}`)
  if (field('mensaje')) lines.push('', field('mensaje'))
  return lines.join('\n')
}

/** Opciones de una sola elección presentadas como píldoras (radios accesibles). */
function Pills({ name, options, legend }: { name: string; options: string[]; legend: string }) {
  return (
    <fieldset className="qmodal__field qmodal__field--pills">
      <legend>{legend}</legend>
      <div className="qmodal__pills">
        {options.map((option) => (
          <label key={option} className="qmodal__pill">
            <input type="radio" name={name} value={option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * Formulario "Cotiza conferencias" en un <dialog> nativo. Lo abre cualquier
 * enlace a #cotizar (sin JS el enlace sigue llevando a la página), se cierra
 * con Escape, la X o tocando fuera, y el navegador contiene el foco. No hay
 * servidor: al enviar abre WhatsApp con la solicitud escrita. Se monta en
 * <body> para quedar fuera del `zoom` del lienzo y medir igual en todas las
 * pantallas.
 */
export function QuoteModal() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.(`a[href="${QUOTE.anchor}"]`)
      if (!link) return
      e.preventDefault()
      setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    if (!open) return
    // Sin scroll de fondo mientras está abierto.
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prevOverflow
    }
  }, [open])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const text = encodeURIComponent(quoteMessage(new FormData(form)))
    window.open(`${WHATSAPP_URL}?text=${text}`, '_blank', 'noopener,noreferrer')
    form.reset()
    setOpen(false)
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="qmodal"
      aria-labelledby="qmodal-title"
      onClose={() => setOpen(false)}
      // El contenido llena el <dialog>: un clic sobre el propio dialog es el fondo.
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className="qmodal__inner">
        <aside className="qmodal__aside">
          <img className="qmodal__photo" src={TALKS.background} alt="" width={1920} height={1075} />
          <div className="qmodal__aside-body">
            <p className="qmodal__label">{QUOTE.label}</p>
            <h2 id="qmodal-title" className="qmodal__title">
              {QUOTE.titleLight} <span>{QUOTE.titleGold}</span>
            </h2>
            <p className="qmodal__text">{QUOTE.text}</p>
            <ul className="qmodal__formats">
              {QUOTE.conferences.map((conference) => (
                <li key={conference}>{conference}</li>
              ))}
            </ul>
          </div>
        </aside>

        <form className="qmodal__form" onSubmit={submit}>
          <div className="qmodal__grid">
            <label className="qmodal__field">
              <span>Nombre y apellido *</span>
              <input name="nombre" type="text" autoComplete="name" required />
            </label>
            <label className="qmodal__field">
              <span>Organización</span>
              <input name="organizacion" type="text" autoComplete="organization" />
            </label>
            <label className="qmodal__field">
              <span>Correo *</span>
              <input name="correo" type="email" autoComplete="email" required />
            </label>
            <label className="qmodal__field">
              <span>Teléfono</span>
              <input name="telefono" type="tel" autoComplete="tel" />
            </label>
            <label className="qmodal__field">
              <span>Tipo de evento *</span>
              <select name="tipo" required defaultValue="">
                <option value="" disabled>
                  Selecciona
                </option>
                {QUOTE.eventTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="qmodal__field">
              <span>Tipo de conferencia</span>
              <select name="conferencia" defaultValue="">
                <option value="" disabled>
                  Selecciona
                </option>
                {QUOTE.conferences.map((conference) => (
                  <option key={conference}>{conference}</option>
                ))}
              </select>
            </label>
            <label className="qmodal__field">
              <span>Fecha tentativa</span>
              <input name="fecha" type="date" />
            </label>
            <label className="qmodal__field">
              <span>Ciudad / país</span>
              <input name="ciudad" type="text" autoComplete="address-level2" />
            </label>
          </div>

          <Pills name="modalidad" legend="Modalidad" options={QUOTE.modalities} />

          <label className="qmodal__field">
            <span>Cuéntanos más sobre el evento</span>
            <textarea name="mensaje" rows={1} />
          </label>

          <button type="submit" className="qmodal__submit">
            {QUOTE.submit}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="qmodal__note">{QUOTE.note}</p>
        </form>

        <button type="button" className="qmodal__close" aria-label="Cerrar" onClick={() => setOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </dialog>,
    document.body,
  )
}
