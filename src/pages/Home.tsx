import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCanHover } from '@/hooks/useCanHover';
import { useCarousel } from '@/hooks/useCarousel';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';
import GapingLogo from '@/components/GapingLogo';
import StaggerGrid, { StaggerItem } from '@/components/StaggerGrid';
import CollapsibleSection from '@/components/CollapsibleSection';
import ExpandToggle from '@/components/ExpandToggle';
import ProfilePhotoCrossfade from '@/components/ProfilePhotoCrossfade';
import { CarouselArrowButton, CarouselDots } from '@/components/CarouselControls';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackCtaClick } from '@/lib/analytics';
import { experiences } from '@/data/experiences';
import fotoAlicia from '@/assets/foto-alicia.webp';
import logoArrow from '@/assets/icons/logo-arrow.webp';
import iconPencil from '@/assets/icons/pencil.webp';
import iconSmiley from '@/assets/icons/smiley.webp';
import iconBackpack from '@/assets/icons/backpack.webp';
import heroG1 from '@/assets/logo/hero-g1.png';
import heroA from '@/assets/logo/hero-a.png';
import heroP from '@/assets/logo/hero-p.png';
import heroI from '@/assets/logo/hero-i.png';
import heroN from '@/assets/logo/hero-n.png';
import heroG2 from '@/assets/logo/hero-g2.png';
import letterI from '@/assets/icons/letter-i.png';
import letterN from '@/assets/icons/letter-n.png';
import letterG from '@/assets/icons/letter-g.png';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';
import polaroid4 from '@/assets/polaroid-4.webp';
import polaroid5 from '@/assets/polaroid-5.webp';
import logoGeneration from '@/assets/logos/generation.png';
import logoMahou from '@/assets/logos/mahou.png';
import logoOmnicom from '@/assets/logos/omnicom.png';
import logoIpmark from '@/assets/logos/ipmark.png';
import photoMiguel from '@/assets/references/miguel.png';
import photoLourdes from '@/assets/references/lourdes.png';
import photoJulio from '@/assets/references/julio.png';
import lennyImg from '@/assets/testimonios/lenny.jpg';
import tomImg from '@/assets/testimonios/tom.jpg';
import adrianaImg from '@/assets/testimonios/adriana.jpg';

const wordmarkLetters = [heroG1, heroA, heroP, heroI, heroN, heroG2];

const IDENTITY_TAGS = ['Curiosa', 'Conectora', 'Resolutiva'];

