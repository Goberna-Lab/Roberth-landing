// Iconos de línea de la versión mobile (24×24, heredan el color del texto).

type IconProps = { size?: number }

function Icon({ size = 24, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const IconBook = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6.5C10.6 5.3 8.6 4.8 4 4.8v13.4c4.6 0 6.6.5 8 1.7 1.4-1.2 3.4-1.7 8-1.7V4.8c-4.6 0-6.6.5-8 1.7Z" />
    <path d="M12 6.5v13.4M6.8 8.6h2.6M6.8 11.2h2.6M14.6 8.6h2.6M14.6 11.2h2.6" />
  </Icon>
)

export const IconCalendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.8" y="5.2" width="16.4" height="15" rx="2" />
    <path d="M3.8 9.6h16.4M8 3.4v3.4M16 3.4v3.4" />
    <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.6h.01M12 16.6h.01" strokeWidth={2.2} />
  </Icon>
)

/** Globo de conversación: acciones que abren WhatsApp. */
export const IconChat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.2 11.6a8.2 8.2 0 0 1-12 7.3l-4.4 1.3 1.3-4.2a8.2 8.2 0 1 1 15.1-4.4Z" />
    <path d="M8.6 10.4h6.8M8.6 13.6h4.4" />
  </Icon>
)

export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
  </Icon>
)

export const IconArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19.5 12h-15M10 6.5 4.5 12l5.5 5.5" />
  </Icon>
)

export const IconArrowDiag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </Icon>
)

export const IconMenu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7.5h16M4 12h16M9 16.5h11" />
  </Icon>
)

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)
