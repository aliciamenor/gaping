import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroG1 from '@/assets/logo/hero-g1.png';
import heroA from '@/assets/logo/hero-a.png';
import heroP from '@/assets/logo/hero-p.png';
import heroI from '@/assets/logo/hero-i.png';
import heroN from '@/assets/logo/hero-n.png';
import heroG2 from '@/assets/logo/hero-g2.png';

const LETTERS = ['G', 'A', 'P', 'I', 'N', 'G'] as const;
const GLYPH_IMAGES: Partial<Record<number, string>> = { 0: heroG1, 1: heroA, 2: heroP, 3: heroI, 4: heroN, 5: heroG2 };
const AXES = [
  { letterIdx: 3, key: 'impacto', word: 'IMPACTO' },
  { letterIdx: 4, key: 'horizontes', word: 'NUEVOS HORIZONTES' },
  { letterIdx: 5, key: 'growth', word: 'GROWTH' },
] as const;

const DEEP = 'hsl(var(--brand-deep))';
const SOFT = 'hsl(var(--brand-soft))';
const CYCLE_MS = 2800;

export default function GapingLogo() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelParentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [activeAxis, setActiveAxis] = useState(0);
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [metrics, setMetrics] = useState<{ x: number; width: number; center: number } | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [labelX, setLabelX] = useState<number | null>(null);

  const shownAxis = hoveredAxis ?? activeAxis;
  const axis = AXES[shownAxis];

  useEffect(() => {
    // Note: iOS Safari reports prefers-reduced-motion as "reduce" whenever
    // Low Power Mode is on, regardless of the user's actual accessibility
    // setting (a known WebKit quirk). This cycle is a subtle color/opacity
    // fade with no parallax or large motion, so we keep it running either
    // way and only soften the transition itself when reduce is true.
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveAxis((i) => (i + 1) % AXES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const letter = letterRefs.current[axis.letterIdx];
      if (!container || !letter) return;
      const cRect = container.getBoundingClientRect();
      const lRect = letter.getBoundingClientRect();
      const w = lRect.width * 0.8;
      const x = lRect.left - cRect.left + (lRect.width - w) / 2;
      const center = lRect.left - cRect.left + lRect.width / 2;
      setMetrics({ x, width: w, center });
      setContainerWidth(cRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [axis.letterIdx]);

  // Clamp the label's horizontal position so long words (e.g. "NUEVOS HORIZONTES")
  // stay fully within the viewport instead of getting cut off at the edge.
  useLayoutEffect(() => {
    const parent = labelParentRef.current;
    const label = labelRef.current;
    if (!parent || !metrics) return;
    const margin = 12;
    const parentLeft = parent.getBoundingClientRect().left;
    const desiredCenterViewport = parentLeft + metrics.center;
    const labelWidth = label ? label.offsetWidth : 0;
    const minCenter = margin + labelWidth / 2;
    const maxCenter = window.innerWidth - margin - labelWidth / 2;
    const clampedCenterViewport = Math.min(Math.max(desiredCenterViewport, minCenter), maxCenter);
    setLabelX(clampedCenterViewport - parentLeft);
  }, [axis.key, metrics]);

  const handleLetterClick = (axisIdx: number) => {
    navigate(`/proyecto#eje-${AXES[axisIdx].key}`);
  };

  return (
    <div className="inline-flex flex-col items-center">
      <span
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredAxis(null);
        }}
        className="relative inline-block"
        aria-label="GAPING"
        style={{ color: DEEP }}
      >
        {LETTERS.map((ch, i) => {
          const axisForLetter = AXES.findIndex((a) => a.letterIdx === i);
          const isAxisLetter = axisForLetter !== -1;
          const isActive = isAxisLetter && axisForLetter === shownAxis;

          // GAP siempre en deep; ING en tono suave, activa a plena opacidad, inactiva atenuada
          const color = !isAxisLetter ? DEEP : SOFT;
          const opacity = !isAxisLetter ? 1 : isActive ? 1 : 0.35;

          const glyphSrc = GLYPH_IMAGES[i];

          return (
            <motion.span
              key={i}
              ref={(el) => (letterRefs.current[i] = el)}
              className={isAxisLetter ? 'cursor-pointer' : ''}
              onMouseEnter={isAxisLetter ? () => setHoveredAxis(axisForLetter) : undefined}
              onMouseLeave={isAxisLetter ? () => setHoveredAxis(null) : undefined}
              onClick={isAxisLetter ? () => handleLetterClick(axisForLetter) : undefined}
              animate={{ color, opacity }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ display: 'inline-block', marginRight: i < LETTERS.length - 1 ? '0.09em' : 0 }}
            >
              {glyphSrc ? (
                <img
                  src={glyphSrc}
                  alt={ch}
                  draggable={false}
                  className="inline-block select-none"
                  style={{ height: '0.72em', width: 'auto' }}
                />
              ) : (
                ch
              )}
            </motion.span>
          );
        })}
      </span>

      {/* Word slot below logo — centered under active letter; allowed to overflow logo width */}
      <div
        ref={labelParentRef}
        aria-hidden="true"
        className="relative mt-1"
        style={{ width: containerWidth || '100%', height: 22 }}
      >
        {metrics && (
          <AnimatePresence mode="wait">
            <motion.span
              key={axis.key}
              ref={labelRef}
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0, x: labelX ?? metrics.center }}
              exit={{ opacity: 0, y: reduce ? 0 : -4 }}
              transition={{
                opacity: { duration: 0.25, ease: 'easeOut' },
                y: { duration: 0.25, ease: 'easeOut' },
                x: reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 26 },
              }}
              className="font-sans uppercase absolute top-0 left-0 whitespace-nowrap -translate-x-1/2"
              style={{
                fontSize: 'clamp(11px, 2.8vw, 14px)',
                fontWeight: 500,
                letterSpacing: '0.16em',
                color: SOFT,
              }}
            >
              {axis.word}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
