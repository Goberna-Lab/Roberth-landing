import { SIGNATURE_STROKES, SIGNATURE_VIEWBOX } from './signature.ts'

/** Ritmo de la escritura: unidades de contorno por milisegundo. */
const INK_SPEED = 1.3
/** La firma empieza a escribirse mientras Roberto entra al banner. */
const INK_START = 600

/**
 * El siguiente trazo arranca cuando el anterior va a la mitad, porque el
 * contorno de cada letra da ida y vuelta sobre ella.
 */
const SIGNATURE_TIMED = SIGNATURE_STROKES.reduce<{ delay: number; strokes: (typeof SIGNATURE_STROKES[number] & { timing: React.CSSProperties })[] }>(
  (acc, s) => {
    const duration = Math.max(240, s.len / INK_SPEED)
    const timing = { animationDuration: `${duration}ms`, animationDelay: `${acc.delay}ms` }
    return { delay: acc.delay + duration * 0.55, strokes: [...acc.strokes, { ...s, timing }] }
  },
  { delay: INK_START, strokes: [] },
).strokes

/**
 * Firma escrita a mano alzada. Cada trazo relleno se descubre con una máscara:
 * un trazo grueso que recorre el contorno del mismo path (pathLength=1), así el
 * "lápiz" avanza por donde va la letra.
 */
export function HeroSignature() {
  const strokes = SIGNATURE_TIMED

  return (
    <svg
      className="signature"
      viewBox={SIGNATURE_VIEWBOX}
      width={662.94}
      height={138.58}
      role="img"
      aria-label="Roberto Bazán"
    >
      {strokes.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`}>
          <mask id={`signature-ink-${i}`} maskUnits="userSpaceOnUse">
            <path className="signature__ink" d={s.d} pathLength={1} style={s.timing} />
          </mask>
          <path d={s.d} fill="#f7f9fc" mask={`url(#signature-ink-${i})`} />
        </g>
      ))}
    </svg>
  )
}
