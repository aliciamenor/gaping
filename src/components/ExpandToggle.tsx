import { useCanHover } from '@/hooks/useCanHover';
import { AccordionTrigger } from '@/components/ui/accordion';

/**
 * The small pill "Ver más / Ver menos" trigger used inside a bigger card
 * (GTM steps, "Formación" extras). The label swap is driven by Radix's own
 * `data-state` via CSS (`group-data-[state=open]`), not local React state —
 * works whether the parent Accordion is controlled or uncontrolled.
 */
export default function ExpandToggle() {
  const canHover = useCanHover();
  return (
    <AccordionTrigger
      className={`group inline-flex flex-none w-auto justify-start gap-1.5 py-1.5 px-3 -ml-3 rounded-full font-display font-semibold text-[12px] hover:no-underline transition-colors [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-60 ${canHover ? 'hover:bg-[#42767f]/10' : ''}`}
      style={{ color: '#42767f' }}
    >
      <span className="group-data-[state=open]:hidden">Ver más</span>
      <span className="hidden group-data-[state=open]:inline">Ver menos</span>
    </AccordionTrigger>
  );
}
