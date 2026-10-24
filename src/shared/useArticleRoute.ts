import { useEffect, useState } from 'react'
import { ARTICLES, ARTICLE_PREFIX, type Article } from '../blog.ts'

const fromHash = (hash: string) =>
  hash.startsWith(ARTICLE_PREFIX) ? (ARTICLES.find((a) => a.slug === hash.slice(ARTICLE_PREFIX.length)) ?? null) : null

/**
 * Artículo abierto según el hash (#/blog/<slug>); null = la landing. Hash y
 * no rutas: el sitio es estático (vps2 y GitHub Pages) y así no necesita
 * reglas de reescritura en el servidor.
 *
 * Al abrir un artículo sube al inicio; al volver a la landing con un ancla
 * (p. ej. el BLOG del menú, #blog) baja hasta ella una vez montada.
 */
export function useArticleRoute() {
  const [article, setArticle] = useState<Article | null>(() => fromHash(location.hash))

  useEffect(() => {
    const onHash = () => setArticle(fromHash(location.hash))
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
