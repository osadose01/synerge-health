
interface PageHeroProps {
  eyebrow: string;
  title?: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-24 border-b border-[rgba(43,224,176,0.06)] overflow-hidden">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#2BE0B0] opacity-[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-8 md:px-16">
        <p className="label-mono mb-8">{eyebrow}</p>
        {title && (
          <h1 className="font-display font-bold text-[clamp(2.2rem,5.5vw,5.5rem)] text-[#F2F6F4] leading-[1.06] tracking-tight max-w-4xl">
            {title}
          </h1>
        )}
        {description && (
          <p className="mt-8 text-base md:text-lg text-[#C2D1CB] leading-[1.75] max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
