export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  role: string;
  category: string;
  readTime: string;
  snippet: string;
  quote: string;
  sections: ArticleSection[];
  takeaways: string[];
  references?: { label: string; url: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "designing-digital-health-for-diverse-infrastructure",
    title: "Planning a Healthtech Pilot in Nigeria: A Site-Readiness Checklist",
    date: "14 October 2026",
    author: "Editorial Team",
    role: "Editorial Team",
    category: "Venture Building",
    readTime: "3 min read",
    snippet:
      "A practical way to assess workflows, connectivity, power, staffing, and support at each proposed pilot site.",
    quote:
      "Start with the facility and workflow where your product will be used—not an assumption about what every Nigerian site is like.",
    sections: [
      {
        heading: "Choose one workflow and one pilot setting",
        paragraphs: [
          "Pick a specific facility, user, and task. Decide whether the pilot is meant to support appointment follow-up, dispensing, referrals, results review, or another defined workflow. Observe how that work happens today and ask staff where time is lost, information is repeated, or tasks are missed.",
          "Record who uses the product, who makes the decision to adopt it, and who pays. These roles may belong to different people, so interview each group rather than treating “the clinic” as one customer."
        ]
      },
      {
        heading: "Check conditions at each site",
        paragraphs: [
          "Conditions vary by facility and location. Validate them through site visits and conversations instead of assuming one national pattern. Use a short readiness sheet for every pilot location."
        ],
        checklist: [
          "Power availability, charging options, and what staff do during an outage",
          "Mobile-data coverage, device access, and whether devices are shared",
          "Staff roles, shift handovers, language needs, and digital confidence",
          "Existing paper forms, registers, referrals, and reporting requirements",
          "Who can train users and respond when the product fails"
        ]
      },
      {
        heading: "Plan for failure and recovery",
        paragraphs: [
          "Specify what happens when power, connectivity, a device, or an external service is unavailable. If the product supports offline work, define what can be stored locally, how it is protected, when it syncs, and how conflicting records are handled. Agree a manual fallback and a safe clinical escalation route before the first user session."
        ]
      },
      {
        heading: "Agree on measures before launch",
        paragraphs: [
          "Choose a small set of measures tied to the workflow, such as task-completion time, successful follow-up, or missing-record rates. Define the baseline, the collection method, the person responsible, and the review date. Track safety issues and failed use alongside adoption; logins alone do not show that a product helps."
        ]
      }
    ],
    takeaways: [
      "Observe the workflow at the actual pilot site before designing around it.",
      "Document power, connectivity, staffing, support, and fallback plans for each location.",
      "Set baseline and safety measures before the pilot begins."
    ]
  },
  {
    slug: "digital-pharmacy-designing-for-fragmented-supply-chains",
    title: "Building Pharmacy Software in Nigeria: Map the Stock Journey First",
    date: "14 October 2026",
    author: "Editorial Team",
    role: "Editorial Team",
    category: "Operations",
    readTime: "3 min read",
    snippet:
      "A field checklist for pharmacy software covering procurement, receiving, stock records, expiry, reconciliation, and supplier checks.",
    quote:
      "A stock dashboard is useful only when its records match how medicines are ordered, received, stored, dispensed, and reconciled.",
    sections: [
      {
        heading: "Trace one medicine from order to sale",
        paragraphs: [
          "At a pilot pharmacy, follow a single product through the whole stock journey: who requests it, who approves the order, which supplier is used, how delivery is checked, where it is stored, and how a sale or return is recorded. Ask staff to show the steps during a normal shift, including the paper notes or spreadsheets they still rely on."
        ],
        checklist: [
          "How staff identify products and record quantities",
          "What batch, expiry, supplier, and location details are needed for the workflow",
          "How discrepancies, returns, damaged goods, and recalls are handled",
          "When the system is updated and who reconciles it with physical stock"
        ]
      },
      {
        heading: "Separate the problems before combining features",
        paragraphs: [
          "Inventory management, wholesale procurement, marketplace ordering, delivery, and credit are different workflows. Learn which one causes the most friction for the pharmacy before building them into a single product. Do not assume a credit feature will solve a stock problem if supply reliability or ordering practices are the real constraint."
        ]
      },
      {
        heading: "Run a small, measurable pilot",
        paragraphs: [
          "Agree how staff will compare system records with physical counts and how often. Useful measures may include time spent reconciling stock, stockout days for selected products, near-expiry losses, order fulfilment time, and errors corrected. Define each measure before launch and review it with pharmacy staff; results from one site should not be presented as representative of all Nigerian pharmacies."
        ]
      },
      {
        heading: "Check responsibilities and current requirements",
        paragraphs: [
          "Clarify who verifies suppliers, product registration, premises, and professional responsibilities in the proposed workflow. The Pharmacy Council of Nigeria and NAFDAC are useful official starting points, but requirements depend on the product and activity. Confirm current guidance with the relevant authorities and qualified advisers before launch."
        ]
      }
    ],
    takeaways: [
      "Map the complete stock journey at the pharmacy before choosing features.",
      "Keep inventory, procurement, delivery, and credit problems distinct until validated.",
      "Measure the pilot with pharmacy staff and report its location and period."
    ],
    references: [
      { label: "Pharmacy Council of Nigeria", url: "https://pcn.gov.ng/" },
      { label: "National Agency for Food and Drug Administration and Control", url: "https://nafdac.gov.ng/" }
    ]
  },
  {
    slug: "ai-in-african-clinical-diagnostics",
    title: "Clinical AI in Nigeria: A Pre-Deployment Checklist",
    date: "14 October 2026",
    author: "Editorial Team",
    role: "Editorial Team",
    category: "Technology & AI",
    readTime: "3 min read",
    snippet:
      "Practical checks for intended use, local validation, clinical workflow, data governance, and oversight before a clinical AI pilot.",
    quote:
      "A model’s benchmark is not a substitute for evidence from the setting and people it is intended to serve.",
    sections: [
      {
        heading: "Define the intended use",
        paragraphs: [
          "Write down the exact task: what information the system receives, what output it produces, who sees it, and what action may follow. State who the tool is for and who it is not for. A tool that organizes information for a clinician should not be described as diagnosing patients unless that intended use and performance have been properly established."
        ]
      },
      {
        heading: "Plan validation for the target setting",
        paragraphs: [
          "Before a pilot, agree with clinical collaborators on an appropriate reference standard, evaluation method, and thresholds for acceptable performance. Check whether the evaluation data reflect the intended population, devices, language, and workflow. Review errors by relevant patient and site groups, not only as one overall score.",
          "Document data origin and permissions. Do not assume that data collected in one hospital or country can automatically be reused for another purpose or setting."
        ]
      },
      {
        heading: "Design the human workflow and safeguards",
        paragraphs: [
          "Identify the clinician or staff member responsible for reviewing an output, how they can reject it, and what happens when the model is uncertain or unavailable. Define escalation, incident reporting, and ongoing monitoring before real-world use. Make sure the system supports clinical judgment rather than silently replacing it."
        ]
      },
      {
        heading: "Check privacy and regulatory questions early",
        paragraphs: [
          "Minimize the data collected, restrict access, set retention and deletion rules, and document security responsibilities. Review current Nigerian data-protection guidance with the Nigeria Data Protection Commission and get qualified advice on whether product-specific medical-device or other regulatory requirements apply. This checklist is not legal or clinical advice."
        ]
      }
    ],
    takeaways: [
      "Specify intended use, users, limits, and the action a model output may trigger.",
      "Validate with an appropriate reference standard and the intended population and workflow.",
      "Plan human oversight, privacy, incident handling, and regulatory review before deployment."
    ],
    references: [
      { label: "Nigeria Data Protection Commission", url: "https://ndpc.gov.ng/" },
      { label: "National Agency for Food and Drug Administration and Control", url: "https://nafdac.gov.ng/" }
    ]
  },
  {
    slug: "evaluating-patient-financing-in-hospital-workflows",
    title: "Patient Financing in Nigeria: Test Affordability Before You Scale",
    date: "14 October 2026",
    author: "Editorial Team",
    role: "Editorial Team",
    category: "Venture Building",
    readTime: "3 min read",
    snippet:
      "A practical framework for testing patient-financing ideas around real care costs, repayment risk, provider workflows, and patient choice.",
    quote:
      "A financing option is not a success if it helps someone start care but leaves them unable to manage repayment.",
    sections: [
      {
        heading: "Map the cost and payment path",
        paragraphs: [
          "Choose one service and one care setting. Ask patients and providers what is paid, by whom, and when, and which options the participating facility accepts—cash, bank transfer, card or POS, insurance, or another arrangement. Depending on the service, the total journey may include consultation, tests, medicines, follow-up, or travel; verify which costs matter locally instead of assuming the bill tells the whole story.",
          "Find out what coverage, employer support, instalment arrangements, or other payment options people already use. Do not assume the same option is available to every patient or facility."
        ]
      },
      {
        heading: "Test the full repayment burden",
        paragraphs: [
          "Show people the total amount due, fees, repayment dates, and consequences of late or missed payments in plain language. Test realistic scenarios with patients, including changing income or unexpected costs. Ask whether they understand the terms and feel able to decline without affecting their care."
        ]
      },
      {
        heading: "Protect clinical choice",
        paragraphs: [
          "Keep clinical recommendations separate from credit eligibility and sales targets. Define a clear route for questions, complaints, hardship, and disputes. Work with qualified legal and financial advisers on the product’s terms and applicable requirements before offering it."
        ]
      },
      {
        heading: "Measure access and harm, not just uptake",
        paragraphs: [
          "Review who was offered financing, who accepted, who completed care, and who struggled with repayment. Track provider cash flow separately from patient outcomes, and include complaints or signs of financial stress. Report results with the site, period, participant group, and method; high uptake alone does not prove that a product is affordable or beneficial."
        ]
      }
    ],
    takeaways: [
      "Map the full cost and payment journey with patients and providers in the intended setting.",
      "Test total repayment and missed-payment scenarios in language people understand.",
      "Measure access, provider operations, and patient financial stress separately."
    ]
  }
];
