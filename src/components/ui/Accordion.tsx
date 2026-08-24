"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items, defaultOpenIndex }: { items: AccordionItem[]; defaultOpenIndex?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-medium text-ink sm:text-lg">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-accent transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M8 1v14M1 8h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-10"
            >
              <p className="leading-relaxed text-ink-soft">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
