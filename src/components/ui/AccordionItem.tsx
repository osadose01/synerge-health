"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const triggerId = `${panelId}-trigger`;

  return (
    <div className="last:border-none border-b border-[rgba(43,224,176,0.08)]">
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left hover:bg-[rgba(43,224,176,0.03)] transition-colors group"
      >
        <span className="font-display font-semibold text-sm md:text-base text-[#F2F6F4] group-hover:text-[#2BE0B0] transition-colors">
          {question}
        </span>
        <div
          className={cn(
            "w-7 h-7 rounded-full border border-[rgba(43,224,176,0.15)] flex items-center justify-center text-[#8FA39A] transition-all duration-200 shrink-0",
            isOpen && "rotate-180 bg-[rgba(43,224,176,0.12)] text-[#2BE0B0] border-[#2BE0B0]"
          )}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>
      <div
        id={panelId}
        hidden={!isOpen}
        role="region"
        aria-labelledby={triggerId}
        className="px-8 pb-6 text-sm text-[#8FA39A] leading-[1.8] max-w-2xl"
      >
          {answer}
      </div>
    </div>
  );
}
