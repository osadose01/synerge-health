"use client";

import { useState, type SubmitEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SynergyLogo } from "@/components/ui/SynergyLogo";
import { getFormErrorMessage } from "@/lib/formResponses";

export function FooterIsland() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNewsletterSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setSuccessMessage(res.status === 200 ? "This email is already subscribed." : "You’re subscribed.");
        setEmail("");
      }
      else {
        setStatus("error");
        setErrorMessage(await getFormErrorMessage(res, "Subscription failed. Please try again."));
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <footer className="bg-[#060B09] border-t border-[rgba(43,224,176,0.08)] pt-20 pb-10">
      <div className="container mx-auto px-6 sm:px-8 md:px-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[rgba(43,224,176,0.06)]">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-3 group">
              <SynergyLogo size="md" showWordmark={true} />
            </a>

            <p className="text-sm text-[#8FA39A] leading-[1.75] max-w-sm">
              A venture studio working with founders to build healthcare technology for African markets.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/synergehealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.15)] bg-[#0D1815] flex items-center justify-center text-[#8FA39A] hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://x.com/synergehealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.15)] bg-[#0D1815] flex items-center justify-center text-[#8FA39A] hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <span
                role="img"
                aria-label="Instagram"
                title="Instagram profile link to be added"
                className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.15)] bg-[#0D1815] flex items-center justify-center text-[#8FA39A]"
              >
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </div>
          </div>

          {/* Ventures */}
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2BE0B0]">Ventures</p>
            <ul className="space-y-2.5 text-sm text-[#8FA39A]">
              <li><a href="/portfolio" className="hover:text-[#F8FAFC] transition-colors">Portfolio Companies</a></li>
              <li><a href="/founders" className="hover:text-[#F8FAFC] transition-colors">Venture Studio Model</a></li>
              <li><a href="/founders#apply" className="hover:text-[#F8FAFC] transition-colors">Apply as Founder</a></li>
              <li><a href="/insights" className="hover:text-[#F8FAFC] transition-colors">Synerge Insights</a></li>
              <li><a href="/investors" className="hover:text-[#F8FAFC] transition-colors">Investor Enquiries</a></li>
            </ul>
          </div>

          {/* Studio */}
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2BE0B0]">Studio</p>
            <ul className="space-y-2.5 text-sm text-[#8FA39A]">
              <li><a href="/about" className="hover:text-[#F8FAFC] transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-[#F8FAFC] transition-colors">Studio Services</a></li>
              <li><a href="/events" className="hover:text-[#F8FAFC] transition-colors">Events</a></li>
              <li><a href="/careers" className="hover:text-[#F8FAFC] transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-[#F8FAFC] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2BE0B0]">Dispatch</p>
            <p className="text-xs text-[#8FA39A] leading-relaxed">
              Healthcare tech, venture building, and studio news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0D1815] border border-[rgba(43,224,176,0.15)] rounded-full px-4 py-2.5 text-xs text-[#F8FAFC] focus:border-[#2BE0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5FF5CC] pr-10"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-[#2BE0B0] text-[#060B09] flex items-center justify-center hover:bg-[#5FF5CC] transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {status === "success" && (
                <div role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-[#2BE0B0]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{successMessage}</span>
                </div>
              )}
              {status === "error" && (
                <p role="alert" className="text-xs text-red-400">{errorMessage}</p>
              )}
              <p className="text-[11px] text-[#8FA39A]">Subscribe to Dispatch.</p>
            </form>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA39A]">
          <p>© {new Date().getFullYear()} Synerge Health. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-[#8FA39A] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#8FA39A] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
