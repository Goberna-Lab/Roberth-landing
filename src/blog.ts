// Artículos del blog (textos de los Word del Drive, carpeta "blogo").

const a = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

/** Bloque del cuerpo: subtítulo o párrafo; en los párrafos, **texto** va en negrita. */
export type ArticleBlock = { type: 'h2' | 'p'; text: string }

export type Article = {
  slug: string
  /** Título en dos líneas, cortado tras los dos puntos como en el XD. */
  title: [string, string]
  /** Entradilla en cursiva dorada. */
  lead: string
  /** Fecha en la cabecera del artículo (23-OCT-2026). */
  date: string
  /** Fecha corta y larga de la tarjeta del blog (23 OCTUBRE / 23 de octubre, 2026). */
  day: string
  dateLong: string
  /** Resumen de la tarjeta (texto del XD). */
  excerpt: string
  /** Minutos de lectura (unas 220 palabras por minuto). */
  minutes: number
  image: string
  /** Encuadre de la imagen de cabecera y de la tarjeta (object-position). */
  imagePosition: string
  cardPosition: string
  /** Título de tarjeta a 20px en lugar de 22 (el más largo, como en el XD). */
  cardCompact?: boolean
  blocks: ArticleBlock[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'guerra-cognitiva',
    title: ['Guerra cognitiva y operaciones psicológicas:', 'la mente como campo de batalla'],
    lead: 'Influir en lo que una persona siente, cree y decide puede tener consecuencias estratégicas. Comprender las diferencias entre las operaciones psicológicas y la guerra cognitiva permite analizar cómo se disputa el poder en el entorno informativo.',
    date: '23-OCT-2026',
    day: '23 OCTUBRE',
    dateLong: '23 de octubre, 2026',
    excerpt: 'Influir en lo que una persona siente, cree y decide puede tener consecuencias estratégicas.',
    minutes: 6,
    image: a('/img/blog/guerra-cognitiva.webp'),
    imagePosition: '50% 62%',
    cardPosition: '19.5% 32%',
    cardCompact: true,
    blocks: [
      { type: 'p', text: 'Una noticia provoca indignación. Un video despierta miedo. Una afirmación aparece repetida en distintas cuentas hasta parecer una verdad ampliamente aceptada. Antes de comprobar su origen, miles de personas la comparten y contribuyen a ampliar su alcance.' },
      { type: 'p', text: 'Estas situaciones plantean una pregunta central: ¿hasta qué punto decidimos de manera autónoma cuando la información que recibimos ha sido seleccionada para provocar una reacción?' },
      { type: 'p', text: 'La pregunta permite aproximarnos a dos conceptos relacionados: las **operaciones psicológicas**, conocidas como PSYOP o PSYOPS, y la **guerra cognitiva**. Ambos se ocupan de la influencia sobre las personas, pero conviene distinguir sus objetivos, sus ámbitos de aplicación y sus fundamentos.' },
      { type: 'p', text: 'Comprenderlos exige estudiar cómo un mensaje puede transformarse en una emoción, una interpretación y, finalmente, una conducta.' },
      { type: 'h2', text: 'La influencia como instrumento estratégico' },
      { type: 'p', text: 'La preocupación por afectar la voluntad del adversario atraviesa la historia del pensamiento militar. La tradición estratégica asociada con Sun Tzu concede especial importancia a debilitar la resistencia enemiga antes del combate.' },
      { type: 'p', text: 'La propaganda, los rumores, los llamamientos a la rendición y las demostraciones de fuerza han servido para influir sobre tropas y poblaciones. Su utilidad depende de una relación concreta: que el mensaje resulte creíble para la audiencia y contribuya a modificar su comportamiento.' },
      { type: 'p', text: 'El entorno digital amplía las posibilidades de producir, distribuir y adaptar esos mensajes. Una campaña puede circular por múltiples plataformas, dirigirse a públicos diferentes y ajustar su contenido según las respuestas que obtiene.' },
      { type: 'p', text: 'Esto aumenta la importancia de estudiar la influencia con precisión. Una comunicación persuasiva, una campaña de desinformación y una operación psicológica pueden compartir recursos, aunque respondan a propósitos y estructuras diferentes.' },
      { type: 'h2', text: 'Qué son las operaciones psicológicas' },
      { type: 'p', text: 'Las operaciones psicológicas son acciones planificadas que buscan influir en las emociones, las actitudes, las percepciones y los comportamientos de audiencias seleccionadas para apoyar objetivos estratégicos.' },
      { type: 'p', text: 'Su desarrollo doctrinario tiene una estrecha relación con el ámbito militar. Desde esa perspectiva, la comunicación forma parte de una operación más amplia y responde a un propósito definido.' },
      { type: 'p', text: 'La audiencia ocupa un lugar central. Antes de diseñar un mensaje, resulta necesario comprender sus motivaciones, sus temores, sus referencias culturales y las fuentes que considera confiables.' },
      { type: 'p', text: 'Una operación dirigida a promover la rendición de tropas, por ejemplo, necesita algo más que una exhortación. Debe ofrecer razones creíbles para que los destinatarios consideren esa posibilidad y condiciones que respalden lo prometido.' },
      { type: 'p', text: 'La eficacia se evalúa por los cambios que contribuye a producir. La cantidad de mensajes difundidos o de personas alcanzadas puede aportar información, pero no demuestra por sí sola que se haya conseguido el comportamiento buscado.' },
      { type: 'h2', text: 'Qué propone el concepto de guerra cognitiva' },
      { type: 'p', text: 'La guerra cognitiva dirige la atención hacia los procesos mediante los cuales las personas interpretan información, forman juicios y toman decisiones.' },
      { type: 'p', text: 'En este enfoque, interesa estudiar cómo se puede afectar la confianza, reforzar prejuicios, explotar divisiones o generar incertidumbre persistente. La influencia puede dirigirse tanto a individuos como a grupos e instituciones.' },
      { type: 'p', text: 'Su discusión contemporánea incorpora el papel de las redes sociales, el análisis de datos y la inteligencia artificial. Estas tecnologías pueden facilitar la identificación de audiencias, la adaptación de contenidos y la circulación de mensajes a gran escala.' },
      { type: 'p', text: 'Sin embargo, el concepto requiere cuidado. Sus límites siguen siendo objeto de debate y no existe una definición única aceptada en todos los ámbitos. Utilizarlo como explicación universal de cualquier conflicto informativo reduce su valor analítico.' },
      { type: 'p', text: 'La pregunta útil es concreta: ¿qué proceso de interpretación o decisión se intenta afectar, mediante qué mecanismos y con qué evidencias?' },
      { type: 'h2', text: 'Cómo se relacionan ambos conceptos' },
      { type: 'p', text: 'Las operaciones psicológicas ofrecen una tradición doctrinaria y operativa orientada a influir sobre audiencias determinadas. La guerra cognitiva propone una mirada más amplia sobre la disputa por los procesos de percepción y decisión.' },
      { type: 'p', text: 'Ambas pueden coincidir en herramientas y objetivos. Una campaña puede apelar a emociones, difundir una interpretación de los hechos y buscar una conducta específica. A la vez, puede contribuir a un efecto más prolongado sobre la confianza de una sociedad.' },
      { type: 'p', text: 'La diferencia no depende únicamente de la tecnología utilizada. Un mensaje difundido en redes sociales no se convierte automáticamente en guerra cognitiva. Para analizarlo es necesario examinar quién lo impulsa, qué pretende conseguir, cómo se coordina y qué resultados produce.' },
      { type: 'p', text: 'Tampoco conviene equiparar todas las operaciones de influencia con información falsa. La selección de hechos, el momento de publicación y el contexto pueden orientar una interpretación incluso cuando el contenido difundido es verdadero.' },
      { type: 'h2', text: 'Las Tres Guerras chinas como marco de comparación' },
      { type: 'p', text: 'La doctrina china de las Tres Guerras permite observar cómo distintas dimensiones de la influencia pueden articularse alrededor de un objetivo estratégico.' },
      { type: 'p', text: 'La guerra psicológica busca afectar la voluntad y la moral del adversario. La guerra de opinión pública intenta favorecer determinadas interpretaciones de los acontecimientos. La guerra legal emplea argumentos y marcos jurídicos para respaldar posiciones o cuestionar las del contrario.' },
      { type: 'p', text: 'Su interés está en la coordinación. Una demostración militar puede transmitir presión psicológica; la comunicación oficial puede presentarla como necesaria; una argumentación jurídica puede intentar sostener su legitimidad.' },
      { type: 'p', text: 'Este marco ayuda a estudiar la relación entre fuerza, percepción y derecho. También muestra por qué es necesario conservar las diferencias entre doctrinas: reconocer elementos comunes no significa que todas las estrategias de influencia sean equivalentes.' },
      { type: 'h2', text: 'Algoritmos, emociones y percepción de la realidad' },
      { type: 'p', text: 'En el entorno digital, la selección de contenidos influye en aquello que recibe nuestra atención. La exposición reiterada a determinados mensajes puede hacer que una posición parezca más extendida o una amenaza más cercana.' },
      { type: 'p', text: 'Las emociones tienen un papel relevante en esa dinámica. El miedo, la indignación y el sentimiento de pertenencia pueden favorecer respuestas rápidas y reducir el tiempo dedicado a comprobar una afirmación.' },
      { type: 'p', text: 'Imaginemos que una persona recibe de manera constante publicaciones sobre un supuesto peligro. Aunque cada mensaje aporte poca información nueva, la repetición puede reforzar la impresión de que el riesgo es generalizado.' },
      { type: 'p', text: 'Ese efecto merece análisis, pero atribuirlo a una operación deliberada exige pruebas adicionales. Hay que distinguir entre decisiones de una plataforma, comportamiento espontáneo de sus usuarios y actividad coordinada por un actor.' },
      { type: 'p', text: 'La capacidad de influir tampoco equivale a un control absoluto. Las personas contrastan, rechazan, reinterpretan y responden a los mensajes de formas distintas.' },
      { type: 'h2', text: 'Defender la autonomía de criterio' },
      { type: 'p', text: 'La respuesta frente a la manipulación comienza por mejorar la manera en que evaluamos la información.' },
      { type: 'p', text: 'Antes de compartir un contenido que despierta una reacción intensa, conviene revisar su procedencia, su fecha y su contexto. También resulta útil distinguir qué parte presenta hechos comprobables y cuál propone una interpretación.' },
      { type: 'p', text: 'Contrastar fuentes permite identificar omisiones y versiones contradictorias. Preguntarse qué evidencia podría modificar nuestra propia opinión ayuda a reconocer cuándo estamos buscando comprender y cuándo estamos buscando confirmar una creencia.' },
      { type: 'p', text: 'El escepticismo necesita un criterio. Desconfiar de todo puede debilitarnos tanto como aceptar cualquier afirmación, porque dificulta distinguir entre información sólida y contenido engañoso.' },
      { type: 'p', text: 'Estudiar las operaciones psicológicas y la guerra cognitiva permite reconocer cómo se intenta orientar una decisión. Esa comprensión fortalece una capacidad esencial: examinar los mensajes que recibimos y conservar la posibilidad de cambiar de opinión por razones, pruebas y reflexión.' },
    ],
  },
  {
    slug: 'tres-guerras',
    title: ['La doctrina de las Tres Guerras:', 'el poder invisible de China'],
    lead: 'La guerra psicológica, la influencia mediática y el uso estratégico del derecho forman parte de una concepción del poder que busca condicionar las decisiones del adversario antes del enfrentamiento militar.',
    date: '23-OCT-2026',
    day: '23 OCTUBRE',
    dateLong: '23 de octubre, 2026',
    excerpt: 'La guerra psicológica, la influencia mediática y el uso estratégico del derecho forman parte de una concepción del poder',
    minutes: 6,
    image: a('/img/blog/tres-guerras.webp'),
    imagePosition: '50% 33%',
    cardPosition: '41.6% 0%',
    blocks: [
      { type: 'p', text: 'Imaginemos una escena en el mar de China Meridional: un buque transmite por altavoces un mensaje que afirma la soberanía china sobre las aguas en disputa. Al mismo tiempo, medios de comunicación y plataformas digitales difunden mapas, argumentos históricos y declaraciones oficiales que respaldan esa posición.' },
      { type: 'p', text: 'La escena permite entender una idea central de la estrategia: una disputa territorial también se desarrolla en la mente de quienes participan en ella y en la percepción de quienes la observan. La fuerza militar puede acompañarse de mensajes destinados a intimidar, argumentos que buscan legitimidad y relatos que intentan imponerse en la opinión pública.' },
      { type: 'p', text: 'Esta combinación ayuda a comprender la **doctrina de las Tres Guerras**, que articula la guerra psicológica, la guerra de opinión pública y la guerra legal. Su propósito es crear condiciones favorables para alcanzar objetivos políticos y estratégicos, incluso antes de que comience una confrontación armada.' },
      { type: 'h2', text: 'De la tradición estratégica al trabajo político' },
      { type: 'p', text: 'La importancia de influir sobre el adversario tiene raíces profundas en el pensamiento estratégico chino. La tradición asociada con Sun Tzu concede un lugar destacado al conocimiento del enemigo, el engaño y la posibilidad de alcanzar la victoria debilitando su voluntad de combatir.' },
      { type: 'p', text: 'Siglos después, durante el periodo revolucionario, Mao Zedong atribuyó al trabajo político una función esencial. El Ejército Popular de Liberación debía combatir y, al mismo tiempo, movilizar apoyos, difundir la causa revolucionaria y erosionar la cohesión de sus adversarios.' },
      { type: 'p', text: 'La propaganda, los mensajes dirigidos a las tropas enemigas y las iniciativas para promover la rendición formaban parte de esa concepción. La disputa por las lealtades y las convicciones acompañaba a las operaciones militares.' },
      { type: 'p', text: 'La doctrina de las Tres Guerras recoge esa importancia del componente político y la adapta a un entorno de comunicación global. Su rasgo más relevante es la coordinación de herramientas que actúan sobre distintos aspectos de una misma disputa: la voluntad, la percepción y la legitimidad.' },
      { type: 'h2', text: 'Guerra psicológica: condicionar la voluntad del adversario' },
      { type: 'p', text: 'La guerra psicológica busca influir en las emociones, las expectativas y las decisiones de una audiencia. Puede dirigirse a mandos militares, dirigentes políticos o sectores de la población.' },
      { type: 'p', text: 'Sus objetivos incluyen debilitar la confianza en la resistencia, generar incertidumbre, acentuar divisiones o transmitir una sensación de superioridad. Para ello, combina mensajes con acciones capaces de darles credibilidad.' },
      { type: 'p', text: 'Un ejercicio militar, por ejemplo, tiene una dimensión operativa y otra comunicativa. Su difusión puede buscar que el adversario perciba un coste elevado en determinadas decisiones o dude del respaldo que recibiría de sus aliados.' },
      { type: 'p', text: 'Desde esta perspectiva, el efecto estratégico depende también de cómo se interpreta una capacidad militar. Una fuerza puede ejercer presión antes de utilizar sus armas si consigue modificar las expectativas de quienes deben decidir.' },
      { type: 'p', text: 'Sin embargo, la intención de intimidar no garantiza el resultado. Una demostración de poder también puede fortalecer la resistencia, reforzar alianzas o aumentar la desconfianza hacia quien la ejecuta.' },
      { type: 'h2', text: 'Guerra de opinión pública: disputar la interpretación de los hechos' },
      { type: 'p', text: 'La guerra de opinión pública, también denominada guerra mediática, busca influir en la manera en que una audiencia comprende un acontecimiento.' },
      { type: 'p', text: 'Durante una crisis, presentar primero una versión de los hechos puede ofrecer una ventaja. Permite definir los términos del debate, identificar responsables y establecer qué acciones deberían considerarse defensivas, legítimas o provocadoras.' },
      { type: 'p', text: 'Los medios de comunicación, los discursos oficiales, las imágenes, los mapas y las plataformas digitales pueden contribuir a ese esfuerzo. Un mismo episodio admite presentaciones diferentes: una maniobra militar puede describirse como defensa de la soberanía o como presión sobre un vecino.' },
      { type: 'p', text: 'La disputa consiste en conseguir que una interpretación gane aceptación y condicione las respuestas de gobiernos y sociedades.' },
      { type: 'p', text: 'La difusión digital amplía el alcance y la velocidad de estas operaciones. También dificulta distinguir entre apoyo espontáneo, comunicación institucional y actividad coordinada. Por eso, identificar una operación de influencia exige examinar su procedencia, sus patrones y sus evidencias; la coincidencia de opiniones, por sí sola, no demuestra coordinación.' },
      { type: 'h2', text: 'Guerra legal: convertir la legitimidad en una ventaja estratégica' },
      { type: 'p', text: 'La guerra legal, conocida también como lawfare, emplea argumentos jurídicos y marcos normativos para respaldar objetivos estratégicos, cuestionar actuaciones del adversario o limitar su margen de acción.' },
      { type: 'p', text: 'El derecho adquiere así una dimensión política y comunicativa. Presentar una posición como jurídicamente legítima puede facilitar apoyos internacionales, justificar decisiones y aumentar el coste reputacional de quienes se oponen.' },
      { type: 'p', text: 'En las disputas marítimas, por ejemplo, las interpretaciones sobre derechos, jurisdicciones y antecedentes históricos influyen tanto en los procedimientos jurídicos como en el debate público.' },
      { type: 'p', text: 'Conviene mantener una distinción: recurrir al derecho o defender una interpretación jurídica no constituye automáticamente una práctica abusiva. El análisis estratégico debe examinar cómo se utilizan esos argumentos, qué objetivos persiguen y si son consistentes con las obligaciones aplicables.' },
      { type: 'h2', text: 'Tres instrumentos que se refuerzan mutuamente' },
      { type: 'p', text: 'El valor de esta doctrina está en la integración de sus componentes.' },
      { type: 'p', text: 'Una acción militar puede transmitir una amenaza y generar presión psicológica. Su difusión mediática puede presentarla como necesaria o defensiva. Una argumentación jurídica puede intentar otorgarle legitimidad.' },
      { type: 'p', text: 'Las tres dimensiones contribuyen entonces a un mismo objetivo: influir sobre las decisiones del adversario y sobre la respuesta internacional.' },
      { type: 'p', text: 'Esta lógica permite comprender por qué la competencia estratégica continúa durante periodos de paz. Los relatos, las percepciones y los argumentos que circulan antes de una crisis pueden condicionar la manera en que esa crisis será interpretada.' },
      { type: 'h2', text: 'El mar de China Meridional y Taiwán' },
      { type: 'p', text: 'En el análisis del mar de China Meridional, la doctrina ofrece un marco para observar la relación entre presencia marítima, reivindicaciones territoriales y comunicación política.' },
      { type: 'p', text: 'Los mapas y las referencias históricas transmiten una determinada representación del espacio. Las declaraciones oficiales buscan sostener esa representación, mientras que la presencia de buques añade una dimensión material a la disputa. Para evaluar el conjunto es necesario distinguir entre las reivindicaciones de cada actor, su fundamento jurídico y los efectos de sus acciones.' },
      { type: 'p', text: 'Taiwán permite examinar otra combinación de presión militar, mensajes políticos y competencia informativa. Los ejercicios militares pueden dirigirse simultáneamente a las autoridades taiwanesas, a su población y a actores internacionales.' },
      { type: 'p', text: 'Cada audiencia recibe un mensaje distinto: advertencias sobre determinadas decisiones, demostraciones de capacidad o argumentos sobre soberanía. Desde la perspectiva de las Tres Guerras, interesa observar cómo se coordinan esos mensajes y qué conductas buscan modificar.' },
      { type: 'p', text: 'Su eficacia, sin embargo, debe demostrarse. La exposición a una narrativa no equivale a aceptarla, y la presión puede producir consecuencias distintas de las previstas.' },
      { type: 'h2', text: 'Comprender el poder sobre las percepciones' },
      { type: 'p', text: 'La doctrina de las Tres Guerras amplía la mirada sobre la competencia entre Estados. Obliga a estudiar cómo se relacionan las capacidades militares con la información, la psicología y los argumentos jurídicos.' },
      { type: 'p', text: 'También plantea un desafío para investigadores, responsables públicos y ciudadanos: reconocer los intentos de influencia sin atribuir toda controversia a una operación deliberada. Eso exige contrastar fuentes, separar hechos de interpretaciones y evaluar resultados concretos.' },
      { type: 'p', text: 'El poder estratégico incluye la capacidad de influir en lo que otros consideran posible, legítimo o inevitable. Comprender esa dimensión permite analizar con mayor precisión las disputas contemporáneas y las decisiones que pueden acercarlas a una solución o a una escalada.' },
    ],
  },
  {
    slug: 'especismo-maquinismo',
    title: ['Especismo vs. maquinismo:', 'un nuevo espectro ideológico del poder'],
    lead: 'La inteligencia artificial abre un debate que trasciende la tecnología: quién debe decidir, cómo se distribuirán sus beneficios y qué lugar conservará el ser humano en una sociedad cada vez más automatizada.',
    date: '23-OCT-2026',
    day: '23 OCTUBRE',
    dateLong: '23 de octubre, 2026',
    excerpt: 'La inteligencia artificial abre un debate que trasciende la tecnología: quién debe decidir, cómo se distribuirán sus beneficios',
    minutes: 6,
    image: a('/img/blog/especismo-maquinismo.webp'),
    imagePosition: '50% 69%',
    cardPosition: '18.5% 100%',
    blocks: [
      { type: 'p', text: '¿Qué ocurriría si delegáramos decisiones políticas en máquinas capaces de analizar más información que cualquier equipo humano? ¿Quién tendría la última palabra ante un desacuerdo? ¿Y quién controlaría los sistemas de los que depende esa capacidad?' },
      { type: 'p', text: 'Estas preguntas permiten explorar una dimensión del debate sobre la inteligencia artificial: su relación con el poder.' },
      { type: 'p', text: 'Habitualmente discutimos sus efectos sobre el empleo, la productividad o la educación. Sin embargo, también necesitamos examinar las ideas políticas que pueden surgir alrededor de su desarrollo. Aceptar una tecnología implica decidir qué funciones le asignamos, qué límites establecemos y quién responde por sus consecuencias.' },
      { type: 'p', text: 'Para abrir esa discusión, propongo un marco organizado alrededor de dos polos: **especismo y maquinismo**. Se trata de un ejercicio de prospectiva política que permite imaginar distintas formas de convivencia entre seres humanos y máquinas.' },
      { type: 'h2', text: 'Dos posiciones sobre el lugar del ser humano' },
      { type: 'p', text: 'En este planteamiento, el especismo representa la defensa de la primacía humana frente a las máquinas. Desde esa posición, la inteligencia artificial debe permanecer subordinada a decisiones, objetivos y responsabilidades humanas.' },
      { type: 'p', text: 'Esta defensa puede adoptar formas diferentes. Algunas posiciones aceptarían un uso intensivo de la tecnología bajo supervisión. Otras rechazarían el desarrollo de sistemas avanzados por considerar que generan una dependencia incompatible con la autonomía humana.' },
      { type: 'p', text: 'El maquinismo, por su parte, concede a las máquinas un protagonismo creciente en la organización de la sociedad. Sus distintas variantes pueden ir desde una amplia delegación de tareas hasta escenarios hipotéticos de autoridad tecnológica sobre decisiones fundamentales.' },
      { type: 'p', text: 'Aquí utilizo ambos términos con un sentido específico para analizar la relación entre humanidad, tecnología y poder. El modelo tampoco presupone que las máquinas posean conciencia, voluntad propia o derechos: esas cuestiones requieren una discusión separada.' },
      { type: 'h2', text: 'La tecnología también plantea un problema de distribución' },
      { type: 'p', text: 'La oposición entre primacía humana y protagonismo de las máquinas resulta insuficiente para explicar todas las alternativas.' },
      { type: 'p', text: 'Dos sociedades podrían utilizar sistemas igualmente avanzados y distribuir sus beneficios de maneras radicalmente distintas. Una podría orientar la automatización hacia servicios públicos y bienestar colectivo. Otra podría concentrar sus capacidades en un grupo reducido de propietarios o dirigentes.' },
      { type: 'p', text: 'Por eso, el marco incorpora un segundo eje: la distribución del poder y de los beneficios tecnológicos.' },
      { type: 'p', text: 'Para organizar el ejercicio, relaciono ese eje con posiciones de izquierda y derecha. Son categorías simplificadas dentro de esta propuesta; no pretenden describir todas las corrientes políticas existentes ni atribuirles una postura tecnológica uniforme.' },
      { type: 'p', text: 'El cruce entre ambos ejes permite distinguir cuatro escenarios.' },
      { type: 'h2', text: 'Especismo de izquierda: antimaquinismo radical' },
      { type: 'p', text: 'El primer escenario combina la defensa de la autonomía humana con el rechazo a las máquinas pensantes avanzadas.' },
      { type: 'p', text: 'Desde esta perspectiva, la dependencia tecnológica podría debilitar los vínculos comunitarios, desplazar capacidades humanas y someter la vida social a sistemas difíciles de comprender o controlar.' },
      { type: 'p', text: 'Su alternativa sería una organización basada en comunidades autosuficientes, cooperación y límites estrictos a la automatización.' },
      { type: 'p', text: 'La preocupación central es preservar una vida colectiva gobernada por personas. Su dificultad aparece al decidir qué tecnologías deberían restringirse y qué costes tendría renunciar a aplicaciones capaces de mejorar las condiciones de vida.' },
      { type: 'p', text: 'Este escenario obliga a preguntarnos cuánto desarrollo tecnológico aceptaríamos limitar para conservar determinadas formas de autonomía.' },
      { type: 'h2', text: 'Maquinismo de izquierda: tecnocolectivismo' },
      { type: 'p', text: 'El segundo escenario apuesta por emplear capacidades tecnológicas avanzadas para atender necesidades colectivas.' },
      { type: 'p', text: 'La automatización permitiría imaginar una gestión más eficiente de recursos, una mejor planificación de servicios y una distribución más amplia de sus beneficios. El acceso público y la supervisión democrática ocuparían un lugar central.' },
      { type: 'p', text: 'En esta variante, las máquinas pueden desempeñar funciones extensas sin adquirir necesariamente autoridad política propia. Esa distinción es importante: delegar una tarea no equivale a transferir la capacidad de definir los fines de una sociedad.' },
      { type: 'p', text: 'El desafío consiste en mantener un control democrático efectivo. Un sistema presentado como beneficioso para todos puede volverse opaco si las personas afectadas no pueden comprender sus criterios, cuestionar sus resultados o solicitar su revisión.' },
      { type: 'p', text: 'El bienestar colectivo exige discutir tanto los objetivos como los procedimientos utilizados para alcanzarlos.' },
      { type: 'h2', text: 'Maquinismo de derecha: aristocracia cyborg' },
      { type: 'p', text: 'El tercer escenario imagina una alianza entre élites humanas y capacidades tecnológicas avanzadas.' },
      { type: 'p', text: 'En su expresión más extrema, el acceso desigual a sistemas de inteligencia artificial y tecnologías de mejora humana podría consolidar una minoría con ventajas económicas, políticas y físicas difíciles de disputar.' },
      { type: 'p', text: 'La idea de una “aristocracia cyborg” sirve aquí como imagen prospectiva de esa concentración. Describe un mundo hipotético donde ciertas personas ampliarían su poder mediante una integración privilegiada con la tecnología.' },
      { type: 'p', text: 'El problema central sería la desigualdad de capacidades. Si una élite controla las herramientas que organizan la producción, la información y las decisiones estratégicas, el resto de la sociedad podría perder posibilidades reales de participación.' },
      { type: 'p', text: 'Este escenario invita a examinar quién accede a la innovación y qué mecanismos impedirían convertir una ventaja tecnológica en una jerarquía permanente.' },
      { type: 'h2', text: 'Especismo de derecha: feudalismo tecnológico' },
      { type: 'p', text: 'El cuarto escenario mantiene la subordinación de las máquinas a los seres humanos, mientras concentra su control en una estructura jerárquica.' },
      { type: 'p', text: 'La automatización podría alcanzar un nivel elevado, pero la autoridad seguiría en manos de una élite humana. Las máquinas funcionarían como instrumentos para ampliar su capacidad de administrar recursos, organizar el trabajo y preservar su posición.' },
      { type: 'p', text: 'La metáfora del “feudalismo tecnológico” destaca esa relación de dependencia.' },
      { type: 'p', text: 'Su contradicción más relevante es que la primacía de la especie humana no garantiza la autonomía de todas las personas. Una sociedad puede mantener a las máquinas bajo control humano y, al mismo tiempo, excluir a gran parte de la población del poder de decisión.' },
      { type: 'p', text: 'Por eso, preguntar si gobiernan los humanos resulta incompleto. También necesitamos saber cuáles humanos gobiernan y ante quién deben responder.' },
      { type: 'h2', text: 'Las tensiones entre los cuatro escenarios' },
      { type: 'p', text: 'Este mapa permite identificar desacuerdos y posibles coincidencias.' },
      { type: 'p', text: 'El antimaquinismo radical y el tecnocolectivismo podrían compartir objetivos de igualdad, aunque discrepen profundamente sobre el papel de la tecnología.' },
      { type: 'p', text: 'La aristocracia cyborg y el feudalismo tecnológico podrían coincidir en estructuras concentradas de poder, pero diferirían respecto a la integración con las máquinas y al grado de autoridad que estarían dispuestos a delegar.' },
      { type: 'p', text: 'Estas tensiones muestran que el debate tecnológico reúne preguntas diferentes: cuánto automatizar, quién controla, quién se beneficia y qué decisiones deben seguir sujetas a deliberación humana.' },
      { type: 'p', text: 'Las posiciones reales pueden combinar elementos de varios escenarios. Esa posibilidad hace del modelo una herramienta de discusión, abierta a ajustes y objeciones.' },
      { type: 'h2', text: 'El futuro tecnológico necesita una discusión política' },
      { type: 'p', text: 'La propuesta de especismo y maquinismo busca ampliar nuestra manera de pensar la inteligencia artificial.' },
      { type: 'p', text: 'Su valor está en ayudarnos a formular preguntas sobre la autoridad, la dependencia y la distribución del poder. El avance técnico, por sí mismo, no determina cómo debemos organizarnos.' },
      { type: 'p', text: 'Cada sociedad tendrá que decidir qué delega, qué protege y cómo conserva la capacidad de revisar sus decisiones. También deberá establecer quién responde cuando un sistema falla y cómo pueden participar quienes reciben sus consecuencias.' },
      { type: 'p', text: 'El futuro de nuestra relación con las máquinas dependerá de las capacidades que desarrollemos y de las instituciones que construyamos para gobernarlas. Discutir esos escenarios desde ahora permite intervenir en ese futuro con mayor criterio.' },
    ],
  },
]

/** Ruta de cada artículo: #/blog/<slug> (no choca con las anclas de la landing). */
export const ARTICLE_PREFIX = '#/blog/'
export const articleHref = (slug: string) => `${ARTICLE_PREFIX}${slug}`

/** Sección Blog de la landing (textos del XD). */
export const BLOG = {
  label: 'ROBERTH ESTRATEGA',
  titleGold: 'Ideas',
  title: 'para comprender el poder',
  text: 'Análisis, estrategia y pensamiento aplicado sobre política, inteligencia, tecnología y los nuevos escenarios que transforman la toma de decisiones.',
  cta: 'Leer artículo',
  share: 'Compartir',
}
