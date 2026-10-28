"use client";

import { useState, type SubmitEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { getFormErrorMessage } from "@/lib/formResponses";

const inputCls =
  "w-full bg-[#0D1815] border border-[rgba(43,224,176,0.15)] rounded-xl px-4 py-3 text-sm text-[#F2F6F4] focus:border-[#2BE0B0] focus:bg-[rgba(43,224,176,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5FF5CC] transition-colors";

export function InvestorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    investorType: "",
    checkSize: "",
    message: "",
    website_url: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
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
        setErrorMsg(await getFormErrorMessage(res, "Failed to submit enquiry."));
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-12 space-y-4" role="status" aria-live="polite">
        <div className="w-12 h-12 rounded-full bg-[rgba(43,224,176,0.1)] border border-[#2BE0B0] flex items-center justify-center text-[#2BE0B0]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-xl text-[#F2F6F4]">Enquiry Submitted</h3>
        <p className="text-sm text-[#8FA39A] max-w-md leading-relaxed">
          Thank you for your interest. Our team will review your enquiry and contact you if there is a suitable next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="i-website">Website</label>
        <input
          id="i-website"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_url}
          onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
        />
      </div>
      <p className="text-xs text-[#8FA39A] leading-relaxed">
        Please do not include patient-identifying information, medical records, or other sensitive personal information.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="i-name" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Full name <span className="text-[#2BE0B0]">*</span>
          </label>
          <input
            id="i-name"
            type="text"
            required
            maxLength={120}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="i-email" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Email <span className="text-[#2BE0B0]">*</span>
          </label>
          <input
            id="i-email"
            type="email"
            required
            maxLength={254}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="i-org" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Organisation (optional)
          </label>
          <input
            id="i-org"
            type="text"
            maxLength={200}
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="i-type" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Investor type <span className="text-[#2BE0B0]">*</span>
          </label>
          <select
            id="i-type"
            required
            value={formData.investorType}
            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
            className={inputCls}
          >
            <option value="" disabled hidden></option>
            <option value="Venture Capital" className="bg-[#0D1815] text-[#F2F6F4]">Venture Capital Fund</option>
            <option value="Angel Investor" className="bg-[#0D1815] text-[#F2F6F4]">Angel Investor</option>
            <option value="Family Office" className="bg-[#0D1815] text-[#F2F6F4]">Family Office</option>
            <option value="DFI / Impact" className="bg-[#0D1815] text-[#F2F6F4]">DFI / Impact Investor</option>
            <option value="Corporate / Healthcare" className="bg-[#0D1815] text-[#F2F6F4]">Corporate Healthcare Partner</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="i-check" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
          Investment range (USD) (optional)
        </label>
        <select
          id="i-check"
          value={formData.checkSize}
          onChange={(e) => setFormData({ ...formData, checkSize: e.target.value })}
          className={inputCls}
        >
          <option value="" hidden></option>
          <option value="$50k - $250k" className="bg-[#0D1815] text-[#F2F6F4]">$50k – $250k</option>
          <option value="$250k - $1M" className="bg-[#0D1815] text-[#F2F6F4]">$250k – $1M</option>
          <option value="$1M - $5M" className="bg-[#0D1815] text-[#F2F6F4]">$1M – $5M</option>
          <option value="$5M+" className="bg-[#0D1815] text-[#F2F6F4]">$5M+</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="i-msg" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
          Note (optional)
        </label>
        <textarea
          id="i-msg"
          rows={4}
          maxLength={4000}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <div role="alert" className="flex items-start gap-2 text-sm text-red-400 bg-red-950/40 border border-red-500/30 p-4 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="whitespace-pre-line">{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#E3A83B] hover:bg-[#E3A83B]/90 text-[#060B09] font-mono font-bold tracking-[0.1em] uppercase rounded-xl text-xs transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(227,168,59,0.4)]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "SUBMIT"
        )}
      </button>
    </form>
  );
}
