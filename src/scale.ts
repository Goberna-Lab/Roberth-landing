/**
 * El diseño está maquetado a 1920px de ancho.
 * Por debajo de ese ancho (p. ej. laptop 1366) se escala todo el lienzo
 * proporcionalmente para conservar la composición exacta del prototipo.
 *
 * --scale : factor aplicado con `zoom` sobre .page
 * --vh    : alto del viewport expresado en px "de diseño" (sin escalar),
 *           usado para que el hero quepa en pantallas bajas (1366x620).
 */
export const DESIGN_WIDTH = 1920

export function applyDesignScale() {
  const root = document.documentElement
  const scale = Math.min(1, root.clientWidth / DESIGN_WIDTH)
  root.style.setProperty('--scale', String(scale))
  root.style.setProperty('--vh', `${window.innerHeight / scale}px`)
}

export function initDesignScale() {
  applyDesignScale()
  window.addEventListener('resize', applyDesignScale)
}
