/** Lleva a un ancla respetando la cabecera fija (scroll-margin-top de cada sección). */
export function goToAnchor(href: string) {
  const target = href.length > 1 ? document.querySelector<HTMLElement>(href) : null
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', href)
}
