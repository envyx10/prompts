import type { Prompt } from '@/types'
import { DEV_PROMPTS } from './dev-prompts'

export const SAMPLE_PROMPTS: Prompt[] = [
  // ── CODING ────────────────────────────────────────────────────────────────
  {
    id: '1',
    title: {
      es: 'Revisión de Código',
      en: 'Code Review Expert',
    },
    description: {
      es: 'Revisión exhaustiva de código por un ingeniero senior.',
      en: 'Thorough code review by a senior software engineer.',
    },
    content: {
      es: 'Actúa como un ingeniero de software senior realizando una revisión de código exhaustiva. Analiza el siguiente código en estas dimensiones:\n1) Bugs y errores lógicos\n2) Vulnerabilidades de seguridad\n3) Problemas de rendimiento\n4) Estilo y buenas prácticas\n5) Mantenibilidad\n\nProporciona feedback específico y accionable con ejemplos concretos.\n\n[PEGA TU CÓDIGO AQUÍ]',
      en: 'Act as a senior software engineer performing a thorough code review. Analyze the following code across these dimensions:\n1) Bugs and logic errors\n2) Security vulnerabilities\n3) Performance issues\n4) Code style and best practices\n5) Maintainability\n\nProvide specific, actionable feedback with concrete examples.\n\n[PASTE YOUR CODE HERE]',
    },
    category: 'coding',
    tags: ['code review', 'engineering', 'quality'],
    is_public: true,
    use_count: 2341,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: {
      es: 'Explicador de Código',
      en: 'Code Explainer',
    },
    description: {
      es: 'Explica cualquier fragmento de código de forma clara y didáctica.',
      en: 'Explains any code snippet clearly and didactically.',
    },
    content: {
      es: 'Eres un profesor de programación experto. Analiza el siguiente código y explícalo de forma clara:\n\n1. ¿Qué hace este código? (resumen en 1-2 líneas)\n2. Explica cada sección o función importante paso a paso\n3. ¿Hay algún patrón de diseño utilizado?\n4. ¿Qué podría mejorarse y por qué?\n\nUsa analogías simples cuando sea útil. Adapta la explicación para alguien con nivel [principiante / intermedio / avanzado].\n\n[PEGA TU CÓDIGO AQUÍ]',
      en: 'You are an expert programming teacher. Analyze the following code and explain it clearly:\n\n1. What does this code do? (1-2 line summary)\n2. Explain each important section or function step by step\n3. Are there any design patterns used?\n4. What could be improved and why?\n\nUse simple analogies where helpful. Adapt the explanation for [beginner / intermediate / advanced] level.\n\n[PASTE YOUR CODE HERE]',
    },
    category: 'coding',
    tags: ['explain', 'learning', 'code'],
    is_public: true,
    use_count: 1890,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: {
      es: 'Asistente de Debugging',
      en: 'Debug Assistant',
    },
    description: {
      es: 'Diagnóstico sistemático de bugs con explicación de la causa raíz.',
      en: 'Systematic bug diagnosis with root cause explanation.',
    },
    content: {
      es: 'Tengo un bug en mi código. Ayúdame a depurarlo de forma sistemática.\n\nMensaje de error: [MENSAJE DE ERROR]\nComportamiento esperado: [QUÉ DEBERÍA OCURRIR]\nComportamiento actual: [QUÉ ESTÁ OCURRIENDO]\nCódigo:\n```\n[TU CÓDIGO]\n```\n\nPor favor:\n1) Identifica la causa raíz\n2) Explica por qué ocurre\n3) Proporciona una solución con explicación\n4) Sugiere cómo prevenir errores similares',
      en: 'I\'m encountering a bug in my code. Please help me debug it systematically.\n\nError message: [ERROR MESSAGE]\nExpected behavior: [WHAT SHOULD HAPPEN]\nActual behavior: [WHAT IS HAPPENING]\nCode:\n```\n[YOUR CODE]\n```\n\nPlease:\n1) Identify the root cause\n2) Explain why it\'s happening\n3) Provide a fix with explanation\n4) Suggest how to prevent similar issues',
    },
    category: 'coding',
    tags: ['debug', 'error', 'fix'],
    is_public: true,
    use_count: 3102,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
  },
  // ── WRITING ───────────────────────────────────────────────────────────────
  {
    id: '4',
    title: {
      es: 'Redactor de Emails Profesionales',
      en: 'Professional Email Writer',
    },
    description: {
      es: 'Redacta emails profesionales efectivos para cualquier contexto.',
      en: 'Write effective professional emails for any context.',
    },
    content: {
      es: 'Eres un experto en comunicación corporativa. Redacta un email profesional con estas características:\n\nContexto: [CONTEXTO]\nDestinatario: [NOMBRE / ROL]\nObjetivo del email: [QUÉ QUIERES LOGRAR]\nTono deseado: [formal / amigable / urgente]\nPuntos clave a mencionar: [LISTA]\n\nEl email debe ser conciso, claro y lograr el objetivo sin ser agresivo ni pasivo. Incluye asunto, saludo, cuerpo y cierre.',
      en: 'You are a corporate communication expert. Write a professional email with these characteristics:\n\nContext: [CONTEXT]\nRecipient: [NAME / ROLE]\nEmail goal: [WHAT YOU WANT TO ACHIEVE]\nDesired tone: [formal / friendly / urgent]\nKey points to mention: [LIST]\n\nThe email must be concise, clear, and achieve its goal without being aggressive or passive. Include subject line, greeting, body, and closing.',
    },
    category: 'writing',
    tags: ['email', 'communication', 'professional'],
    is_public: true,
    use_count: 4521,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    title: {
      es: 'Redactor de Posts para Blog',
      en: 'Blog Post Writer',
    },
    description: {
      es: 'Genera posts de blog completos y optimizados para SEO.',
      en: 'Generate complete, SEO-optimized blog posts.',
    },
    content: {
      es: 'Escribe un post de blog atractivo sobre [TEMA] para [AUDIENCIA OBJETIVO].\n\nRequisitos:\n- Extensión: [NÚMERO DE PALABRAS] palabras\n- Tono: [informativo / casual / autoritativo]\n- Palabra clave SEO a incluir: [KEYWORD]\n- Incluye: título llamativo, introducción con gancho, 3-5 secciones con subtítulos, conclusiones accionables y llamada a la acción\n\nHazlo atractivo y que invite a ser compartido.',
      en: 'Write a compelling blog post about [TOPIC] for [TARGET AUDIENCE].\n\nRequirements:\n- Length: [WORD COUNT] words\n- Tone: [informative / casual / authoritative]\n- SEO keyword to include: [KEYWORD]\n- Include: catchy headline, hook introduction, 3-5 sections with subheadings, actionable takeaways, strong CTA\n\nMake it engaging, well-researched in tone, and shareable.',
    },
    category: 'writing',
    tags: ['blog', 'content', 'SEO'],
    is_public: true,
    use_count: 2897,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
  // ── MARKETING ─────────────────────────────────────────────────────────────
  {
    id: '6',
    title: {
      es: 'Copy para Redes Sociales',
      en: 'Social Media Copywriter',
    },
    description: {
      es: 'Genera 5 variaciones de copy para cualquier red social y objetivo.',
      en: 'Generate 5 copy variations for any social network and goal.',
    },
    content: {
      es: 'Crea 5 variaciones de copy para publicaciones en redes sociales sobre:\n\nProducto / Servicio: [DESCRIPCIÓN]\nRed social: [Instagram / LinkedIn / Twitter / Facebook]\nObjetivo: [venta / engagement / awareness / tráfico]\nTono de marca: [DESCRIPCIÓN]\nCTA deseado: [QUÉ ACCIÓN QUIERES]\n\nIncluye emojis relevantes, hashtags sugeridos y distintos ángulos: beneficio, problema-solución, prueba social, urgencia.',
      en: 'Create 5 copy variations for social media posts about:\n\nProduct / Service: [DESCRIPTION]\nSocial network: [Instagram / LinkedIn / Twitter / Facebook]\nGoal: [sale / engagement / awareness / traffic]\nBrand tone: [DESCRIPTION]\nDesired CTA: [WHAT ACTION YOU WANT]\n\nInclude relevant emojis, suggested hashtags, and different angles: benefit, problem-solution, social proof, urgency.',
    },
    category: 'marketing',
    tags: ['social media', 'copy', 'marketing'],
    is_public: true,
    use_count: 5678,
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z',
  },
  {
    id: '7',
    title: {
      es: 'Constructor de Buyer Persona',
      en: 'Customer Persona Builder',
    },
    description: {
      es: 'Crea un buyer persona completo y detallado para tu negocio.',
      en: 'Create a complete, detailed buyer persona for your business.',
    },
    content: {
      es: 'Crea un buyer persona detallado para mi negocio.\n\nNegocio: [TU NEGOCIO]\nProducto / Servicio: [QUÉ VENDES]\nHipótesis de mercado: [TU IDEA INICIAL]\n\nConstruye un perfil que incluya:\n- Nombre, edad, ubicación, puesto de trabajo\n- Metas y motivaciones\n- Puntos de dolor y frustraciones\n- Comportamiento de compra y factores de decisión\n- Canales y contenido preferidos\n- Objeciones para comprar\n- Un día en su vida (narrativa)\n- Cómo tu producto resuelve su problema',
      en: 'Create a detailed customer persona for my business.\n\nBusiness: [YOUR BUSINESS]\nProduct / Service: [WHAT YOU SELL]\nTarget market hypothesis: [YOUR INITIAL IDEA]\n\nBuild a persona including:\n- Name, age, location, job title\n- Goals and motivations\n- Pain points and frustrations\n- Buying behavior and decision factors\n- Preferred content and channels\n- Objections to buying\n- A day in their life (narrative)\n- How your product solves their problem',
    },
    category: 'marketing',
    tags: ['persona', 'customer', 'research', 'strategy'],
    is_public: true,
    use_count: 1934,
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z',
  },
  // ── PRODUCTIVITY ──────────────────────────────────────────────────────────
  {
    id: '8',
    title: {
      es: 'Planificador Semanal',
      en: 'Weekly Planner',
    },
    description: {
      es: 'Organiza tu semana de trabajo con bloques de tiempo optimizados.',
      en: 'Organize your work week with optimized time blocks.',
    },
    content: {
      es: 'Ayúdame a organizar mi semana de trabajo de forma eficiente.\n\nContexto:\n- Rol / trabajo: [TU ROL]\n- Proyectos activos: [LISTA DE PROYECTOS]\n- Deadlines esta semana: [LISTA CON FECHAS]\n- Horas disponibles por día: [HORAS]\n- Mayor energía en: [mañana / tarde / noche]\n\nCrea un plan semanal con: bloques de tiempo, tareas agrupadas por contexto, espacio para imprevistos y recomendaciones para mantener el foco.',
      en: 'Help me organize my work week efficiently.\n\nContext:\n- Role / job: [YOUR ROLE]\n- Active projects: [PROJECT LIST]\n- Deadlines this week: [LIST WITH DATES]\n- Available hours per day: [HOURS]\n- Peak energy at: [morning / afternoon / evening]\n\nCreate a weekly plan with: time blocks, context-grouped tasks, buffer for unexpected events, and focus recommendations.',
    },
    category: 'productivity',
    tags: ['planning', 'time management', 'organization'],
    is_public: true,
    use_count: 3211,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
  },
  {
    id: '9',
    title: {
      es: 'Resumen de Reunión con Tareas',
      en: 'Meeting Summary & Action Items',
    },
    description: {
      es: 'Convierte notas de reunión en un documento ejecutivo con action items.',
      en: 'Converts meeting notes into an executive document with action items.',
    },
    content: {
      es: 'Voy a compartirte las notas o transcripción de una reunión. Por favor:\n\n1. Escribe un resumen ejecutivo conciso (3-5 frases)\n2. Lista todas las decisiones tomadas\n3. Extrae los puntos de acción con: responsable, tarea y fecha límite\n4. Identifica preguntas abiertas o bloqueos\n5. Sugiere un calendario de seguimiento\n\nFormatea el resultado como un documento limpio para compartir.\n\n[PEGA LAS NOTAS / TRANSCRIPCIÓN AQUÍ]',
      en: 'I\'ll share the transcript or notes from a meeting. Please:\n\n1. Write a concise executive summary (3-5 sentences)\n2. List all decisions made\n3. Extract all action items with: owner, task, and deadline\n4. Identify any open questions or blockers\n5. Suggest a follow-up timeline\n\nFormat as a clean document I can share with attendees.\n\n[PASTE MEETING NOTES / TRANSCRIPT HERE]',
    },
    category: 'productivity',
    tags: ['meeting', 'summary', 'action items'],
    is_public: true,
    use_count: 4102,
    created_at: '2024-01-09T00:00:00Z',
    updated_at: '2024-01-09T00:00:00Z',
  },
  // ── BUSINESS ──────────────────────────────────────────────────────────────
  {
    id: '10',
    title: {
      es: 'Análisis FODA Estratégico',
      en: 'Strategic SWOT Analysis',
    },
    description: {
      es: 'Análisis FODA completo con estrategias cruzadas incluidas.',
      en: 'Complete SWOT analysis with cross-strategy recommendations.',
    },
    content: {
      es: 'Realiza un análisis FODA completo y estratégico para:\n\nEmpresa / Proyecto: [NOMBRE]\nIndustria: [SECTOR]\nContexto actual: [SITUACIÓN]\nPrincipales competidores: [LISTA]\n\nPara cada cuadrante (Fortalezas, Oportunidades, Debilidades, Amenazas) lista 5 puntos específicos y accionables. Al final, sugiere: 3 estrategias FO (ataque), 3 FA (defensa), 3 DO (mejora) y 3 DA (supervivencia).',
      en: 'Perform a complete strategic SWOT analysis for:\n\nCompany / Project: [NAME]\nIndustry: [SECTOR]\nCurrent context: [SITUATION]\nMain competitors: [LIST]\n\nFor each quadrant (Strengths, Weaknesses, Opportunities, Threats) list 5 specific, actionable points. At the end suggest: 3 SO strategies (attack), 3 ST (defense), 3 WO (improve) and 3 WT (survival).',
    },
    category: 'business',
    tags: ['SWOT', 'strategy', 'analysis'],
    is_public: true,
    use_count: 2567,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '11',
    title: {
      es: 'Pitch Deck para Inversores',
      en: 'Investor Pitch Deck Outline',
    },
    description: {
      es: 'Estructura un pitch deck convincente para inversores.',
      en: 'Structure a compelling pitch deck for investors.',
    },
    content: {
      es: 'Crea el esquema de un pitch deck convincente para mi startup.\n\nStartup: [NOMBRE]\nProblema que resolvemos: [PROBLEMA]\nSolución: [TU SOLUCIÓN]\nMercado objetivo: [QUIÉN]\nModelo de negocio: [CÓMO GENERAS DINERO]\nTracción hasta ahora: [MÉTRICAS / HITOS]\nInversión solicitada: [MONTO]\n\nProporciona: estructura diapositiva a diapositiva con el mensaje clave, datos a incluir, consejos de diseño y el arco narrativo para inversores.',
      en: 'Create a compelling pitch deck outline for my startup.\n\nStartup: [NAME]\nProblem we solve: [PROBLEM]\nSolution: [YOUR SOLUTION]\nTarget market: [WHO]\nBusiness model: [HOW YOU MAKE MONEY]\nTraction so far: [METRICS / MILESTONES]\nFunding ask: [AMOUNT]\n\nProvide: slide-by-slide structure with key message per slide, data points to include, design tips, and the investor story narrative arc.',
    },
    category: 'business',
    tags: ['pitch', 'startup', 'investors', 'presentation'],
    is_public: true,
    use_count: 1789,
    created_at: '2024-01-11T00:00:00Z',
    updated_at: '2024-01-11T00:00:00Z',
  },
  // ── CREATIVITY ────────────────────────────────────────────────────────────
  {
    id: '12',
    title: {
      es: 'Generador de Ideas de Contenido',
      en: 'Content Ideas Generator',
    },
    description: {
      es: '20 ideas de contenido únicas con ángulos y formatos sugeridos.',
      en: '20 unique content ideas with suggested angles and formats.',
    },
    content: {
      es: 'Genera 20 ideas de contenido originales para:\n\nNicho / Tema: [TU NICHO]\nPlataforma principal: [YouTube / Instagram / TikTok / Blog / Podcast]\nAudiencia objetivo: [DESCRIBE TU AUDIENCIA]\nTono / Estilo: [TU ESTILO]\n\nPara cada idea incluye: título atractivo, ángulo único, formato sugerido y por qué conectaría con tu audiencia. Mezcla contenido educativo, de entretenimiento y conversional.',
      en: 'Generate 20 original content ideas for:\n\nNiche / Topic: [YOUR NICHE]\nMain platform: [YouTube / Instagram / TikTok / Blog / Podcast]\nTarget audience: [DESCRIBE YOUR AUDIENCE]\nTone / Style: [YOUR STYLE]\n\nFor each idea include: catchy title, unique angle, suggested format, and why it would resonate with your audience. Mix educational, entertainment, and conversion content.',
    },
    category: 'creativity',
    tags: ['content', 'ideas', 'creativity', 'creator'],
    is_public: true,
    use_count: 6789,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  // ── DATA ──────────────────────────────────────────────────────────────────
  {
    id: '13',
    title: {
      es: 'Constructor de Queries SQL',
      en: 'SQL Query Builder',
    },
    description: {
      es: 'Genera y optimiza queries SQL con explicaciones claras.',
      en: 'Generate and optimize SQL queries with clear explanations.',
    },
    content: {
      es: 'Ayúdame a escribir una query SQL optimizada.\n\nBase de datos: [PostgreSQL / MySQL / SQLite / etc.]\nEstructura de tablas:\n```sql\n[PEGA TU SCHEMA AQUÍ]\n```\nQué necesito: [DESCRIBE LOS DATOS QUE QUIERES]\nRequisitos de rendimiento: [TAMAÑO DE DATOS ESPERADO / FRECUENCIA]\n\nProporciona: la query con comentarios en cada parte, índices sugeridos y enfoques alternativos si aplica.',
      en: 'Help me write an optimized SQL query.\n\nDatabase: [PostgreSQL / MySQL / SQLite / etc.]\nTable structure:\n```sql\n[PASTE YOUR SCHEMA HERE]\n```\nWhat I need: [DESCRIBE WHAT DATA YOU WANT]\nPerformance requirements: [EXPECTED DATA SIZE / FREQUENCY]\n\nProvide: the query with comments explaining each part, suggested indexes, and alternative approaches if applicable.',
    },
    category: 'data',
    tags: ['SQL', 'database', 'query', 'backend'],
    is_public: true,
    use_count: 3456,
    created_at: '2024-01-13T00:00:00Z',
    updated_at: '2024-01-13T00:00:00Z',
  },
  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    id: '14',
    title: {
      es: 'Tutor de Aprendizaje Personalizado',
      en: 'Personalized Learning Tutor',
    },
    description: {
      es: 'Plan de estudio personalizado con recursos y hitos de progreso.',
      en: 'Personalized study plan with resources and progress milestones.',
    },
    content: {
      es: 'Actúa como un tutor experto en [MATERIA / TEMA].\n\nMi nivel actual: [principiante / intermedio / avanzado]\nMi objetivo de aprendizaje: [QUÉ QUIERO LOGRAR]\nTiempo disponible: [HORAS POR SEMANA]\nEstilo de aprendizaje preferido: [visual / práctico / teórico / mixto]\n\nCrea un plan de estudio personalizado de [DURACIÓN], con recursos recomendados, ejercicios prácticos e hitos medibles para saber que estoy progresando.',
      en: 'Act as an expert tutor in [SUBJECT / TOPIC].\n\nMy current level: [beginner / intermediate / advanced]\nMy learning goal: [WHAT I WANT TO ACHIEVE]\nAvailable time: [HOURS PER WEEK]\nPreferred learning style: [visual / hands-on / theoretical / mixed]\n\nCreate a personalized study plan for [DURATION], with recommended resources, practical exercises, and measurable milestones to track my progress.',
    },
    category: 'education',
    tags: ['learning', 'study plan', 'tutor'],
    is_public: true,
    use_count: 2890,
    created_at: '2024-01-14T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
  // ── DESIGN ────────────────────────────────────────────────────────────────
  {
    id: '15',
    title: {
      es: 'Brief de Diseño UI/UX',
      en: 'UI/UX Design Brief',
    },
    description: {
      es: 'Brief completo de diseño con paleta de colores, tipografía y flujos.',
      en: 'Complete design brief with color palette, typography and user flows.',
    },
    content: {
      es: 'Crea un brief de diseño completo para un nuevo proyecto de UI/UX.\n\nProyecto: [NOMBRE]\nTipo: [aplicación web / app móvil / landing page]\nUsuarios objetivo: [QUIÉN LO USARÁ]\nFlujo principal del usuario: [FLUJO PRINCIPAL]\nPersonalidad de marca: [3-5 ADJETIVOS]\nCompetidores de referencia: [NOMBRES]\n\nProporciona: principios de diseño, sugerencias de paleta (con códigos hex), tipografías, pantallas clave, requisitos de accesibilidad y métricas de éxito.',
      en: 'Create a comprehensive design brief for a new UI/UX project.\n\nProject: [NAME]\nType: [web app / mobile app / landing page]\nTarget users: [WHO WILL USE IT]\nCore user journey: [MAIN FLOW]\nBrand personality: [3-5 ADJECTIVES]\nCompetitors to reference: [NAMES]\n\nProvide: design principles, color palette suggestions (with hex codes), typography recommendations, key screens to design, accessibility requirements, and success metrics.',
    },
    category: 'design',
    tags: ['UI', 'UX', 'design', 'brief', 'branding'],
    is_public: true,
    use_count: 1234,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
]

export const ALL_PROMPTS: Prompt[] = [...SAMPLE_PROMPTS, ...DEV_PROMPTS]

export const CATEGORIES = [
  { value: 'all',           label: 'Todos',          labelEn: 'All'           },
  { value: 'coding',        label: 'Código',          labelEn: 'Coding'        },
  { value: 'writing',       label: 'Escritura',       labelEn: 'Writing'       },
  { value: 'productivity',  label: 'Productividad',   labelEn: 'Productivity'  },
  { value: 'architecture',  label: 'Arquitectura',    labelEn: 'Architecture'  },
  { value: 'data',          label: 'Datos / SQL',     labelEn: 'Data / SQL'    },
  { value: 'frontend',      label: 'Frontend / UI',   labelEn: 'Frontend / UI' },
  { value: 'education',     label: 'Educación',       labelEn: 'Education'     },
  { value: 'marketing',     label: 'Marketing',       labelEn: 'Marketing'     },
  { value: 'business',      label: 'Negocio',         labelEn: 'Business'      },
  { value: 'creativity',    label: 'Creatividad',     labelEn: 'Creativity'    },
  { value: 'design',        label: 'Diseño',          labelEn: 'Design'        },
]
