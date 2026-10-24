import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'

/** Sitio para el que están escritas las etiquetas de vista previa de index.html. */
const MAIN_SITE = 'https://roberthestratega.com/'
/** Súbelo al cambiar og-image.jpg: WhatsApp y Facebook guardan la imagen en caché. */
const OG_IMAGE_VERSION = '2'

/**
 * Vista previa al compartir (og:/twitter:). Con SITE_URL (p. ej. el build de
 * GitHub Pages) las etiquetas apuntan a ese sitio, así la tarjeta no depende de
 * que resuelva el dominio principal. El canonical sigue en el dominio principal.
 */
function sharePreview(): Plugin {
  const site = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/?$/, '/') : MAIN_SITE
  return {
    name: 'share-preview',
    transformIndexHtml: (html) =>
      html
        .replaceAll(`content="${MAIN_SITE}`, `content="${site}`)
        .replaceAll('og-image.jpg"', `og-image.jpg?v=${OG_IMAGE_VERSION}"`),
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    sharePreview(),
  ],
})
