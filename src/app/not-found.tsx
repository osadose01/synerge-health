import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Compass } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex-1 flex items-center justify-center py-32 bg-[#060B09] min-h-[70vh]">
        <div className="container mx-auto px-6 text-center space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-full bg-[rgba(43,224,176,0.1)] border border-[#2BE0B0] flex items-center justify-center text-[#2BE0B0] mx-auto">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#2BE0B0]">404 Error</span>
          <h1 className="font-display font-bold text-4xl text-[#F2F6F4]">Page Not Found</h1>
          <p className="text-xs text-[#8FA39A] leading-relaxed">
            The page or insight you are looking for has moved or does not exist in our studio archive.
          </p>
          <div className="pt-4">
            <MagneticButton className="inline-block">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs uppercase tracking-[0.1em] cursor-none hover:shadow-[0_0_25px_rgba(227,168,59,0.4)] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <TextScramble text="RETURN TO HOMEPAGE" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

