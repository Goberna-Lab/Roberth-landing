// Contenido de la landing (textos tomados del prototipo XD).

/** Reemplazar con el número real (formato internacional, sin "+"). */
const a = (p: string)=>`${import.meta.env.BASE_URL}${p.replace(/^\//,'')}`

export const WHATSAPP_URL = 'https://wa.me/51956687505'

export const NAV = [
  { label: 'EXPERIENCIA', href: '#experiencia', x: 852 },
  { label: 'PENSAMIENTO', href: '#roberth', x: 1001 },
  { label: 'PUBLICACIONES', href: '#publicaciones', x: 1162 },
  { label: 'CONFERENCIAS', href: '#conferencias', x: 1327 },
  { label: 'BLOG', href: '#', x: 1453 },
]

export const EXPERIENCE = [
  {
    title: 'Consultoría estratégica',
    strong: 'Acompañamiento',
    text: ' frente a decisiones de alto impacto y escenarios\ncomplejos.',
    icon: { kind: 'svg', src: a('/svg/ico-puzzle.svg'), x: 968, y: 103.89, w: 50.31, h: 50.23 },
  },
  {
    title: 'Inteligencia y análisis',
    strong: 'Información,',
    text: ' actores, intereses, riesgos y construcción de escenarios.',
    icon: { kind: 'img', src: a('/img/ico-inteligencia.webp'), x: 969, y: 247, w: 48, h: 48 },
  },
  {
    title: 'Estrategia política',
    strong: 'Campañas, liderazgos,',
    text: ' organizaciones políticas y contextos de gobierno.',
    icon: { kind: 'img', src: a('/img/ico-estrategia.webp'), x: 968, y: 360, w: 50, h: 50 },
  },
  {
    title: 'Poder y toma de decisiones',
    strong: 'Relaciones de poder,',
    text: ' incentivos, conflictos, intereses y comportamiento\nde actores.',
    icon: { kind: 'svg', src: a('/svg/ico-handshake.svg'), x: 968, y: 475.58, w: 50.31, h: 28.42 },
  },
  {
    title: 'Formación estratégica',
    strong: 'Conferencias,',
    text: ' masterclasses y programas especializados.',
    icon: { kind: 'img', src: a('/img/ico-formacion.webp'), x: 968, y: 611, w: 50, h: 50 },
  },
  {
    title: 'Investigación y conocimiento',
    strong: 'Análisis,',
    text: ' metodologías, publicaciones y modelos aplicados.',
    icon: { kind: 'img', src: a('/img/ico-investigacion.webp'), x: 968, y: 718, w: 50, h: 50 },
  },
] as const

// Posiciones (top) de cada bloque de la línea de tiempo, en px del diseño.
export const EXPERIENCE_LAYOUT = {
  titleTop: [82.4, 224.4, 337.4, 451.4, 593.4, 707.4],
  textTop: [140.8, 282.8, 395.8, 509.8, 651.8, 765.8],
  dotTop: [151, 277, 372, 498, 624, 732],
  dividerTop: [217, 331, 444, 586, 700],
}

/** Tienda donde se venden los libros. */
const GOBERNA_STORE = 'https://grupogoberna.com/'

export type Book = {
  title: string
  cover: string
  cta: string
  /** página de la publicación en la tienda de Grupo Goberna */
  url: string
  /** posición horizontal dentro del carrusel (px de diseño) */
  x: number
}

