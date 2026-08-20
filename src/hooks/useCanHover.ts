import { useEffect, useState } from 'react';

/**
 * True only on devices with real pointer hover (mouse/trackpad). On touch
 * devices, browsers often simulate a hover state on tap, which makes
 * whileHover-style gestures flash/glitch right as the user taps to interact.
 */
export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return canHover;
}
