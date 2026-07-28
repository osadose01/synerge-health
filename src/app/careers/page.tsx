import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Rocket } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";

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

        <section className="py-24 bg-[#060B09]">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-12">
            <div className="rounded-3xl p-10 bg-[#0D1815] border border-[rgba(43,224,176,0.15)] space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[rgba(43,224,176,0.1)] border border-[#2BE0B0] flex items-center justify-center text-[#2BE0B0] mx-auto">
                <Rocket className="w-7 h-7" />
              </div>
              <h2 className="font-display font-bold text-3xl text-[#F2F6F4]">Ecosystem Roles & EIR Positions</h2>
              <p className="text-[#8FA39A] text-sm max-w-lg mx-auto leading-relaxed">
                Whether you want to join Synerge Health as an Executive-in-Residence (EIR) or take a founding CTO/COO role at one of our portfolio companies, we want to hear from you.
              </p>
              <div className="pt-4">
                <MagneticButton className="inline-block">
                  <a
                    href="mailto:careers@synergehealth.com"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] hover:bg-[#E3A83B]/90 text-[#060B09] font-mono font-bold tracking-[0.1em] uppercase text-xs transition-all cursor-none hover:shadow-[0_0_30px_rgba(227,168,59,0.4)]"
                  >
                    <TextScramble text="SEND OPEN APPLICATION" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

