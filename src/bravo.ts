// Conexión con Bravo (plataforma de contenido de Goberna-Lab): artículos y leads.
//
// `tenant` tiene que coincidir EXACTO con el slug dado de alta en Bravo
// (`bravo-ctl.sh onboard-tenant roberth ...`). No se usa el SDK `@goberna-lab/bravo`
// (vive en GitHub Packages y exigiría un token en el `npm ci`); los endpoints públicos
// responden CORS abierto, así que esto funciona desde cualquier dominio.

import { useSyncExternalStore } from 'react'
import { ARTICLES as LOCAL_ARTICLES, type Article } from './blog.ts'

export const BRAVO = {
  tenant: 'roberth',
  apiUrl: 'https://bravo.goberna.us',
} as const

const TIMEOUT_MS = 8000

// ---------------------------------------------------------------- artículos

/** Columnas de GET /v1/public/articles que usa el sitio (el snapshot publicado). */
type BravoArticle = {
  slug: string
  title: string
  excerpt: string | null
  body_html: string | null
  cover_image_url: string | null
  card_image_url?: string | null
  published_at: string
}

/** Sanitizador mínimo del HTML que viene de Bravo (mismo criterio que Barrionuevo). */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/[\s/]on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/[\s/]on\w+\s*=\s*'[^']*'/gi, '')
    .replace(/[\s/]on\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/(href|src|srcset|xlink:href)\s*=\s*"(?:javascript|data):[^"]*"/gi, '$1="#"')
    .replace(/(href|src|srcset|xlink:href)\s*=\s*'(?:javascript|data):[^']*'/gi, "$1='#'")
}

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

const toArticle = (post: BravoArticle): Article => {
  const d = new Date(post.published_at)
  const day = d.getUTCDate()
  const month = MONTHS[d.getUTCMonth()]
  const html = sanitizeHtml(post.body_html ?? '')
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  // Los títulos del sitio van en dos líneas, cortados tras los dos puntos.
  const cut = post.title.indexOf(': ')
  const title: [string, string] = cut > 0 ? [post.title.slice(0, cut + 1), post.title.slice(cut + 2)] : [post.title, '']
  const image = post.cover_image_url ?? ''
  return {
    slug: post.slug,
    title,
    lead: post.excerpt ?? '',
    date: `${String(day).padStart(2, '0')}-${month.slice(0, 3).toUpperCase()}-${d.getUTCFullYear()}`,
    day: `${day} ${month.toUpperCase()}`,
    dateLong: `${day} de ${month}, ${d.getUTCFullYear()}`,
    excerpt: post.excerpt ?? '',
    minutes: Math.max(1, Math.round(words / 220)),
    image,
    imageMobile: post.card_image_url ?? image,
    imagePosition: 'center',
    cardPosition: 'center',
    blocks: [],
    html,
  }
}

// Los artículos locales (blog.ts) son el respaldo: si Bravo no responde o no tiene
// notas, el sitio se ve exactamente igual que antes. Las notas de Bravo van primero.
let current: Article[] = LOCAL_ARTICLES
const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Artículos vigentes (Bravo + locales). Re-renderiza cuando llegan los de Bravo. */
export const useArticles = () => useSyncExternalStore(subscribe, () => current)

/** Bravo primero y, sin repetir slug, los locales. */
const merge = (remote: Article[]) => {
  const slugs = new Set(remote.map((a) => a.slug))
  return [...remote, ...LOCAL_ARTICLES.filter((a) => !slugs.has(a.slug))]
}

export async function loadBravoArticles() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(`${BRAVO.apiUrl}/v1/public/articles?tenant=${BRAVO.tenant}`, { signal: controller.signal })
    if (!response.ok) return
    const data: unknown = await response.json()
    if (!Array.isArray(data) || data.length === 0) return
    current = merge((data as BravoArticle[]).map(toArticle))
    listeners.forEach((fn) => fn())
  } catch {
    // Sin red o Bravo caído: se quedan los artículos locales.
  } finally {
    clearTimeout(timer)
  }
}

// -------------------------------------------------------------------- leads

/**
 * Guarda el lead en Bravo (POST /v1/public/contact). `name` es obligatorio y hace falta
 * correo o teléfono. Las demás claves caen en `extra`. Es fire-and-forget con `keepalive`:
 * el visitante pasa a WhatsApp sin esperar y el envío sobrevive a la navegación.
 */
export function sendLead(fields: Record<string, string>) {
  void fetch(`${BRAVO.apiUrl}/v1/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenant: BRAVO.tenant, ...fields }),
    keepalive: true,
  }).catch(() => {})
}
