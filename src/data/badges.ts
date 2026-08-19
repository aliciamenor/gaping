export interface Badge {
  id: string;
  emoji: string;
  name: string;
  subtitle?: string;
  description: string;
  experiences: string[];
}

export const badges: Badge[] = [
  { id: 'accion-idea', emoji: '🔥', name: 'Ejecución', subtitle: 'Acción > Idea',
    description: 'Una idea no existe si no se ejecuta. Los recursos perfectos nunca llegan y esperar a tenerlos es la forma más cómoda de no hacer nada. Como cuando preparas una mochila: no cabe todo, así que priorizas lo esencial y maximizas lo que llevas. En los proyectos pasa igual: convertir ideas en resultados con lo que tienes, no con lo que te gustaría tener. Lo perfecto es enemigo de lo bueno, iterar rápido y aprender haciendo.',
    experiences: ['voluntariado-lituania', 'somostalita', 'transformacion-digital-esden', 'liderazgo-social-ufv'] },
  { id: 'emprendimiento-impacto', emoji: '🌱', name: 'Emprendimiento social', subtitle: 'Impacto social + impacto económico.',
    description: 'Las buenas intenciones no bastan. El impacto real necesita estructura, estrategia y un modelo que lo sostenga. Aplicar un mindset empresarial a problemas que realmente importan no es contradictorio, es necesario. La viabilidad económica y el impacto social son compatibles y juntos tienen efecto multiplicador.',
    experiences: ['somostalita', 'podcast-menos30', 'transformacion-digital-esden'] },
  { id: 'adaptabilidad-cultural', emoji: '🌍', name: 'Adaptabilidad', subtitle: 'Más sensibilidad cultural, menos prejuicios.',
    description: 'Explorar realidades muy distintas a la tuya te obliga a soltar prejuicios. Aprendí que no existe un estándar de normal y que acercarte al otro con curiosidad, sin juzgar, es lo que permite conectar de verdad. Cuantos más contextos, culturas y personas diferentes conoces, más todoterreno te vuelves. Adaptarse no es perder tu identidad, es ampliarla. Y eso se nota en cómo entiendes a un usuario, a un cliente o a un equipo.',
    experiences: ['ruta-inti-2024', 'voluntariado-lituania', 'backpacking-latam', 'camino-santiago'] },
  { id: 'liderazgo-proposito', emoji: '👥', name: 'Liderazgo', subtitle: 'El liderazgo empieza por liderarte.',
    description: 'El liderazgo no viene del cargo sino de la coherencia entre lo que dices y lo que haces. Aprendí esto estando cerca de personas muy distintas entre sí: de diferentes países, profesiones, edades y sectores. Y lo que tenían en común es que entendían que su rol, sea cual sea, tiene una responsabilidad con la sociedad. Eso es el liderazgo cívico.',
    experiences: ['ruta-inti-2024', 'liderazgo-social-ufv', 'seminarios-liderazgo'] },
  { id: 'storytelling', emoji: '📣', name: 'Storytelling', subtitle: 'Comunicar es conectar, no solo hablar',
    description: 'La capacidad de conectar con cualquier persona en cualquier contexto. Para eso hay que entender primero la historia de quien tienes delante. El mensaje importa, pero importa más saber desde dónde escucha el otro. En una marca, esto se traduce en construir una historia auténtica que sea coherente con cada acción y cada decisión.',
    experiences: ['somostalita', 'podcast-menos30'] },
  { id: 'gestion-incertidumbre', emoji: '🧭', name: 'Gestión de la incertidumbre', subtitle: '"Caminante, no hay camino, se hace camino al andar." Machado',
    description: 'Aprendí que la incertidumbre no es un problema a resolver sino un entorno en el que moverse. Que esperar a tener todas las respuestas antes de decidir te paraliza. Hay momentos en los que hay que actuar rápido aunque no esté todo claro. La clave no es eliminar la duda sino aprender a decidir con ella. El camino se hace al andar, no planificando eternamente.',
    experiences: ['ruta-inti-2024', 'voluntariado-lituania', 'backpacking-latam', 'camino-santiago'] },
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(badge => badge.id === id);
}

export function getBadgesByIds(ids: string[]): Badge[] {
  return ids.map(id => badges.find(b => b.id === id)).filter((b): b is Badge => !!b);
}
