# Synerge Health Messaging Framework

Version 1.0 · October 2026 · Companion to [BRAND-GUIDELINES.md](./BRAND-GUIDELINES.md)

All lines below are built from copy already live on synergehealth.com. Where a fact needs confirming by the team, it is written as a `{{placeholder}}`.

---

## 1. Brand line and descriptor

| | Line | Use |
|---|---|---|
| Brand line | **Building Africa's next generation of healthtech.** | Homepage hero, campaign headlines, event stage |
| Descriptor | **Africa's healthtech venture studio.** | Under the logo, social bios, page titles, signatures |
| Mission | To help founders build healthtech around the needs of patients, care teams, and the markets they serve. | About page, decks |
| Vision | Healthcare services that are more accessible, better connected, and designed around the needs of patients and care teams. | About page, decks |

---

## 2. Messaging house

**Umbrella message:** We build healthtech with founders, around African care systems.

| Pillar | Message | Proof the site already gives |
|---|---|---|
| **Strategic Guidance** | Explore customer needs, clinical workflows, market assumptions, and relevant regulatory questions. | Methodology on About; services page |
| **Operational Support** | Collaborate on product development, team needs, and operating plans. | Founder programme steps |
| **Capital & Networks** | Develop partnership plans and prepare financing materials for investor conversations. | Investor and services pages |

**How we build** (supporting): Clinical context · Embedded execution · Regional relevance.

**Focus areas** (eight, in three groups): Care delivery · Health-system infrastructure · Clinical intelligence.

---

## 3. Boilerplates

**Short**
> Synerge Health is a healthtech venture studio. We work with founders to explore healthcare needs, develop products, and build companies for African markets.

**Standard**
> Synerge Health is a healthtech venture studio. We work with founders to understand local care systems and develop products and operating plans for their markets. We start with the clinical workflow, work alongside the founding team on product and operations, and agree the scope of each collaboration with them.

**Long**
> Synerge Health is a healthtech venture studio for African markets. Healthcare settings differ, and products work best when they are designed for the workflows, infrastructure, regulation, and payment practices of the places they serve. We work alongside founders on strategic guidance, operational support, and capital and networks, and we agree the scope of each collaboration with the founding team. Our eight focus areas span care delivery, health-system infrastructure, and clinical intelligence.

---

## 4. Audience messages

| Audience | Headline | Supporting line | Call to action |
|---|---|---|---|
| Founders | Build healthtech ventures for African markets. | Share your idea with the studio. We work with founders on validation, product development, operations, and partnership planning. | APPLY AS A FOUNDER |
| Investors | Partner with founders building healthtech for African markets. | Tell us about your organisation, investment interests, and typical ticket size. | INVESTOR ENQUIRIES |
| Health partners and providers | Healthcare technology designed for the way care is delivered. | We consider connectivity, payment practices, clinical workflows, and applicable requirements in the markets a venture serves. | CONTACT |
| Talent | Build healthtech ventures for African markets. | We welcome interest from people with experience in healthcare, technology, and company building. | CAREERS |

---

## 5. Social and short-form copy

| Channel | Copy |
|---|---|
| LinkedIn tagline | Africa's healthtech venture studio. We work with founders to build healthcare ventures for African markets. |
| LinkedIn About | Use the **Standard** boilerplate, then: "Founders can apply at synergehealth.com/founders. Investor enquiries: synergehealth.com/investors." |
| X bio | Africa's healthtech venture studio. Working with founders to build healthcare ventures for African markets. synergehealth.com |
| Newsletter blurb | Notes on healthtech, venture building, and studio updates. Subscribe to Synerge Dispatch. |
| Article share | One sentence stating the question the article answers, then the link. No hashtags beyond two. |

Post formula: **a specific observation → the point → the link**. Example: "Patient financing only works if people can finish their care. Our latest Insights piece sets out how to test affordability before you scale. [link]"

---

## 6. Voice

| We are | So we write | Not |
|---|---|---|
| Clear | "We work with founders on product and operations." | "We leverage synergies across the venture lifecycle." |
| Calm | "Applications are reviewed by the studio team." | "Don't miss your chance!" |
| Specific | "mobile payments, intermittent connectivity, and clinical workflow" | "challenges in emerging markets" |
| Accountable | "We agree the scope with each founding team." | "We guarantee results." |
| Respectful | "founders", "care teams", "patients" | "users", "end-users", "beneficiaries" |

