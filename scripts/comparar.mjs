// Compara píxel a píxel las capturas de `npm run capturas` (antes vs después).
// Sale con error si alguna difiere; las diferencias quedan en qa-shots/desktop/diff-*.png
import { readFileSync, writeFileSync } from 'node:fs'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const WIDTHS = [1024, 1366, 1920]
const DIR = 'qa-shots/desktop'
let failed = false

for (const width of WIDTHS) {
  const a = PNG.sync.read(readFileSync(`${DIR}/antes-${width}.png`))
  const b = PNG.sync.read(readFileSync(`${DIR}/despues-${width}.png`))
  if (a.width !== b.width || a.height !== b.height) {
    console.log(`✗ ${width}px: tamaño distinto (${a.width}×${a.height} vs ${b.width}×${b.height})`)
    failed = true
    continue
  }
  const diff = new PNG({ width: a.width, height: a.height })
  const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0 })
  if (n > 0) {
    writeFileSync(`${DIR}/diff-${width}.png`, PNG.sync.write(diff))
    console.log(`✗ ${width}px: ${n} píxeles distintos (ver ${DIR}/diff-${width}.png)`)
    failed = true
  } else {
    console.log(`✓ ${width}px: idénticas (${a.width}×${a.height})`)
  }
}
process.exit(failed ? 1 : 0)
