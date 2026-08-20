import { useParams, Link } from 'react-router-dom';
import { getExperienceById, experiences, ejes } from '@/data/experiences';
import { usePageMeta } from '@/hooks/usePageMeta';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';

const ejeBadgeStyles = {
  impact: { bg: '#f0fdf4', color: '#10b981' },
  horizons: { bg: '#e8f4f6', color: '#42767f' },
  growth: { bg: '#faf5ff', color: '#8b5cf6' },
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
            <Link to="/experiencias" className="font-display font-medium text-[#667eea] hover:underline">
              Volver a Experiencias
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  const eje = ejes[experience.eje];
  const relatedExperiences = experiences
    .filter(exp => exp.id !== experience.id && (exp.eje === experience.eje || exp.badges.some(b => experience.badges.includes(b))))
    .slice(0, 3);
  const badgeStyle = ejeBadgeStyles[experience.eje];

  return (
    <PageTransition>
      <main className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/experiencias" className="inline-block font-sans font-medium text-base text-[#667eea] hover:underline mb-12">
            ← Volver a Experiencias
          </Link>

          {/* Hero */}
          <FadeInView className="text-center mb-16">
             <span className="text-[72px] sm:text-[100px] md:text-[120px] block">{experience.emoji}</span>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide mt-4 sm:mt-6" style={{ color: badgeStyle.color }}>
              Principal skill desarrollada
            </p>
            <h1 className="font-display font-bold text-[32px] sm:text-[42px] md:text-[56px] text-[#1f2937] mt-2">{experience.skill}</h1>
            <p className="font-sans text-xl text-[#6b7280] mt-2">{experience.subtitle}</p>
            <span
              className="inline-block mt-6 px-4 py-2 rounded-full text-sm font-sans font-medium"
              style={{ background: badgeStyle.bg, color: badgeStyle.color }}
            >
              {eje.emoji} {eje.name}
            </span>
          </FadeInView>

          {/* Context text */}
          {experience.contextText && (
            <FadeInView className="mb-16">
              <p className="font-sans text-xl text-[#4b5563] leading-[1.8] max-w-[900px] italic">
                {experience.contextText}
              </p>
            </FadeInView>
          )}

          {/* What I did */}
          <FadeInView className="mb-16">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#1f2937] mb-6">¿Qué hice?</h2>
            <p className="font-sans text-xl text-[#4b5563] leading-[1.8] max-w-[900px]">
              {experience.description}
            </p>
            {experience.externalLink && (
              <a
                href={experience.externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-display font-bold text-base text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{ background: badgeStyle.color }}
              >
                {experience.externalLink.label}
                <span aria-hidden>↗</span>
              </a>
            )}
          </FadeInView>

          {/* Instagram Reel */}
          {experience.instagramReel && (
            <FadeInView className="mb-16">
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#1f2937] mb-6 text-center">
                {experience.instagramReel.title}
              </h2>
              <div className="mx-auto w-full max-w-[400px] rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe
                  src={`${experience.instagramReel.url.replace(/\/$/, '')}/embed/captioned`}
                  title={experience.instagramReel.title}
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  className="w-full h-[720px] border-0"
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href={experience.instagramReel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-base text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  style={{ background: badgeStyle.color }}
                >
                  Ver reel en Instagram <span aria-hidden>↗</span>
                </a>
              </div>
            </FadeInView>
          )}


          {/* Video */}
          {experience.videoUrl && (
            <FadeInView className="mb-16">
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

          {/* Pre-image note */}
          {experience.preImageNote && (
            <FadeInView className="mb-10 max-w-[900px] mx-auto">
              <ul className="list-disc pl-6 space-y-3">
                <li className="font-sans text-lg text-[#1f2937]">
                  <span className="font-medium">{experience.preImageNote.highlight}</span>
                  <p className="font-sans text-base text-[#6b7280] leading-[1.7] mt-2">
                    {experience.preImageNote.description}
                  </p>
                </li>
              </ul>
            </FadeInView>
          )}

          {/* Cover image */}
          {experience.image && (
            <FadeInView className="mb-16">
              <div className="rounded-2xl overflow-hidden shadow-lg max-w-[900px] mx-auto">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </FadeInView>
          )}

          {/* Related */}
          {relatedExperiences.length > 0 && (
            <FadeInView>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#1f2937] mb-4">Otras experiencias relacionadas</h2>
              <p className="font-sans text-base text-[#6b7280] mb-8">
                Si esta experiencia te resonó, también te puede interesar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedExperiences.map((exp) => (
                  <Link
                    key={exp.id}
                    to={`/experiencias/${exp.id}`}
                    className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-[40px] shrink-0">{exp.emoji}</span>
                    <div>
                      <h3 className="font-display font-medium text-lg text-[#1f2937]">{exp.skill}</h3>
                      <p className="font-sans text-sm text-[#6b7280]">{exp.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeInView>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
