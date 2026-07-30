"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        <Link href="/" className="flex items-center gap-3 group">
          <SynergyLogo size="md" showWordmark={true} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
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
              </Link>
            );
          })}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full border border-[#E3A83B] text-[#E3A83B] font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-[#E3A83B] hover:text-[#060B09] transition-all duration-300"
          >
            <TextScramble text="CONTACT US" />
          </Link>

          <button
            className="lg:hidden text-[#8FA39A] p-1 hover:text-[#2BE0B0] transition-colors cursor-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#060B09] border-t border-[rgba(43,224,176,0.08)] overflow-hidden"
          >
            <div className="container mx-auto px-6 sm:px-8 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-mono text-[13px] tracking-[0.2em] uppercase text-[#F2F6F4] hover:text-[#2BE0B0] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-[#E3A83B] text-[#E3A83B] font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-[#E3A83B] hover:text-[#060B09] transition-all duration-300"
                >
                  CONTACT US
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
