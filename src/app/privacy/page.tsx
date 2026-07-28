import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = {
  title: "Privacy Policy",
  description: "Synerge Health privacy policy and data governance.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Legal & Data Governance"
          title="Privacy Policy"
          description="Last updated: July 28, 2026. How Synerge Health collects, uses, and safeguards personal and application data."
        />

        <section className="py-24 bg-forest-950">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-8 text-xs sm:text-sm text-muted leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-cream-50">1. Information We Collect</h3>
              <p>
                We collect personal information directly provided by you through our website forms (including Founder Applications, Investor Enquiries, Contact forms, and Newsletter subscriptions). This includes names, email addresses, phone numbers, startup metrics, and uploaded pitch documents.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-cream-50">2. How We Use Information</h3>
              <p>
                Submitted information is strictly used to evaluate founder applications, fulfill investor requests, provide customer support, and communicate relevant studio updates. We do not sell or rent personal information to third parties.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-cream-50">3. Data Security & Cloudflare Storage</h3>
              <p>
                All data is encrypted in transit (TLS 1.3) and stored within secured Cloudflare D1/R2 infrastructure in compliance with applicable data protection laws including NDPR and GDPR standard clauses.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-cream-50">4. Your Data Rights</h3>
              <p>
                You may request access to, correction of, or complete deletion of your personal data at any time by contacting our compliance office at <a href="mailto:privacy@synergehealth.com" className="text-gold-400 underline">privacy@synergehealth.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
