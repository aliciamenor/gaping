import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';
import fotoAlicia from '@/assets/foto-alicia.webp';
import fotoAliciaMontana from '@/assets/foto-alicia-montana.webp';
import logoArrow from '@/assets/icons/logo-arrow.png';

// [imagen, duración en pantalla en ms] — la 1 se ve más tiempo que la 2
const PROFILE_PHOTOS: { src: string; duration: number }[] = [
  { src: fotoAlicia, duration: 6000 },
  { src: fotoAliciaMontana, duration: 2200 },
];
import logoGeneration from '@/assets/logos/generation.png';
import logoMahou from '@/assets/logos/mahou.png';
import logoOmnicom from '@/assets/logos/omnicom.png';
import logoIpmark from '@/assets/logos/ipmark.png';
import photoMiguel from '@/assets/references/miguel.png';
import photoLourdes from '@/assets/references/lourdes.png';
import photoJulio from '@/assets/references/julio.png';

const references = [
  {
    photo: photoMiguel,
    name: 'Miguel Angel Cabrero',
    role: 'Chief Innovation Officer at Mahou San Miguel',
    quote:
      'Alicia es una profesional que destaca por su proactividad, actitud positiva y ganas de aprender. Su creatividad y visión estratégica le permiten abordar retos de manera eficaz y ofrecer soluciones innovadoras. En su paso por el equipo de Innovación de Mahou San Miguel, ha demostrado una notable capacidad para adaptarse a nuevos desafíos, colaborar de forma efectiva con los equipos y aportar valor a los proyectos.',
  },
  {
    photo: photoLourdes,
    name: 'Lourdes Cárdenes',
    role: 'Digital Innovation and Consumer Manager at Mahou San Miguel',
    quote:
      'Alicia combina en su perfil lo mejor que una joven profesional puede ofrecer, con aquello que se espera de alguien con muchos años de experiencia. Es entusiasta, curiosa y tiene muchas ganas de aprender. A mismo tiempo sabe adaptarse al entorno, con madurez y responsabilidad. Es proactiva, disfruta trabajando con otros y no se achanta ante retos complejos. Me encantaría volver a coincidir con ella.',
  },
  {
    photo: photoJulio,
    name: 'Julio Alonso López',
    role: 'Lead Innovation Manager at Mahou San Miguel',
    quote:
      'Alicia ha sido un miembro imprescindible del equipo en los proyectos en los que ha participado durante el último año. Pese a su juventud, ha demostrado una excepcional responsabilidad, adaptabilidad, iniciativa, proactividad y creatividad. Siempre ha cumplido con sus tareas a tiempo y con una calidad impecable. No solo anticipa las necesidades, sino que también propone y ejecuta estrategias innovadoras que han resultado en mejoras significativas. Estoy convencido de que será un activo extraordinario para cualquier equipo y la recomiendo sin reservas.',
  },
];


const timeline = [
  { year: '2025/2026', emoji: '🚀', title: 'Product Manager Operations & Marketing Specialist', company: 'Fundación Generation Spain (impulsada por McKinsey & Company)', desc: 'Coordinación end to end de programas formativos con seguimiento de KPIs. Definición de requisitos de producto, métricas de negocio y cierre de partnerships estratégicos para la difusión del programa.', color: '#10b981', logo: logoGeneration, highlight: false, link: null as string | null },
  { year: '2024/2025', emoji: '🧭', title: 'GAPING: Gap Year de Producto', company: '', desc: 'Diseñé y ejecuté un gap year estructurado como proyecto de producto para adquirir skills PM en contextos reales.', color: '#42767f', logo: null, highlight: true, link: '/go-to-market' as string | null },
  { year: '2023/2024', emoji: '💡', title: 'Product Manager Innovación', company: 'Mahou San Miguel', desc: 'Responsable end to end del crecimiento de Grifo Mahou en Casa (ecommerce): producto, UX, operaciones y comunicación. Definición de objetivos de negocio, KRs y roadmap. Gestión de stakeholders internos y 25 partners técnicos. Participación en la Innovation Community con Design Thinking y Lean Startup.', color: '#42767f', logo: logoMahou, highlight: false, link: null },
  { year: '2022', emoji: '📢', title: 'Digital Communication Junior', company: 'Omnicom PR Group', desc: 'Materiales de prensa en contextos de crisis corporativa y lanzamientos de producto (Bimbo, Decathlon). Monitorización de cobertura y reporting de impacto reputacional.', color: '#8b5cf6', logo: logoOmnicom, highlight: false, link: null },
  { year: '2021', emoji: '📝', title: 'Marketing Junior', company: 'IPMARK, DARetail & Best!N Awards', desc: 'Organización de eventos B2B presenciales y webinars. Campañas de email marketing y contenido digital.', color: '#f59e0b', logo: logoIpmark, highlight: false, link: null },
];

