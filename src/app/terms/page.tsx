import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = {
  title: "Terms of Service",
  description: "Synerge Health website terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Legal & Governance"
          title="Terms of Service"
          description="Last updated: July 28, 2026. Guidelines governing the use of Synerge Health's website and application portals."
        />

        <section className="py-24 bg-[#060B09]">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-8 text-xs sm:text-sm text-[#8FA39A] leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-[#F2F6F4]">1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Synerge Health website and application portals, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-[#F2F6F4]">2. Founder Application Confidentiality</h3>
              <p>
                All proprietary startup ideas, business plans, and pitch materials submitted through our Founder Programme form are treated as confidential information by the Synerge Health investment committee.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-[#F2F6F4]">3. Intellectual Property</h3>
              <p>
                All trademarks, logos, copy, and code on this website are the exclusive property of Synerge Health Inc. Unauthorized reproduction or redistribution is prohibited.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
