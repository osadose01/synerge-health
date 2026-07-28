import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "Events & Founder Mixers",
  description: "Connect with the Synerge Health team at upcoming founder sessions and investor dinners.",
};

const EVENTS = [
  {
    title: "Lagos Founder Office Hours: HealthTech Validation Sprint",
    date: "August 18, 2026",
    location: "Victoria Island, Lagos & Virtual",
    type: "Workshop",
    desc: "1-on-1 feedback sessions with studio partners on regulatory strategy, clinical pilots, and seed pitching.",
  },
  {
    title: "Synerge Health Investor Syndicate Dinner",
    date: "September 05, 2026",
    location: "London, UK",
    type: "Private Event",
    desc: "Exclusive roundtable with venture partners, family offices, and DFIs evaluating Sub-Saharan healthcare deal flow.",
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Events & Network"
          title="Connect with our studio team."
          description="Join our founder office hours, investor roundtables, and healthtech webinars."
        />

        <section className="py-24 bg-forest-950">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-8">
            {EVENTS.map((evt) => (
              <div key={evt.title} className="glass-card rounded-3xl p-8 border border-forest-600/50 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-gold-400">
                    <span className="px-2.5 py-1 rounded-full bg-forest-800 border border-forest-600">{evt.type}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {evt.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-cream-50">{evt.title}</h3>
                  <p className="text-xs text-muted max-w-xl">{evt.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
