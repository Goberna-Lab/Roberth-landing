// Sirve un build ya generado (dist/) con `vite preview` y devuelve su URL.
import { preview } from 'vite'

/** @param {{ root?: string, port: number }} opts */
export async function serve({ root = process.cwd(), port }) {
  const server = await preview({ root, logLevel: 'silent', preview: { port, strictPort: true, open: false } })
  const url = server.resolvedUrls?.local[0]
  if (!url) throw new Error('vite preview no devolvió URL')
  return { url, close: () => server.close() }
}
