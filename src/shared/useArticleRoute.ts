import { useEffect, useState } from 'react'
import { ARTICLE_PREFIX } from '../blog.ts'
import { useArticles } from '../bravo.ts'

const PATH_RE = /^\/blog\/([a-z0-9-]+)\/?$/

/**
 * Slug que pide la URL, o null para la landing:
 *  - /blog/<slug>/   la URL limpia (la que se comparte; cada nota tiene su página con su vista previa)
 *  - #/blog/<slug>   enlaces viejos y los de la propia landing (se convierten a la limpia)
 *  - #blog, #inicio… un ancla de la landing: manda sobre la ruta (así «BLOG» del menú sale de la nota)
 */
function slugFromLocation() {
  const { hash, pathname } = location
  if (hash.startsWith(ARTICLE_PREFIX)) return hash.slice(ARTICLE_PREFIX.length)
  if (hash.length >= 2) return null
  return PATH_RE.exec(pathname)?.[1] ?? null
}

/**
 * Artículo abierto según la URL; null = la landing. La barra del navegador muestra siempre
 * /blog/<slug>/ (con `replaceState`, sin agregar entradas al historial) para que copiar el
 * enlace de la barra funcione al pegarlo en WhatsApp y las redes: ellas no leen el `#`.
 * El sitio es estático: build genera dist/blog/<slug>/index.html (scripts/paginas-articulos.mjs).
 *
 * Al abrir un artículo sube al inicio; al volver a la landing con un ancla
 * (p. ej. el BLOG del menú, #blog) baja hasta ella una vez montada.
 */
export function useArticleRoute() {
  const articles = useArticles()
  const [slug, setSlug] = useState(slugFromLocation)
  // Derivado de la lista vigente: un enlace directo a una nota de Bravo funciona
  // en cuanto la lista llega (y antes de eso muestra la landing).
  const article = slug ? (articles.find((a) => a.slug === slug) ?? null) : null

  useEffect(() => {
    const onChange = () => setSlug(slugFromLocation())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  // Deja en la barra la URL que corresponde a lo que se ve.
  useEffect(() => {
    if (article) {
      const limpia = `/blog/${article.slug}/`
      if (location.pathname !== limpia || location.hash) history.replaceState(null, '', `${limpia}${location.search}`)
    } else if (!slug && PATH_RE.test(location.pathname)) {
      // Salió de una nota hacia un ancla de la landing (/blog/x/#blog → /#blog).
      history.replaceState(null, '', `/${location.search}${location.hash}`)
    }
  }, [article, slug])

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
