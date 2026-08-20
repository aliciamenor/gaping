import { Linkedin, Mail } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import PageTransition from '@/components/PageTransition';
import FadeInView from '@/components/FadeInView';
import BrushUnderline from '@/components/BrushUnderline';

const openTo = [
  '☕ Tomar un café (real o virtual)',
  '💡 Charlar sobre producto, innovación y propósito',
  '🗣️ Charlas, eventos o colaboraciones',
  '🤝 Conectar con personas que también están explorando',
];

export default function Contacto() {
  usePageMeta('Contact', 'Escríbeme. Me encantan los cafés (incluso si son virtuales)');
  return (
    <PageTransition>
      <main className="py-16 sm:py-[100px] px-5 sm:px-4 overflow-x-hidden">
        <div className="max-w-[700px] mx-auto text-center">
          <FadeInView>
            <h1 className="font-display font-bold text-[30px] sm:text-[42px] md:text-[56px] mb-4 leading-tight" style={{ color: '#42767f' }}>
              ¿Quieres conectar?
            </h1>
            <BrushUnderline className="mx-auto mb-4" />
            <p className="font-sans text-base sm:text-lg md:text-xl mb-10 sm:mb-12" style={{ color: '#42767f' }}>
              Escríbeme. Me encantan los cafés (incluso si son virtuales)
            </p>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="text-left max-w-[500px] mx-auto mb-10 sm:mb-12">
              <p className="font-display font-medium text-lg sm:text-xl text-[#1f2937] mb-5 sm:mb-6">Siempre estoy abierta a:</p>
              <ul className="space-y-2 font-sans text-base sm:text-lg text-[#4b5563]" style={{ lineHeight: 1.9 }}>
                {openTo.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
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

          <FadeInView delay={0.3}>
            <div className="mt-16 sm:mt-20 text-center">
              <p className="font-sans text-xl sm:text-2xl md:text-[28px] text-[#1f2937] leading-snug">
                There is always a gap. Make it yours.
              </p>
            </div>
          </FadeInView>
        </div>
      </main>
    </PageTransition>
  );
}
