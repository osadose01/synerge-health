"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <footer className="bg-[#060B09] border-t border-[rgba(43,224,176,0.08)] pt-20 pb-10">
      <div className="container mx-auto px-8 md:px-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[rgba(43,224,176,0.06)]">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group cursor-none">
              <div className="w-8 h-8 rounded-lg border border-[rgba(43,224,176,0.3)] bg-[#0D1815] flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path
                    d="M2 16h5l2.5-7L14 25l3.5-15 2 7H30"
                    stroke="#2BE0B0"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-display font-semibold text-base text-[#F2F6F4]">
                Synerge Health
              </span>
            </Link>

            <p className="text-sm text-[#8FA39A] leading-[1.75] max-w-sm">
              Africa&rsquo;s digital health venture studio — co-founding, funding, and scaling companies from first insight to continental impact.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/synergehealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.15)] bg-[#0D1815] flex items-center justify-center text-[#8FA39A] hover:border-[#2BE0B0] hover:text-[#2BE0B0] cursor-none transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://x.com/synergehealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.15)] bg-[#0D1815] flex items-center justify-center text-[#8FA39A] hover:border-[#2BE0B0] hover:text-[#2BE0B0] cursor-none transition-all duration-300"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2BE0B0]">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Insights", href: "/insights" },
                { label: "Careers", href: "/careers" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-[11px] tracking-[0.08em] text-[#8FA39A] hover:text-[#F2F6F4] cursor-none transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div className="space-y-5">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2BE0B0]">
              Programmes
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Founder Studio", href: "/founders" },
                { label: "Investor Hub", href: "/investors" },
                { label: "Apply Now", href: "/founders#apply" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-[11px] tracking-[0.08em] text-[#8FA39A] hover:text-[#F2F6F4] cursor-none transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2BE0B0]">
              Stay Informed
            </h4>
            <p className="text-xs text-[#8FA39A] leading-relaxed">
              Healthtech insights and studio news — straight to your inbox.
            </p>

            {status === "success" ? (
              <div className="flex items-center gap-2 text-sm text-[#2BE0B0]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pr-14 text-xs"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="absolute right-2 top-2 bottom-2 px-3 bg-[#2BE0B0] hover:bg-[#1cc49a] text-[#060B09] rounded-lg flex items-center justify-center transition-colors cursor-none"
                  >
                    {status === "loading" ? (
                      <span className="font-mono text-[10px]">…</span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="font-mono text-[10px] text-red-400 mt-2">
                    Something went wrong. Try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#4A6358]">
            © {new Date().getFullYear()} SYNERGE HEALTH INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[10px] tracking-[0.1em] text-[#4A6358] hover:text-[#8FA39A] cursor-none transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] tracking-[0.1em] text-[#4A6358] hover:text-[#8FA39A] cursor-none transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
