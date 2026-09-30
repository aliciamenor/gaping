import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCanHover } from '@/hooks/useCanHover';

/**
 * One arrow button, shown only at the given breakpoint (desktop pair sits
 * beside the content, mobile pair sits beside the dots) so both carousels
 * on the site share identical sizing/behavior instead of drifting apart.
 */
export function CarouselArrowButton({
  direction,
  onClick,
  label,
  breakpoint,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
  breakpoint: 'desktop' | 'mobile';
}) {
  const canHover = useCanHover();
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`${breakpoint === 'mobile' ? 'sm:hidden' : 'hidden sm:flex'} items-center justify-center w-9 h-9 rounded-full text-[#42767f] bg-white shadow-sm transition-colors shrink-0 ${canHover ? 'hover:bg-[#42767f] hover:text-white' : ''}`}
    >
      <Icon size={18} />
    </button>
  );
}

export function CarouselDots({
  count,
  index,
  onSelect,
  getKey,
  getLabel,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  getKey: (i: number) => string;
  getLabel: (i: number) => string;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5" role="tablist">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={getKey(i)}
          type="button"
          role="tab"
          aria-selected={i === index}
          onClick={() => onSelect(i)}
          aria-label={getLabel(i)}
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: i === index ? 28 : 8, background: i === index ? '#42767f' : '#d1d5db' }}
        />
      ))}
    </div>
  );
}
