"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputCls =
  "w-full bg-[#0D1815] border border-[rgba(43,224,176,0.15)] rounded-xl px-4 py-3 text-sm text-[#F2F6F4] placeholder:text-[#8FA39A] focus:outline-none focus:border-[#2BE0B0] focus:bg-[rgba(43,224,176,0.05)] transition-colors";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit message.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-12 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(43,224,176,0.1)] border border-[#2BE0B0] flex items-center justify-center text-[#2BE0B0]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-xl text-[#F2F6F4]">Message Sent</h3>
        <p className="text-sm text-[#8FA39A] max-w-sm leading-relaxed">
          Thank you for reaching out to Synerge Health. A member of our executive team will review your message and respond within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[#2BE0B0] hover:text-[#2BE0B0]/80 font-medium transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="c-name" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Full Name <span className="text-[#2BE0B0]">*</span>
          </label>
          <input
            id="c-name"
            type="text"
            required
            placeholder="Dr. Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="c-email" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Email Address <span className="text-[#2BE0B0]">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            required
            placeholder="jane@healthtech.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="c-subject" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
          Subject
        </label>
        <input
          id="c-subject"
          type="text"
          placeholder="e.g. Partnership Enquiry / Studio Inquiry"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="c-message" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
          Message <span className="text-[#2BE0B0]">*</span>
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          placeholder="Tell us about how we can work together..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-500/30 p-4 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#E3A83B] hover:bg-[#E3A83B]/90 text-[#060B09] font-mono font-bold tracking-[0.1em] uppercase rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-none hover:shadow-[0_0_30px_rgba(227,168,59,0.4)]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "SEND MESSAGE"
        )}
      </button>
    </form>
  );
}
