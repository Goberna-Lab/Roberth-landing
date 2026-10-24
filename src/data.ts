// Contenido de la landing (textos tomados del prototipo XD).

/** Reemplazar con el número real (formato internacional, sin "+"). */
const a = (p: string)=>`${import.meta.env.BASE_URL}${p.replace(/^\//,'')}`

export const WHATSAPP_URL = 'https://wa.me/51956687505'

/*
 * x = centro de cada enlace en el lienzo de 1920: 61px entre enlaces y hasta
 * el botón, con la fila apoyada en el borde derecho del contenido (1720).
 */
export const NAV = [
  { label: 'BIOGRAFÍA', href: '#roberth', x: 773.5 },
  { label: 'PUBLICACIONES', href: '#publicaciones', x: 934 },
  { label: 'CONFERENCIAS', href: '#conferencias', x: 1113 },
  { label: 'BLOG', href: '#', x: 1252 },
  { label: 'FORMULARIO', href: '#', x: 1381.5 },
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

/*
 * ---------- Textos por sección ----------
 * Contenido sin medidas ni saltos de línea de escritorio: lo usa la versión
 * mobile (src/mobile/). El escritorio aún tiene estos textos en su JSX.
 */

export const HEADER = { logo: 'Roberth Estratega', cta: 'COTIZA CONFERENCIAS' }

export const HERO = {
  name: 'Roberto Bazán',
  roles: ['Consultor político', 'Asesor legal', 'Escritor', 'Conferencista'],
  person: a('/img/hero-roberto.webp'),
  background: a('/img/hero-bg.webp'),
  ctaBooks: { label: 'Ver libros', href: '#publicaciones' },
  ctaTalks: { label: 'Cotiza conferencias', href: '#conversemos' },
}

export const ABOUT = {
  label: 'UNA MIRADA MULTIDIMENSIONAL',
  titleTop: 'Roberth',
  titleBottom: 'Estratega',
  /** Tramos de la frase; los marcados con strong van en negrita. */
  lead: [
    { text: 'Es socio fundador del ' },
    { text: 'GRUPO GOBERNA', strong: true },
    { text: ' y actual ' },
    { text: 'CEO', strong: true },
  ],
  text: 'Su carrera la desarrolla como escritor y conferencista en materia de tecnología, inteligencia y operaciones psicológicas, y Lawfare.',
  ctas: [
    { label: 'LEER MIS ARTÍCULOS', href: '#blog' },
    { label: 'VER MIS LIBROS', href: '#publicaciones' },
  ],
  icon: a('/svg/ico-columnas.svg'),
  background: a('/img/about-bg.webp'),
  photos: [
    { src: a('/img/about-1.webp'), alt: 'Roberto Bazán junto a autoridades y consultores', width: 972, height: 652 },
    { src: a('/img/about-3.webp'), alt: 'Roberto Bazán exponiendo', width: 612, height: 411 },
    { src: a('/img/about-4.webp'), alt: 'Roberto Bazán en un encuentro internacional', width: 1024, height: 769 },
    { src: a('/img/about-2.webp'), alt: 'Conferencia ante un auditorio', width: 888, height: 570 },
  ],
}

export const POWER = {
  lead: 'El poder se construye con',
  word: 'CONOCIMIENTO',
  background: a('/img/capitolio.webp'),
}

export const EXPERIENCE_INTRO = {
  label: 'TRAYECTORIA ESTRATÉGICA',
  title: 'Experiencia aplicada donde la decisión importa',
  areas: [
    'Consultoría política',
    'Estrategia',
    'Gobierno',
    'Campañas electorales',
    'Inteligencia',
    'Operaciones psicológicas',
    'Trabajo internacional',
    'Producción de conocimiento',
  ],
  cta: { label: 'CONVERSAR SOBRE UN PROYECTO', href: '#conversemos' },
}

export const BOOKS_INTRO = {
  label: 'PUBLICACIONES · LIBROS FÍSICOS',
  title: 'Ideas que se convierten en libros.',
  text: 'Una producción editorial especializada en estrategia política, campañas electorales, inteligencia, comunicación y los nuevos escenarios de disputa por el poder.',
  background: a('/img/pilares.webp'),
}

/** Portada de un libro del carrusel. */
export const bookCover = (book: Book) => a(`/img/${book.cover}.webp`)

export const AUDIOBOOKS_INTRO = {
  label: 'PUBLICACIONES · AUDIOLIBROS',
  title: 'El conocimiento también se escucha.',
  text: 'Una forma de explorar ideas, ampliar perspectivas y profundizar en el pensamiento político y estratégico.',
  cta: 'CONOCER PUBLICACIÓN',
  /** Los audiolibros aún no tienen página de destino. */
  href: '#',
}

export const TALKS = {
  label: 'PENSAMIENTO EN VOZ ALTA',
  titleLight: 'Ideas que salen del',
  titleGold: 'escritorio.',
  text: 'Conferencias, medios, masterclasses y espacios especializados donde comparte análisis y herramientas para comprender los nuevos escenarios del poder y la toma de decisiones.',
  cta: { label: 'Cotiza conferencias', href: '#conversemos' },
  background: a('/img/conferencias.webp'),
}

export const CONTACT = {
  label: 'CONVERSEMOS',
  leadStrong: 'Cuando la decisión importa,',
  lead: 'comprender mejor cambia el resultado.',
  cta: 'SOLICITAR UNA CONVERSACIÓN ESTRATÉGICA',
  portrait: a('/img/contacto-conferencia.webp'),
}

export const FOOTER = {
  signature: a('/svg/firma-footer.svg'),
  qr: a('/img/qr.png'),
  /** Destino de cada columna del pie. */
  columnHref: { CONFERENCIAS: '#conferencias', LIBROS: '#publicaciones' } as Record<string, string>,
}

export const WHATSAPP_ICON = a('/img/whatsapp.webp')
