import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Rocket } from "lucide-react";

export const metadata = {
  title: "Careers — Build With Us",
  description: "Join the Synerge Health venture studio team or our portfolio startups.",
};

export default function CareersPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Careers"
          title="Build companies that change healthcare lives."
          description="We are looking for engineers, clinicians, and operators driven by high impact and venture execution."
        />

        <section className="py-24 bg-forest-950">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-12">
            <div className="glass-card rounded-3xl p-10 border border-forest-600/50 space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-forest-800 border border-forest-600 flex items-center justify-center text-gold-400 mx-auto">
                <Rocket className="w-7 h-7" />
              </div>
              <h2 className="font-display font-bold text-3xl text-cream-50">Ecosystem Roles & EIR Positions</h2>
              <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
                Whether you want to join Synerge Health as an Executive-in-Residence (EIR) or take a founding CTO/COO role at one of our portfolio companies, we want to hear from you.
              </p>
              <div className="pt-4">
                <a
                  href="mailto:careers@synergehealth.com"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-sm transition-all"
                >
                  Send Open Application
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
