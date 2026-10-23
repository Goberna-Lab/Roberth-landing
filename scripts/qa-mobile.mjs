// QA de la versión mobile/tablet sobre el build (dist/). Uso: npm run qa:mobile
//
// En cada ancho revisa: scroll horizontal, elementos o textos fuera de
// pantalla, textos cortados, texto < 11px, áreas táctiles < 44px, revelados
// que no aparecieron y errores/warnings de consola. Después prueba menú,
// anclas, carrusel, WhatsApp y movimiento reducido. Capturas en qa-shots/.
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'
import { serve } from './serve.mjs'

const WIDTHS = process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(',').map(Number) : [320, 360, 375, 390, 430, 768, 820, 1023]
const HEIGHT = (w) => (w < 600 ? 780 : w < 900 ? 1024 : 768)
const SHOTS = 'qa-shots'

const problems = []
const fail = (where, msg) => problems.push(`[${where}] ${msg}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Recorre la página para cargar imágenes y disparar los revelados. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms))
    const step = window.innerHeight * 0.5
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await wait(140)
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
    await wait(400)
  })
  // Revelados (≈1.1 s) y entrada del hero.
  await sleep(1600)
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms))
    await document.fonts.ready
    // Las imágenes ocultas (display: none) con loading=lazy nunca cargan: tope de 3 s.
    const decoded = Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
    await Promise.race([decoded, wait(3000)])
  })
}

/** Auditoría estática del layout en el ancho actual. */
function audit() {
  const vw = document.documentElement.clientWidth
  const out = { hscroll: document.documentElement.scrollWidth - vw, offscreen: [], cut: [], small: [], tap: [], hidden: [] }
  const name = (el) =>
    el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '')
  const visible = (el) => {
    const cs = getComputedStyle(el)
    return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getClientRects().length > 0
  }
  /** Rectángulo realmente visible: recortado por ancestros con overflow. */
  const clipped = (el, rect) => {
    let r = { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a)
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible' || cs.clipPath !== 'none') {
        const ar = a.getBoundingClientRect()
        r = { left: Math.max(r.left, ar.left), right: Math.min(r.right, ar.right), top: r.top, bottom: r.bottom }
      }
      if (cs.position === 'fixed') break
    }
    return r
  }
  const inScroller = (el) => !!el.closest('.m-carousel')

  const all = [...document.querySelectorAll('.m-app *')].filter(visible)
  for (const el of all) {
    if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) continue

    if (!inScroller(el)) {
      const r = clipped(el, rect)
      if (r.right - r.left > 0.5 && (r.left < -1 || r.right > vw + 1)) out.offscreen.push(`${name(el)} ${Math.round(r.left)}→${Math.round(r.right)}`)
    }

    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (ownText) {
      const cs = getComputedStyle(el)
      const size = parseFloat(cs.fontSize)
      if (size < 11) out.small.push(`${name(el)} ${size}px "${el.textContent.trim().slice(0, 30)}"`)
      if (el.scrollWidth > el.clientWidth + 1 && cs.overflowX !== 'visible') out.cut.push(`${name(el)} "${el.textContent.trim().slice(0, 30)}"`)
      if (!inScroller(el)) {
        for (const n of el.childNodes) {
          if (n.nodeType !== 3 || !n.textContent.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(n)
          for (const tr of range.getClientRects()) {
            if (tr.left < -1 || tr.right > vw + 1) out.cut.push(`${name(el)} texto fuera: "${n.textContent.trim().slice(0, 30)}"`)
          }
        }
      }
    }

    if (el.matches('a[href], button') && !el.closest('[aria-hidden="true"]')) {
      if (rect.width < 44 - 0.5 || rect.height < 44 - 0.5) out.tap.push(`${name(el)} ${Math.round(rect.width)}×${Math.round(rect.height)} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`)
    }
  }

  // Al terminar el recorrido (página al final) todo lo animado debe estar completo.
  const animated = '[data-reveal], [data-piece], [data-unveil], .m-word, [data-list-icon], [data-list-text]'
  for (const el of document.querySelectorAll(animated.split(', ').map((s) => `.m-app ${s}`).join(', '))) {
    const cs = getComputedStyle(el)
    if (parseFloat(cs.opacity) < 0.99 || cs.visibility === 'hidden' || (cs.clipPath !== 'none' && !/^inset\((0(px|%)?\s*)+\)$/.test(cs.clipPath)))
      out.hidden.push(`${name(el)} opacity=${cs.opacity} clip=${cs.clipPath}`)
  }
  return out
}

async function checkWidth(browser, url, w) {
  const where = `${w}px`
  const context = await browser.newContext({ viewport: { width: w, height: HEIGHT(w) }, deviceScaleFactor: 1, hasTouch: true, isMobile: w < 600 })
  const page = await context.newPage()
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && fail(where, `consola ${m.type()}: ${m.text()}`))
  page.on('pageerror', (e) => fail(where, `error JS: ${e.message}`))
  await page.goto(url)
  if (!(await page.locator('.m-app').count())) fail(where, 'no se montó la versión mobile')
  await scrollThrough(page)
  const r = await page.evaluate(audit)
  if (r.hscroll > 0) fail(where, `scroll horizontal de ${r.hscroll}px`)
  r.offscreen.forEach((s) => fail(where, `fuera de pantalla: ${s}`))
  r.cut.forEach((s) => fail(where, `texto cortado: ${s}`))
  r.small.forEach((s) => fail(where, `texto < 11px: ${s}`))
  r.tap.forEach((s) => fail(where, `área táctil < 44px: ${s}`))
  r.hidden.forEach((s) => fail(where, `revelado sin aparecer: ${s}`))
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await sleep(300)
  await page.screenshot({ path: `${SHOTS}/mobile-${w}.png`, fullPage: true })
  await context.close()
}

/** Menú, anclas, carrusel y WhatsApp en un teléfono y en una tablet. */
async function checkInteractions(browser, url, w) {
  const where = `${w}px interacción`
  const context = await browser.newContext({ viewport: { width: w, height: HEIGHT(w) }, hasTouch: true, isMobile: w < 600 })
  const page = await context.newPage()
  page.on('pageerror', (e) => fail(where, `error JS: ${e.message}`))
  await page.goto(url)
  await page.evaluate(() => document.fonts.ready)
  const headerH = await page.evaluate(() => document.querySelector('.m-header').getBoundingClientRect().height)

  // Menú: abre, bloquea scroll, deja el fondo inert y contiene el foco.
  const menuBtn = page.getByRole('button', { name: 'Abrir menú' })
  await menuBtn.click()
  const dialog = page.getByRole('dialog', { name: 'Menú' })
  if (!(await dialog.isVisible())) fail(where, 'el menú no se abrió')
  const locked = await page.evaluate(() => ({
    overflow: document.documentElement.style.overflow,
    inert: document.querySelector('.m-page').inert && document.querySelector('.m-header').inert,
    focusIn: !!document.activeElement?.closest('#m-menu'),
  }))
  if (locked.overflow !== 'hidden') fail(where, 'el menú no bloquea el scroll de fondo')
  if (!locked.inert) fail(where, 'el fondo no queda inert con el menú abierto')
  if (!locked.focusIn) fail(where, 'el foco no entra al menú')
  for (let i = 0; i < 14; i++) await page.keyboard.press('Tab')
  if (!(await page.evaluate(() => !!document.activeElement?.closest('#m-menu')))) fail(where, 'el foco escapa del menú con Tab')
  await sleep(900) // entrada del menú
  await page.screenshot({ path: `${SHOTS}/menu-${w}.png` })
  await page.keyboard.press('Escape')
  await sleep(100)
  if (await dialog.count()) fail(where, 'Escape no cierra el menú')
  if (!(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Abrir menú'))) fail(where, 'el foco no vuelve al botón del menú')

  await menuBtn.click()
  const box = await dialog.boundingBox()
  await page.mouse.click(box.x + box.width / 2, box.y + box.height - 120)
  await sleep(100)
  if (await dialog.count()) fail(where, 'tocar fuera de la lista no cierra el menú')

  await menuBtn.click()
  await dialog.getByRole('link', { name: 'PUBLICACIONES' }).click()
  await sleep(1400)
  if (await dialog.count()) fail(where, 'elegir destino no cierra el menú')
  const top = await page.evaluate(() => document.querySelector('#publicaciones').getBoundingClientRect().top)
  if (Math.abs(top - headerH) > 6) fail(where, `el ancla #publicaciones quedó en ${Math.round(top)}px (cabecera ${headerH}px)`)

  // Anclas desde los CTA: ninguna sección queda bajo la cabecera.
  for (const id of ['inicio', 'roberth', 'experiencia', 'publicaciones', 'conferencias', 'conversemos']) {
    await page.evaluate((id) => {
      document.documentElement.style.scrollBehavior = 'auto'
      location.hash = ''
      location.hash = id
    }, id)
    await sleep(200)
    const t = await page.evaluate((id) => document.getElementById(id).getBoundingClientRect().top, id)
    const expected = id === 'inicio' ? 0 : headerH
    if (Math.abs(t - expected) > 6) fail(where, `#${id} quedó en ${Math.round(t)}px`)
  }
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = ''))

  // Carrusel: botones según el límite real del desplazamiento.
  const track = page.locator('.m-carousel')
  await track.scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'instant' }))
  // El avance automático pudo moverlo ya: se pausa (toque) y se vuelve al inicio.
  await track.dispatchEvent('touchstart')
  await track.evaluate((el) => el.scrollTo({ left: 0, behavior: 'instant' }))
  await sleep(600)
  const prev = page.getByRole('button', { name: 'Libro anterior' })
  const next = page.getByRole('button', { name: 'Libro siguiente' })
  if (!(await prev.isDisabled())) fail(where, '"anterior" no está deshabilitado al inicio')
  let guard = 0
  while (!(await next.isDisabled()) && guard++ < 12) {
    await next.click()
    await sleep(700)
  }
  const end = await track.evaluate((el) => ({ left: el.scrollLeft, max: el.scrollWidth - el.clientWidth }))
  if (guard >= 12) fail(where, '"siguiente" nunca se deshabilita')
  if (Math.abs(end.left - end.max) > 3) fail(where, `"siguiente" se deshabilitó antes del final (${Math.round(end.left)}/${Math.round(end.max)})`)
  const count = await page.locator('.m-carousel__count').innerText()
  if (!/08\s*\/\s*08/.test(count)) fail(where, `contador al final: "${count}"`)
  if (await prev.isDisabled()) fail(where, '"anterior" deshabilitado al final')

  // Avance automático: vuelve a moverse tras la pausa por interacción.
  await track.evaluate((el) => el.scrollTo({ left: 0, behavior: 'instant' }))
  await sleep(9500)
  const before = await track.evaluate((el) => el.scrollLeft)
  await sleep(5000)
  const after = await track.evaluate((el) => el.scrollLeft)
  if (after === before) fail(where, 'el carrusel no avanza solo')
  await track.dispatchEvent('touchstart')
  const paused0 = await track.evaluate((el) => el.scrollLeft)
  await sleep(5000)
  if ((await track.evaluate((el) => el.scrollLeft)) !== paused0) fail(where, 'el avance automático no se pausa al tocar')

  // WhatsApp: oculto en el hero y en el pie; visible y dentro de pantalla a mitad de página.
  const wa = page.locator('.m-whatsapp')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await sleep(500)
  if (await wa.isVisible()) fail(where, 'WhatsApp visible sobre el hero')
  await page.evaluate(() => document.querySelector('#experiencia').scrollIntoView({ behavior: 'instant' }))
  await sleep(500)
  if (!(await wa.isVisible())) fail(where, 'WhatsApp no aparece a mitad de página')
  const wab = await wa.boundingBox()
  const vp = page.viewportSize()
  if (wab && (wab.x + wab.width > vp.width || wab.y + wab.height > vp.height)) fail(where, 'WhatsApp se sale de la pantalla')
  if (wab && (wab.width < 44 || wab.height < 44)) fail(where, 'WhatsApp < 44px')
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await sleep(500)
  if (await wa.isVisible()) fail(where, 'WhatsApp tapa el pie')
  await context.close()
}

