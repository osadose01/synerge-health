"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const inputCls =
  "w-full bg-[#0D1815] border border-[rgba(43,224,176,0.15)] rounded-xl px-4 py-3 text-sm text-[#F2F6F4] placeholder:text-[#8FA39A] focus:outline-none focus:border-[#2BE0B0] focus:bg-[rgba(43,224,176,0.05)] transition-colors";

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
        <div className="w-14 h-14 rounded-full bg-[rgba(43,224,176,0.1)] border border-[#2BE0B0] flex items-center justify-center mx-auto text-[#2BE0B0]">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-2xl text-[#F2F6F4]">Application Received</h3>
        <p className="text-sm text-[#8FA39A] max-w-md mx-auto leading-relaxed">
          Thank you for applying to the Synerge Health Founder Programme. Our selection committee evaluates applications on a rolling basis and will reach out within two weeks.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="a-name" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Full Name <span className="text-[#2BE0B0]">*</span>
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
          <label htmlFor="a-email" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Email Address <span className="text-[#2BE0B0]">*</span>
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
          <label htmlFor="a-startup" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
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
          <label htmlFor="a-stage" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
            Current Stage <span className="text-[#2BE0B0]">*</span>
          </label>
          <select
            id="a-stage"
            required
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            className={inputCls}
          >
            <option value="Idea" className="bg-[#0D1815] text-[#F2F6F4]">Idea / Insight Phase</option>
            <option value="Validation" className="bg-[#0D1815] text-[#F2F6F4]">Customer Discovery / Validation</option>
            <option value="MVP" className="bg-[#0D1815] text-[#F2F6F4]">Early MVP / Pilot</option>
            <option value="Revenue" className="bg-[#0D1815] text-[#F2F6F4]">Generating Revenue</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="a-problem" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
          The Healthcare Problem You Are Solving <span className="text-[#2BE0B0]">*</span>
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
        <label htmlFor="a-solution" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
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
        <label htmlFor="a-deck" className="text-[11px] font-mono uppercase tracking-widest text-[#8FA39A]">
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
            Submitting Application...
          </>
        ) : (
          "SUBMIT APPLICATION"
        )}
      </button>
    </form>
  );
}
