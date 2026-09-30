import { useEffect, useState } from 'react';

/**
 * Shared index/prev/next state for a carousel, with optional auto-advance
 * (paused via `setPaused`, e.g. on mouse enter). Kept separate from the
 * carousel's own content rendering so different pages can render their
 * items however they need while sharing the same navigation mechanics.
 */
export function useCarousel(length: number, autoAdvanceMs?: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoAdvanceMs || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [paused, length, autoAdvanceMs]);

  const goPrev = () => setIndex((i) => (i - 1 + length) % length);
  const goNext = () => setIndex((i) => (i + 1) % length);

  return { index, setIndex, goPrev, goNext, setPaused };
}
