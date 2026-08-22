import podcastMenos30Img from '@/assets/experiences/podcast-menos30.webp';
import voluntariadoLituaniaImg from '@/assets/experiences/voluntariado-lituania.webp';
import rutaInti2024Img from '@/assets/experiences/ruta-inti-2024.jpg';
import liderazgoSocialUfvImg from '@/assets/experiences/liderazgo-social-ufv.webp';
import caminoSantiagoImg from '@/assets/experiences/camino-santiago.webp';
import backpackingLatamImg from '@/assets/experiences/backpacking-latam.webp';
import somostalitaImg from '@/assets/experiences/somostalita.webp';
import seminariosLiderazgoImg from '@/assets/experiences/seminarios-liderazgo.webp';
import transformacionDigitalImg from '@/assets/experiences/alineacion-equipos.webp';
import cinkVenturingImg from '@/assets/experiences/cink-venturing.webp';
import backpackingLatamAmazonasImg from '@/assets/experiences/backpacking-latam-amazonas.webp';

export type Eje = 'impact' | 'horizons' | 'growth';

const PENDING = '[Contenido pendiente de redactar]';

export interface Experience {
  id: string;
  emoji: string;
  /** Skill principal desarrollada — se muestra como título principal de la card/detalle. */
  skill: string;
  /** Nombre de la experiencia — se muestra como subtítulo. */
  title: string;
  subtitle: string;
  eje: Eje;
  badges: string[];
  description: string;
  learnings: string[];
  videoUrl?: string;
  instagramReel?: { url: string; title: string };
  externalLink?: { url: string; label: string };
  image?: string;
  contextText?: string;
  preImageNote?: { highlight: string; description: string };
}

