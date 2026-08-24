import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { faqTeaserItems } from "@/lib/content/faq";

export function FaqTeaser() {
  return (
    <section className="border-b border-line bg-paper-alt py-16 sm:py-24">
      <div className="container-edmat grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Najczęstsze pytania" title="Zanim do nas zadzwonisz" />
          <Link
            href="/najczestsze-pytania-faq"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Zobacz pełne FAQ
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Accordion items={faqTeaserItems} defaultOpenIndex={0} />
      </div>
    </section>
  );
}
