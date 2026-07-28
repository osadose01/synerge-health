import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex-1 flex items-center justify-center py-32 bg-forest-950 min-h-[70vh]">
        <div className="container mx-auto px-6 text-center space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-full bg-forest-800 border border-forest-600 flex items-center justify-center text-gold-400 mx-auto">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400">404 Error</span>
          <h1 className="font-display font-bold text-4xl text-cream-50">Page Not Found</h1>
          <p className="text-xs text-muted leading-relaxed">
            The page or insight you are looking for has moved or does not exist in our studio archive.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs transition-transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