export const experiences: Experience[] = [
  // NUEVOS HORIZONTES
  { id: 'ruta-inti-2024', emoji: '🗺️', skill: 'Adaptabilidad', title: 'Ruta Inti 2024', subtitle: 'Ruta Inti', eje: 'horizons', image: rutaInti2024Img,
    badges: ['adaptabilidad-cultural', 'gestion-incertidumbre', 'liderazgo-proposito'],
    contextText: 'Ruta Inti es un programa cultural y formativo que organiza expediciones anuales centradas en cultura, aventura, voluntariado y labores sociales, en un lugar distinto cada año. Participé junto a más de 100 jóvenes en la expedición a Marruecos: ascenso al Toubkal (4.167m, el pico más alto del norte de África), voluntariado comunitario e iniciativas culturales. Fui seleccionada como representante de Ruta Inti en COMHiS, en el Salamanca Tech Summit 2025.',
    description: 'La skill que más desarrollé fue adaptabilidad. No había oficina ni plan cerrado, y el contexto cambiaba constantemente. Aprendí a leer una situación nueva rápido y ajustar sobre la marcha, en vez de esperar a tener toda la información antes de moverme.',
    learnings: ['La innovación ocurre en contextos inesperados.', 'El poder de la comunidad de viajeros con propósito.', 'Adaptarse a lo imprevisto.'],
    instagramReel: { url: 'https://www.instagram.com/reel/C_SV1yhICfa/', title: 'Entiende la ruta en un minuto' },
    externalLink: { url: 'https://rutainti.com/testimonio-alicia-menor/', label: 'Leer mi testimonio en Ruta Inti' },
    preImageNote: {
      highlight: 'Fui la representante de Ruta Inti en COMHiS en Salamanca Tech Summit en 2025',
      description: 'COMHiS Nuevas Formas de Comunicación Hispana I Edición es un encuentro que impulsa la innovación y la colaboración en el ámbito hispano, generando ideas y proyectos con impacto cultural y digital.',
    } },
  { id: 'backpacking-latam', emoji: '🎒', skill: 'Priorización y toma de decisiones', title: 'Backpacking Latinoamérica', subtitle: 'Backpacking', eje: 'horizons', image: backpackingLatamAmazonasImg,
    badges: ['adaptabilidad-cultural', 'gestion-incertidumbre'],
    contextText: 'Recorrí Perú, Colombia, Guatemala y México con mochila, decidiendo sobre la marcha con tiempo y dinero limitados: qué llevar, qué sitios visitar, qué dejar fuera.',
    description: 'La skill que más desarrollé fue priorización y toma de decisiones. No había margen para llevarlo todo ni para verlo todo, así que cada elección exigía comparar opciones y descartar con criterio: exactamente como priorizar un backlog con recursos limitados.',
    learnings: ['Desprenderme de lo material y que muy poco es esencial.', 'Adaptabilidad y resiliencia.', 'El valor de la soledad elegida.'] },
  { id: 'camino-santiago', emoji: '🚶', skill: 'User research', title: 'Camino de Santiago', subtitle: 'Camino de Santiago con 2 ongs: 100 personas de 26 países', eje: 'horizons', image: caminoSantiagoImg,
    badges: ['adaptabilidad-cultural', 'gestion-incertidumbre'],
    contextText: 'Hice el Camino de Santiago con las ONGs Bocatas y Pueblos Unidos, como parte del programa formativo del curso de Liderazgo Social de la Universidad Francisco de Vitoria. Durante una semana convivimos 100 personas de 26 países, la mayoría jóvenes inmigrantes africanos apoyados por estas organizaciones. No siempre compartíamos idioma, pero acabábamos entendiéndonos.',
    description: 'La skill que más desarrollé fue user research: no la parte de metodología, sino la base de la que depende todo lo demás, escuchar a alguien con un contexto completamente distinto al tuyo sin que tus propios prejuicios se interpongan. Es el mismo sesgo que arrastra cualquier research mal hecho: interpretar lo que el otro dice desde tu propio marco de referencia en vez del suyo. Ahí aprendí que el prejuicio es una barrera mayor que el idioma: con un traductor de por medio se pueden tener conversaciones de mucho valor, pero con sesgos de por medio, no se llega a ninguna.',
    learnings: ['La riqueza de la diversidad cultural.', 'Comunicación intercultural sin un mismo idioma.', 'El camino como metáfora de la vida.'] },
  // IMPACTO
  { id: 'voluntariado-lituania', emoji: '🏕️', skill: 'Gestión de proyectos', title: 'Voluntariado Lituania', subtitle: 'Voluntariado internacional en Lituania', eje: 'impact', image: voluntariadoLituaniaImg,
    badges: ['adaptabilidad-cultural', 'accion-idea', 'gestion-incertidumbre'],
    contextText: 'Participé en un proyecto de European Solidarity Corps en una zona rural remota de Lituania: colaboré en la construcción sostenible de un campamento scout y en la organización de actividades infantiles, conviviendo e intercambiando cultura con voluntarios de Hungría, Lituania, Francia y Alemania.',
    description: 'La skill que más desarrollé fue gestión de proyectos. Estábamos en una zona rural remota, así que los recursos (madera, materiales, tiempo) eran limitados y no había manera de simplemente pedir más si algo se quedaba corto. Decidir cómo usar lo que teníamos de la forma más eficiente, priorizando con lo que tienes delante y no con lo que te gustaría tener, es la parte de gestión de proyectos que más se queda.',
    learnings: ['Cambiar mi visión del voluntariado: buscar la horizontalidad en las relaciones.', 'Aprender a estar conmigo misma en un entorno aislado.', 'Desarrollar resiliencia ante la frustración.'] },
  { id: 'somostalita', emoji: '💡', skill: 'Estrategia de negocio', title: 'Somostalita', subtitle: 'Asociación Somostalita', eje: 'impact', image: somostalitaImg,
    badges: ['emprendimiento-impacto', 'accion-idea', 'storytelling'],
    contextText: "Somostalita es una asociación que impulsa la Cultura del Bien y las virtudes humanas (autenticidad, compromiso, compasión) mediante eventos, proyectos sociales y espacios con propósito. Hice el diagnóstico estratégico y benchmark competitivo, desarrollé buyer personas y customer journey mapping, y co-diseñé con la junta directiva el posicionamiento, los 3 pilares estratégicos y el target (jóvenes de 18 a 35 años en búsqueda de propósito y comunidad). Construí el primer Business Model Canvas de la organización, identificando nuevas fuentes de ingresos, y coordiné el equipo de comunicación liderando el rebranding de los eventos: estrategia end to end de canales y mensajes, y la conceptualización de 'Los Talitazos' como formato de alto impacto. También implementé el stack de herramientas (Notion, Metricool, Canva) y formé al equipo voluntario.",
    description: 'La skill que más trabajé fue estrategia de negocio. No bastaba con tener buenas intenciones: había que estructurar cómo la asociación se sostenía y crecía, y traducir esos valores en decisiones concretas (pilares, target, modelo de ingresos, canales) que el equipo pudiera ejecutar después de que yo me fuera. Los eventos rediseñados hicieron sold out, se lanzaron 2 colecciones de merchandising con Scoop Brand, y el equipo de comunicación quedó operando de forma autónoma.',
    learnings: ['Las habilidades profesionales pueden ser herramienta de impacto social.', 'La importancia de escuchar antes de proponer.', 'El poder de las conexiones genuinas.'] },
  // GROWTH
  { id: 'cink-venturing', emoji: '🚀', skill: 'MVP y validación', title: 'Hackathon + Incubadora Cink Venturing', subtitle: 'Hackathon + incubadora Cink Venturing', eje: 'growth', image: cinkVenturingImg,
    badges: [],
    contextText: "Círculo nació en el hackathon 'Transforma la cultura del mañana' de CINK Venturing (septiembre 2025), que juntó a gente de España y Latinoamérica para construir soluciones no code en torno a los ODS. Identificamos un problema que muchas ONGs tienen y pocos resuelven: no pierden subvenciones por falta de convocatorias, sino por falta de un sistema para gestionarlas: convocatorias dispersas, sin documentación centralizada, plazos que se pasan. Solo en España, en 2024 se repartieron más de 41.000M€ en más de 71.000 convocatorias: el dinero existe, lo difícil es acceder a él sin quemarte en el intento. Ganamos el primer premio, con acceso directo al programa de incubación de NoCode4Culture (financiado por NextGenerationEU, el Ministerio de Cultura y el Plan de Recuperación). Como cofundadora lideré marketing, estrategia y ventas: identificación del problema, research y entrevistas, definición de producto, pitch y validación con usuarios.",
    description: 'La skill que más desarrollé fue MVP y validación. En tres meses de incubación construimos un prototipo funcional con tres features clave: explorador de subvenciones, panel de seguimiento de estado y gestor documental, y lo validamos cualitativamente: ONGs interesadas en probarlo y leads captados en el demo day. Aprendí a diferenciar entre lo que yo creía que el producto necesitaba y lo que la validación real confirmaba, y a apoyar mi intuición en esos datos para decidir qué construir primero.',
    learnings: [] },
  { id: 'podcast-menos30', emoji: '🎙️', skill: 'Comunicación', title: 'Colaboración en Podcast Menos30', subtitle: 'Colaboración en Podcast Menos30', eje: 'growth', image: podcastMenos30Img,
    badges: ['storytelling'],
    contextText: 'Colaboré en un episodio del Podcast Menos30, centrado en fomentar el voluntariado entre la Generación Z, traduciendo experiencias de voluntariado a un formato y un tono que conectara con una audiencia joven que no suele identificarse con el discurso tradicional del voluntariado.',
    description: 'La skill que más desarrollé fue comunicación. Tuve que adaptar el mensaje sin perder honestidad, pensando en quién escuchaba y qué le haría actuar, no solo en contar lo que había vivido.',
    learnings: ['Compartir experiencias contracorriente inspira a otros.', 'Articular mi propia narrativa sin compararme.', 'La vulnerabilidad genera conexión.'],
    videoUrl: 'https://www.youtube.com/watch?v=u6vRNgcpsbk' },
  { id: 'transformacion-digital-esden', emoji: '💻', skill: 'Alineación entre equipos', title: 'Transformación Digital Pymes', subtitle: 'Plan de Transformación Digital de PyME', eje: 'growth', image: transformacionDigitalImg,
    badges: ['emprendimiento-impacto', 'accion-idea'],
    contextText: 'El proyecto final del Programa de Transformación Digital de ESDEN era diseñar un plan de transformación digital para una empresa logística real. Me reuní con el gerente y entrevisté al equipo, analicé los cuellos de botella y el nivel de digitalización, y propuse un plan de transformación por fases.',
    description: 'La skill que más desarrollé fue alineación entre equipos. El mayor cuello de botella no era qué tecnología usaban, era cómo se relacionaban los equipos entre sí: no era un problema técnico, era un problema de cultura. Entrevistar por separado al gerente y al equipo me obligó a entender esa desconexión antes de proponer nada, y construir un plan que ambas partes pudieran aceptar, no solo una solución técnica sobre el papel.',
    learnings: ['Herramientas y metodologías digitales.', 'La transformación digital como proceso continuo.', 'Aplicar nuevos conocimientos a proyectos reales.'] },
  { id: 'liderazgo-social-ufv', emoji: '🎓', skill: 'Innovación social', title: 'Liderazgo Social UFV', subtitle: 'Francisco de Vitoria', eje: 'growth', image: liderazgoSocialUfvImg,
    badges: ['liderazgo-proposito', 'accion-idea'],
    contextText: 'El programa de Liderazgo Social de la UFV combinaba talleres de emprendimiento social con master classes de líderes de organizaciones como Fundación Telefónica, Fundación Jérôme Lejeune España, Scholas Occurrentes, Open Value Foundation y Rescate. Ahí diseñé Fufu, una propuesta de negocio que usa la gastronomía africana como herramienta de integración social, inspirada en Enoteca Maria (el restaurante neoyorquino de nonnas, donde cocineras de distintos países preparan los platos de su cultura) y en la idea de viajar a otros lugares a través de la comida. Fue uno de los 5 proyectos ganadores del programa, con mentoría ofrecida para seguir desarrollándolo.',
    description: 'La skill que más trabajé fue innovación social: buscar impacto social y económico de la mano, no uno a costa del otro. Las master classes me abrieron a un concepto que cambió cómo pienso el impacto: la diferencia entre ayudar en vertical, entregando recursos a alguien que se queda dependiendo de ti, y ayudar en horizontal, tratándolo como un igual (inviertes, pero esperas un retorno), y ese intercambio es lo que de verdad dignifica su trabajo y le da independencia a futuro, en vez de mantenerlo enganchado a la ayuda.',
    learnings: ['El liderazgo como herramienta de transformación social.', 'Identificar mi estilo de liderazgo propio.', 'Liderar desde los valores.'] },
  { id: 'seminarios-liderazgo', emoji: '🎯', skill: 'Pensamiento crítico', title: 'Seminarios de Liderazgo', subtitle: 'Becas en Seminarios de liderazgo de Fundaciones Eduarda Justo y Tatiana', eje: 'growth', image: seminariosLiderazgoImg,
    badges: ['liderazgo-proposito'],
    contextText: 'Recibí becas para el Seminario Líderes del Futuro de la Fundación Eduarda Justo, en Almería, y para el III Encuentro de Liderazgo Cívico en tiempos de inteligencia artificial de la Fundación Tatiana, en la Universidad Internacional Menéndez Pelayo de Santander. En ambos espacios se debatía sobre la responsabilidad cívica y ética de los líderes empresariales tecnológicos, en plena revolución de la inteligencia artificial.',
    description: 'La skill que más desarrollé fue pensamiento crítico. No eran espacios donde salías con respuestas cerradas, sino con más preguntas de las que llegabas: sobre quién es responsable de las consecuencias de la innovación, y hasta dónde llega la ética de quien la impulsa. Quedarme con esa incomodidad en vez de buscar una conclusión fácil es lo que más entrenó ahí el pensamiento crítico.',
    learnings: ['Diferentes dimensiones del liderazgo.', 'Conectar con jóvenes en procesos similares.', 'Clarificar mi visión de liderazgo.'] },
  { id: 'mentorias-eventos-comunidad', emoji: '🤝', skill: 'Aprendizaje continuo', title: 'Mentorías, eventos y comunidad', subtitle: 'Mentorías, eventos, comunidad', eje: 'growth', image: backpackingLatamImg,
    badges: [],
    contextText: 'Antes de lanzarme a una experiencia, buscaba a alguien que ya hubiese pasado por ella para entender qué esperar y decidir si merecía la pena priorizarla frente a otras opciones. Entré en Nova, una comunidad de profesionales destacados por invitación, donde he asistido a cenas con C-Level, eventos y presentaciones, conectando con gente de sectores muy distintos. He tenido mentores que me han ayudado a plantear mi carrera y aterrizar dudas concretas, y he tenido más de 50 cafés (muchos virtuales) con profesionales que admiraba, la mayoría por outreach en frío en LinkedIn. En paralelo, he seguido aprendiendo de cursos, libros y otros recursos.',
    description: 'La skill que más desarrollé durante GAPING fue aprendizaje continuo. Aquí no hay temario ni profesor: lo que aprendes depende de que sepas qué preguntar y qué llevarte de cada conversación. Usaba esos cafés como parte de mi propio proceso de decisión: para evaluar el impacto real de una experiencia antes de comprometerme con ella, no solo para reflexionar después de vivirla.',
    learnings: [] },
];

