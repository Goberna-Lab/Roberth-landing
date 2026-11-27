import { useEffect, useState } from 'react'
import { ARTICLE_PREFIX, type Article } from '../blog.ts'
import { useArticles } from '../bravo.ts'

const fromHash = (hash: string, articles: Article[]) =>
  hash.startsWith(ARTICLE_PREFIX) ? (articles.find((a) => a.slug === hash.slice(ARTICLE_PREFIX.length)) ?? null) : null

/**
 * Artículo abierto según el hash (#/blog/<slug>); null = la landing. Hash y
 * no rutas: el sitio es estático (vps2 y GitHub Pages) y así no necesita
 * reglas de reescritura en el servidor.
 *
 * Al abrir un artículo sube al inicio; al volver a la landing con un ancla
 * (p. ej. el BLOG del menú, #blog) baja hasta ella una vez montada.
 */
export function useArticleRoute() {
  const articles = useArticles()
  const [hash, setHash] = useState(() => location.hash)
  // Derivado de la lista vigente: un enlace directo a una nota de Bravo funciona
  // en cuanto la lista llega (y antes de eso muestra la landing).
  const article = fromHash(hash, articles)

  useEffect(() => {
    const onHash = () => setHash(location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (article) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const hash = location.hash
    if (hash.length < 2 || hash.startsWith('#/')) return
    const raf = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(raf)
  }, [article])

  return article
}
