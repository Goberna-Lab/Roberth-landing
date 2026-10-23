/** Separa un texto en palabras animables, conservando los espacios (mismo ajuste de línea). */
export function Words({ text, className }: { text: string; className: string }) {
  return text.split(' ').map((w, i, all) => (
    <span key={i}>
      <span className={className}>{w}</span>
      {i < all.length - 1 ? ' ' : ''}
    </span>
  ))
}
