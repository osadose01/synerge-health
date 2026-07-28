"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors group"
      >
        <span className="font-heading font-semibold text-sm md:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
          {question}
        </span>
        <div
          className={cn(
            "w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-200 shrink-0",
            isOpen && "rotate-180 bg-emerald-50 text-emerald-600 border-emerald-200"
          )}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-6 text-sm text-slate-500 leading-[1.8] max-w-2xl">
          {answer}
        </div>
      )}
    </div>
  );
}
