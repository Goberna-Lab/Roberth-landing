// Capturas de página completa del ESCRITORIO, antes y después, para probar que
// no cambió. Uso: npm run capturas [-- <ref-base>]   (por defecto: main)
//
// La versión anterior se construye en un git worktree (.qa-base/) y ambas se
// capturan a 1024, 1366 y 1920px con movimiento reducido, esperando fuentes e
// imágenes decodificadas. Después: npm run comparar
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { serve } from './serve.mjs'

const BASE_REF = process.argv[2] ?? 'main'
const WIDTHS = [1024, 1366, 1920]
const OUT = 'qa-shots/desktop'
const WORKTREE = resolve('.qa-base')
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit' })

// Versión anterior en un worktree, con las dependencias del repo actual.
if (existsSync(WORKTREE)) run('git', ['worktree', 'remove', '--force', WORKTREE])
run('git', ['worktree', 'add', '--detach', WORKTREE, BASE_REF])
symlinkSync(resolve('node_modules'), resolve(WORKTREE, 'node_modules'), 'dir')
run('npx', ['vite', 'build', '--logLevel', 'warn'], WORKTREE)
run('npx', ['vite', 'build', '--logLevel', 'warn'], process.cwd())

async function capture(browser, url, label) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 })
    const page = await context.newPage()
    await page.goto(url)
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms))
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'))
      await document.fonts.ready
      await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
      await wait(300)
    })
    await page.screenshot({ path: `${OUT}/${label}-${width}.png`, fullPage: true })
    await context.close()
    console.log(`✓ ${label} ${width}px`)
  }
}

mkdirSync(OUT, { recursive: true })
const before = await serve({ root: WORKTREE, port: 4318 })
const after = await serve({ port: 4319 })
const browser = await chromium.launch()
try {
  await capture(browser, before.url, 'antes')
  await capture(browser, after.url, 'despues')
} finally {
  await browser.close()
  await before.close()
  await after.close()
  run('git', ['worktree', 'remove', '--force', WORKTREE])
  rmSync(WORKTREE, { recursive: true, force: true })
}
console.log(`Capturas en ${OUT}/ (base: ${BASE_REF})`)