export const BOOKS: Book[] = [
  { title: 'EL PODER DE LA ORATORIA E\nIMAGEN POLÍTICA', cover: 'libro-oratoria', url: GOBERNA_STORE + 'el-poder-de-la-oratoria-e-imagen-politica/', cta: 'CONOCER PUBLICACIÓN', x: 1 },
  { title: 'LAWFARE GUERRA JURÍDICA\nEN LA POLÍTICA', cover: 'libro-lawfare', url: GOBERNA_STORE + 'lawfare-guerra-juridica-en-la-politica-edicion-especial/', cta: 'CONOCER PUBLICACIÓN', x: 457 },
  { title: 'GUERRA ELECTORAL-EL PODER\nEN LAS SOMBRAS', cover: 'libro-guerra-electoral', url: GOBERNA_STORE + 'guerra-electoral-el-poder-en-las-sombras-2/', cta: 'CONOCER PUBLICACIÓN', x: 899 },
  { title: 'MANUAL DEL CONSULTOR\nPOLÍTICO', cover: 'libro-consultor', url: GOBERNA_STORE + 'manual-del-consultor-politico/', cta: 'CONOCER PUBLICACIÓN', x: 1341 },
  { title: 'MÁQUINA\nELECTORAL', cover: 'libro-maquina-electoral', url: GOBERNA_STORE + 'maquina-electoral-aprenda-a-ganar-elecciones/', cta: 'CONOCER PUBLICACIÓN', x: 1797 },
  { title: 'MANUAL DE OPERACIONES\nPSICOLÓGICAS Y PSICOSOCIALES', cover: 'libro-psyops', url: GOBERNA_STORE + 'manual-de-operaciones-psicologicas-y-psicosociales/', cta: 'VER EDICIÓN', x: 2239 },
  { title: 'WAR ROOM EN CAMPAÑAS\nELECTORALES', cover: 'libro-war-room', url: GOBERNA_STORE + 'war-room-en-campanas-electorales-edicion-especial/', cta: 'VER EDICIÓN', x: 2681 },
  { title: 'MANUAL DE INTELIGENCIA Y\nCONTRA INTELIGENCIA', cover: 'libro-inteligencia', url: GOBERNA_STORE + 'manual-de-inteligencia-y-contrainteligencia-2da-edicion/', cta: 'VER EDICIÓN', x: 3123 },
]

/** Desplazamiento del carrusel por clic (distancia entre libros). */
export const BOOK_STEP = 442

/** Velocidad del scroll automático del carrusel (px de diseño por segundo). */
export const BOOK_AUTOSCROLL_SPEED = 28

export const AUDIOBOOKS = [
  {
    title: 'AUDIOLIBRO EL PODER DE LA ORATORIA E\nIMAGEN POLÍTICA',
    cover: a('/img/audio-oratoria.webp'),
    img: { x: 960, y: 90, w: 175, h: 219 },
    top: 134.5,
  },
  {
    title: 'AUDIOLIBRO MANUAL DE INTELIGENCIA\nY CONTRAINTELIGENCIA',
    cover: a('/img/audio-inteligencia.webp'),
    img: { x: 960, y: 370, w: 185, h: 277 },
    top: 455.5,
  },
]

export const SERVICES = ['Consultoría estratégica', 'Conferencias y medios', 'Formación', 'Colaboraciones institucionales']

export const FOOTER_COLUMNS = [
  {
    title: 'CONFERENCIAS',
    x: 583,
    links: ['War room y Tecnopolítica', 'Inteligencia y Contrainteligencia', 'Operaciones psicológicas', 'Oratoria Política'],
  },
  {
    title: 'LIBROS',
    x: 861.1,
    links: [
      'El poder de la oratoria e imagen política',
      'Lawfare guerra jurídica en la política',
      'Manual de operaciones Psicológicas',
      'Manual del consultor político',
    ],
  },
]

export const SOCIALS = [
  { label: 'robazfer', icon: a('/svg/ico-fb.svg'), href: 'https://www.facebook.com/robazfer', name: 'Facebook', iconTop: 46, textTop: 48.4 },
  { label: 'roberth.estratega', icon: a('/svg/ico-ig.svg'), href: 'https://www.instagram.com/roberth.estratega', name: 'Instagram', iconTop: 91, textTop: 92.4 },
  { label: 'robazfer', icon: a('/svg/ico-in.svg'), href: 'https://www.linkedin.com/in/robazfer/', name: 'LinkedIn', iconTop: 134.71, textTop: 134.4 },
]