### Claims policy
1. State what we do and what has been agreed. Do not predict results, funding, returns, or timelines unless confirmed.
2. Never use outcome promises such as "guaranteed", "proven to", "will transform".
3. Remove hedging that signals doubt (for example "potential", "may help", "aims to") when the fact is known; remove the claim when it is not.
4. Any statistic, name, partnership, or testimonial needs a source and written permission before use.
5. Clinical topics: describe the workflow and the oversight; do not give medical advice or imply diagnostic accuracy.
6. Portfolio and case examples are labelled "Anonymised example" unless the venture has approved naming.

### Words we use / avoid
| Use | Avoid |
|---|---|
| healthtech, healthcare technology | health-tech, "digital health revolution" |
| venture studio | incubator, accelerator (not what we are) |
| work with, work alongside | empower, enable, leverage |
| founders, care teams, patients | users, stakeholders, end-users |
| agree the scope | end-to-end solutions, one-stop shop |
| clinical workflow | pain points, touchpoints |
| African markets | "Africa" as a single market when a specific country is meant |
| practical, specific | cutting-edge, world-class, seamless, innovative, disruptive |

### Mechanics
- British English: programme, enquiry, organisation, prioritise, specialised, anonymised.
- Dates: **14 October 2026**. Times: 24-hour or 9:30 am, one style per document.
- Currency: **$250k – $1M** (US dollars); naira as **₦**. Always state the currency.
- Sentence case for headings; Title Case only for proper names. No exclamation marks.
- Oxford comma is used ("product, operations, and partnerships").
- Numbers: spell out one to nine in running text, digits for 10 and above; always digits with units and in data.

---

## 7. Interface copy

| Element | Standard |
|---|---|
| Form labels | Plain nouns above the field: "Full name", "Email", "Organisation", "Message". Mark required fields with `*`. |
| Placeholders | None. Do not use placeholder text inside fields. |
| Buttons | Verb or noun in capitals: SUBMIT, SUBSCRIBE, APPLY AS A FOUNDER |
| Success | "Thank you. We have received your enquiry." |
| Errors | Say what is wrong and how to fix it: "Enter a valid email address." No blame, no codes. |
| Empty states | One plain sentence and the next step. |
| 404 | "This page could not be found." plus a link home. |

---

## 8. Email copy

Use with [email-base.html](./templates/email-base.html). Add any review timeframe only after the team has confirmed one.

**Founder application received**
> Subject: We have received your application
>
> Hello {{first_name}},
>
> Thank you for applying to the Synerge Health founder programme. We have received your application for {{venture_name}}. A member of our team will review it and reply by email.
>
> Regards,
> {{sender_name}}

**Investor enquiry received**
> Subject: We have received your enquiry
>
> Hello {{first_name}},
>
> Thank you for contacting Synerge Health. We have received your enquiry and will follow up if there is a relevant opportunity.
>
> Regards,
> {{sender_name}}

**General message received**
> Subject: We have received your message
>
> Hello {{first_name}},
>
> Thank you for your message. A member of our team will reply by email.
>
> Regards,
> {{sender_name}}

**Founder reply: not the right fit now**
> Subject: Your application to Synerge Health
>
> Hello {{first_name}},
>
> Thank you for sharing {{venture_name}} with us. After review, we will not take it forward as a studio venture at this time. We appreciate the time you put into the application and wish you success with the venture.
>
> Regards,
> {{sender_name}}

**Newsletter welcome (Synerge Dispatch)**
> Subject: Welcome to Synerge Dispatch
>
> Hello,
>
> You are subscribed to Synerge Dispatch: notes on healthtech, venture building, and studio updates. You can unsubscribe at any time using the link in every message.
>
> Synerge Health

---

## 9. Headline formulas

| Pattern | Example |
|---|---|
| Plain statement of what we do | Building healthcare ventures with founders. |
| Name the market and the work | Healthtech for African markets, built around local care workflows. |
| Question the reader already has | Exploring a healthcare venture? |
| Insight titles: name the context, then the test | Patient Financing in Nigeria: Test Affordability Before You Scale |

---

## 10. Press and event kit (fill when needed)

| Item | Content |
|---|---|
| Name | Synerge Health |
| Descriptor | Africa's healthtech venture studio |
| Boilerplate | Short or Standard (section 3) |
| Website | synergehealth.com |
| Logos | `public/brand/` (SVG and PNG) |
| Contact | `{{press_contact}}` |
| Founder and team bios | `{{approved_bios}}` |
