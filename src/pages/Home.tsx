import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCanHover } from '@/hooks/useCanHover';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';
import StaggerGrid, { StaggerItem } from '@/components/StaggerGrid';
import GapingLogo from '@/components/GapingLogo';
import { experiences } from '@/data/experiences';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';
import polaroid4 from '@/assets/polaroid-4.webp';
import polaroid5 from '@/assets/polaroid-5.webp';
import iconBackpack from '@/assets/icons/backpack.webp';
import iconPencil from '@/assets/icons/pencil.webp';
import iconSmiley from '@/assets/icons/smiley.webp';
import aliciaCutout from '@/assets/alicia-cutout.webp';
import letterI from '@/assets/icons/letter-i.png';
import letterN from '@/assets/icons/letter-n.png';
import letterG from '@/assets/icons/letter-g.png';


const cards = [
  {
    to: '/proyecto',
    icon: iconBackpack,
    title: 'Proyecto',
    desc: 'Las experiencias y aprendizajes detrás de GAPING.',
  },
  {
    to: '/go-to-market',
    icon: iconPencil,
    title: 'Go To Market',
    desc: 'Cómo diseñé y validé GAPING como proyecto de producto',
  },
  {
    to: '/aboutme',
    icon: iconSmiley,
    title: 'About me',
    desc: 'Mi propuesta de valor como PM y trayectoria profesional',
  },
];

// Filtro I · Nuevos Horizontes · Growth — mismo trío de colores que el
// resto del sitio usa para los "ejes" (ver ejeStyles en Projects.tsx).
const filters = [
  { letter: letterI, label: 'Impacto', desc: '¿Aporta algo a alguien más, no solo a mí?', color: '#10b981' },
  { letter: letterN, label: 'Nuevos Horizontes', desc: '¿Me saca de un contexto que ya domino?', color: '#42767f' },
  { letter: letterG, label: 'Growth', desc: '¿Voy a saber o poder hacer algo que antes no?', color: '#8b5cf6' },
];

// 3 skills reales, tomadas de src/data/experiences.ts (la misma fuente que
// usa /proyecto) — no una lista aparte que se pueda desincronizar.
const featuredSkillIds = ['cink-venturing', 'somostalita', 'voluntariado-lituania'];
const featuredSkills = featuredSkillIds
  .map((id) => experiences.find((exp) => exp.id === id))
  .filter((exp): exp is (typeof experiences)[number] => Boolean(exp));