const emprendimiento = [
  { title: '2ª posición Hackathon Producto + IA de Cabify', sub: 'Patrocinado por Lovable y ElevenLabs · 2026' },
  { title: 'MVP validado en incubadora Cink Venturing', sub: 'Tras ganar el Hackathon NoCode4Culture · 2025' },
  { title: 'Programa de Innovación Social BYG', sub: '1 de 60 seleccionados entre +1.100 candidaturas · Fundación LQDVI · 2023' },
  { title: 'Proyecto ganador de emprendimiento social', sub: 'Seleccionado por Open Value Foundation, UFV · 2025' },
];

const voluntariado = [
  { title: 'Asociación SOMOSTALITA', sub: 'Consultoría pro bono de marketing y estrategia · 2024/2025' },
  { title: 'European Solidarity Corps', sub: 'Voluntariado internacional en coordinación de proyectos, Lituania · 2024' },
  { title: 'Consejo LQDVI Youth', sub: 'Miembro del consejo de jóvenes de Fundación Lo que de Verdad Importa · 2023/actual' },
  { title: 'The Missionaries of Charity Sisters', sub: 'Coordinación de campamento infantil de verano, Edimburgo · 2019' },
];

const formacion = [
  { title: 'Doble Grado Publicidad + Marketing', inst: 'ESIC University', detail: '2018/2023 · Premio Excelencia · Nota media 9/10' },
  { title: 'Erasmus+', inst: 'Vern University, Zagreb', detail: '2021/2022' },
  { title: 'Transformación Digital', inst: 'ESDEN Business School', detail: '2025' },
  { title: 'Liderazgo Social', inst: 'Universidad Francisco de Vitoria', detail: '2025' },
];

const threeWords = ['Curiosa', 'Conectora', 'Resolutiva'];

const howIWork = [
  { emoji: '🎯', text: 'Priorizo por impacto en usuario y negocio, no por quien grita más alto.' },
  { emoji: '🔍', text: 'El dato está en todo el proceso: valido antes de construir, priorizo con él, y mido después de lanzar.' },
  { emoji: '🤝', text: 'Hago que gente que no habla el mismo idioma (técnico, legal, diseño, desarrollo, proveedores) reme junta.' },
];

const hardSkills = ['GTM & Launch', 'Product Backlog', 'User Research', 'Stakeholder Management', 'Data & KPIs', 'Ecommerce'];
const tools = ['Notion', 'Figma', 'Miro', 'Shopify', 'Power BI', 'Google Analytics', 'Jira', 'Canva'];

