import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us — Synerge Health",
  description: "Get in touch with the Synerge Health venture studio team.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Contact Us"
          title="Let's start a conversation."
          description="Have a question about our founder programme, partner network, or investment syndicate? We'd love to hear from you."
        />

        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              {/* Contact info */}
              <div className="space-y-12">
                <p className="label-mono">Get in touch</p>

                <div className="space-y-8">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Email</p>
                    <a
                      href="mailto:hello@synergehealth.com"
                      className="text-sm font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      hello@synergehealth.com
                    </a>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Hub Locations</p>
                    <p className="text-sm text-slate-700">Lagos, Nigeria &amp; London, UK</p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Media &amp; Press</p>
                    <a
                      href="mailto:press@synergehealth.com"
                      className="text-sm font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                      press@synergehealth.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 leading-[1.1] mb-10">
                  Send us a message.
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
