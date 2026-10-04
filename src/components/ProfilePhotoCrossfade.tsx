import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import fotoAlicia from '@/assets/foto-alicia.webp';
import fotoAliciaMontana from '@/assets/foto-alicia-montana.webp';

// [imagen, duración en pantalla en ms] — la 1 se ve más tiempo que la 2
const PROFILE_PHOTOS: { src: string; duration: number }[] = [
  { src: fotoAlicia, duration: 6000 },
  { src: fotoAliciaMontana, duration: 2200 },
];

/**
 * Isolated in its own component so the every-2-6s crossfade tick only
 * re-renders this small subtree, not the whole Home page.
 */
export default function ProfilePhotoCrossfade({ className }: { className?: string }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    // Same iOS Low Power Mode caveat as other crossfades in this codebase:
    // keep the cycle running regardless of prefers-reduced-motion.
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
    <div className={className}>
      <AnimatePresence mode="wait">
        <m.img
          key={photoIndex}
          src={PROFILE_PHOTOS[photoIndex].src}
          alt="Alicia Menor"
          width={440}
          height={580}
          decoding="async"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </AnimatePresence>
    </div>
  );
}
