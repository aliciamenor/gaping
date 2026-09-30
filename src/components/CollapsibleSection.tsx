import { type ReactNode } from 'react';
import { useCanHover } from '@/hooks/useCanHover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * A single big collapsible section with a title bar (e.g. "Mi trayectoria",
 * "Skill Set" on the landing page). Uncontrolled — Radix tracks its own
 * open/closed state, so callers don't need a useState just to round-trip it.
 */
export default function CollapsibleSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const canHover = useCanHover();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={id} className="border-b-0">
        <AccordionTrigger
          className={`w-full flex items-center justify-between gap-3 rounded-2xl bg-[#f9fafb] px-5 sm:px-6 py-4 sm:py-5 hover:no-underline transition-colors [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 ${canHover ? 'hover:bg-[#42767f]/10' : ''}`}
          style={{ color: '#42767f' }}
        >
          <span className="font-display font-bold text-[20px] sm:text-[24px] text-[#1f2937]">{title}</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-8 sm:pt-10">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
