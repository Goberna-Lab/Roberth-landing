/**
 * Lleva a un ancla respetando la cabecera fija (scroll-margin-top de cada
 * sección). Si el ancla no está en pantalla (p. ej. dentro de un artículo),
 * cambia el hash para volver a la landing, que baja hasta ella al montarse.
 */
export function goToAnchor(href: string) {
  const target = href.length > 1 ? document.querySelector<HTMLElement>(href) : null
  if (!target) {
    if (href.length > 1) location.hash = href
    return
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', href)
}
