# Roberth Estratega — landing de Roberto Bazán

Landing de una sola página para Roberto Bazán: consultor político, asesor legal,
escritor y conferencista. Publicada en GitHub Pages:
https://goberna-lab.github.io/Roberth-landing/

Stack: React 19, Vite, TypeScript, GSAP + `@gsap/react`, oxlint.

```bash
npm install
npm run dev       # desarrollo
npm run build     # tsc + build de producción en dist/
npm run lint      # oxlint
```

Cada push a `main` despliega a GitHub Pages (`.github/workflows/deploy.yml`).

## Estructura

```
src/
  App.tsx, App.css   escritorio: lienzo fijo de 1920px con posiciones absolutas
  scale.ts           escala el lienzo con `zoom` en pantallas de 1024–1919px
  data.ts            contenido: textos, libros, audiolibros, experiencia,
                     servicios, redes y contacto
  shared/            piezas comunes a escritorio y mobile (firma animada,
                     palabras animables, punto de corte, useIsMobile)
  mobile/            versión mobile y tablet (ver abajo)
public/              imágenes y SVG
scripts/             QA con Playwright
```

Anclas de la página (iguales en escritorio y mobile): `#inicio`, `#roberth`,
`#experiencia`, `#publicaciones`, `#conferencias`, `#conversemos`.

## Mobile y tablet

**Corte en 1024px.** Desde 1024px se monta el escritorio tal cual. Por debajo
(`(max-width: 1023.98px)`, en `src/shared/breakpoint.ts`) `App` monta
`src/mobile/MobileApp.tsx` en su lugar, con `matchMedia` +
`useSyncExternalStore` (`src/shared/useIsMobile.ts`). En mobile `scale.ts` no
aplica zoom. No es el lienzo de escritorio encogido: cada sección está
recompuesta en vertical.

```
src/mobile/
  MobileApp.tsx      raíz `.m-app`: cabecera, secciones, pie y WhatsApp
  MobileHeader.tsx   cabecera fija de 64px y menú a pantalla completa
  sections/          una sección por archivo (Hero, About, Power, Experience,
                     Books, Audiobooks, Talks, Contact, Footer, WhatsApp)
  useMobileMotion.ts animaciones GSAP declaradas con atributos
  mobile.css         todos los estilos, bajo `.m-app` y con prefijo `m-`
  icons.tsx, anchors.ts, text.ts
```

- El contenido sale de `src/data.ts`; las medidas de escritorio de ese archivo
  (`EXPERIENCE_LAYOUT`, `BOOK_STEP`, `x`/`top` de cada elemento…) no se usan en
  mobile.
- Tokens en `.m-app`: margen lateral `clamp(20px, 5.6vw, 40px)`, columna máxima
  de 720px en tablet, cabecera de 64px y safe areas (`env(safe-area-inset-*)`).
  Punto de corte interno en 640px para pasar a 2 columnas donde ayuda.
- Animaciones con atributos (`data-reveal`, `data-line`, `data-parallax="n"`,
  `data-unveil`, `data-piece`, `data-words`), aplicadas por
  `useMobileMotion` dentro de `gsap.matchMedia('(prefers-reduced-motion:
  no-preference)')`: sin JS o con movimiento reducido todo queda visible y quieto.
- Carrusel de libros con `scroll-snap` nativo; avanza solo, se pausa al tocar y
  no corre con movimiento reducido.

## QA

```bash
npm run qa:mobile   # build + revisión en 320, 360, 375, 390, 430, 768, 820 y 1023px
npm run capturas    # capturas del escritorio: main (git worktree) vs. actual
npm run comparar    # compara esas capturas píxel a píxel
```

- `qa:mobile` revisa scroll horizontal, elementos fuera de pantalla, textos
  cortados, texto < 11px, áreas táctiles < 44px, revelados que no aparecieron y
  errores de consola; prueba menú, anclas, carrusel, WhatsApp y movimiento
  reducido. Sale con error si encuentra algo.
- `capturas` acepta otra referencia base: `npm run capturas -- <rama|commit>`.
- Las capturas quedan en `qa-shots/` (ignorado por git).
