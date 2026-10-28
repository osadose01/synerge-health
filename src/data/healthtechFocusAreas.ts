export interface HealthtechFocusArea {
  id: string;
  label: string;
  graphLabel: string;
  pillar: "Care delivery" | "Health-system infrastructure" | "Clinical intelligence";
  desc: string;
  angle: number;
  relatedAreas: string[];
}

export const HEALTHTECH_FOCUS_AREAS: HealthtechFocusArea[] = [
  {
    id: "telemedicine",
    label: "Telemedicine & Virtual Care Networks",
    graphLabel: "Telemedicine",
    pillar: "Care delivery",
    desc: "Remote consultations, digital prescriptions, and virtual-care services that connect patients with clinicians.",
    angle: 0,
    relatedAreas: ["specialized-care", "health-insurtech"],
  },
  {
    id: "specialized-care",
    label: "Specialised Clinical & Chronic Disease Portals",
    graphLabel: "Specialty care",
    pillar: "Care delivery",
    desc: "Digital services designed for specific patient groups, health conditions, and ongoing care needs.",
    angle: 45,
    relatedAreas: ["telemedicine", "diagnostics-analytics"],
  },
  {
    id: "emr-interoperability",
    label: "Electronic Medical Records & Interoperability",
    graphLabel: "EMR / Interop.",
    pillar: "Health-system infrastructure",
    desc: "Digital patient records and systems that support clinical documentation, billing, and data exchange across care settings.",
    angle: 90,
    relatedAreas: ["health-insurtech", "clinical-ai"],
  },
  {
    id: "health-insurtech",
    label: "Health InsurTech & Claims Processing",
    graphLabel: "InsurTech",
    pillar: "Health-system infrastructure",
    desc: "Digital coverage, enrollment, and claims workflows for insurers, providers, employers, and patients.",
    angle: 135,
    relatedAreas: ["emr-interoperability", "telemedicine"],
  },
  {
    id: "pharma-supply",
    label: "Pharmaceutical Supply Chain & B2B Marketplaces",
    graphLabel: "Pharma supply",
    pillar: "Health-system infrastructure",
    desc: "Procurement, inventory, fulfillment, and medicine-quality tools for pharmacies and healthcare providers.",
    angle: 180,
    relatedAreas: ["medical-logistics", "health-insurtech"],
  },
  {
    id: "medical-logistics",
    label: "Medical Logistics & Emergency Dispatch",
    graphLabel: "Med logistics",
    pillar: "Health-system infrastructure",
    desc: "Time-sensitive transport and dispatch for medical supplies, diagnostics, and emergency care.",
    angle: 225,
    relatedAreas: ["pharma-supply", "diagnostics-analytics"],
  },
  {
    id: "clinical-ai",
    label: "Clinical AI & Voice Technology",
    graphLabel: "Clinical AI",
    pillar: "Clinical intelligence",
    desc: "AI and voice tools for clinical documentation, patient routing, and decision workflows, with appropriate validation and oversight.",
    angle: 270,
    relatedAreas: ["diagnostics-analytics", "emr-interoperability"],
  },
  {
    id: "diagnostics-analytics",
    label: "Diagnostics, Genomics & Health Analytics",
    graphLabel: "Diagnostics",
    pillar: "Clinical intelligence",
    desc: "Diagnostic testing, genomics, and analytics that help make sense of clinical and population-health data.",
    angle: 315,
    relatedAreas: ["clinical-ai", "emr-interoperability"],
  },
];
