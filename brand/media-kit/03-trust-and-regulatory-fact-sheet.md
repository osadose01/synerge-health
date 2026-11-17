# Synerge Health — Trust, Clinical Governance & Security Fact Sheet

> **Africa's healthtech venture studio**  
> Architecture, clinical governance, financial integrity, and data protection standards across Synerge Health and portfolio ventures (`Metis POS`, `Mercure Supplier OS`).

---

## 1. Clinical & Regulatory Alignment (African Markets & Nigeria)

Every venture co-built at Synerge Health begins with local care workflows, regulatory accountability, and counter/depot ergonomics rather than generic software assumptions.

| Domain | Standard / Regulatory Authority | How Synerge Health Ventures Enforce It |
| :--- | :--- | :--- |
| **Dispensing & Premises Compliance** | Pharmacists Council of Nigeria (**PCN**) | Pharmacy counter profiles and thermal dispense receipts carry verified Superintendent Pharmacist and PCN premises licence headers, paired with role-based access control separating pharmacist, manager, and cashier capabilities. |
| **Batch & Lot Authentication** | National Agency for Food and Drug Administration and Control (**NAFDAC**) | Product catalogues, inventory audits, and wholesale manifests track NAFDAC registration numbers, manufacturer details, lot numbers, and GS1-128 identifiers for end-to-end recall traceability. |
| **Expiry & First-Expired, First-Out (FEFO)** | Clinical dispensary safety | Automated FEFO lot picking prioritises the shortest-dated usable batch at checkout and blocks expired stock dispensing with immutable movement ledgers. |
| **Good Distribution Practice (GDP)** | Cold-chain storage (`2°C – 8°C`) & cargo security | Wholesale cold-chain distribution tracks `2°C – 8°C` biopharma telemetry with breach alerts (`<2°C` or `>8°C`), reinforced 72mm tamper-evident security tape, and GPS Proof-of-Delivery. |
| **Health Privacy & Form Hygiene** | Nigeria Data Protection Act (**NDPA**) | Public studio forms strictly prohibit submission of patient-identifying or sensitive clinical data. Operational clinical records apply tenant/branch scoping and encryption at rest. |

---

## 2. Financial & Nigerian Tax Integrity

- **Nigerian Naira (`₦`) Double-Entry Ledgers:** Retail POS transactions and B2B wholesale invoices maintain balanced, replay-safe accounting entries across sales, cost of goods sold, Net 30 revolving credit lines, disputes, and repayments.
- **Nigerian VAT & Zero-Rated Pharmaceutical Schedule:** Line-item tax logic separates statutory `7.5%` Nigerian Value Added Tax on standard over-the-counter items from VAT-exempt essential medicines across counter receipts, Profit & Loss, Balance Sheet, and Cash Flow statements.
- **Verified Nigerian Payment Rails:** Supports cash, NIBSS Instant Payments (**NIP**) bank transfers, Paystack webhook-verified digital settlements, HMO/insurer split-billing, and closed-period till reconciliation.

---

## 3. Infrastructure Security, Offline Resilience & Data Protection

- **Edge Security & Strict Content Security Policy:** The studio web platform (`synergehealth.com`) runs on Cloudflare Workers with Astro-generated per-page CSP hashes, explicit HTTP security headers, per-IP rate limiting, and encrypted Cloudflare D1 storage with defined retention policies (`6` months for contact enquiries, `12` months for founder and investor submissions).
- **Zero-Latency Offline Continuity:** Retail dispensaries run offline-first via local encrypted IndexedDB storage (`RxDB`), keeping counter sales, barcode lookup, and receipt printing active through power switchovers and network outages, with idempotent background synchronisation when connectivity returns.
- **Tenant, Branch & Depot Isolation:** Every query and mutation enforces scoped authentication across tenant organisations, pharmacy branches, wholesale depots, and staff PIN terminal sessions.
- **Transport & Storage Encryption:** TLS 1.2+ in transit across all web, API, and Cloudflare/Oracle edge routes, paired with encrypted database backups and AES-256 storage protection.

---

## 4. Claims & Clinical Communication Standard

- Studio documentation and venture materials describe **clinical workflows and operational oversight** clearly without making medical diagnoses or unverified outcome claims.
- Statistics, case examples, and testimonials require verified source documentation and explicit written approval prior to external publication.
