import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageMeta } from '@/hooks/usePageMeta';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import lennyImg from '@/assets/testimonios/lenny.jpg';
import tomImg from '@/assets/testimonios/tom.jpg';
import adrianaImg from '@/assets/testimonios/adriana.jpg';
import letterI from '@/assets/icons/letter-i.png';
import letterN from '@/assets/icons/letter-n.png';
import letterG from '@/assets/icons/letter-g.png';

const step1DataSections: { title: string; bullets: { text: string; source?: string }[]; source?: string }[] = [
  {
    title: 'Lo que ya piden las empresas hoy:',
    bullets: [
      { text: 'Pensamiento analítico: esencial para 7 de cada 10 empresas' },
      { text: 'Resiliencia, flexibilidad y agilidad: 67% globalmente' },
    ],
    source: 'World Economic Forum, Future of Jobs Report 2025',
  },
  {
    title: 'Lo que más crece de aquí a 2030:',
    bullets: [
      { text: 'Liderazgo e influencia social: el mayor salto relativo, +22 puntos desde 2023' },
      { text: 'Resiliencia y flexibilidad: +17 puntos' },
    ],
    source: 'WEF, Future of Jobs Report 2025',
  },
  {
    title: 'Lo que confirma McKinsey:',
    bullets: [
      { text: 'Skills sociales y emocionales (empatía, liderazgo): +11 a +14% de demanda hacia 2030' },
      { text: 'Creatividad: +12%' },
    ],
    source: 'McKinsey Global Institute, "A new future of work"',
  },
  {
    title: 'El fin de la carrera lineal:',
    bullets: [
      { text: 'Solo el 41% de los profesionales quiere seguir hoy una carrera lineal tradicional' },
      { text: 'El 72% de los empleadores considera que la escalera corporativa convencional está desfasada' },
    ],
    source: 'Randstad Workmonitor Report 2026',
  },
  {
    title: 'Autoconocimiento y rendimiento:',
    bullets: [
      { text: 'Empresas con mayor proporción de empleados autoconscientes muestran mejor rendimiento bursátil sostenido durante 30 meses, en un análisis de 486 empresas cotizadas', source: 'Zes & Landis, "A Better Return on Self-Awareness", Korn Ferry Institute, 2013' },
    ],
  },
];

function DataSection({ section }: { section: typeof step1DataSections[0] }) {
  return (
    <div>
      <h4 className="font-display font-bold text-[16px] text-[#1f2937] mb-4">{section.title}</h4>
      <ul className="space-y-3 font-sans text-[15px] text-[#4b5563] leading-relaxed">
        {section.bullets.map((b) => (
          <li key={b.text}>
            {b.text}
            {b.source && (
              <span className="italic text-[#6b7280] text-[13px]"> ({b.source})</span>
            )}
          </li>
        ))}
      </ul>
      {section.source && (
        <p className="italic font-sans text-[13px] text-[#6b7280] mt-4">({section.source})</p>
      )}
    </div>
  );
}

const step2Checklist: { q: string; a: string[]; source?: string }[] = [
  {
    q: '¿Resuelve algo real?',
    a: ['Sí: me daba espacio para desarrollar skills más rápido de lo que lo haría en una oficina, conocer contextos distintos y profundizar en mi autoconocimiento para reflexionar sobre mi propio impacto.'],
  },
  {
    q: '¿Es viable?',
    a: ['Sí: tenía la situación económica para sostenerlo con mis ahorros, y existen alternativas de todo tipo de presupuesto, no era una opción solo para quien puede permitírselo sin límites.'],
  },
  {
    q: '¿Hay demanda del perfil al que aspiro?',
    a: ['Sí: la demanda de Product Managers está creciendo con fuerza, un 14% interanual en 2026, con roles Associate PM creciendo un 33%.'],
    source: 'Userpilot / Lenny Rachitsky, State of the Product Job Market 2026',
  },
];

interface Testimonial {
  name: string;
  role: string;
  photo: string;
  quote: string;
}

