import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useCanHover } from '@/hooks/useCanHover';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';
import StaggerGrid, { StaggerItem } from '@/components/StaggerGrid';
import { experiences, ejes, type Eje, type Experience } from '@/data/experiences';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import letterI from '@/assets/icons/letter-i.png';
import letterN from '@/assets/icons/letter-n.png';
import letterG from '@/assets/icons/letter-g.png';

const ejeStyles: Record<Eje, { bg: string; border: string; gradient: string }> = {
  impact: { bg: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)', border: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  horizons: { bg: 'linear-gradient(135deg, #e8f4f6 0%, #c5dfe3 100%)', border: '#42767f', gradient: 'linear-gradient(135deg, #42767f, #2f5a61)' },
  growth: { bg: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)', border: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
};

function ExperienceCard({ exp, index, onOpen }: { exp: Experience; index: number; onOpen: (id: string) => void }) {
  const colors = ejeStyles[exp.eje];
  const rotate = [-1.5, 1.5, -0.75][index % 3];
  const canHover = useCanHover();

  return (
    <motion.div
      initial={{ rotate }}
      whileHover={canHover ? { rotate: 0, scale: 1.03, zIndex: 10 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(exp.id)}
        className="group flex flex-col h-full w-full text-left bg-white shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300 p-3 pb-8"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
          style={!exp.image ? { background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}40)` } : undefined}
        >
          {exp.image && (
            <img src={exp.image} alt={exp.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
        </div>
        <div className="pt-5 text-center flex flex-col flex-1">
          <h3 className="font-display font-bold text-xl text-[#1f2937] leading-tight">{exp.skill}</h3>
          <p className="font-sans text-sm text-[#6b7280] mt-2">{exp.subtitle}</p>
        </div>
      </button>
    </motion.div>
  );
}

function ExpandedCard({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const colors = ejeStyles[exp.eje];
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={exp.skill}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative bg-white w-full max-w-[720px] max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#1f2937] hover:bg-[#f3f4f6] transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div
          className="relative aspect-[16/9] overflow-hidden flex items-center justify-center"
          style={!exp.image ? { background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}40)` } : undefined}
        >
          {exp.image && <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" />}
        </div>

        <div className="p-5 sm:p-8">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1f2937] leading-tight">{exp.skill}</h3>
          <p className="font-sans text-base text-[#6b7280] mt-1">{exp.subtitle}</p>

          {exp.contextText && (
            <div className="mt-6">
              <p className="font-sans font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: colors.border }}>Contexto</p>
              <p className="font-sans text-[15px] sm:text-base text-[#4b5563] leading-relaxed">{exp.contextText}</p>
            </div>
          )}

          {exp.preImageNote && (
            <div className="mt-5 pl-4 border-l-2" style={{ borderColor: '#e5e7eb' }}>
              <p className="font-sans text-sm text-[#1f2937] font-medium">{exp.preImageNote.highlight}</p>
              <p className="font-sans text-[13px] text-[#6b7280] leading-relaxed mt-1.5">{exp.preImageNote.description}</p>
            </div>
          )}

          {exp.description && (
            <div className="mt-6 pt-6 border-t border-[#f3f4f6]">
              <p className="font-sans font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: colors.border }}>Lo que aprendí</p>
              <p className="font-sans text-[15px] sm:text-base text-[#4b5563] leading-relaxed">{exp.description}</p>
            </div>
          )}

          {exp.externalLink && (
            <a
              href={exp.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full font-display font-bold text-sm text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ background: colors.border }}
            >
              {exp.externalLink.label}
              <span aria-hidden>↗</span>
            </a>
          )}

          {exp.instagramReel && (
            <div className="mt-6">
              <p className="font-display font-bold text-lg text-[#1f2937] mb-3">{exp.instagramReel.title}</p>
              <div className="mx-auto w-full max-w-[360px] rounded-xl overflow-hidden shadow-lg bg-black">
                <iframe
                  src={`${exp.instagramReel.url.replace(/\/$/, '')}/embed/captioned`}
                  title={exp.instagramReel.title}
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  className="w-full h-[600px] border-0"
                />
              </div>
            </div>
          )}

          {exp.videoUrl && (
            <div className="mt-6 aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={exp.videoUrl.replace('watch?v=', 'embed/')}
                title={exp.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const letterImgByEje: Record<Eje, string> = {
  impact: letterI,
  horizons: letterN,
  growth: letterG,
};

function EjeColumn({ id, eje }: { id: Eje; eje: typeof ejes.impact }) {
  const styles = ejeStyles[id];
  const letterImg = letterImgByEje[id];
  return (
    <FadeInView>
      <section
        className="relative rounded-xl sm:rounded-3xl p-2 sm:p-5 md:p-8 pt-0 sm:pt-0 md:pt-0 h-full flex flex-col overflow-visible"
        style={{ background: styles.bg, border: `2px solid ${styles.border}` }}
      >
        <div className="text-center mb-1.5 sm:mb-4 relative z-10">
          <img
            src={letterImg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none mx-auto w-[36px] sm:w-[64px] md:w-[96px] h-auto -mt-4 sm:-mt-8 md:-mt-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
          />
          <h3 className="font-display font-bold text-[10px] sm:text-lg md:text-3xl text-[#1f2937] mt-1 sm:mt-3 mb-1 sm:mb-3 leading-tight">{eje.name.toUpperCase()}</h3>
          <p className="font-sans text-[8.5px] sm:text-xs md:text-base leading-snug sm:leading-relaxed text-[#4b5563]">{eje.objective}</p>
        </div>
        <Accordion type="multiple" className="w-full mt-auto relative z-10">
          <AccordionItem value="acciones" className="border-b-0">
            <AccordionTrigger className="font-display font-bold text-[9px] sm:text-sm md:text-lg text-[#1f2937] hover:no-underline py-2 sm:py-4">Acciones clave</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 sm:space-y-2">
                {eje.actions.map((a, i) => (
                  <li key={i} className="font-sans text-[8.5px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-[#1f2937] flex items-start gap-1.5 sm:gap-2">
                    <span className="mt-0.5">•</span>{a}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="aprendizajes" className="border-b-0">
            <AccordionTrigger className="font-display font-bold text-[9px] sm:text-sm md:text-lg text-[#1f2937] hover:no-underline py-2 sm:py-4">Aprendizajes clave</AccordionTrigger>
            <AccordionContent>
              <div className="bg-white/80 p-2 sm:p-4 rounded-lg sm:rounded-xl">
                <ul className="space-y-1.5 sm:space-y-2">
                  {eje.learnings.map((l, i) => (
                    <li key={i} className="font-sans text-[8.5px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-[#1f2937] flex items-start gap-1.5 sm:gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </FadeInView>
  );
}

export default function Projects() {
  usePageMeta('Proyecto', 'GAPING como case study de producto');
  const [openId, setOpenId] = useState<string | null>(null);
  const openExp = experiences.find((e) => e.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openId]);

  return (
    <PageTransition>
      <main className="py-16 sm:py-20 px-5 sm:px-4 bg-background overflow-x-hidden">
        {/* Hero */}
        <div className="max-w-[1000px] mx-auto text-center mb-12">
          <FadeInView>
            <h1 className="font-display font-bold text-[36px] sm:text-[56px] md:text-[64px] tracking-tight sm:tracking-normal leading-[1.05]" style={{ color: '#42767f' }}>Proyecto</h1>
            <BrushUnderline className="mx-auto mt-4" />
            <p className="font-sans text-base sm:text-lg md:text-[22px] text-[#6b7280] mt-5 sm:mt-6">GAPING como case study de producto</p>
          </FadeInView>
          <FadeInView>
            <div className="max-w-[850px] mx-auto text-left mt-8 sm:mt-10 space-y-5">
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                <span className="font-bold" style={{ color: '#42767f' }}>GAP + ING</span>: el hueco en el CV convertido en movimiento. Diseñé este año como el espacio para mejorar mis soft skills y mi empleabilidad futura como Product Manager.
              </p>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                Diseñé un experimento: vivir experiencias distintas fuera de la oficina, filtradas siempre por el mismo framework de decisión.
              </p>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                Pero antes de vivir cada experiencia, había un proceso mínimo. Investigaba: entrevistas informales con conocidos, conocidos de conocidos y contactos vía outreach en LinkedIn, para entender de verdad qué implicaba cada opción antes de comprometerme.
              </p>
              <p className="font-sans text-base sm:text-lg leading-[1.8] text-[#4b5563]">
                Al no tener tiempo ni dinero infinito, tenía que priorizar entre muchas posibilidades y gestionar mis propias expectativas sobre lo que cada experiencia podía darme realmente. Y, sobre todo, iterar: cada error se convertía en un ajuste para la siguiente experiencia.
              </p>
            </div>
          </FadeInView>
        </div>

        {/* Framework */}
        <section className="max-w-[1400px] mx-auto mt-16 sm:mt-20">
          <FadeInView className="text-center mb-10 sm:mb-12">
            <h2 className="font-display font-bold text-[24px] sm:text-[32px] md:text-[40px] leading-tight" style={{ color: '#42767f' }}>El framework de decisión</h2>
          </FadeInView>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-6 items-stretch">
            <EjeColumn id="impact" eje={ejes.impact} />
            <EjeColumn id="horizons" eje={ejes.horizons} />
            <EjeColumn id="growth" eje={ejes.growth} />
          </div>
        </section>

        {/* Iteraciones */}
        <section className="max-w-[1200px] mx-auto mt-20 sm:mt-24">
          <FadeInView className="text-center mb-6">
            <h2 className="font-display font-bold text-[24px] sm:text-[32px] md:text-[40px] leading-tight" style={{ color: '#42767f' }}>
              Principales <span className="line-through font-normal text-[#9ca3af]">features</span> skills desarrolladas
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#6b7280] mt-5 sm:mt-6">Cada experiencia fue una iteración del proyecto</p>
          </FadeInView>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-10">
            {experiences.map((exp, i) => (
              <StaggerItem key={exp.id} className="h-full">
                <ExperienceCard exp={exp} index={i} onOpen={setOpenId} />
              </StaggerItem>
            ))}
          </StaggerGrid>

          <AnimatePresence>
            {openExp && <ExpandedCard exp={openExp} onClose={() => setOpenId(null)} />}
          </AnimatePresence>
        </section>
      </main>
    </PageTransition>
  );
}
