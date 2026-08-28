"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { SynergyLogo } from "@/components/ui/SynergyLogo";
import { TextScramble } from "@/components/ui/TextScramble";

const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Founders", href: "/founders" },
  { name: "Investors", href: "/investors" },
  { name: "Insights", href: "/insights" },
];

export function HeaderIsland({ currentPath = "/" }: { currentPath?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(currentPath);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled ? "nav-glass py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-16 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 group">
          <SynergyLogo size="md" showWordmark={true} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200",
                  isActive
                    ? "text-[#2BE0B0]"
                    : "text-[#C2D1CB] hover:text-[#F8FAFC]"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/founders#apply"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#2BE0B0] text-[#2BE0B0] font-mono text-xs tracking-widest uppercase hover:bg-[#2BE0B0] hover:text-[#060B09] transition-all duration-300 shadow-[0_0_15px_rgba(43,224,176,0.15)]"
          >
            <TextScramble text="APPLY NOW" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#C2D1CB] hover:text-[#2BE0B0] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060B09]/95 backdrop-blur-2xl border-b border-[rgba(43,224,176,0.12)] px-6 py-8 space-y-6 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-[#C2D1CB] hover:text-[#2BE0B0] py-2 border-b border-white/[0.05]"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a
            href="/founders#apply"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-full bg-[#2BE0B0] text-[#060B09] font-mono text-xs font-bold tracking-widest uppercase"
          >
            APPLY AS A FOUNDER
          </a>
        </div>
      )}
    </header>
  );
}
