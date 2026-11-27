// Genera, DESPUÉS de `vite build`, una página real por artículo: dist/blog/<slug>/index.html.
//
// Por qué: el sitio es una SPA y los artículos viven en el hash (#/blog/<slug>). Los
// rastreadores de vista previa (WhatsApp, Facebook, LinkedIn, X) no ejecutan JavaScript ni
// leen lo que va después del `#`: siempre ven el index.html de la portada y muestran su
// imagen. Cada página generada es el MISMO index.html con las etiquetas og:/twitter:/canonical
// de ESA nota, más un redirect inmediato a la SPA (#/blog/<slug>) para las personas.
//
// Las notas salen de Bravo (/v1/public/articles) y de los artículos locales de src/blog.ts
// (respaldo). Si Bravo no responde, se generan solo las locales y el build NO falla: una nota
// nueva aparece en la próxima publicación (Bravo reconstruye el sitio al publicar).

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import sharp from 'sharp'

const SITE = 'https://roberthestratega.com'
const API = 'https://bravo.goberna.us/v1/public/articles?tenant=roberth'
const SITE_NAME = 'Roberth Estratega'

const base = readFileSync('dist/index.html', 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const limpio = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const absoluta = (u) => (/^https?:\/\//i.test(u) ? u : `${SITE}/${String(u).replace(/^\//, '')}`)
const mime = (u) => (/\.png(\?|$)/i.test(u) ? 'image/png' : /\.webp(\?|$)/i.test(u) ? 'image/webp' : 'image/jpeg')

/** Artículos locales (src/blog.ts): slug, título, resumen e imagen, con regex sobre el formato fijo del archivo. */
function locales() {
  const src = readFileSync('src/blog.ts', 'utf8')
  const str = `'((?:[^'\\\\]|\\\\.)*)'`
  const un = (s) => s.replace(/\\'/g, "'")
  const re = new RegExp(
    `slug:\\s*${str},\\s*title:\\s*\\[\\s*${str},\\s*${str}\\s*\\],[\\s\\S]*?excerpt:\\s*${str},[\\s\\S]*?image:\\s*a\\(${str}\\),[\\s\\S]*?imagePosition:\\s*${str}`,
    'g',
  )
  return [...src.matchAll(re)].map((m) => ({
    slug: m[1],
    title: `${un(m[2])} ${un(m[3])}`.trim(),
    description: un(m[4]),
    image: absoluta(m[5]),
    // Archivo local (public/…): se lee de disco, sin red.
    archivo: `public${m[5].startsWith('/') ? '' : '/'}${m[5]}`,
    posicion: m[6],
  }))
}

/** Artículos de Bravo; vacío si la API no responde (no rompe el build). */
async function deBravo() {
  try {
    const r = await fetch(API, { signal: AbortSignal.timeout(15000) })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    if (!Array.isArray(data)) return []
    return data
      .filter((a) => /^[a-z0-9-]+$/.test(a.slug ?? ''))
      .map((a) => ({
        slug: a.slug,
        title: limpio(a.seo_title || a.title),
        description: limpio(a.seo_description || a.excerpt) || limpio(a.body_html).slice(0, 200),
        image: a.og_image_url || a.cover_image_url || '',
        posicion: a.cover_position || '',
      }))
  } catch (e) {
    console.warn(`[paginas-articulos] Bravo no respondió (${e.message}): solo artículos locales`)
    return []
  }
}

/** El index.html de la portada, sin sus etiquetas de vista previa. */
const sinVistaPrevia = base
  .replace(/<meta\s+charset="[^"]*"\s*\/?>/i, '')
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<link\s[^>]*rel="canonical"[^>]*>/gi, '')
  .replace(/<meta\s[^>]*?(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description)"[^>]*>/gi, '')

const OG_W = 1200
const OG_H = 630

/**
 * Imagen de vista previa liviana, alojada en el propio sitio. WhatsApp descarta las imágenes
 * de más o menos 300–600 KB (la portada de una nota fácilmente pesa 800 KB+) y entonces muestra
 * el título sin foto. Se recorta a 1200×630 respetando el encuadre elegido en el panel
 * ("X% Y%") y se guarda como JPG de calidad media: ~100–150 KB. Si algo falla, se devuelve
 * null y la página usa la imagen original.
 */
async function imagenLiviana(a) {
  try {
    let entrada
    if (a.archivo && existsSync(a.archivo)) {
      entrada = readFileSync(a.archivo)
    } else if (/^https?:\/\//i.test(a.image)) {
      const r = await fetch(a.image, { signal: AbortSignal.timeout(20000) })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      entrada = Buffer.from(await r.arrayBuffer())
    } else {
      return null
    }
    const m = /^(\d{1,3}(?:\.\d+)?)% (\d{1,3}(?:\.\d+)?)%$/.exec(a.posicion || '')
    const px = m ? Math.min(100, Number(m[1])) / 100 : 0.5
    const py = m ? Math.min(100, Number(m[2])) / 100 : 0.3
    const redimensionada = await sharp(entrada)
      .rotate()
      .resize(OG_W, OG_H, { fit: 'outside' })
      .toBuffer({ resolveWithObject: true })
    const { width, height } = redimensionada.info
    const salida = await sharp(redimensionada.data)
      .extract({
        left: Math.round((width - OG_W) * px),
        top: Math.round((height - OG_H) * py),
        width: OG_W,
        height: OG_H,
      })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer()
    writeFileSync(`dist/blog/${a.slug}/og.jpg`, salida)
    return `${SITE}/blog/${a.slug}/og.jpg`
  } catch (e) {
    console.warn(`[paginas-articulos] sin imagen liviana para ${a.slug} (${e.message}): se usa la original`)
    return null
  }
}

function pagina(a, liviana) {
  const url = `${SITE}/blog/${a.slug}/`
  const titulo = `${a.title} | ${SITE_NAME}`
  const imagen = liviana || (a.image ? absoluta(a.image) : `${SITE}/og-image.jpg`)
  const propias = a.image
  const tags = [
    `<title>${esc(titulo)}</title>`,
    `<meta name="description" content="${esc(a.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="es_PE" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(titulo)}" />`,
    `<meta property="og:description" content="${esc(a.description)}" />`,
    `<meta property="og:image" content="${esc(imagen)}" />`,
    propias ? `<meta property="og:image:type" content="${liviana ? 'image/jpeg' : mime(imagen)}" />` : '',
    liviana ? `<meta property="og:image:width" content="${OG_W}" />` : '',
    liviana ? `<meta property="og:image:height" content="${OG_H}" />` : '',
    `<meta property="og:image:alt" content="${esc(a.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(titulo)}" />`,
    `<meta name="twitter:description" content="${esc(a.description)}" />`,
    `<meta name="twitter:image" content="${esc(imagen)}" />`,
  ].filter(Boolean)
  // Las personas siguen entrando a la SPA: el redirect va antes que nada, en cuanto cargue el <head>.
  const redirect = `<script>location.replace('/#/blog/${a.slug}')</script>`
  const noscript = `<noscript><meta http-equiv="refresh" content="0;url=/#/blog/${a.slug}" /></noscript>`
  // charset primero: mis etiquetas llevan tildes y el navegador/rastreador lo busca en los primeros 1024 bytes.
  return sinVistaPrevia.replace(/<head>/i, `<head>\n    <meta charset="UTF-8" />\n    ${redirect}\n    ${noscript}\n    ${tags.join('\n    ')}`)
}

const remotos = await deBravo()
const vistos = new Set()
let total = 0
// Bravo primero: si una nota existe en los dos lados, gana la de Bravo (igual que en el sitio).
for (const a of [...remotos, ...locales()]) {
  if (vistos.has(a.slug)) continue
  vistos.add(a.slug)
  mkdirSync(`dist/blog/${a.slug}`, { recursive: true })
  const liviana = a.image ? await imagenLiviana(a) : null
  writeFileSync(`dist/blog/${a.slug}/index.html`, pagina(a, liviana))
  total++
}
console.log(`[paginas-articulos] ${total} páginas (${remotos.length} de Bravo, ${total - remotos.length} locales)`)
