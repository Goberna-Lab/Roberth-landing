import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Animaciones de la versión mobile, declaradas con atributos dentro de `root`:
 *
 *   data-reveal            aparece subiendo al entrar en pantalla
 *   data-reveal-delay="s"  retraso en segundos
 *   data-line[="y"]        línea que se dibuja (horizontal o vertical)
 *   data-parallax="n"      capa que se desplaza ±n px mientras su sección
 *                          cruza la pantalla (la capa sobresale n px por lado)
 *   data-unveil            imagen que se descubre de abajo hacia arriba
 *   data-piece="x,y,rot"   foto que llega desde (x,y) girada y encaja
 *   data-words             título cuyas palabras (.m-word) se "entintan" con el scroll
 *   data-list              lista cuyas filas se entintan una tras otra con el scroll;
 *                          dentro: [data-list-icon], [data-list-text] y las líneas
 *                          [data-list-rule] que se dibujan entre fila y fila
 *
 * Los estados iniciales se aplican aquí, solo con movimiento permitido: sin JS
 * o con movimiento reducido todo queda visible y quieto.
 */
export function useMobileMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const once = (trigger: Element, start = 'top 88%') => ({ trigger, start, once: true })

        q('[data-reveal]').forEach((el: HTMLElement) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              delay: Number(el.dataset.revealDelay ?? 0),
              scrollTrigger: once(el),
            },
          )
        })

        q('[data-line]').forEach((el: HTMLElement) => {
          const vertical = el.dataset.line === 'y'
          gsap.fromTo(
            el,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              duration: vertical ? 1.6 : 1.1,
              ease: 'power2.inOut',
              scrollTrigger: once(el, 'top 90%'),
            },
          )
        })

        q('[data-parallax]').forEach((el: HTMLElement) => {
          const n = Number(el.dataset.parallax) || 20
          gsap.fromTo(
            el,
            { y: -n },
            {
              y: n,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        q('[data-unveil]').forEach((el: HTMLElement) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: once(el) },
          )
        })

        q('[data-piece]').forEach((el: HTMLElement) => {
          const [x = 0, y = 0, rotation = 0] = (el.dataset.piece ?? '').split(',').map(Number)
          gsap.fromTo(
            el,
            { autoAlpha: 0, x, y, rotation, scale: 0.92 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1.1,
              ease: 'back.out(1.3)',
              scrollTrigger: once(el, 'top 85%'),
            },
          )
        })

        q('[data-words]').forEach((el: HTMLElement) => {
          gsap.fromTo(
            el.querySelectorAll('.m-word'),
            { opacity: 0.25 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: 1 },
            },
          )
        })

        q('[data-list]').forEach((el: HTMLElement) => {
          const rules = el.querySelectorAll('[data-list-rule]')
          const icons = el.querySelectorAll('[data-list-icon]')
          const texts = el.querySelectorAll('[data-list-text]')

          // Estados iniciales explícitos: con scrub, un stagger solo aplicaría
          // el estado inicial al primer elemento.
          gsap.set(rules, { scaleX: 0 })
          gsap.set(icons, { autoAlpha: 0, x: -10, y: 10 })
          gsap.set(texts, { opacity: 0.25, x: -8 })

          // La primera línea es el borde superior; cada fila trae después la suya.
          const tl = gsap.timeline({
            defaults: { ease: 'sine.out' },
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 60%', scrub: 1.5 },
          })
          tl.to(rules[0] ?? [], { scaleX: 1, duration: 0.6 }, 0)
          texts.forEach((text, i) => {
            const at = 0.3 + i * 0.45
            tl.to(icons[i] ?? [], { autoAlpha: 1, x: 0, y: 0, duration: 0.5 }, at)
              .to(text, { opacity: 1, x: 0, duration: 0.5 }, at + 0.05)
              .to(rules[i + 1] ?? [], { scaleX: 1, duration: 0.6 }, at + 0.15)
          })
        })
      })
    },
    { scope: root },
  )
}
