import { HEALTHTECH_FOCUS_AREAS } from "@/data/healthtechFocusAreas";

export function NodeGraph() {
  return (
    <ul className="grid w-full grid-cols-1 sm:grid-cols-2 gap-3">
      {HEALTHTECH_FOCUS_AREAS.map((area) => (
        <li
          key={area.id}
          className="rounded-xl border border-white/[0.08] bg-[#060B09] p-5"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#2BE0B0]">
            {area.pillar}
          </p>
          <h3 className="mt-2 font-display font-semibold text-base text-[#F2F6F4]">
            {area.label}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8FA39A]">{area.desc}</p>
        </li>
      ))}
    </ul>
  );
}
