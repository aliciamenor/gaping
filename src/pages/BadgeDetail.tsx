import { useParams, Link } from 'react-router-dom';
import { getBadgeById, badges } from '@/data/badges';
import { getExperiencesByBadge } from '@/data/experiences';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import StaggerGrid, { StaggerItem } from '@/components/StaggerGrid';

export default function BadgeDetail() {
  const { id } = useParams<{ id: string }>();
  const badge = id ? getBadgeById(id) : undefined;

  if (!badge) {
    return (
      <PageTransition>
        <main className="py-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl text-[#1f2937] mb-4">Insignia no encontrada</h1>
            <Link to="/insignias" className="font-display font-medium text-[#667eea] hover:underline">
              Volver a Insignias
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  const relatedExperiences = getExperiencesByBadge(badge.id);
  const relatedBadgeIds = new Set<string>();
  relatedExperiences.forEach(exp => exp.badges.forEach(bId => { if (bId !== badge.id) relatedBadgeIds.add(bId); }));
  const relatedBadges = badges.filter(b => relatedBadgeIds.has(b.id)).slice(0, 8);

  return (
    <PageTransition>
      <main className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Back */}
          <Link to="/insignias" className="inline-block font-sans font-medium text-base text-[#667eea] hover:underline mb-12">
            ← Volver a Insignias
          </Link>

          {/* Hero */}
          <FadeInView className="text-center mb-20">
            <span className="text-[80px] sm:text-[120px] md:text-[150px] block">{badge.emoji}</span>
            <h1 className="font-display font-bold text-[32px] sm:text-[48px] md:text-[64px] text-[#1f2937] mt-4 sm:mt-8 mb-4 sm:mb-8">{badge.name}</h1>
            {badge.subtitle && (
              <p className="font-sans text-lg sm:text-xl text-[#42767f] font-medium -mt-4 sm:-mt-6 mb-4 sm:mb-8">{badge.subtitle}</p>
            )}
            <p className="font-sans text-lg sm:text-[22px] text-[#4b5563] max-w-[800px] mx-auto leading-[1.8]">
              {badge.description}
            </p>
          </FadeInView>

          {/* Related Experiences */}
          <FadeInView className="mb-20">
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] md:text-[40px] text-[#1f2937] mb-10">Experiencias relacionadas</h2>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedExperiences.map((exp) => (
                <StaggerItem key={exp.id}>
                  <Link
                    to={`/experiencias/${exp.id}`}
                    className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-[40px] shrink-0">{exp.emoji}</span>
                    <div>
                      <h3 className="font-display font-medium text-xl text-[#1f2937]">{exp.skill}</h3>
                      <p className="font-sans text-sm text-[#6b7280]">{exp.subtitle}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </FadeInView>

          {/* Related Badges */}
          {relatedBadges.length > 0 && (
            <FadeInView>
              <h2 className="font-display font-bold text-[28px] sm:text-[36px] md:text-[40px] text-[#1f2937] mb-10">Insignias relacionadas</h2>
              <div className="flex flex-wrap gap-4">
                {relatedBadges.map((b) => (
                  <Link
                    key={b.id}
                    to={`/insignias/${b.id}`}
                    className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <span className="font-sans text-sm font-medium text-[#4b5563]">{b.name}</span>
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
