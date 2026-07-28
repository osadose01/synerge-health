interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-white border-b border-slate-100">
      <div className="container mx-auto px-8 md:px-16">
        <p className="label-mono mb-10">{eyebrow}</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.08] tracking-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 text-base md:text-lg text-slate-500 leading-[1.75] max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