/** Con movimiento reducido todo se ve sin animar ni hacer scroll. */
async function checkReducedMotion(browser, url) {
  const where = '390px movimiento reducido'
  const context = await browser.newContext({ viewport: { width: 390, height: 780 }, reducedMotion: 'reduce', hasTouch: true, isMobile: true })
  const page = await context.newPage()
  await page.goto(url)
  await sleep(800)
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal], [data-piece], [data-unveil], .m-word, [data-list-icon], [data-list-text], [data-list-rule], [data-line]')]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99 || getComputedStyle(el).transform !== 'none')
      .map((el) => el.className || el.tagName),
  )
  hidden.forEach((h) => fail(where, `animado o invisible sin scroll: ${h}`))
  const track = page.locator('.m-carousel')
  await track.scrollIntoViewIfNeeded()
  const before = await track.evaluate((el) => el.scrollLeft)
  await sleep(6000)
  if ((await track.evaluate((el) => el.scrollLeft)) !== before) fail(where, 'el carrusel avanza solo con movimiento reducido')
  await page.screenshot({ path: `${SHOTS}/reduced-motion-390.png`, fullPage: true })
  await context.close()
}

await mkdir(SHOTS, { recursive: true })
const server = await serve({ port: 4317 })
const browser = await chromium.launch()
try {
  for (const w of WIDTHS) {
    await checkWidth(browser, server.url, w)
    console.log(`✓ ${w}px revisado`)
  }
  for (const w of [390, 820]) {
    await checkInteractions(browser, server.url, w)
    console.log(`✓ interacciones ${w}px`)
  }
  await checkReducedMotion(browser, server.url)
  console.log('✓ movimiento reducido')
} finally {
  await browser.close()
  await server.close()
}

if (problems.length) {
  console.log(`\n${problems.length} problema(s):`)
  problems.forEach((p) => console.log(' - ' + p))
  process.exit(1)
}
console.log(`\nSin problemas. Capturas en ${SHOTS}/`)
