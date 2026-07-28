"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 17h5l2.5-7L15 24l3-14 2 7h8"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-semibold text-base tracking-tight text-slate-900">
            Synerge Health
          </span>
        </Link>

        {/* Desktop Nav — minimal, centred */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  isActive
                    ? "text-slate-900 font-medium"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Single CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/founders#apply"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold tracking-wide hover:bg-emerald-700 transition-colors"
          >
            Apply Now
          </Link>
          <button
            className="lg:hidden text-slate-700 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
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
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-8 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/founders#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3.5 rounded-full bg-emerald-600 text-white text-sm font-semibold"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