export default function Home() {
  const cardsRef = useRef<HTMLElement>(null);
  const canHover = useCanHover();

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="relative min-h-[calc(100svh-4rem)] flex flex-col items-center justify-center py-16 px-5 sm:px-4 text-center overflow-hidden bg-background">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 sm:mb-6"
          >
            <p className="font-display font-medium text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-[#1f2937]">Alicia Menor · Product Manager</p>
            <p className="font-sans text-[13px] sm:text-sm text-muted-foreground mt-1.5">Conecto negocio, usuario y tecnología para crear impacto.</p>
          </motion.div>

          <div className="flex justify-center items-center mb-3 sm:mb-4 gap-2 md:gap-4 flex-wrap">
            {[
              { src: polaroid1, rotate: -4 },
              { src: polaroid2, rotate: 2 },
              { src: polaroid3, rotate: -2 },
              { src: polaroid4, rotate: 3 },
              { src: polaroid5, rotate: -3 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ rotate: p.rotate }}
                whileHover={canHover ? { scale: 1.4, rotate: 0, zIndex: 30 } : undefined}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-background p-1.5 pb-3 shadow-md w-[60px] sm:w-[74px] md:w-[90px] relative cursor-pointer"
              >
                <img
                  src={p.src}
                  alt="Gap year"
                  width={90}
                  height={90}
                  decoding="async"
                  {...(i === 0 ? { fetchpriority: 'high' as const } : {})}
                  className="w-full h-[60px] sm:h-[74px] md:h-[90px] object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-[1100px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display font-bold text-[64px] sm:text-[104px] md:text-[152px] lg:text-[196px] leading-[0.85] tracking-[2px] sm:tracking-[4px] md:tracking-[6px]"
            >
              <GapingLogo />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 sm:mt-8 max-w-[500px] mx-auto"
            >
              <p className="font-sans text-sm sm:text-base leading-[1.6] text-muted-foreground">
                Un año fuera de la oficina, documentado como un case study de producto.
              </p>
              <div className="mt-5 flex flex-col items-center gap-1.5">
                <div className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5" style={{ color: '#42767f' }}>
                  <span>Diseñé</span>
                  <span style={{ color: '#b8d4d8' }}>·</span>
                  <span>Validé</span>
                  <span style={{ color: '#b8d4d8' }}>·</span>
                  <span>Lancé</span>
                </div>
                <p className="font-sans text-sm sm:text-base italic text-muted-foreground">El producto era yo.</p>
              </div>
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={() => cardsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0, x: '-50%' }}
            animate={{ opacity: 1, x: '-50%', y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.3, duration: 0.6 }, y: { delay: 1.3, repeat: Infinity, duration: 1.6, ease: 'easeInOut' } }}
            whileHover={{ scale: 1.15 }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 text-muted-foreground hover:text-[#42767f] transition-colors cursor-pointer"
            aria-label="Ver más contenido"
          >
            <ChevronDown size={28} />
          </motion.button>
        </section>

        {/* ¿Qué pasa cuando tratas tu propia vida como un producto? */}
        <section className="py-16 md:py-[100px] px-5 sm:px-4 bg-background overflow-x-hidden">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
            <FadeInView className="flex justify-center md:flex-[0_0_300px]">
              <img
                src={aliciaCutout}
                alt="Alicia Menor"
                width={514}
                height={881}
                className="w-[180px] sm:w-[220px] md:w-full md:max-w-[300px] h-auto drop-shadow-[0_16px_28px_rgba(31,41,55,0.18)]"
              />
            </FadeInView>

            <FadeInView className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-[26px] sm:text-[32px] md:text-[40px] leading-[1.15] text-[#1f2937] mb-4 sm:mb-5">
                ¿Qué pasa cuando tratas tu propia vida como un producto?
              </h2>

              <p className="font-sans text-[15px] sm:text-base md:text-[17px] leading-[1.65] text-[#6b7280] mb-6 sm:mb-8">
                He pasado de crear nuevas bebidas en Mahou San Miguel a crear mi propia hipótesis: un año fuera de la oficina (el GAP) para explorar, probar, aportar y aprender. Sin roadmap perfecto ni respuestas cerradas.
              </p>

              <p className="font-display font-semibold text-[11px] sm:text-[13px] uppercase tracking-[0.04em] text-[#9ca3af] mb-4 sm:mb-5">
                Un filtro, las mismas tres preguntas, antes de cada decisión:
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-7">
                {filters.map((f) => (
                  <div key={f.label} className="min-w-0">
                    <img src={f.letter} alt="" aria-hidden="true" className="h-5 sm:h-[26px] md:h-[30px] w-auto mb-0.5" />
                    <BrushUnderline color={f.color} width={34} className="block mb-1.5 sm:mb-2" />
                    <p className="font-display font-bold text-[11px] sm:text-[13px] md:text-sm text-[#1f2937] leading-tight mb-0.5 sm:mb-1">{f.label}</p>
                    <p className="font-sans text-[9.5px] sm:text-[11px] md:text-[13px] leading-snug text-[#9ca3af]">{f.desc}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans italic text-[13px] sm:text-[15px] text-[#6b7280] mb-6 sm:mb-8">
                Si no cumplía las tres a la vez, no entraba en el roadmap.
              </p>

              <p className="font-display font-bold text-[19px] sm:text-[22px] md:text-[27px] text-[#1f2937] mb-4 sm:mb-5">
                ¿Y si, en vez de features, desarrollo skills?
              </p>

              <div className="flex gap-2.5 sm:gap-4 md:gap-[26px] mb-6 sm:mb-8">
                {featuredSkills.map((exp, i) => {
                  const rotate = [-2, 1.5, -1][i % 3];
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ rotate }}
                      whileHover={canHover ? { rotate: 0, scale: 1.05, zIndex: 10 } : undefined}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative"
                    >
                      <Link
                        to={`/experiencias/${exp.id}`}
                        className="block w-[92px] sm:w-[120px] md:w-[148px] bg-white shadow-md p-1.5 sm:p-2 pb-3 sm:pb-[18px]"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          {exp.image && <img src={exp.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <p className="font-display font-bold text-[9.5px] sm:text-[11px] md:text-[13px] text-[#1f2937] text-center leading-tight mt-2 sm:mt-3">{exp.skill}</p>
                        <p className="font-sans text-[8px] sm:text-[9px] md:text-[10.5px] text-[#9ca3af] text-center mt-0.5 sm:mt-1">{exp.subtitle}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <Link
                to="/proyecto#skills"
                className="inline-flex items-center gap-2 font-display font-semibold text-sm sm:text-[15px] text-[#42767f] bg-white border-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                style={{ borderColor: '#42767f' }}
              >
                Ver todas las skills
                <ArrowRight size={16} />
              </Link>
            </FadeInView>
          </div>
        </section>

        {/* 3 Navigation Cards */}
        <section ref={cardsRef} className="py-16 md:py-[100px] px-4 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((c) => (
                <StaggerItem key={c.to}>
                  <Link
                    to={c.to}
                    className="group block text-center cursor-pointer h-full relative bg-white rounded-[20px] px-6 sm:px-8 py-9 sm:py-11 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_1px_2px_rgba(31,41,55,0.04),0_12px_28px_-10px_rgba(31,41,55,0.12)] hover:shadow-[0_1px_2px_rgba(31,41,55,0.04),0_20px_40px_-12px_rgba(31,41,55,0.18)]"
                  >
                    <ArrowUpRight size={16} className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[#9ca3af]" aria-hidden="true" />
                    <img src={c.icon} alt="" className="block mx-auto h-14 sm:h-16 w-14 sm:w-16 object-contain mb-4 sm:mb-5" />
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1f2937]">{c.title}</h3>
                    <div className="w-8 h-[3px] rounded-full mx-auto my-3 sm:my-3.5" style={{ background: '#42767f' }} />
                    <p className="font-sans text-sm sm:text-base text-[#6b7280]">{c.desc}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-[100px] px-5 sm:px-4 text-center bg-background">
          <FadeInView>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] md:text-[42px] text-[#1f2937] mb-4">¿Quieres conectar?</h2>
            <p className="font-sans text-base sm:text-lg text-[#6b7280] mb-8 sm:mb-10 max-w-[500px] mx-auto">
              Escríbeme. Me encantan los cafés (incluso si son virtuales)
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a
                href="mailto:amenorgomez@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-display font-medium text-base sm:text-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                style={{ background: '#42767f' }}
              >
                <Mail size={22} />Enviar Email
              </a>
              <a
                href="https://www.linkedin.com/in/aliciamenorgomez/"
                target="_blank"
                rel="noopener noreferrer"
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