export const ejes = {
  impact: {
    name: 'Impacto', emoji: '🎯', color: 'impact',
    objective: 'Poner mi mentalidad de innovación y marketing al servicio de proyectos con propósito real.',
    actions: [
      'Voluntariado internacional construyendo campamento scout en Lituania',
      'Consultoría pro bono para Asociación Somostalita',
    ],
    learnings: [
      'Entender que generar impacto va más allá del tercer sector',
      'Cambiar visión de voluntariado y buscar la horizontalidad en las relaciones',
      'Mentalidad más abierta y empática',
      'Entender mejor el contexto social, cultural y geográfico',
    ],
  },
  horizons: {
    name: 'Nuevos Horizontes', emoji: '🌍', color: 'horizons',
    objective: 'Salir de mi zona de confort para descubrir otras formas de vivir, pensar y resolver problemas.',
    actions: [
      'Ruta Inti 2024 en Marruecos con 130 jóvenes',
      'Backpacking por Perú, Colombia, Guatemala y México',
      'Camino de Santiago Portugués con 100 personas de 26 países',
    ],
    learnings: [
      'Viajar con mochila me enseñó a desprenderme de lo material y que muy poco es esencial',
      'A veces el miedo pesa más que la mochila y no deja espacio para todo lo bueno por descubrir',
      'Adaptabilidad y resiliencia',
      'Sensibilidad social',
      'Comunicación intercultural, sin necesidad de tener un mismo idioma',
      'Técnica del extrañamiento: quitarte tus zapatos para ponerte los del otro. Mirar su realidad desde su contexto, sin que tus sesgos y marco cultural contaminen lo que ves. Es la herramienta que usan los antropólogos para entender culturas distintas sin juzgarlas desde su propia mirada',
    ],
  },
  growth: {
    name: 'Growth', emoji: '📈', color: 'growth',
    objective: 'Crecer como profesional y como persona, ganando autoconocimiento, nuevas herramientas y una visión más global para la siguiente etapa.',
    actions: [
      'Formación en Transformación Digital (ESDEN) y plan para PYME',
      'Curso de Liderazgo Social (UFV)',
      'Podcast Menos30',
      'Seminarios de liderazgo (Fundación Tatiana, Eduarda Justo, Lideremos)',
      'Exponerme a nuevos lugares y contextos',
    ],
    learnings: [
      'Identificar mejor desde dónde tomo las decisiones',
      'Aceptar que no voy a estar 100% segura de una decisión y que toda decisión tiene un precio',
      'Ser paciente conmigo misma y con la búsqueda de un propósito',
      'El liderazgo empieza por liderarte',
      'Atreverme a darme más oportunidades y exponerme',
      'El fracaso no es caerse, es no intentarlo. El que nunca hace nada, nunca se equivoca',
    ],
  },
};

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find(exp => exp.id === id);
}

export function getExperiencesByEje(eje: Eje): Experience[] {
  return experiences.filter(exp => exp.eje === eje);
}

export function getExperiencesByBadge(badgeId: string): Experience[] {
  return experiences.filter(exp => exp.badges.includes(badgeId));
}