const evidenceTestimonials: Testimonial[] = [
  {
    name: 'Lenny Rachitsky',
    role: "Lenny's Newsletter · Ex Airbnb",
    photo: lennyImg,
    quote: 'Una de las voces más reconocidas en product management. Tomó un sabático de tres meses tras siete años en Airbnb; de ahí nació su newsletter, hoy su proyecto principal.',
  },
  {
    name: 'Tom Leung',
    role: 'Director of Product Management en Meta',
    photo: tomImg,
    quote: '"You don\'t get this kind of freedom very often. Use it." Sobre lo que le dio su año y medio sabático: "It helped me reset, grow, and show up stronger for what\'s next."',
  },
  {
    name: 'Adriana Carvajal',
    role: '@adri.zip · Ex Google, ex LinkedIn',
    photo: adrianaImg,
    quote: 'Estuvo un año viajando por el mundo antes de entrar en tech, y ha hablado de esa etapa como un momento clave en su carrera; hoy es una de las mayores creadoras de contenido tech en español.',
  },
];

const evidenceSource = "Lenny's Newsletter · Product Mastery Now, episodio con Tom Leung · Adriana Carvajal, @adri.zip";

function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div>
      <div className="bg-[#f9fafb] rounded-[16px] p-5 sm:p-6 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-start gap-4"
          >
            <img
              src={item.photo}
              alt={item.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border-2"
              style={{ borderColor: '#42767f' }}
            />
            <div className="min-w-0">
              <p className="font-display font-bold text-[15px] text-[#1f2937]">{item.name}</p>
              <p className="font-sans text-[12px] font-medium mb-2" style={{ color: '#42767f' }}>{item.role}</p>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#4b5563] leading-relaxed">{item.quote}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-[#e5e7eb]">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Testimonio anterior"
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#e5e7eb] bg-white text-[#42767f] hover:bg-[#e8f4f6] transition-colors"
          >
            ←
          </button>
          <div className="flex gap-1.5">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver testimonio de ${t.name}`}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === index ? '#42767f' : '#d1d5db' }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente testimonio"
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[#e5e7eb] bg-white text-[#42767f] hover:bg-[#e8f4f6] transition-colors"
          >
            →
          </button>
        </div>
      </div>
      <p className="italic font-sans text-[13px] text-[#6b7280] mt-3">({evidenceSource})</p>
    </div>
  );
}

interface BenchmarkRow {
  opcion: string;
  estructura: string;
  impacto: string;
  skills: string;
  output: string;
  riesgo: string;
  coste: string;
  highlight?: boolean;
}

const benchmarkGroups: { category: string; rows: BenchmarkRow[] }[] = [
  {
    category: '🌍 Voluntariado',
    rows: [
      { opcion: 'Voluntariado local (Madrid)', estructura: '⚪', impacto: '✅', skills: 'Compromiso sostenido, trabajo comunitario', output: 'Impacto real, sin cambio de contexto ni idioma', riesgo: 'Muy bajo', coste: 'Gratuito' },
      { opcion: 'Voluntariado directo con ONG', estructura: '❌', impacto: '✅', skills: 'Autonomía, gestión de incertidumbre, iniciativa propia', output: 'Impacto real, sin certificado', riesgo: 'Medio', coste: 'Bajo (solo gastos propios)' },
      { opcion: 'Voluntariado internacional gratuito (ESC, Peace Corps)', estructura: '⚪', impacto: '✅', skills: 'Empatía, gestión de recursos limitados', output: 'Experiencia de impacto, sin conexión a producto', riesgo: 'Bajo', coste: 'Financiado' },
      { opcion: 'Voluntariado corto de pago (PMGY, Rustic Pathways, CIEE)', estructura: '✅', impacto: '⚪', skills: 'Trabajo comunitario, adaptación cultural básica', output: 'Certificado + experiencia puntual', riesgo: 'Bajo', coste: '€9/día a €13.000' },
      { opcion: 'Voluntariado de larga duración (Entre Culturas, AFS)', estructura: '✅', impacto: '✅', skills: 'Inmersión cultural profunda, convivencia familiar, idioma', output: 'Certificado + fluidez cultural real', riesgo: 'Bajo', coste: '€4.000 a €12.000' },
    ],
  },
  {
    category: '💸 Idioma',
    rows: [
      { opcion: 'Curso de idiomas (EF)', estructura: '✅', impacto: '❌', skills: 'Idioma, poco más', output: 'Certificado de nivel', riesgo: 'Bajo', coste: '~€2.000 a €8.000' },
      { opcion: 'Au pair', estructura: '✅', impacto: '❌', skills: 'Idioma, paciencia, responsabilidad diaria', output: 'Manutención + stipend cubiertos', riesgo: 'Bajo', coste: 'Financiado, ganas dinero' },
    ],
  },
  {
    category: '🎒 Viaje y trabajo',
    rows: [
      { opcion: 'Working holiday visa', estructura: '⚪', impacto: '❌', skills: 'Autonomía, adaptabilidad laboral básica', output: 'Experiencia laboral variada', riesgo: 'Medio', coste: '~€500 + €4.700' },
      { opcion: 'Backpacking independiente', estructura: '❌', impacto: '❌', skills: 'Autonomía, tolerancia a la incertidumbre', output: 'Sin narrativa profesional', riesgo: 'Bajo económico, alto en oportunidad', coste: 'Desde €3.000' },
      { opcion: 'ICEX Vives', estructura: '✅', impacto: '❌', skills: 'Gestión internacional de negocio, trabajo en filial real, idioma', output: 'Experiencia laboral formal + red profesional', riesgo: 'Bajo', coste: 'Financiado, 21.000 a 46.000€/año' },
    ],
  },
  {
    category: '🎓 Formación',
    rows: [
      { opcion: 'MBA / Máster Digital Product', estructura: '✅', impacto: '❌', skills: 'Marco teórico, estrategia, network senior', output: 'Título + casos simulados', riesgo: 'Deuda, sin garantía de rol', coste: '€8.000 a €25.000' },
      { opcion: 'Bootcamp PM', estructura: '✅', impacto: '❌', skills: 'Frameworks, vocabulario PM, herramientas', output: 'Certificado + proyecto ficticio', riesgo: 'Genérico, mercado saturado', coste: '€3.700 a €13.300' },
      { opcion: 'Mentorías / cursos sueltos', estructura: '❌', impacto: '❌', skills: 'Conocimiento puntual, según qué elijas', output: 'Disperso, difícil de narrar', riesgo: 'Bajo, bajo impacto', coste: '€0 a €500' },
    ],
  },
  {
    category: '🚀 Emprendimiento',
    rows: [
      { opcion: 'Emprender / startup propia', estructura: '❌', impacto: '⚪', skills: 'Ciclo completo de producto, ownership total', output: 'Producto real, sin validación externa', riesgo: 'Muy alto', coste: 'Variable' },
    ],
  },
  {
    category: '🎯 GAPING',
    rows: [
      { opcion: 'GAPING', estructura: '✅', impacto: '✅', skills: 'Stakeholders, priorización, research, adaptabilidad, comunicación, 6+ contextos reales', output: 'Documentar experiencias variadas centradas en mejorar soft skills, viajar y salir de mi zona de confort', riesgo: 'Controlado', coste: 'Diseño propio', highlight: true },
    ],
  },
];

export default function GoToMarket() {
  usePageMeta('Go To Market', 'Cómo diseñé GAPING como proyecto de producto');
  return (
    <PageTransition>
      <main className="py-16 sm:py-20 px-5 sm:px-4 bg-background overflow-x-hidden">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <FadeInView className="text-center mb-16 sm:mb-20">
            <h1 className="font-display font-bold text-[34px] sm:text-[48px] md:text-[64px] leading-[1.05] tracking-tight sm:tracking-normal" style={{ color: '#42767f' }}>
              GO TO MARKET
            </h1>
            <BrushUnderline className="mx-auto mt-4" />
            <p className="font-sans text-base sm:text-lg md:text-[22px] text-[#6b7280] mt-5 sm:mt-6">
              Cómo diseñé GAPING como proyecto de producto
            </p>
          </FadeInView>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[26px] sm:left-[50px] md:left-[70px] top-0 bottom-0 w-[2px]"
              style={{ background: '#e5e7eb' }}
            />

            <div className="space-y-16 sm:space-y-20">
              {/* Paso 01 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      01
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      Detectar la oportunidad
                    </h3>
                    <div className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 space-y-4 text-justify">
                      <p>
                        Arranqué mi carrera de producto en el equipo de innovación de una empresa líder en bebidas, donde aprendí las bases de desarrollo y lanzamiento de productos. Al acabar el proyecto en el que estaba, tenía claro que quería dedicarme a esto.
                      </p>
                      <p>
                        Vivimos un momento en el que, cuanta más tecnología hay, más peso ganan las habilidades humanas. A medida que la IA asume tareas técnicas y repetitivas, crece la demanda de criterio, liderazgo y creatividad: según McKinsey y el World Economic Forum, son las skills que más van a crecer de aquí a 2030.
                      </p>
                      <p>
                        Y no es solo la tecnología la que está cambiando las reglas: la carrera lineal, subir peldaño a peldaño en una misma empresa, también ha dejado de ser el único camino válido, según el informe Randstad Workmonitor 2026.
                      </p>
                      <p>
                        Con ese contexto de fondo, tenía curiosidad por el mundo y por otras formas de pensar y trabajar, y creía que esa curiosidad podía convertirme en mejor profesional.
                      </p>
                      <p>
                        Decidí dedicar un año a desarrollar esas habilidades de forma deliberada, fuera de una única oficina. Esta vez, el producto tenía que ser yo.
                      </p>
                    </div>
                    <div className="bg-white rounded-[16px] shadow-md p-5 sm:p-8">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="datos" className="border-b-0">
                          <AccordionTrigger className="font-display font-bold text-[18px] sm:text-[20px] text-[#1f2937] hover:no-underline">
                            Ver los datos
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-8 pt-2">
                              {step1DataSections.slice(0, 3).map((section) => (
                                <DataSection key={section.title} section={section} />
                              ))}
                              <p className="font-sans text-[15px] text-[#4b5563] leading-relaxed text-justify">
                                El patrón es consistente en ambas fuentes: sube el criterio, el liderazgo y la creatividad.
                                El 39% de las competencias clave de un trabajador cambiará de aquí a 2030 <span className="italic text-[#6b7280] text-[13px]">(WEF, 2025)</span>.
                              </p>
                              {step1DataSections.slice(3).map((section) => (
                                <DataSection key={section.title} section={section} />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </FadeInView>

              {/* Paso 02 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      02
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      Validar si tiene sentido
                    </h3>
                    <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 text-justify">
                      Antes de lanzarme, validé la hipótesis desde varios ángulos, igual que haría con cualquier decisión de producto.
                    </p>
                    <div className="bg-white rounded-[16px] shadow-md p-5 sm:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f9fafb] rounded-[16px] p-6">
                        {step2Checklist.map((item) => (
                          <div key={item.q}>
                            <p className="font-sans font-bold text-[#1f2937] text-[15px]">✅ {item.q}</p>
                            <div className="space-y-2 mt-1">
                              {item.a.map((p) => (
                                <p key={p} className="font-sans text-[15px] text-[#4b5563] leading-relaxed">{p}</p>
                              ))}
                            </div>
                            {item.source && (
                              <p className="italic font-sans text-[13px] text-[#6b7280] mt-2">({item.source})</p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <p className="font-sans font-bold text-[#1f2937] text-[15px] mb-3">✅ ¿Hay evidencia de que funciona?</p>
                        <TestimonialCarousel items={evidenceTestimonials} />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>

              {/* Paso 03 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      03
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      Benchmarking
                    </h3>
                    <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 text-justify">
                      Analicé las opciones disponibles para entender dónde estaba la oportunidad, con research online y entrevistas informales a family &amp; friends y contactos que habían vivido varias de estas experiencias. Así podía contrastar expectativas reales y reducir la incertidumbre al tener más información para priorizar las decisiones y que fueran de mayor impacto.
                    </p>
                    <div className="bg-white rounded-[16px] shadow-md p-4 sm:p-8">
                      {/* Mobile: stacked cards */}
                      <div className="sm:hidden space-y-7">
                        {benchmarkGroups.map((group) => (
                          <div key={group.category}>
                            <p className="font-display font-bold text-[13px] text-[#1f2937] mb-2.5">{group.category}</p>
                            <div className="space-y-3">
                              {group.rows.map((row) => (
                                <div
                                  key={row.opcion}
                                  className={`rounded-[12px] p-4 ${row.highlight ? 'border-2' : 'border border-[#e5e7eb]'}`}
                                  style={row.highlight ? { borderColor: '#42767f', background: 'linear-gradient(135deg, #e8f4f6, #c5dfe3)' } : undefined}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="font-display font-bold text-[14px] text-[#1f2937] leading-snug">{row.opcion}</p>
                                    <div className="flex flex-col items-end gap-1 shrink-0 font-sans text-[10px] text-[#9ca3af] whitespace-nowrap">
                                      <span className="flex items-center gap-1">Estructura <span className="text-sm">{row.estructura}</span></span>
                                      <span className="flex items-center gap-1">Impacto <span className="text-sm">{row.impacto}</span></span>
                                    </div>
                                  </div>
                                  <dl className="mt-2.5 space-y-1.5 font-sans text-[12px] text-[#4b5563] leading-snug">
                                    <div><dt className="inline font-semibold text-[#1f2937]">Skills: </dt><dd className="inline">{row.skills}</dd></div>
                                    <div><dt className="inline font-semibold text-[#1f2937]">Output: </dt><dd className="inline">{row.output}</dd></div>
                                    <div><dt className="inline font-semibold text-[#1f2937]">Riesgo: </dt><dd className="inline">{row.riesgo}</dd></div>
                                    <div><dt className="inline font-semibold text-[#1f2937]">Coste: </dt><dd className="inline">{row.coste}</dd></div>
                                  </dl>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* sm and up: full table */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b-2 border-[#e5e7eb]">
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Opción</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Estructura</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Impacto social</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Skills</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Output</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3 pr-4">Riesgo</th>
                              <th className="font-display font-bold text-[14px] text-[#1f2937] py-3">Coste (€)</th>
                            </tr>
                          </thead>
                          <tbody className="font-sans text-[15px] text-[#4b5563]">
                            {benchmarkGroups.map((group) => (
                              <Fragment key={group.category}>
                                <tr>
                                  <td colSpan={7} className="font-display font-bold text-[14px] text-[#1f2937] pt-6 pb-2 whitespace-nowrap">
                                    {group.category}
                                  </td>
                                </tr>
                                {group.rows.map((row) => (
                                  <tr
                                    key={row.opcion}
                                    className={`border-b border-[#e5e7eb] ${row.highlight ? 'border-2 border-[#42767f] font-bold' : ''}`}
                                    style={row.highlight ? { background: 'linear-gradient(135deg, #e8f4f6, #c5dfe3)' } : undefined}
                                  >
                                    <td className="py-4 pr-4">{row.opcion}</td>
                                    <td className="py-4 pr-4">{row.estructura}</td>
                                    <td className="py-4 pr-4">{row.impacto}</td>
                                    <td className="py-4 pr-4">{row.skills}</td>
                                    <td className="py-4 pr-4">{row.output}</td>
                                    <td className="py-4 pr-4">{row.riesgo}</td>
                                    <td className="py-4">{row.coste}</td>
                                  </tr>
                                ))}
                              </Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="font-sans text-[13px] sm:text-[14px] text-[#6b7280] italic mt-5 sm:mt-6">
                        Cifras orientativas basadas en fuentes públicas a fecha de 2026. Pueden variar según destino, proveedor y duración.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInView>

              {/* Paso 04 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      04
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      Definir la propuesta de valor
                    </h3>
                    <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 text-justify">
                      Después de validar y analizar las opciones existentes, definí qué ofrecería GAPING y para quién.
                    </p>
                    <div className="bg-white rounded-[16px] shadow-md p-5 sm:p-8">
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-6 items-stretch">
                        <div className="rounded-[10px] sm:rounded-[12px] p-3 sm:p-8 h-full" style={{ background: 'linear-gradient(135deg, #e8f4f6, #c5dfe3)', borderTop: '4px solid #42767f' }}>
                          <p className="text-[18px] sm:text-[24px] mb-1 sm:mb-2">🎯</p>
                          <h4 className="font-display font-bold text-[14px] sm:text-[24px] text-[#1f2937] mb-1.5 sm:mb-4 leading-tight">Para mí</h4>
                          <ul className="space-y-1 sm:space-y-2 font-sans text-[12px] sm:text-[17px] text-[#1f2937] leading-[1.45] sm:leading-[1.8]">
                            <li>✓ Adquirir skills PM en contextos reales y diversos</li>
                            <li>✓ Desarrollar adaptabilidad y visión end to end</li>
                            <li>✓ Construir un portfolio de evidencias concretas</li>
                            <li>✓ Generar impacto más allá del entorno corporativo</li>
                            <li>✓ Encontrar mi "por qué" como profesional</li>
                            <li>✓ Diferenciarme en un mercado saturado de candidatos con un perfil similar</li>
                          </ul>
                        </div>
                        <div className="rounded-[10px] sm:rounded-[12px] p-3 sm:p-8 h-full" style={{ background: 'linear-gradient(135deg, #f0fdf4, #d1fae5)', borderTop: '4px solid #10b981' }}>
                          <p className="text-[18px] sm:text-[24px] mb-1 sm:mb-2">🏢</p>
                          <h4 className="font-display font-bold text-[14px] sm:text-[24px] text-[#1f2937] mb-1.5 sm:mb-4 leading-tight">Para empresas</h4>
                          <ul className="space-y-1 sm:space-y-2 font-sans text-[12px] sm:text-[17px] text-[#1f2937] leading-[1.45] sm:leading-[1.8]">
                            <li>✓ Ownership end-to-end de producto: de discovery a delivery y medición de resultados</li>
                            <li>✓ Prioriza con datos y criterio de negocio en contextos de recursos limitados</li>
                            <li>✓ Gestiona stakeholders multidisciplinares y alinea equipos con objetivos distintos</li>
                            <li>✓ Comunica con claridad a audiencias técnicas y no técnicas</li>
                            <li>✓ Adaptabilidad real, validada en contextos ambiguos y diversos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-sans font-medium text-base sm:text-lg md:text-[20px] mt-8" style={{ color: '#42767f' }}>
                      Un año estructurado para ser mejor PM.<br />Un portfolio que lo demuestra.
                    </p>
                  </div>
                </div>
              </FadeInView>

              {/* Paso 05 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      05
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      MVP: el piloto
                    </h3>
                    <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 text-justify">
                      Definí un único criterio de decisión: cada experiencia tenía que cumplir tres condiciones a la vez: aportar valor a los demás, sacarme de la zona de confort, y hacerme aprender algo. Si solo cumplía una o dos, no entraba en el roadmap.
                    </p>
                    <div className="bg-white rounded-[16px] shadow-md p-5 sm:p-8">
                      <div className="bg-[#f9fafb] rounded-[20px] p-6 sm:p-10 md:p-12 text-center">
                        <h4 className="font-display font-bold text-[18px] sm:text-[24px] md:text-[28px] text-[#1f2937] mb-8 sm:mb-10">
                          El framework de decisión
                        </h4>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                          {[
                            { letter: letterI, title: 'IMPACTO', desc: '¿Esta experiencia aporta algo a alguien más, no solo a mí?', bg: 'linear-gradient(135deg, #f0fdf4, #d1fae5)', border: '#10b981' },
                            { letter: letterN, title: 'NUEVOS HORIZONTES', desc: '¿Me obliga a salir de un contexto, idioma o entorno que ya domino?', bg: 'linear-gradient(135deg, #e8f4f6, #c5dfe3)', border: '#42767f' },
                            { letter: letterG, title: 'GROWTH', desc: '¿Al terminarla, voy a saber o poder hacer algo que antes no?', bg: 'linear-gradient(135deg, #faf5ff, #e9d5ff)', border: '#8b5cf6' },
                          ].map((pill) => (
                            <div
                              key={pill.title}
                              className="relative overflow-visible rounded-[16px] px-5 sm:px-8 pt-0 pb-5 sm:pb-6 text-center flex-1"
                              style={{ background: pill.bg, border: `2px solid ${pill.border}` }}
                            >
                              <img
                                src={pill.letter}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none select-none mx-auto w-[32px] sm:w-[40px] h-auto -mt-4 sm:-mt-5 mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                              />
                              <p className="font-display font-bold text-[18px] text-[#1f2937] mb-1">{pill.title}</p>
                              <p className="font-sans text-[15px] text-[#4b5563]">{pill.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>

              {/* Paso 06 */}
              <FadeInView>
                <div className="relative flex gap-4 sm:gap-8 md:gap-12">
                  <div className="relative shrink-0 w-[52px] sm:w-[100px] md:w-[140px] text-right">
                    <span className="font-display font-bold text-[44px] sm:text-[64px] md:text-[80px] leading-none" style={{ color: '#42767f', opacity: 0.12 }}>
                      06
                    </span>
                  </div>
                  <div className="flex-1 pt-2 sm:pt-4 min-w-0">
                    <h3 className="font-display font-bold text-[22px] sm:text-[28px] md:text-[36px] text-[#1f2937] mb-3 leading-tight break-words">
                      Comunicación y medición de resultados
                    </h3>
                    <div className="font-sans text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] leading-[1.75] mb-6 space-y-4 text-justify">
                      <p>
                        Diseñar y vivir GAPING era solo una parte del proyecto. Un producto sin comunicación no llega a nadie, y esto no iba a ser diferente.
                      </p>
                      <p>
                        Con el discovery y el delivery ya hechos, tocaba pasar al lanzamiento. Eso significaba conceptualizar cómo contar todo lo vivido, no solo enumerar qué había pasado: elegir los canales adecuados, construir una narrativa coherente, y decidir qué destacar y qué dejar fuera para que el mensaje llegara con claridad.
                      </p>
                      <p>
                        El resultado fue esta web, con el case study completo del proyecto y todo el proceso de Go To Market documentado paso a paso. Para construirla, sin saber programar, tuve que aprender a hacerlo con herramientas de IA.
                      </p>
                      <p>
                        Y un lanzamiento no termina cuando comunicas. Termina cuando compruebas si está funcionando, así que medir los resultados era la última pieza del proceso.
                      </p>
                    </div>

                    {/* Bloque A: Comunicación */}
                    <div>
                      <h4 className="font-display font-bold text-[18px] sm:text-[20px] text-[#1f2937] mb-4">📣 Comunicación</h4>
                      <div className="bg-white p-6 rounded-[16px] shadow-sm">
                        <ul className="space-y-2 font-sans text-[15px] text-[#1f2937] leading-relaxed">
                          <li>✓ Definí estrategia de distribución y los canales prioritarios (web, LinkedIn)</li>
                          <li>✓ Construí la narrativa y la propuesta de valor</li>
                          <li>✓ Diseñé cómo comunicar el proyecto a mi audiencia objetivo</li>
                          <li>✓ Establecí un timeline de publicación</li>
                        </ul>
                      </div>
                    </div>

                    {/* Bloque B: Medición de resultados */}
                    <div className="mt-8">
                      <h4 className="font-display font-bold text-[18px] sm:text-[20px] text-[#1f2937] mb-4">📊 Medición de resultados</h4>

                      <p className="font-sans font-bold text-[15px] text-[#1f2937] mb-3">⭐ North Star Metric</p>
                      <div
                        className="rounded-[16px] p-6 sm:p-8 text-center"
                        style={{ background: 'linear-gradient(135deg, #42767f, #2d5259)' }}
                      >
                        <p className="font-sans text-[17px] sm:text-[19px] font-medium text-white">Conversaciones de valor generadas por GAPING</p>
                      </div>

                      <p className="font-sans font-bold text-[15px] text-[#1f2937] mb-3 mt-6">Métricas de progreso</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-[16px] shadow-sm">
                        <div>
                          <p className="font-sans font-bold text-[14px] text-[#42767f] mb-3">Outreach</p>
                          <ul className="space-y-2 font-sans text-[15px] text-[#4b5563] leading-relaxed">
                            <li>Ratio de respuesta total</li>
                            <li>Ratio de respuesta positiva</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-sans font-bold text-[14px] text-[#42767f] mb-3">Web</p>
                          <ul className="space-y-2 font-sans text-[15px] text-[#4b5563] leading-relaxed">
                            <li>Mensajes recibidos</li>
                            <li>Recurrencia de visitantes</li>
                            <li>% de mensajes cualificados</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-sans font-bold text-[14px] text-[#42767f] mb-3">General</p>
                          <ul className="space-y-2 font-sans text-[15px] text-[#4b5563] leading-relaxed">
                            <li>Contribución por canal</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>


          {/* Final CTA */}
          <FadeInView>
            <div
              className="mt-16 sm:mt-[100px] rounded-[24px] p-8 sm:p-[60px_48px] text-center"
              style={{ background: 'linear-gradient(135deg, #42767f, #2d5259)' }}
            >
              <h2 className="font-display font-bold text-[26px] sm:text-[34px] md:text-[40px] text-white mb-4 leading-tight">
                ¿Quieres ver cómo se ejecutó?
              </h2>
              <p className="font-sans text-base sm:text-lg md:text-[20px] mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Aquí están las experiencias, aprendizajes y resultados del año
              </p>
              <Link
                to="/proyecto"
                className="inline-block bg-white font-display font-bold text-base sm:text-[18px] rounded-[12px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ color: '#42767f', padding: '14px 32px' }}
              >
                Ver Proyecto →
              </Link>
            </div>
          </FadeInView>
        </div>
      </main>
    </PageTransition>
  );
}
