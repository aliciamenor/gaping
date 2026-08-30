import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { getExperienceById, experiences, type Eje } from '@/data/experiences';
import { usePageMeta } from '@/hooks/usePageMeta';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';

const accentColorByEje: Record<Eje, string> = {
  impact: '#10b981',
  horizons: '#42767f',
  growth: '#8b5cf6',
};

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const experience = id ? getExperienceById(id) : undefined;
  usePageMeta(experience?.skill, experience?.subtitle);

  if (!experience) {
    return (
      <PageTransition>
        <main className="py-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl text-[#1f2937] mb-4">Experiencia no encontrada</h1>
            <Link to="/proyecto#skills" className="font-display font-medium text-[#42767f] hover:underline">
              Volver a Proyecto
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  const accent = accentColorByEje[experience.eje];

  const currentIndex = experiences.findIndex((exp) => exp.id === experience.id);
  const prevExp = experiences[(currentIndex - 1 + experiences.length) % experiences.length];
  const nextExp = experiences[(currentIndex + 1) % experiences.length];

  return (
    <PageTransition>
      <main className="py-16 sm:py-20 px-5 sm:px-4">
        {/* Fixed close button — reads as "closing a card" (like the old
            modal) even though this is a real page, so browsing several
            skills in a row stays fast: no need to scroll back up first. */}
        <Link
          to="/proyecto#skills"
          aria-label="Cerrar y volver a las skills"
          className="fixed top-20 right-4 sm:right-6 z-40 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1f2937] hover:bg-[#f3f4f6] transition-colors"
        >
          <X size={20} />
        </Link>

        <div className="max-w-[900px] mx-auto">
          {/* Photo — polaroid treatment (white frame, slight tilt), like the
              rest of the site's photos, instead of a plain full-bleed
              banner. Leads with the real photo instead of the emoji. */}
          <FadeInView className="mb-8 sm:mb-10 flex justify-center">
            <div
              className="bg-white shadow-lg p-2.5 pb-8 sm:p-3 sm:pb-10 max-w-[420px] sm:max-w-[480px] w-full"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div
                className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
                style={!experience.image ? { background: `linear-gradient(135deg, ${accent}20, ${accent}40)` } : undefined}
              >
                {experience.image && (
                  <img src={experience.image} alt={experience.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
            </div>
          </FadeInView>

          {/* Header — no eje badge/pill on purpose. */}
          <FadeInView className="text-center mb-10 sm:mb-12">
            <p className="font-sans font-semibold text-sm uppercase tracking-wide" style={{ color: accent }}>
              Principal skill desarrollada
            </p>
            <h1 className="font-display font-bold text-[28px] sm:text-[38px] md:text-[48px] text-[#1f2937] mt-2 leading-tight">{experience.skill}</h1>
            <p className="font-sans text-lg sm:text-xl text-[#6b7280] mt-2">{experience.subtitle}</p>
          </FadeInView>

          {/* Contexto */}
          {experience.contextText && (
            <FadeInView className="mb-8 sm:mb-10">
              <p className="font-sans font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: accent }}>Contexto</p>
              <p className="font-sans text-base sm:text-lg text-[#4b5563] leading-[1.8] text-justify">{experience.contextText}</p>
            </FadeInView>
          )}

          {experience.preImageNote && (
            <FadeInView className="mb-8 sm:mb-10 pl-4 border-l-2" style={{ borderColor: '#e5e7eb' }}>
              <p className="font-sans text-base text-[#1f2937] font-medium">{experience.preImageNote.highlight}</p>
              <p className="font-sans text-sm text-[#6b7280] leading-relaxed mt-1.5 text-justify">{experience.preImageNote.description}</p>
            </FadeInView>
          )}

          {/* Lo que aprendí */}
          {experience.description && (
            <FadeInView className="mb-10 sm:mb-12 pt-6 sm:pt-8 border-t border-[#f3f4f6]">
              <p className="font-sans font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: accent }}>Lo que aprendí</p>
              <p className="font-sans text-base sm:text-lg text-[#4b5563] leading-[1.8] text-justify">{experience.description}</p>
              {experience.externalLink && (
                <a
                  href={experience.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-display font-bold text-base text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  style={{ background: accent }}
                >
                  {experience.externalLink.label}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </FadeInView>
          )}

          {/* Instagram Reel */}
          {experience.instagramReel && (
            <FadeInView className="mb-10 sm:mb-12">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1f2937] mb-6 text-center">
                {experience.instagramReel.title}
              </h2>
              <div className="mx-auto w-full max-w-[400px] rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe
                  src={`${experience.instagramReel.url.replace(/\/$/, '')}/embed/captioned`}
                  title={experience.instagramReel.title}
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  className="w-full h-[600px] sm:h-[720px] border-0"
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href={experience.instagramReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-base text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  style={{ background: accent }}
                >
                  Ver reel en Instagram <span aria-hidden>↗</span>
                </a>
              </div>
            </FadeInView>
          )}

          {/* Video */}
          {experience.videoUrl && (
            <FadeInView className="mb-10 sm:mb-12">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={experience.videoUrl.replace('watch?v=', 'embed/')}
                  title={experience.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </FadeInView>
          )}

          {/* Anterior / Siguiente — para saltar rápido entre skills sin
              volver a Proyecto cada vez. */}
          <FadeInView className="flex items-center justify-between gap-4 mt-4 mb-12 sm:mb-16 pt-6 sm:pt-8 border-t border-[#f3f4f6]">
            <Link to={`/experiencias/${prevExp.id}`} className="group flex items-center gap-2 sm:gap-3 min-w-0">
              <ArrowLeft size={18} className="shrink-0 text-[#9ca3af] group-hover:text-[#42767f] transition-colors" />
              <span className="min-w-0 text-left">
                <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-wide text-[#9ca3af]">Anterior</span>
                <span className="block font-display font-semibold text-sm sm:text-base text-[#1f2937] group-hover:text-[#42767f] transition-colors truncate">{prevExp.skill}</span>
              </span>
            </Link>
            <Link to={`/experiencias/${nextExp.id}`} className="group flex items-center gap-2 sm:gap-3 min-w-0 text-right">
              <span className="min-w-0">
                <span className="block font-sans text-[10px] sm:text-[11px] uppercase tracking-wide text-[#9ca3af]">Siguiente</span>
                <span className="block font-display font-semibold text-sm sm:text-base text-[#1f2937] group-hover:text-[#42767f] transition-colors truncate">{nextExp.skill}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-[#9ca3af] group-hover:text-[#42767f] transition-colors" />
            </Link>
          </FadeInView>
        </div>
      </main>
    </PageTransition>
  );
}