// Filtro I · Nuevos Horizontes · Growth — mismo trío de colores que el
// resto del sitio usa para los "ejes" (ver ejeStyles en Projects.tsx).
const filters = [
  { letter: letterI, label: 'Impacto', desc: '¿Aporta algo a alguien más, no solo a mí?', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { letter: letterN, label: 'Nuevos Horizontes', desc: '¿Me saca de un contexto que ya domino?', color: '#42767f', bg: 'rgba(66,118,127,0.08)' },
  { letter: letterG, label: 'Growth', desc: '¿Voy a saber o poder hacer algo que antes no?', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
];

const gtmSteps = [
  {
    num: '01', label: 'Detectar la oportunidad', anchor: 'paso-01', desc: 'Resiliencia, flexibilidad y agilidad: esenciales para el 67% de las empresas a nivel global (WEF, 2025).',
    paragraphs: [
      'Arranqué mi carrera de producto en el equipo de innovación de una empresa líder en bebidas, donde aprendí las bases de desarrollo y lanzamiento de productos. Al acabar el proyecto en el que estaba, tenía claro que quería dedicarme a esto.',
      'Vivimos un momento en el que, cuanta más tecnología hay, más peso ganan las habilidades humanas. A medida que la IA asume tareas técnicas y repetitivas, crece la demanda de criterio, liderazgo y creatividad: según McKinsey y el World Economic Forum, son las skills que más van a crecer de aquí a 2030.',
      'Y no es solo la tecnología la que está cambiando las reglas: la carrera lineal, subir peldaño a peldaño en una misma empresa, también ha dejado de ser el único camino válido, según el informe Randstad Workmonitor 2026.',
      'Con ese contexto de fondo, tenía curiosidad por el mundo y por otras formas de pensar y trabajar, y creía que esa curiosidad podía convertirme en mejor profesional.',
      'Decidí dedicar un año a desarrollar esas habilidades de forma deliberada, fuera de una única oficina. Esta vez, el producto tenía que ser yo.',
    ],
  },
  {
    num: '02', label: 'Validar si tiene sentido', anchor: 'paso-02', desc: '¿Resuelve algo real? ¿Es viable? ¿Hay demanda del perfil? La demanda de Product Managers creció un 14% interanual en 2026.',
    paragraphs: [
      'Antes de lanzarme, validé la hipótesis desde varios ángulos, igual que haría con cualquier decisión de producto.',
    ],
  },
  {
    num: '03', label: 'Benchmarking', anchor: 'paso-03', desc: 'Analicé las opciones disponibles frente a voluntariado, MBA, bootcamp, backpacking y más, con research y entrevistas informales.',
    paragraphs: [
      'Analicé las opciones disponibles para entender dónde estaba la oportunidad, con research online y entrevistas informales a mi entorno cercano y contactos que habían vivido varias de estas experiencias. Así podía contrastar expectativas reales y reducir la incertidumbre al tener más información para priorizar las decisiones y que fueran de mayor impacto.',
    ],
  },
  {
    num: '04', label: 'Definir la propuesta de valor', anchor: 'paso-04', desc: 'Después de validar y analizar las opciones existentes, definí qué ofrecería GAPING y para quién.',
    paragraphs: [],
  },
  {
    num: '05', label: 'MVP: el delivery de experiencias', anchor: 'paso-05', desc: 'Un único criterio de decisión: cada experiencia tenía que cumplir Impacto, Nuevos Horizontes y Growth a la vez.',
    paragraphs: [
      'Definí un único criterio de decisión: cada experiencia tenía que cumplir tres condiciones a la vez: aportar valor a los demás, sacarme de la zona de confort, y hacerme aprender algo. Si solo cumplía una o dos, no entraba en el roadmap.',
    ],
  },
  {
    num: '06', label: 'Aprendizajes y tradeoffs', anchor: 'aprendizajes-tradeoffs', desc: 'GAPING no fue un paréntesis: fue donde más aprendí. Y no todo lo que investigué entró en el roadmap.',
    paragraphs: [
      'GAPING no fue un paréntesis. Fue donde aprendí las cosas que más me han cambiado como profesional: que priorizar es descartar opciones, que los sesgos contaminan más que la falta de datos, y que validar antes de construir no es opcional.',
      'Tampoco fue gratis: cambié un sueldo fijo por mis ahorros, y la narrativa lineal de "una empresa, un ascenso" por algo que tengo que explicar en cada entrevista.',
      'Y no todas las experiencias que investigué entraron en el roadmap. Descarté opciones como el voluntariado de larga duración, la working holiday visa o crear contenido en serio en TikTok, porque no cumplían Impacto, Nuevos Horizontes y Growth a la vez.',
      'Al final, lo más valioso no fueron las experiencias sino las personas que vinieron con ellas.',
    ],
  },
  {
    num: '07', label: 'Diseñar y construir storytelling para comunicar', anchor: 'paso-07', desc: 'No basta con vivir la historia: hay que contarla con un objetivo.',
    paragraphs: [
      'Con el discovery y el delivery ya hechos, tocaba pasar a comunicar. Elegí los canales, construí una narrativa coherente y decidí qué destacar y qué dejar fuera. El resultado fue esta web, con el case study completo documentado paso a paso — construida con herramientas de IA sin saber programar.',
      'El objetivo no era solo contar lo vivido: era que esta web fuera en sí misma la prueba de que sé ejecutar un producto de principio a fin — discovery, delivery, comunicación y medición.',
    ],
  },
  {
    num: '08', label: 'Iterar el portfolio y medir resultados', anchor: 'medir-resultados', desc: 'North Star Metric: conversaciones de valor generadas por GAPING.',
    paragraphs: [
      'Un lanzamiento no termina cuando publicas. Publiqué la web y empecé a hablar con profesionales de producto para comprobar algo muy concreto: si el portfolio se entendía, tenía sentido y estaba orientado a un objetivo. Cada conversación fue una iteración más.',
    ],
  },
  {
    num: '09', label: 'Formarme más en producto + IA para posicionarme en mercado', anchor: 'formarme-producto-ai', desc: 'El mismo proceso autodidacta de siempre, ahora con foco: estrategia de builder, networking y criterio de producto en la era de la IA.',
    paragraphs: [
      'Empecé a trabajar con Paco Crespo, mentor de producto y referente de la industria, para reforzar mis bases de product management.',
      'También busco cafés virtuales más orientados a producto, para aprender directamente de quien lo hace cada día. Voy a eventos, webinars y hackathones de producto e IA. Y combino ese aprendizaje teórico con learning by building: probar a construir con la IA como herramienta y el producto como criterio.',
      'Mi propuesta no es elegir entre soft skills o skills de producto e IA: es combinar las soft skills que desarrollé durante todo este año con las skills de producto e IA que sigo construyendo ahora. Esa combinación es lo que quiero aportar en mi próximo rol como Product Manager.',
    ],
  },
];

const gtmStep1Data = [
  { text: 'Pensamiento analítico: esencial para 7 de cada 10 empresas', source: 'World Economic Forum, Future of Jobs Report 2025' },
  { text: 'Resiliencia, flexibilidad y agilidad: 67% globalmente', source: 'WEF, Future of Jobs Report 2025' },
  { text: 'Liderazgo e influencia social: el mayor salto relativo, +22 puntos desde 2023', source: 'WEF, Future of Jobs Report 2025' },
  { text: 'Skills sociales y emocionales (empatía, liderazgo): +11 a +14% de demanda hacia 2030; creatividad: +12%', source: 'McKinsey Global Institute, "A new future of work"' },
  { text: 'Solo el 41% de los profesionales quiere seguir hoy una carrera lineal tradicional; el 72% de los empleadores considera la escalera corporativa convencional desfasada', source: 'Randstad Workmonitor Report 2026' },
  { text: 'Empresas con mayor proporción de empleados autoconscientes muestran mejor rendimiento bursátil sostenido durante 30 meses, en un análisis de 486 empresas cotizadas', source: 'Zes & Landis, "A Better Return on Self-Awareness", Korn Ferry Institute, 2013' },
];

const gtmStep2Checklist = [
  { q: '¿Resuelve algo real?', a: 'Sí: me daba espacio para desarrollar skills más rápido de lo que lo haría en una oficina, conocer contextos distintos y profundizar en mi autoconocimiento para reflexionar sobre mi propio impacto.' },
  { q: '¿Es viable?', a: 'Sí: tenía la situación económica para sostenerlo con mis ahorros, y existen alternativas de todo tipo de presupuesto, no era una opción solo para quien puede permitírselo sin límites.' },
  { q: '¿Hay demanda del perfil al que aspiro?', a: 'Sí: la demanda de Product Managers está creciendo con fuerza, un 14% interanual en 2026, con roles Associate PM creciendo un 33%.', source: 'Userpilot / Lenny Rachitsky, State of the Product Job Market 2026' },
];

const gtmStep4ParaMi = [
  'Desarrollar soft skills clave: adaptabilidad, gestión de incertidumbre y comunicación multicultural',
  'Aprender producto fuera de una estructura corporativa dada',
  'Generar impacto más allá del entorno corporativo',
  'Abrir la mente conociendo otras culturas y lugares, para ser más creativa y empática',
  'Ganar claridad sobre qué rol y qué empresa quiero de verdad',
];

const gtmStep4ParaEmpresas = [
  'Product mindset con ownership end-to-end: prioriza con criterio de negocio, no solo intuición, decidiendo qué construir primero con recursos limitados',
  'Gestiona stakeholders con intereses distintos, alineándolos hacia un objetivo común, y comunica con claridad tanto a perfiles técnicos como de negocio',
  'Creatividad, resolución de problemas y storytelling',
  'Adaptabilidad y actitud autodidacta, validadas en contextos multiculturales y fuera de estructuras formales',
];

const gtmStep5Framework = [
  { letter: letterI, title: 'IMPACTO', desc: '¿Esta experiencia aporta algo a alguien más, no solo a mí?', bg: 'rgba(16,185,129,0.08)' },
  { letter: letterN, title: 'NUEVOS HORIZONTES', desc: '¿Me obliga a salir de un contexto, idioma o entorno que ya domino?', bg: 'rgba(66,118,127,0.08)' },
  { letter: letterG, title: 'GROWTH', desc: '¿Al terminarla, voy a saber o poder hacer algo que antes no?', bg: 'rgba(139,92,246,0.08)' },
];

const gtmStep6Comunicacion = [
  'Definí estrategia de distribución y los canales prioritarios (web, LinkedIn)',
  'Construí la narrativa y la propuesta de valor',
  'Diseñé cómo comunicar el proyecto a mi audiencia objetivo',
  'Establecí un timeline de publicación',
];

const gtmStep6Stack = [
  'Ideación y estructura de contenido: Claude (Proyecto con todo el contexto de GAPING)',
  'Prototipo inicial: Lovable',
  'Identidad visual (logo, iconos): Canva AI, ChatGPT',
  'Diseño de producto (mockups antes de construir): Claude Design',
  'Desarrollo: Claude Code — React, TypeScript, Tailwind',
  'Publicación: GitHub, Vercel',
  'Indexación y analítica: Google Search Console, PostHog, Vercel Analytics',
];

const gtmStep7Metricas = [
  { label: 'Outreach', items: ['Ratio de respuesta total', 'Ratio de respuesta positiva'] },
  { label: 'Web', items: ['Mensajes recibidos', 'Recurrencia de visitantes', '% de mensajes cualificados'] },
  { label: 'General', items: ['Contribución por canal'] },
];

const timeline = [
  { year: '2025/2026', title: 'Product Manager Operations & Marketing Specialist', company: 'Fundación Generation Spain (impulsada por McKinsey & Company)', desc: 'Coordinación end to end de programas formativos con seguimiento de KPIs. Definición de requisitos de producto, métricas de negocio y cierre de partnerships estratégicos para la difusión del programa.', logo: logoGeneration, highlight: false },
  { year: '2024/2025', title: 'GAPING · Case study de producto aplicado a mí misma', company: '', desc: 'Un año fuera de la oficina, diseñado y ejecutado como proyecto de producto.', logo: null, highlight: true },
  { year: '2023/2024', title: 'Product Manager Innovación', company: 'Mahou San Miguel', desc: 'Responsable end to end del crecimiento de Grifo Mahou en Casa (ecommerce): producto, UX, operaciones y comunicación. Definición de objetivos de negocio, KRs y roadmap. Gestión de stakeholders internos y 25 partners técnicos. Participación en la Innovation Community con Design Thinking y Lean Startup.', logo: logoMahou, highlight: false },
  { year: '2022', title: 'PR & Digital Communications Junior', company: 'Omnicom PR Group', desc: 'Materiales de prensa en contextos de crisis corporativa y lanzamientos de producto (Bimbo, Decathlon). Monitorización de cobertura y reporting de impacto reputacional.', logo: logoOmnicom, highlight: false },
  { year: '2021', title: 'Marketing Junior', company: 'IPMARK, DARetail & Best!N Awards', desc: 'Organización de eventos B2B presenciales y webinars. Campañas de email marketing y contenido digital.', logo: logoIpmark, highlight: false },
];

const formacion = [
  { title: 'Doble Grado Publicidad + Marketing', inst: 'ESIC University', detail: '2018/2023 · Premio Excelencia · Beca Top Talent Banco Santander · Nota media 9/10' },
  { title: 'Erasmus+', inst: 'Vern University, Zagreb', detail: '2021/2022' },
  { title: 'Mentoría en Product Management', inst: 'Paco Crespo', detail: '2025/2026 · 80h' },
  { title: 'Incubación NoCode4Culture — Desarrollo de MVP', inst: 'Cink Venturing', detail: '2025 · 3 meses' },
];

const formacionMas = [
  { title: 'Curso Especializado en Growth Marketing', inst: 'ESIC Business School', detail: '2026 · 2,5 meses' },
  { title: 'Fundamentos de Emprendimiento Online', inst: 'Cámara de Comercio', detail: '2025 · 30h' },
  { title: 'Transformación Digital', inst: 'ESDEN Business School', detail: '2025 · 375h' },
  { title: 'Liderazgo Social', inst: 'Universidad Francisco de Vitoria', detail: '2025 · 100h' },
  { title: 'Gestión Ágil de Proyectos (Avanzado)', inst: 'Infoser Technological Solutions', detail: '2025 · 90h' },
];

const emprendimiento = [
  { title: '2ª posición Hackathon Producto + IA de Cabify', sub: 'Patrocinado por Lovable y ElevenLabs · 2026' },
  { title: '1º posición Hackathon NoCode4Culture · 2025', sub: 'Acceso a programa de 3 meses en incubadora de Cink Venturing para construir el prototipo' },
  { title: 'Programa de Innovación Social BYG', sub: '1 de 60 seleccionados entre +1.100 candidaturas · Fundación LQDVI · 2023' },
  { title: 'Proyecto ganador de emprendimiento social', sub: 'Seleccionado por Open Value Foundation, UFV · 2025' },
];

const voluntariadoAdicional = [
  { title: 'Asociación SOMOSTALITA', sub: 'Consultoría pro bono de marketing y estrategia · 2024/2025' },
  { title: 'European Solidarity Corps', sub: 'Voluntariado internacional en coordinación de proyectos, Lituania · 2024' },
  { title: 'Consejo LQDVI Youth', sub: 'Miembro del consejo de jóvenes de Fundación Lo que de Verdad Importa · 2023/actual' },
  { title: 'The Missionaries of Charity Sisters', sub: 'Coordinación de campamento infantil de verano, Edimburgo · 2019' },
];

interface Testimonial {
  name: string;
  role: string;
  photo: string;
  quote: string;
}

// Referencias reales de gente que ha trabajado con Alicia (Mahou San Miguel) —
// separadas de los referentes de sabático porque son dos cosas distintas: unas
// son recomendaciones de compañeros de trabajo, los otros son validación externa
// de que el modelo "sabático de producto" funciona (ver GoToMarket.tsx).
const workReferences: Testimonial[] = [
  { name: 'Julio Alonso López', role: 'Lead Innovation Manager, Mahou San Miguel', photo: photoJulio, quote: 'Alicia ha sido un miembro imprescindible del equipo en los proyectos en los que ha participado durante el último año. Pese a su juventud, ha demostrado una excepcional responsabilidad, adaptabilidad, iniciativa, proactividad y creatividad. No solo anticipa las necesidades, sino que también propone y ejecuta estrategias innovadoras.' },
  { name: 'Miguel Angel Cabrero', role: 'Chief Innovation Officer, Mahou San Miguel', photo: photoMiguel, quote: 'Alicia es una profesional que destaca por su proactividad, actitud positiva y ganas de aprender. Su creatividad y visión estratégica le permiten abordar retos de manera eficaz y ofrecer soluciones innovadoras.' },
  { name: 'Lourdes Cárdenes', role: 'Digital Innovation and Consumer Manager, Mahou San Miguel', photo: photoLourdes, quote: 'Alicia combina en su perfil lo mejor que una joven profesional puede ofrecer, con aquello que se espera de alguien con muchos años de experiencia. Es entusiasta, curiosa y tiene muchas ganas de aprender.' },
];

const sabbaticalReferents: Testimonial[] = [
  { name: 'Lenny Rachitsky', role: "Lenny's Newsletter · Ex Airbnb", photo: lennyImg, quote: 'Una de las voces más reconocidas en product management. Tomó un sabático de tres meses tras siete años en Airbnb; de ahí nació su newsletter, hoy su proyecto principal.' },
  { name: 'Tom Leung', role: 'Director of Product Management en Meta', photo: tomImg, quote: '"You don\'t get this kind of freedom very often. Use it." Sobre su año y medio sabático: "It helped me reset, grow, and show up stronger for what\'s next."' },
  { name: 'Adriana Carvajal', role: '@adri.zip · Ex Google, ex LinkedIn', photo: adrianaImg, quote: 'Estuvo un año viajando por el mundo antes de entrar en tech; hoy es una de las mayores creadoras de contenido tech en español.' },
];

const skills = ['GTM & Launch', 'Data & KPIs', 'Aprendizaje continuo', 'User research', 'Gestión de stakeholders', 'Gestión de proyectos', 'Priorización y toma de decisiones', 'Desarrollo de producto end-to-end', 'OKRs', 'Design Thinking, Lean Startup y Agile', 'Estrategia de negocio', 'Gestión de ecommerce', 'MVP y validación', 'Comunicación', 'Alineación entre equipos', 'Pensamiento crítico', 'Adaptabilidad', 'Empatía', 'Innovación social'];
const tools = ['Notion', 'Figma', 'Miro', 'Shopify', 'Google Analytics', 'Amplitude', 'Power BI', 'Salesforce', 'Jira', 'Canva', 'Mailchimp', 'Lovable', 'MS Office'];
const aiTools = ['ChatGPT', 'Copilot', 'Claude Code'];

function TestimonialCarousel({ items = workReferences, quoted = true }: { items?: Testimonial[]; quoted?: boolean }) {
  const { index, setIndex, goPrev, goNext } = useCarousel(items.length);
  const item = items[index];

  return (
    <div className="bg-[#f9fafb] rounded-[16px] p-5 sm:p-6">
      <div className="flex items-stretch gap-3">
        <CarouselArrowButton direction="prev" onClick={goPrev} label="Testimonio anterior" breakpoint="desktop" />
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-start gap-4"
            >
              <img src={item.photo} alt={item.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border-2" style={{ borderColor: '#42767f' }} />
              <div className="min-w-0">
                <p className="font-display font-bold text-[15px] text-[#1f2937]">{item.name}</p>
                <p className="font-sans text-[12px] font-medium mb-2" style={{ color: '#42767f' }}>{item.role}</p>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#4b5563] leading-relaxed">{quoted ? `"${item.quote}"` : item.quote}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <CarouselArrowButton direction="next" onClick={goNext} label="Siguiente testimonio" breakpoint="desktop" />
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <CarouselArrowButton direction="prev" onClick={goPrev} label="Testimonio anterior" breakpoint="mobile" />
        <CarouselDots
          count={items.length}
          index={index}
          onSelect={setIndex}
          getKey={(i) => items[i].name}
          getLabel={(i) => `Ver testimonio de ${items[i].name}`}
        />
        <CarouselArrowButton direction="next" onClick={goNext} label="Siguiente testimonio" breakpoint="mobile" />
      </div>
    </div>
  );
}

function SkillsScroller({ canHover }: { canHover: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // `down`: pointer is pressed, still deciding click vs. drag. `active`: past
  // the movement threshold, i.e. an actual drag — only then do we capture the
  // pointer. Capturing on pointerdown itself (before any movement) makes the
  // browser retarget the native `click` event to this div instead of the
  // <Link> underneath, which silently breaks navigation on a plain click.
  const drag = useRef({ down: false, active: false, startX: 0, startScroll: 0, pointerId: 0 });

  const scrollByAmount = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, active: false, startX: e.clientX, startScroll: el.scrollLeft, pointerId: e.pointerId };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    const delta = e.clientX - drag.current.startX;
    if (!drag.current.active) {
      if (Math.abs(delta) < 5) return;
      drag.current.active = true;
      el.setPointerCapture(drag.current.pointerId);
    }
    el.scrollLeft = drag.current.startScroll - delta;
  };
  const endDrag = () => { drag.current.down = false; drag.current.active = false; };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Ver skills anteriores"
        className="hidden sm:flex items-center justify-center absolute -left-4 top-[calc(50%-14px)] -translate-y-1/2 z-10 w-9 h-9 rounded-full text-[#42767f] bg-white shadow-md hover:bg-[#42767f] hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-1 snap-x snap-mandatory cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <StaggerGrid className="flex gap-3 sm:gap-4">
          {experiences.map((exp, i) => {
            const rotate = [-2, 1.5, -1][i % 3];
            return (
              <StaggerItem key={exp.id} className="shrink-0 snap-start">
                <motion.div
                  initial={{ rotate }}
                  whileHover={canHover ? { rotate: 0, scale: 1.05, zIndex: 10 } : undefined}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <Link
                    to={`/experiencias/${exp.id}`}
                    draggable={false}
                    className="block w-[104px] sm:w-[128px] md:w-[148px] bg-white shadow-md p-1.5 sm:p-2 pb-3 sm:pb-[18px] select-none"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {exp.image && <img src={exp.image} alt="" draggable={false} className="w-full h-full object-cover pointer-events-none" />}
                    </div>
                    <p className="font-display font-bold text-[11px] sm:text-[11px] md:text-[13px] text-[#1f2937] text-center leading-tight mt-2 sm:mt-3">{exp.skill}</p>
                    <p className="font-sans text-[9px] sm:text-[9px] md:text-[11px] text-[#9ca3af] text-center mt-0.5 sm:mt-1">{exp.subtitle}</p>
                  </Link>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Ver más skills"
        className="hidden sm:flex items-center justify-center absolute -right-4 top-[calc(50%-14px)] -translate-y-1/2 z-10 w-9 h-9 rounded-full text-[#42767f] bg-white shadow-md hover:bg-[#42767f] hover:text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function GtmMoreContent({ num, paragraphs }: { num: string; paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="font-sans text-[13px] text-[#4b5563] leading-relaxed">{p}</p>
      ))}

      {num === '01' && (
        <div className="bg-[#f9fafb] rounded-xl p-4 sm:p-5">
          <p className="font-display font-bold text-[13px] text-[#1f2937] mb-3">Datos clave</p>
          <ul className="space-y-2.5">
            {gtmStep1Data.map((d) => (
              <li key={d.text} className="font-sans text-[13px] text-[#4b5563] leading-relaxed">
                {d.text}
                <span className="italic text-[#9ca3af] text-[11px]"> ({d.source})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {num === '02' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#f9fafb] rounded-xl p-4 sm:p-5">
            {gtmStep2Checklist.map((item) => (
              <div key={item.q}>
                <p className="font-sans font-bold text-[#1f2937] text-[13px]">✅ {item.q}</p>
                <p className="font-sans text-[12px] text-[#4b5563] leading-relaxed mt-1">{item.a}</p>
                {item.source && <p className="italic font-sans text-[11px] text-[#9ca3af] mt-1.5">({item.source})</p>}
              </div>
            ))}
          </div>
          <div>
            <p className="font-sans font-bold text-[#1f2937] text-[13px] mb-2.5">✅ ¿Hay evidencia de que funciona?</p>
            <TestimonialCarousel items={sabbaticalReferents} quoted={false} />
          </div>
        </>
      )}

      {num === '04' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl p-4 sm:p-5" style={{ background: 'rgba(66,118,127,0.08)' }}>
            <p className="text-lg mb-1.5">🎯</p>
            <p className="font-display font-bold text-[14px] text-[#1f2937] mb-2">Para mí</p>
            <ul className="space-y-1.5">
              {gtmStep4ParaMi.map((t) => (
                <li key={t} className="font-sans text-[12px] text-[#1f2937] leading-relaxed flex gap-1.5">
                  <span className="shrink-0" style={{ color: '#42767f' }}>✓</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-4 sm:p-5" style={{ background: 'rgba(16,185,129,0.08)' }}>
            <p className="text-lg mb-1.5">🏢</p>
            <p className="font-display font-bold text-[14px] text-[#1f2937] mb-2">Para empresas</p>
            <ul className="space-y-1.5">
              {gtmStep4ParaEmpresas.map((t) => (
                <li key={t} className="font-sans text-[12px] text-[#1f2937] leading-relaxed flex gap-1.5">
                  <span className="shrink-0" style={{ color: '#10b981' }}>✓</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {num === '05' && (
        <div className="flex flex-col sm:flex-row gap-3">
          {gtmStep5Framework.map((pill) => (
            <div key={pill.title} className="flex-1 rounded-xl p-4 pt-6 text-center relative overflow-visible" style={{ background: pill.bg }}>
              <img src={pill.letter} alt="" aria-hidden="true" className="pointer-events-none select-none mx-auto w-[26px] h-auto absolute -top-2.5 left-1/2 -translate-x-1/2" />
              <p className="font-display font-bold text-[13px] text-[#1f2937] mb-1">{pill.title}</p>
              <p className="font-sans text-[12px] text-[#4b5563] leading-snug">{pill.desc}</p>
            </div>
          ))}
        </div>
      )}

      {num === '07' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-display font-bold text-[13px] text-[#1f2937] mb-2">📣 Comunicación</p>
            <ul className="space-y-1.5 bg-[#f9fafb] rounded-xl p-4">
              {gtmStep6Comunicacion.map((t) => (
                <li key={t} className="font-sans text-[12px] text-[#1f2937] leading-relaxed">✓ {t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-bold text-[13px] text-[#1f2937] mb-2">🛠️ Stack de herramientas</p>
            <ul className="space-y-1.5 bg-[#f9fafb] rounded-xl p-4">
              {gtmStep6Stack.map((t) => (
                <li key={t} className="font-sans text-[12px] text-[#1f2937] leading-relaxed">✓ {t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {num === '08' && (
        <>
          <div className="pl-4 border-l-[3px]" style={{ borderColor: '#42767f' }}>
            <p className="font-sans italic text-[13px] text-[#1f2937] leading-relaxed">
              "Without data, you are just another person with an opinion.<br />
              Without an opinion, you're just another person with data."
            </p>
            <p className="font-sans text-[11px] text-[#9ca3af] mt-1.5">— W. Edwards Deming</p>
          </div>
          <div className="rounded-xl p-4 sm:p-5 text-center" style={{ background: 'linear-gradient(135deg, #42767f, #2d5259)' }}>
            <p className="font-sans text-[13px] font-medium text-white/70 mb-1">⭐ North Star Metric</p>
            <p className="font-sans text-[14px] font-medium text-white">Conversaciones de valor generadas por GAPING</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f9fafb] rounded-xl p-4 sm:p-5">
            {gtmStep7Metricas.map((group) => (
              <div key={group.label}>
                <p className="font-sans font-bold text-[12px]" style={{ color: '#42767f' }}>{group.label}</p>
                <ul className="mt-1.5 space-y-1">
                  {group.items.map((it) => (
                    <li key={it} className="font-sans text-[12px] text-[#4b5563] leading-relaxed">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PolaroidThumb({ src, rotate, canHover }: { src: string; rotate: number; canHover: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={canHover ? { scale: 1.25, rotate: 0, zIndex: 10 } : undefined}
      className="bg-white p-1.5 pb-3 shadow-md w-[64px] sm:w-[76px] cursor-pointer shrink-0"
    >
      <img src={src} alt="Gap year" width={90} height={90} className="w-full h-[64px] sm:h-[76px] object-cover" />
    </motion.div>
  );
}

function SectionEyebrow({ icon, rotate, label }: { icon: string; rotate: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <motion.div
        initial={{ scale: 0, rotate }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0"
        style={{ background: 'rgba(66,118,127,0.1)' }}
      >
        <img src={icon} alt="" aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
      </motion.div>
      <p className="font-display font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#42767f]">{label}</p>
    </div>
  );
}

export default function Home() {
  const philosophyRef = useRef<HTMLElement>(null);
  const canHover = useCanHover();
  const [openGtmStep, setOpenGtmStep] = useState('');

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="relative lg:min-h-[calc(100svh-4rem)] flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-16 py-14 sm:py-16 px-5 sm:px-8 xl:px-12 overflow-hidden bg-background">
          <FadeInView className="flex-1 max-w-[560px] text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-[32px] sm:text-[38px] xl:text-[44px] leading-[1.2] text-[#1f2937] mb-5"
            >
              <span className="inline-flex items-baseline align-baseline mr-[0.12em]">
                {wordmarkLetters.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="inline-block select-none h-[0.8em] w-auto"
                    style={{ marginRight: i < wordmarkLetters.length - 1 ? '0.06em' : 0 }}
                  />
                ))}
                <span className="sr-only">GAPING</span>
              </span>
              <span style={{ color: '#2f5860' }}>:</span> la historia de cómo pasé de innovación en FMCG a construir producto digital con IA.
            </motion.h1>

            {/* Segundo nivel de jerarquía tras el título: es la única frase
                que explica qué es esta web, así que va más grande y oscura
                que "Discovery · Priorización · Iteración" / la frase de
                cierre — esas son acentos de ritmo, no la explicación. */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-sans text-base sm:text-lg leading-[1.6] text-[#4b5563] mb-7 max-w-[480px] mx-auto lg:mx-0"
            >
              Un año fuera de la oficina, diseñado como proyecto de desarrollo profesional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center lg:items-start gap-2 mb-8"
            >
              <div className="font-display font-bold text-xs sm:text-sm uppercase tracking-[0.08em] flex items-center gap-2.5" style={{ color: '#42767f' }}>
                <span>Discovery</span>
                <span style={{ color: '#b8d4d8' }}>·</span>
                <span>Priorización</span>
                <span style={{ color: '#b8d4d8' }}>·</span>
                <span>Iteración</span>
              </div>
              <p className="font-display italic text-xs sm:text-sm text-muted-foreground">
                El mismo proceso que usaría para construir cualquier{' '}
                <span
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'wavy',
                    textDecorationColor: '#42767f',
                    textDecorationThickness: '1.5px',
                    textUnderlineOffset: '3px',
                  }}
                >
                  producto
                </span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="hidden lg:flex items-center justify-center lg:justify-start gap-4"
            >
              <button
                type="button"
                onClick={() => philosophyRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 font-display font-medium text-base rounded-full px-7 py-3.5 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{ background: '#42767f' }}
              >
                Ver la historia ↓
              </button>
              <a
                href="/cv/CV_AliciaMenor.pdf"
                download="CV_AliciaMenor.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-medium text-base rounded-full px-7 py-3.5 border-2 transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: '#42767f', color: '#42767f' }}
              >
                Descargar CV
              </a>
            </motion.div>
          </FadeInView>

          <FadeInView className="flex-1 flex flex-col items-center gap-4 max-w-[380px]">
            <div className="relative w-full flex items-center justify-center">
              <img
                src={logoArrow}
                alt=""
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-[58%] -translate-y-[74%] h-[220px] sm:h-[290px] w-auto pointer-events-none select-none"
              />
              <div className="relative w-[220px] h-[290px] sm:w-[260px] sm:h-[340px] lg:translate-x-[13%] rounded-[20px] overflow-hidden">
                <img
                  src={fotoAlicia}
                  alt="Alicia Menor"
                  width={600}
                  height={800}
                  decoding="async"
                  {...{ fetchpriority: 'high' as const }}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="text-center lg:translate-x-[13%]">
              <p className="font-display font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.1em] text-[#1f2937]">Soy Alicia Menor, soy Product Manager</p>
              <p className="font-sans text-[13px] sm:text-[14px] text-muted-foreground mt-1.5">Conecto negocio, usuario y tecnología para crear impacto.</p>
            </div>

            {/* Mismos CTAs que arriba, pero en el flujo mobile van debajo del
                nombre/foto en vez de antes (ver la copia lg: de este bloque) —
                en fila incluso en mobile, para que ambos botones queden a la
                misma altura en vez de apilados. */}
            <div className="flex lg:hidden flex-row flex-wrap items-center justify-center gap-2.5 mt-2">
              <button
                type="button"
                onClick={() => philosophyRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-1.5 font-display font-medium text-sm rounded-full px-5 py-3 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style={{ background: '#42767f' }}
              >
                Ver la historia ↓
              </button>
              <a
                href="/cv/CV_AliciaMenor.pdf"
                download="CV_AliciaMenor.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-display font-medium text-sm rounded-full px-5 py-3 border-2 transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: '#42767f', color: '#42767f' }}
              >
                Descargar CV
              </a>
            </div>
          </FadeInView>
        </section>

        {/* 02 · Proyecto */}
        <section ref={philosophyRef} className="pt-16 md:pt-[100px] pb-10 md:pb-14 px-5 sm:px-4 bg-[#eef4f5] overflow-x-hidden">
          <div className="max-w-[900px] mx-auto">
            <FadeInView className="min-w-0">
              <SectionEyebrow icon={iconBackpack} rotate={-15} label="Proyecto" />

              <motion.h2
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="font-display font-bold text-[26px] sm:text-[32px] md:text-[38px] leading-[1.15] text-[#1f2937] mb-4 sm:mb-5"
              >
                ¿Qué pasa cuando aplicas mentalidad de producto a tu propio desarrollo profesional?
              </motion.h2>

              <p className="font-sans text-[15px] sm:text-base md:text-[17px] leading-[1.65] text-[#6b7280] mb-4">
                De liderar el crecimiento de un ecommerce y desarrollar nuevas bebidas en Mahou San Miguel, a crear mi propia hipótesis de desarrollo profesional. Un año fuera de la oficina (el GAP) para explorar, aportar y aprender experimentando en distintos contextos, y así convertir experiencias en nuevas skills.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex justify-center my-9 sm:my-12"
                style={{ fontSize: 'clamp(44px, 14vw, 80px)' }}
              >
                <GapingLogo />
              </motion.div>

              <p className="font-sans text-[15px] sm:text-base md:text-[17px] leading-[1.65] text-[#6b7280] mb-6 sm:mb-8">
                No había roadmap perfecto, ni respuestas cerradas. Solo un framework para tomar decisiones y un objetivo: prepararme mejor para el mercado laboral y el futuro del producto digital.
              </p>

              <p className="font-display font-semibold text-[11px] sm:text-[13px] uppercase tracking-[0.04em] text-[#9ca3af] mb-4 sm:mb-5">
                El framework de decisión
              </p>

              <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-7">
                {filters.map((f) => (
                  <StaggerItem key={f.label}>
                    <div className="min-w-0 h-full rounded-2xl p-4 md:p-5 text-center" style={{ background: f.bg }}>
                      <img src={f.letter} alt="" aria-hidden="true" className="h-12 md:h-14 w-auto mx-auto mb-0.5" />
                      <BrushUnderline color={f.color} width={30} className="block mx-auto mb-1.5 sm:mb-2" />
                      <p className="font-display font-bold text-[13px] md:text-sm uppercase tracking-[0.02em] text-[#1f2937] leading-tight mb-0.5 sm:mb-1">{f.label}</p>
                      <p className="font-sans text-[11px] md:text-[13px] leading-snug text-[#6b7280]">{f.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>

              <p className="font-sans italic text-[13px] sm:text-[15px] text-[#6b7280] mb-6 sm:mb-8">
                Si no cumplía las tres a la vez, no entraba en el roadmap.
              </p>

              <p className="font-display font-bold text-[19px] sm:text-[22px] md:text-[27px] text-[#1f2937] mb-3">
                ¿Y si, en vez de <span className="line-through">features</span>, desarrollo skills?
              </p>

              <p className="font-sans text-[13px] sm:text-[14px] text-[#9ca3af] mb-8 sm:mb-10 max-w-[560px]">
                Descubre las experiencias que me llevaron a potenciar distintas skills.
              </p>

              <p className="font-sans text-[15px] sm:text-base leading-[1.6] text-[#4b5563] mb-6">
                <span className="font-bold" style={{ color: '#42767f' }}>GAP + ING</span>: el hueco en el CV convertido en movimiento.
              </p>

              <div className="flex flex-col gap-5 mb-6">
                <SkillsScroller canHover={canHover} />

                <Link
                  to="/proyecto#skills"
                  className="inline-flex items-center gap-2 font-display font-semibold text-sm sm:text-[15px] text-[#42767f] bg-white border-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:scale-[1.02] hover:shadow-md transition-all duration-300 self-start"
                  style={{ borderColor: '#42767f' }}
                >
                  Ver todas las skills
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* 03 · Go To Market de GAPING */}
        <section className="pt-20 md:pt-28 pb-16 md:pb-24 px-5 sm:px-4 bg-[#f9fafb]">
          <div className="max-w-[900px] mx-auto">
            <FadeInView>
              <SectionEyebrow icon={iconPencil} rotate={-20} label="Go To Market de GAPING" />
              <motion.h2
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="font-display font-bold text-[26px] sm:text-[32px] md:text-[38px] leading-[1.15] text-[#1f2937] mb-8 sm:mb-10"
              >
                Cómo diseñé GAPING como proyecto de producto
              </motion.h2>
            </FadeInView>

            <div className="flex flex-col gap-3 mb-8">
              {gtmSteps.map((s) => (
                <FadeInView key={s.num}>
                  <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 0.4, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="font-display font-bold text-2xl shrink-0"
                        style={{ color: '#42767f' }}
                      >
                        {s.num}
                      </motion.span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-[15px] text-[#1f2937]">{s.label}</p>
                        <p className="font-sans text-[13px] text-[#6b7280] mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                    <Accordion
                      type="single"
                      collapsible
                      value={openGtmStep === s.num ? s.num : ''}
                      onValueChange={setOpenGtmStep}
                      className="mt-3 pt-3 border-t border-[#e5e7eb]"
                    >
                      <AccordionItem value={s.num} className="border-b-0">
                        <ExpandToggle />
                        <AccordionContent>
                          <div className="pt-2">
                            <GtmMoreContent num={s.num} paragraphs={s.paragraphs} />
                            {s.anchor && (
                              <Link
                                to={`/go-to-market#${s.anchor}`}
                                className="inline-flex items-center gap-1.5 mt-4 font-display font-semibold text-[12.5px] hover:underline"
                                style={{ color: '#42767f' }}
                              >
                                Ver este paso completo en Go To Market
                                <ArrowRight size={13} />
                              </Link>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </FadeInView>
              ))}
            </div>

            <FadeInView className="text-center">
              <Link
                to="/go-to-market"
                className="inline-flex items-center gap-2 font-display font-semibold text-base text-white rounded-full px-7 py-3.5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                style={{ background: '#42767f' }}
              >
                Ver el Go To Market completo
                <ArrowRight size={16} />
              </Link>
            </FadeInView>
          </div>
        </section>

        {/* 04 · Quién soy */}
        <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-5 sm:px-4 bg-background">
          <div className="max-w-[900px] mx-auto">
            <FadeInView>
              <SectionEyebrow icon={iconSmiley} rotate={20} label="Quién soy" />

              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 sm:gap-8 items-center bg-[#f9fafb] rounded-2xl p-5 sm:p-7 mb-10 sm:mb-12">
                <ProfilePhotoCrossfade className="relative w-[150px] h-[198px] sm:w-full sm:h-[230px] rounded-2xl overflow-hidden mx-auto sm:mx-0 shadow-md" />
                <div className="text-center sm:text-left">
                  <motion.h2
                    initial={{ opacity: 0, scale: 1.08 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="font-display font-bold text-[26px] sm:text-[32px] md:text-[38px] text-[#1f2937] mb-3"
                  >
                    Soy Alicia Menor Gómez
                  </motion.h2>
                  <p className="font-sans text-[15px] sm:text-base leading-relaxed text-[#4b5563] mb-4">
                    Conecto negocio, usuario y tecnología para construir productos con impacto. De discovery a delivery.
                  </p>
                  <StaggerGrid className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {IDENTITY_TAGS.map((w) => (
                      <StaggerItem key={w}>
                        <span className="inline-block px-4 py-1.5 rounded-full font-display font-bold text-sm text-white" style={{ background: '#42767f' }}>{w}</span>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-5 sm:gap-8 mb-10 sm:mb-12">
                <div className="flex-1 min-w-0 space-y-3 max-w-[560px]">
                  <p className="font-sans text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                    Empecé en marketing para entender qué hace que unos productos nos enamoren.
                  </p>
                  <p className="font-sans text-[15px] sm:text-base leading-relaxed text-[#4b5563]">
                    Y llegué a product management porque lo que realmente me engancha es detectar problemas reales, hablar con las personas que los viven y validar soluciones que también aporten valor al negocio.
                  </p>
                </div>
                <div className="flex sm:flex-col justify-center gap-3 shrink-0">
                  <PolaroidThumb src={polaroid1} rotate={-4} canHover={canHover} />
                  <PolaroidThumb src={polaroid2} rotate={3} canHover={canHover} />
                </div>
              </div>
            </FadeInView>

            <FadeInView>
              <h3
                className="font-display font-semibold text-lg sm:text-xl text-[#4b5563] mb-6"
                style={{
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'wavy',
                  textDecorationColor: '#42767f',
                  textDecorationThickness: '1.5px',
                  textUnderlineOffset: '4px',
                }}
              >
                Lo que dicen quienes han trabajado conmigo
              </h3>
            </FadeInView>
            <FadeInView className="mb-4">
              <TestimonialCarousel />
            </FadeInView>
            <FadeInView>
              <div className="text-center mb-10 sm:mb-12">
                <a
                  href="https://www.linkedin.com/in/aliciamenorgomez/details/recommendations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display font-medium text-sm hover:underline"
                  style={{ color: '#42767f' }}
                >
                  Ver todas las recomendaciones en LinkedIn →
                </a>
              </div>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 mb-8 sm:mb-10">
              <FadeInView className="flex flex-col gap-3">
                <p className="font-display font-bold text-[15px] text-[#1f2937]">Cómo trabajo</p>
                <div className="flex items-start gap-3 bg-[#f9fafb] rounded-xl p-4">
                  <span className="text-xl shrink-0">🎯</span>
                  <p className="font-sans text-[14px] text-[#4b5563] leading-relaxed">Priorizo por impacto en usuario y negocio, no por quien grita más alto.</p>
                </div>
                <div className="flex items-start gap-3 bg-[#f9fafb] rounded-xl p-4">
                  <span className="text-xl shrink-0">🔍</span>
                  <p className="font-sans text-[14px] text-[#4b5563] leading-relaxed">Los datos acompañan todo el proceso: complementan la intuición, validan antes de construir, ordenan la priorización y miden el impacto tras el lanzamiento.</p>
                </div>
                <div className="flex items-start gap-3 bg-[#f9fafb] rounded-xl p-4">
                  <span className="text-xl shrink-0">🤝</span>
                  <p className="font-sans text-[14px] text-[#4b5563] leading-relaxed">Hago que gente que no habla el mismo idioma (técnico, legal, diseño, desarrollo, proveedores) reme junta.</p>
                </div>
              </FadeInView>

              <FadeInView className="rounded-2xl p-6 flex flex-col justify-center" style={{ background: 'rgba(66,118,127,0.08)' }}>
                <p className="font-display font-bold text-[15px] text-[#1f2937] mb-2">Mi visión de producto</p>
                <p className="font-sans text-[14px] text-[#4b5563] leading-relaxed">
                  Creo en el <span className="font-semibold" style={{ color: '#42767f' }}>doble impacto</span>: que un producto haga crecer el negocio y, a la vez, mejore aunque sea un poco la vida de quien lo usa o el mundo que le rodea. Para mí van juntos.
                </p>
              </FadeInView>
            </div>

            <FadeInView>
              <div className="bg-[#f9fafb] rounded-2xl p-5 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[15px] sm:text-[17px] text-[#1f2937] mb-2">¿Cuál es mi hobby favorito?</p>
                    <p className="font-sans text-[13px] sm:text-[14px] text-[#4b5563] leading-relaxed">
                      Viajar y aprender de otras personas. Entender cómo vive y piensa alguien distinto a mí, conocer la historia que hay detrás de cada uno: es probablemente mi mayor fuente de aprendizaje. Viva el <i>"life research"</i>.
                    </p>
                    <div className="mt-4 pl-4 border-l-[3px]" style={{ borderColor: '#42767f' }}>
                      <p className="font-sans text-[12px] font-medium text-[#6b7280] mb-1">Consejo de César, un hondureño que conocí en un avión:</p>
                      <p className="font-sans italic text-[13px] sm:text-[14px] text-[#1f2937]">
                        "Conoce el mundo para conocerte a ti, y conoce a la gente para ser más gente."
                      </p>
                    </div>
                    <p className="font-sans text-[13px] sm:text-[14px] text-[#4b5563] leading-relaxed mt-4">
                      Llevo aplicándolo desde entonces. Y como cualquier buen producto, sigo iterando: me quedan muchas versiones mejoradas por delante, sobre todo ahora que la IA nos amplifica
                      <img src={logoArrow} alt="" aria-hidden="true" className="inline-block h-[16px] w-auto align-middle ml-1.5" />
                    </p>
                  </div>
                  <div className="flex sm:flex-col justify-center gap-3 shrink-0">
                    <PolaroidThumb src={polaroid3} rotate={-2} canHover={canHover} />
                    <PolaroidThumb src={polaroid4} rotate={2} canHover={canHover} />
                    <PolaroidThumb src={polaroid5} rotate={-3} canHover={canHover} />
                  </div>
                </div>
              </div>
            </FadeInView>

            <FadeInView className="mt-16 sm:mt-20">
              <CollapsibleSection id="trayectoria" title="Mi trayectoria">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FadeInView>
                          <div className="flex flex-col gap-4">
                            {timeline.map((t) => (
                              <div key={t.title} className={`flex items-start gap-3 ${t.highlight ? 'rounded-xl p-3 -ml-3' : ''}`} style={t.highlight ? { background: 'rgba(66,118,127,0.08)' } : undefined}>
                                {t.logo ? (
                                  <img src={t.logo} alt={t.company} className="w-10 h-10 rounded-full object-contain bg-white shadow-sm shrink-0 p-1" />
                                ) : (
                                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base shrink-0" style={{ background: '#42767f' }}>🧭</span>
                                )}
                                <div className="min-w-0">
                                  <p className="font-sans text-[11px] font-semibold text-[#9ca3af]">{t.year}</p>
                                  <p className="font-display font-bold text-[14px] text-[#1f2937] leading-tight">{t.title}</p>
                                  {t.company && <p className="font-sans text-[12px] text-[#6b7280] mt-0.5">{t.company}</p>}
                                  <p className="font-sans text-[11px] text-[#6b7280] mt-1 leading-snug">{t.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </FadeInView>

                        <FadeInView>
                          <p className="font-display font-bold text-[15px] text-[#1f2937] mb-4">Formación</p>
                          <div className="flex flex-col gap-3">
                            {formacion.map((f) => (
                              <div key={f.title}>
                                <p className="font-display font-semibold text-[13px] text-[#1f2937]">{f.title}</p>
                                <p className="font-sans text-[12px]" style={{ color: '#42767f' }}>{f.inst}</p>
                                <p className="font-sans text-[11px] text-[#9ca3af] mt-0.5">{f.detail}</p>
                              </div>
                            ))}
                          </div>

                          <Accordion type="single" collapsible className="mt-3">
                            <AccordionItem value="formacion-mas" className="border-b-0">
                              <ExpandToggle />
                              <AccordionContent>
                                <div className="flex flex-col gap-3 pt-2">
                                  {formacionMas.map((f) => (
                                    <div key={f.title}>
                                      <p className="font-display font-semibold text-[13px] text-[#1f2937]">{f.title}</p>
                                      <p className="font-sans text-[12px]" style={{ color: '#42767f' }}>{f.inst}</p>
                                      <p className="font-sans text-[11px] text-[#9ca3af] mt-0.5">{f.detail}</p>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          <div className="mt-6 pt-5 border-t border-[#e5e7eb]">
                            <p className="font-display font-bold text-[12px] text-[#1f2937] mb-3">Experiencia adicional</p>
                            <div className="mb-4">
                              <p className="font-sans font-semibold text-[11px] mb-2" style={{ color: '#42767f' }}>🚀 Emprendimiento e Innovación</p>
                              <div className="flex flex-col gap-2">
                                {emprendimiento.map((item) => (
                                  <div key={item.title}>
                                    <p className="font-sans font-semibold text-[11px] text-[#1f2937] leading-snug">{item.title}</p>
                                    <p className="font-sans text-[11px] text-[#9ca3af] mt-0.5">{item.sub}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="font-sans font-semibold text-[11px] mb-2" style={{ color: '#10b981' }}>❤️ Voluntariado</p>
                              <div className="flex flex-col gap-2">
                                {voluntariadoAdicional.map((item) => (
                                  <div key={item.title}>
                                    <p className="font-sans font-semibold text-[11px] text-[#1f2937] leading-snug">{item.title}</p>
                                    <p className="font-sans text-[11px] text-[#9ca3af] mt-0.5">{item.sub}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Link to="/aboutme" className="inline-flex items-center gap-2 font-display font-semibold text-[14px] mt-5 hover:underline" style={{ color: '#42767f' }}>
                            Ver CV completo
                            <ArrowRight size={14} />
                          </Link>
                        </FadeInView>
                      </div>
              </CollapsibleSection>
            </FadeInView>

            <FadeInView className="mt-16 sm:mt-20">
              <CollapsibleSection id="skillset" title="Skill Set">
                      <div className="mb-8">
                        <p className="font-display font-bold text-lg mb-4" style={{ color: '#42767f' }}>Skills</p>
                        <StaggerGrid className="flex flex-wrap gap-2">
                          {skills.map((s) => (
                            <StaggerItem key={s}>
                              <span className="inline-block px-4 py-2 rounded-full font-sans font-medium text-sm bg-[#f3f4f6] text-[#1f2937]">{s}</span>
                            </StaggerItem>
                          ))}
                        </StaggerGrid>
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg mb-4" style={{ color: '#42767f' }}>Herramientas</p>
                        <StaggerGrid className="flex flex-wrap gap-2">
                          {tools.map((s) => (
                            <StaggerItem key={s}>
                              <span className="inline-block px-3 py-1.5 rounded-md font-sans font-medium text-sm bg-white border border-[#e5e7eb] text-[#4b5563]">{s}</span>
                            </StaggerItem>
                          ))}
                          {aiTools.map((s) => (
                            <StaggerItem key={s}>
                              <span className="inline-block px-3 py-1.5 rounded-md font-sans font-medium text-sm text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #42767f, #2d5259)' }}>✨ {s}</span>
                            </StaggerItem>
                          ))}
                        </StaggerGrid>
                      </div>
              </CollapsibleSection>
            </FadeInView>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="pt-2 md:pt-4 pb-16 md:pb-[100px] px-5 sm:px-4 text-center bg-background">
          <FadeInView>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] md:text-[42px] text-[#1f2937] mb-4">¿Quieres conectar?</h2>
            <p className="font-display font-bold text-lg sm:text-xl mb-8 sm:mb-10" style={{ color: '#42767f' }}>
              ¿Buscas a tu próximo Product Manager? Hablemos
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a
                href="mailto:amenorgomez@gmail.com"
                onClick={() => trackCtaClick('email', 'home_contact')}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-display font-medium text-base sm:text-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                style={{ background: '#42767f' }}
              >
                <Mail size={22} />Enviar Email
              </a>
              <a
                href="https://www.linkedin.com/in/aliciamenorgomez/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('linkedin', 'home_contact')}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0077b5] text-white font-display font-medium text-base sm:text-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                <Linkedin size={22} />LinkedIn
              </a>
            </div>
          </FadeInView>
        </section>
      </main>
    </PageTransition>
  );
}
