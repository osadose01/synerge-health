"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors";

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
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900">Message Sent</h3>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
          Thank you for reaching out to Synerge Health. A member of our executive team will review your message and respond within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
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
          <label htmlFor="c-name" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Full Name <span className="text-emerald-500">*</span>
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
          <label htmlFor="c-email" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Email Address <span className="text-emerald-500">*</span>
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
        <label htmlFor="c-subject" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
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
        <label htmlFor="c-message" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Message <span className="text-emerald-500">*</span>
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
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