function Pill({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-full font-sans font-medium text-sm bg-[#f3f4f6] text-[#1f2937] hover:bg-[#42767f] hover:text-white transition-colors duration-300 cursor-default">
      {label}
    </span>
  );
}

function ReferencesCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % references.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  const goPrev = () => setIndex((i) => (i - 1 + references.length) % references.length);
  const goNext = () => setIndex((i) => (i + 1) % references.length);
  const r = references[index];

  return (
    <div
      className="mb-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-stretch gap-2 sm:gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Referencia anterior"
          className="hidden sm:flex items-center justify-center w-10 h-auto rounded-xl text-[#42767f] bg-white shadow-sm hover:bg-[#42767f] hover:text-white transition-colors duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="relative flex-1 min-h-[320px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-6 items-start"
            >
              <img
                src={r.photo}
                alt={r.name}
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="w-[96px] h-[96px] rounded-full object-cover mx-auto sm:mx-0"
              />
              <div>
                <blockquote className="font-sans text-base sm:text-lg text-[#4b5563] leading-relaxed italic">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-display font-bold text-[#1f2937]">{r.name}</p>
                  <p className="font-sans text-sm" style={{ color: '#42767f' }}>{r.role}</p>
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Siguiente referencia"
          className="hidden sm:flex items-center justify-center w-10 h-auto rounded-xl text-[#42767f] bg-white shadow-sm hover:bg-[#42767f] hover:text-white transition-colors duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-5" role="tablist" aria-label="Referencias">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Referencia anterior"
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#42767f] bg-white shadow-sm hover:bg-[#42767f] hover:text-white transition-colors duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {references.map((ref, i) => (
          <button
            key={ref.name}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ver referencia de ${ref.name}`}
            onClick={() => setIndex(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 28 : 8,
              background: i === index ? '#42767f' : '#d1d5db',
            }}
          />
        ))}

        <button
          type="button"
          onClick={goNext}
          aria-label="Siguiente referencia"
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#42767f] bg-white shadow-sm hover:bg-[#42767f] hover:text-white transition-colors duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default function WhoIAm() {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let id: number;
    const schedule = () => {
      id = window.setTimeout(() => {
        setPhotoIndex((i) => (i + 1) % PROFILE_PHOTOS.length);
      }, PROFILE_PHOTOS[photoIndex].duration);
    };
    schedule();
    return () => window.clearTimeout(id);
  }, [photoIndex]);

  return (
    <PageTransition>
      <main className="py-16 sm:py-20 px-5 sm:px-4 bg-background overflow-x-hidden">
        <div className="max-w-[1000px] mx-auto">
          {/* Hero */}
          <FadeInView className="text-center mb-12 sm:mb-16">
            <h1 className="font-display font-bold text-[36px] sm:text-[56px] md:text-[64px] tracking-tight sm:tracking-normal" style={{ color: '#42767f' }}>About me</h1>
            <BrushUnderline className="mx-auto mt-4" />
          </FadeInView>

          {/* Propuesta de valor */}
          <FadeInView>
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[380px_1fr] gap-8 md:gap-10 items-center mb-16 sm:mb-20">
              <div className="mx-auto md:mx-0">
                <div className="relative w-[280px] h-[368px] sm:w-[340px] sm:h-[446px] md:w-[380px] md:h-[500px] rounded-2xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={photoIndex}
                      src={PROFILE_PHOTOS[photoIndex].src}
                      alt="Alicia Menor"
                      width={600}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>
                </div>
              </div>
              <div className="text-center md:text-left min-w-0">
                <h2 className="font-display font-bold text-[24px] sm:text-[32px] md:text-[36px] text-[#1f2937] mb-4 sm:mb-6 leading-tight">Soy Alicia Menor Gómez</h2>
                <p className="font-sans text-base sm:text-lg md:text-[22px] leading-[1.75] text-[#4b5563]">
                  Conecto negocio, usuario y tecnología para construir productos con impacto. De discovery a delivery.
                </p>
              </div>
            </div>
          </FadeInView>

          {/* Sobre mí — narrativa personal */}
          <FadeInView>
            <div className="max-w-[800px] mx-auto text-center mb-16 sm:mb-20">
              <p className="font-display font-bold text-[22px] sm:text-[28px] text-[#1f2937] leading-snug">
                Soy Alicia. Si me pides tres palabras:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-6">
                {threeWords.map((w) => (
                  <span
                    key={w}
                    className="px-5 py-2 rounded-full font-display font-bold text-sm sm:text-base text-white"
                    style={{ background: '#42767f' }}
                  >
                    {w}
                  </span>
                ))}
              </div>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563] text-left sm:text-center">
                Empecé en marketing porque no entendía por qué toda mi clase quería un iPhone, cuando había móviles mejores y más baratos. Esa curiosidad de por qué nos enamora una marca me llevó a otra pregunta: qué hace que compremos un producto. Ahí encontré mi camino.
              </p>
            </div>
          </FadeInView>

          {/* Cómo trabajo */}
          <FadeInView>
            <div className="max-w-[900px] mx-auto mb-16 sm:mb-20">
              <h2 className="font-display font-bold text-[24px] sm:text-[28px] text-[#1f2937] mb-6 text-center sm:text-left">Cómo trabajo</h2>
              <div className="flex flex-col gap-4">
                {howIWork.map((item) => (
                  <div key={item.text} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm">
                    <span className="text-[28px] shrink-0 leading-none">{item.emoji}</span>
                    <p className="font-sans text-[15px] sm:text-base text-[#4b5563] leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>

          {/* Visión de producto */}
          <FadeInView>
            <div
              className="max-w-[900px] mx-auto mb-16 sm:mb-20 rounded-2xl p-6 sm:p-8"
              style={{ background: 'linear-gradient(135deg, rgba(66,118,127,0.08), rgba(66,118,127,0.02))' }}
            >
              <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-[#1f2937] mb-3">Mi visión de producto</h2>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                Creo en el <span className="font-semibold" style={{ color: '#42767f' }}>doble impacto</span>: que un producto haga crecer el negocio y, a la vez, mejore aunque sea un poco la vida de quien lo usa o el mundo que le rodea. Para mí van juntos.
              </p>
            </div>
          </FadeInView>

          {/* Hobby favorito */}
          <FadeInView>
            <div className="max-w-[900px] mx-auto mb-16 sm:mb-20">
              <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-[#1f2937] mb-3">¿Cuál es mi hobby favorito?</h2>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                Viajar y aprender de otras personas (entender cómo vive y piensa alguien distinto a ti, conocer la historia que hay detrás de cada uno) es probablemente mi mayor fuente de aprendizaje. Viva el <span className="italic">life research</span>.
              </p>
              <blockquote
                className="mt-6 pl-5 sm:pl-6 py-1 font-sans text-base sm:text-lg italic text-[#1f2937]"
              >
                "Conoce el mundo para conocerte a ti, y conoce a la gente para ser más gente."
                <footer className="mt-2 font-sans not-italic text-sm text-[#6b7280]">Un hombre que conocí en un avión</footer>
              </blockquote>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563] mt-4">
                Llevo aplicándolo desde entonces.
              </p>
            </div>
          </FadeInView>

          {/* Cierre */}
          <FadeInView>
            <p className="max-w-[700px] mx-auto text-center font-sans text-base sm:text-lg italic text-[#6b7280] mb-20 sm:mb-24">
              Como cualquier buen producto, sigo iterando y me quedan muchas versiones mejoradas por delante. Y más ahora que la IA nos amplifica
              <img src={logoArrow} alt="" aria-hidden="true" className="inline-block h-[18px] sm:h-[20px] w-auto align-middle ml-2" />
            </p>
          </FadeInView>

          {/* Experiencia + Formación */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 mb-20 sm:mb-24">
            <div>
              <FadeInView>
                <h2 className="font-display font-bold text-[26px] sm:text-[40px] text-[#1f2937] mb-8 sm:mb-10 leading-tight">Experiencia</h2>
              </FadeInView>

              <div className="relative pl-[72px] sm:pl-[112px]">
                {/* Vertical line, centered under markers */}
                <div className="absolute top-0 bottom-0 left-[26px] sm:left-[42px] w-[3px] bg-[#e5e7eb]" aria-hidden />
                {timeline.map((t) => (
                  <FadeInView key={t.title}>
                    <div className="relative pb-10 sm:pb-12 min-w-0">
                      {t.logo ? (
                        <span
                          className="absolute left-[-72px] sm:left-[-112px] top-0 w-[56px] h-[56px] sm:w-[88px] sm:h-[88px] rounded-full bg-white flex items-center justify-center overflow-hidden"
                          style={{ boxShadow: '0 0 0 4px white, 0 2px 8px rgba(0,0,0,0.08)' }}
                        >
                          <img
                            src={t.logo}
                            alt={t.company}
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            className="w-[40px] h-[40px] sm:w-[64px] sm:h-[64px] object-contain"
                          />
                        </span>
                      ) : (
                        <span
                          className="absolute left-[-72px] sm:left-[-112px] top-0 w-[56px] h-[56px] sm:w-[88px] sm:h-[88px] rounded-full flex items-center justify-center text-white text-[22px] sm:text-[32px]"
                          style={{ background: t.color, boxShadow: '0 0 0 4px white, 0 0 0 8px rgba(66,118,127,0.15)' }}
                        >
                          {t.emoji}
                        </span>
                      )}
                      {t.highlight ? (
                        <div
                          className="rounded-2xl p-5 sm:p-6"
                          style={{
                            background: 'linear-gradient(135deg, rgba(66,118,127,0.08), rgba(66,118,127,0.02))',
                            border: '1.5px solid rgba(66,118,127,0.35)',
                          }}
                        >
                          <p className="font-sans font-bold text-xs sm:text-sm text-[#6b7280]">{t.year}</p>
                          <h3 className="font-display font-bold text-[18px] sm:text-[22px] text-[#1f2937] mt-1 leading-tight break-words">{t.title}</h3>
                          <p className="font-sans text-[15px] sm:text-base text-[#4b5563] mt-2 leading-relaxed break-words">{t.desc}</p>
                          {t.link && (
                            <Link
                              to={t.link}
                              className="inline-flex items-center gap-1 mt-4 font-display font-medium text-sm sm:text-base hover:underline"
                              style={{ color: '#42767f' }}
                            >
                              Ver el proyecto completo →
                            </Link>
                          )}
                        </div>
                      ) : (
                        <>
                          <p className="font-sans font-bold text-xs sm:text-sm text-[#6b7280]">{t.year}</p>
                          <h3 className="font-display font-bold text-[18px] sm:text-[22px] text-[#1f2937] mt-1 leading-tight break-words">{t.title}</h3>
                          {t.company && <p className="font-sans font-medium text-xs sm:text-sm mt-1 italic text-[#42767f] break-words">{t.company}</p>}
                          <p className="font-sans text-[15px] sm:text-base text-[#4b5563] mt-2 leading-relaxed break-words">{t.desc}</p>
                        </>
                      )}
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>

            <div>
              <FadeInView>
                <h2 className="font-display font-bold text-[26px] sm:text-[40px] text-[#1f2937] mb-8 sm:mb-10 leading-tight">Formación</h2>
              </FadeInView>
              <div className="relative pl-[28px]">
                <div className="absolute top-0 bottom-0 left-[5px] w-[3px] bg-[#e5e7eb]" aria-hidden />
                {formacion.map((f) => (
                  <FadeInView key={f.title}>
                    <div className="relative pb-8">
                      <span
                        className="absolute left-[-28px] top-[6px] w-[13px] h-[13px] rounded-full"
                        style={{ background: '#42767f', boxShadow: '0 0 0 4px white' }}
                        aria-hidden
                      />
                      <h3 className="font-display font-bold text-lg text-[#1f2937]">{f.title}</h3>
                      <p className="font-sans text-sm mt-1" style={{ color: '#42767f' }}>{f.inst}</p>
                      <p className="font-sans text-sm text-[#6b7280] mt-1">{f.detail}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>

          {/* Experiencia adicional */}
          <FadeInView>
            <h2 className="font-display font-bold text-[28px] sm:text-[32px] text-[#1f2937] mb-8">Experiencia adicional</h2>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            <div>
              <h3 className="font-display font-bold text-[22px] mb-5" style={{ color: '#42767f' }}>🚀 Emprendimiento e Innovación</h3>
              <div className="flex flex-col gap-3">
                {emprendimiento.map((item) => (
                  <FadeInView key={item.title}>
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <p className="font-display font-bold text-base text-[#1f2937]">{item.title}</p>
                      <p className="font-sans text-sm text-[#6b7280] mt-1">{item.sub}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-[22px] mb-5" style={{ color: '#10b981' }}>❤️ Voluntariado</h3>
              <div className="flex flex-col gap-3">
                {voluntariado.map((item) => (
                  <FadeInView key={item.title}>
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                      <p className="font-display font-bold text-base text-[#1f2937]">{item.title}</p>
                      <p className="font-sans text-sm text-[#6b7280] mt-1">{item.sub}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <FadeInView>
            <h2 className="font-display font-bold text-[28px] sm:text-[32px] text-[#1f2937] mb-8">Skills de Producto</h2>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="font-display font-bold text-lg text-[#42767f] mb-4">Hard Skills</h3>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((s) => <Pill key={s} label={s} />)}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#42767f] mb-4">Herramientas</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((s) => <Pill key={s} label={s} />)}
              </div>
            </div>
          </div>

          {/* Referencias */}
          <FadeInView>
            <h2 className="font-display font-bold text-[28px] sm:text-[32px] text-[#1f2937] mb-2">Referencias</h2>
            <p className="font-sans text-base text-[#6b7280] mb-8">Lo que dicen quienes han trabajado conmigo</p>
          </FadeInView>
          <ReferencesCarousel />

          <FadeInView>
            <div className="text-center mb-16">
              <a
                href="https://www.linkedin.com/in/aliciamenorgomez/details/recommendations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-medium text-base hover:underline"
                style={{ color: '#42767f' }}
              >
                Ver todas las recomendaciones en LinkedIn →
              </a>
            </div>
          </FadeInView>

          {/* CV button */}
          <FadeInView>
            <div className="text-center mt-12">
              <a
                href="#"
                className="inline-block text-white font-display font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-300"
                style={{ background: '#42767f', padding: '16px 48px' }}
              >
                📄 Descargar CV completo
              </a>
            </div>
          </FadeInView>
        </div>
      </main>
    </PageTransition>
  );
}
