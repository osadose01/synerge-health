"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors";

export function InvestorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    investorType: "Venture Capital",
    checkSize: "$250k - $1M",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit enquiry.");
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
        <h3 className="font-display font-bold text-xl text-slate-900">Enquiry Submitted</h3>
        <p className="text-sm text-slate-500 max-w-md leading-relaxed">
          Thank you for your interest in backing Synerge Health and our portfolio companies. An investor relations representative will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="i-name" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Full Name <span className="text-emerald-500">*</span>
          </label>
          <input
            id="i-name"
            type="text"
            required
            placeholder="Alexander Wright"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="i-email" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Work Email <span className="text-emerald-500">*</span>
          </label>
          <input
            id="i-email"
            type="email"
            required
            placeholder="alexander@partner.vc"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="i-org" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Organization / Family Office
          </label>
          <input
            id="i-org"
            type="text"
            placeholder="Apex Capital"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="i-type" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Investor Profile <span className="text-emerald-500">*</span>
          </label>
          <select
            id="i-type"
            required
            value={formData.investorType}
            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
            className={inputCls}
          >
            <option value="Venture Capital">Venture Capital Fund</option>
            <option value="Angel Investor">Angel Investor</option>
            <option value="Family Office">Family Office</option>
            <option value="DFI / Impact">DFI / Impact Investor</option>
            <option value="Corporate / Healthcare">Corporate Healthcare Partner</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="i-check" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Target Ticket / Check Size
        </label>
        <select
          id="i-check"
          value={formData.checkSize}
          onChange={(e) => setFormData({ ...formData, checkSize: e.target.value })}
          className={inputCls}
        >
          <option value="$50k - $250k">$50k – $250k</option>
          <option value="$250k - $1M">$250k – $1M</option>
          <option value="$1M - $5M">$1M – $5M</option>
          <option value="$5M+">$5M+</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="i-msg" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Investment Priorities &amp; Message
        </label>
        <textarea
          id="i-msg"
          rows={4}
          placeholder="Tell us about your mandate, target sub-sectors, or questions..."
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
            Submitting...
          </>
        ) : (
          "Submit Investor Enquiry"
        )}
      </button>
    </form>
  );
}
