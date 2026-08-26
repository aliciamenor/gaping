import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Mail } from 'lucide-react';
import { useCanHover } from '@/hooks/useCanHover';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import StaggerGrid, { StaggerItem } from '@/components/StaggerGrid';
import GapingLogo from '@/components/GapingLogo';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';
import polaroid4 from '@/assets/polaroid-4.webp';
import polaroid5 from '@/assets/polaroid-5.webp';
import iconBackpack from '@/assets/icons/backpack.webp';
import iconPencil from '@/assets/icons/pencil.webp';
import iconSmiley from '@/assets/icons/smiley.webp';


const cards = [
  {
    to: '/proyecto',
    icon: iconBackpack,
    title: 'Proyecto',
    desc: 'Las experiencias y aprendizajes detrás de GAPING.',
    bg: 'linear-gradient(135deg, #f0fdf4, #d1fae5)',
    border: '#10b981',
  },
  {
    to: '/go-to-market',
    icon: iconPencil,
    title: 'Go To Market',
    desc: 'Cómo diseñé y validé GAPING como proyecto de producto',
    bg: 'linear-gradient(135deg, #e8f4f6, #c5dfe3)',
    border: '#42767f',
  },
  {
    to: '/aboutme',
    icon: iconSmiley,
    title: 'About me',
    desc: 'Mi propuesta de valor como PM y trayectoria profesional',
    bg: 'linear-gradient(135deg, #faf5ff, #e9d5ff)',
    border: '#8b5cf6',
  },
];

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

        {/* 3 Navigation Cards */}
        <section ref={cardsRef} className="py-16 md:py-[100px] px-4 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((c) => (
                <StaggerItem key={c.to}>
                  <Link
                    to={c.to}
                    className="block text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full"
                    style={{
                      background: c.bg,
                      border: `3px solid ${c.border}`,
                      borderRadius: '20px',
                      padding: '40px 32px',
                    }}
                  >
                    <img src={c.icon} alt="" className="block mx-auto h-20 w-20 object-contain mb-3" />
                    <h3 className="font-display font-bold text-[28px] text-[#1f2937]">{c.title}</h3>
                    <p className="font-sans text-base text-[#6b7280] mt-3">{c.desc}</p>
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
