import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-edmat">
        <SectionHeading eyebrow="Opinie klientów" title="Co mówią o nas klienci" />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal as="figure" key={testimonial.author} delay={staggerDelay(index)} className="border border-line bg-white p-8">
              <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
                „{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-soft">
                <span className="font-medium text-ink">{testimonial.author}</span>, {testimonial.location}
                <span className="mx-1.5">·</span>
                {testimonial.context}
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-faint">Opinie z archiwum EDMAT.</p>
      </div>
    </section>
  );
}
