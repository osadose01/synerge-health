"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors";

export function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startup: "",
    stage: "Idea",
    problem: "",
    solution: "",
    pitchDeck: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit application.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-900">Application Received</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Thank you for applying to the Synerge Health Founder Programme. Our selection committee evaluates applications on a rolling basis and will reach out within two weeks.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="a-name" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Full Name <span className="text-emerald-500">*</span>
          </label>
          <input
            id="a-name"
            type="text"
            required
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="a-email" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Email Address <span className="text-emerald-500">*</span>
          </label>
          <input
            id="a-email"
            type="email"
            required
            placeholder="jane@startup.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="a-startup" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Startup Name (if applicable)
          </label>
          <input
            id="a-startup"
            type="text"
            placeholder="Afrimed Analytics"
            value={formData.startup}
            onChange={(e) => setFormData({ ...formData, startup: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="a-stage" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Current Stage <span className="text-emerald-500">*</span>
          </label>
          <select
            id="a-stage"
            required
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            className={inputCls}
          >
            <option value="Idea">Idea / Insight Phase</option>
            <option value="Validation">Customer Discovery / Validation</option>
            <option value="MVP">Early MVP / Pilot</option>
            <option value="Revenue">Generating Revenue</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="a-problem" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          The Healthcare Problem You Are Solving <span className="text-emerald-500">*</span>
        </label>
        <textarea
          id="a-problem"
          required
          rows={4}
          placeholder="Describe the clinical or market gap, who it affects, and why current solutions fail..."
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="a-solution" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Your Proposed Solution / Product
        </label>
        <textarea
          id="a-solution"
          rows={4}
          placeholder="What are you building or planning to build?"
          value={formData.solution}
          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="a-deck" className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
          Pitch Deck or Document Link (Optional)
        </label>
        <input
          id="a-deck"
          type="url"
          placeholder="https://docsend.com/..."
          value={formData.pitchDeck}
          onChange={(e) => setFormData({ ...formData, pitchDeck: e.target.value })}
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
            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
