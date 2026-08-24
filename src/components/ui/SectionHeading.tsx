export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "paper";
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const descColor = tone === "paper" ? "text-paper/75" : "text-ink-soft";
  const eyebrowColor = tone === "paper" ? "text-accent" : "text-accent";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl sm:text-4xl">{title}</h2>
      {description && <p className={`text-balance text-lg leading-relaxed ${descColor}`}>{description}</p>}
    </div>
  );
}
