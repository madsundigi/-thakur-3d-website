# B19 · PRIVACY POLICY — `/privacy-policy/`

> Page blueprint (custom anatomy, legal). The page is our privacy policy under rule 4 of the IT (Reasonable Security
> Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and our notice under the Digital
> Personal Data Protection Act, 2023. **Every fact comes from `website/src/data/legal.ts`, `00-MASTER-PLAN.md` §3 or the
> blueprint/section cited in its block. Nothing is typed into the page that is not in one of those sources.** Tables
> render from `legal.ts`; contact values come from `src/data/site.ts` (NAP per `05-LOCAL-SEO.md` §4). Unknown legal
> values are `[FILL:*]` tokens (`00` §8, Legal group), never "draft" prose (`00` §11 E12). A lawyer reviews the
> page before launch (`00` §9 item 7, D4). No Hinglish (`06` §1 rule 4).

| URL | Wave | Schema `@graph` | Status |
|---|---|---|---|
| `/privacy-policy/` | 1 | BreadcrumbList only (`04-TECHNICAL-SEO.md` §2.9, legal pages) | blueprinted |

## 1 · Head

- **Title** (54): `Privacy Policy – How We Handle Your Data | PetDoorStep`
- **Meta** (147): `How PetDoorStep handles your booking details in Ludhiana: what we store and why, WhatsApp, Google Analytics, how long we keep data and your rights.`
- **H1:** `Privacy Policy — How PetDoorStep Handles Your Data`

## 2 · Blocks (DOM order)

Each block names the rule it satisfies: **r.4** / **r.5** = IT Rules 2011 · **s.** = DPDP Act 2023. Headings are H2
unless stated. Body copy below is final unless it names a `legal.ts` export, which the page renders verbatim.

| # | Block | Spec |
|---|---|---|
| PP-0 | Breadcrumb | `Home › Privacy Policy` (BreadcrumbList, 2 items). |
| PP-1 | Header | H1 · line "Effective from [FILL:POLICY_EFFECTIVE_DATE]." (`IDENTITY.POLICY_EFFECTIVE_DATE`) · summary: "This policy explains what personal data PetDoorStep collects when you use this website or book with us, why we collect it, who handles it, how long we keep it and the choices you have. In short: we use your booking details only to handle your booking, we send reminders, review requests and offers on WhatsApp only after you reply YES, and we never sell your data." Source: D4 (`00` §11) · `09` §9.3/§9.5. Satisfies r.4(i), s.5. |
| PP-2 | **Who we are** | "This website and the PetDoorStep service are run by [FILL:LEGAL_NAME] ("PetDoorStep", "we"), a doorstep pet-care service in Ludhiana, Punjab. We come to you; there is no walk-in centre." + contact line: WhatsApp `[FILL:WHATSAPP_NUMBER]` · email `[FILL:EMAIL]` (values from `site.ts`). Source: `IDENTITY.LEGAL_NAME` · `05` §4 (NAP, no displayed address) · `contact.md` CO-3. Satisfies r.5(3)(d) (name; address: see ship checks), s.8(9). |
| PP-3 | **What we collect and why** | Table, one row per source. Columns: what · details (rendered from `legal.ts`) · why · basis. ① **Booking form:** `LEAD_COLUMNS` shown through `LEAD_COLUMN_LABELS` (service id and label print once) — to confirm the booking on WhatsApp, price it and arrange the visit · basis: you give it to us to book (s.7(a), D4). ② **Waitlist (Outside Ludhiana):** `WAITLIST_COLUMNS` (name, mobile, area or city) — one WhatsApp message the day we start in your area · s.7(a). Source `07` §3 Step 1. ③ **WhatsApp chat:** number, profile name, messages and photos you send — to confirm and run your booking, and, if you choose to answer, to note how you heard about us · s.7(a). Source `07` §5 step (c) · `09` §5. ④ **Visit photos:** photos of your pet during a groom or walk — sent to you as the photo update; featured on our website, Instagram or Google profile only after you reply YES · s.7(a) for the update, consent for features. Source `00` §3.4 · `06` §4.3 · `SERVICE_RULES` `photos`. ⑤ **Team notes:** `OPERATOR_COLUMNS` (how you heard about us, booking status, the date you replied YES) · s.7(a); the YES date is our consent record. Source `09` §5 · D4. ⑥ **Website statistics:** see PP-7. ⑦ **Saved on your device:** see PP-6. ⑧ **Job applications** (once `/join-as-groomer/` is live): what you send on WhatsApp — only to assess your application. Source `join-as-groomer.md` JG-5. Closing line: "We don't ask for passwords, card or bank details, or any health information about you. There is no account to create, and no payment is taken on this website." Source `06` §9 R5 · `SERVICE_RULES` `pay-after`. Satisfies r.4(ii)–(iii), r.5(3)(a)–(b), s.5(1)(i). |
| PP-4 | **How we use your data — the YES rule** | Renders `CONSENT_TEXT` items 2–3 ("Bookings & WhatsApp", "Reminders, reviews & offers") verbatim, with `fillContact()` filling the WhatsApp number and email from `site.ts`. Then: "Featuring your pet's photos also needs your YES on WhatsApp. You can withdraw any YES at any time; it does not affect what we did before you withdrew it. If we ever want to use your data for a purpose not listed here, we will ask you first." Source: D4 · `06` §4.3, §9 W4–W6 · `RIGHTS` `withdraw`. Satisfies r.5(5), r.5(7), s.6(4), s.7(a). |
| PP-5 | **Who else handles your data** | Table rendered from `PROCESSORS` (name · what for · which data) + `CROSS_BORDER_NOTE`. Then: "We share data only with these services, to run your booking, or when the law requires it. We never sell it, and we never share it for advertising." Backup emails from Web3Forms arrive in our inbox (`[FILL:EMAIL]`). Source: `PROCESSORS` · `07` §5a · `09` §9.5. Satisfies r.4(iv), r.5(3)(c), r.6. |
| PP-6 | **Cookies and data saved on your device** | Intro: "We set no advertising cookies. Google Analytics sets two cookies, on the live website only. Everything else below is saved in your own browser by this website, mostly by the booking form; your booking details reach us only when you send a booking or a waitlist request. You can delete all of it in your browser settings." Table rendered from `STORAGE_KEYS` (name · where · what for · how long). Then the "We don't use" list from `NOT_USED`. Source: `STORAGE_KEYS` · `NOT_USED` · `07` §5a, §6 · `09` §9.4. Satisfies r.4(ii). |
| PP-7 | **Website statistics (Google Analytics)** | `CONSENT_TEXT` item 1 ("Analytics") verbatim, then a list from `GA4_SETTINGS`: runs on the live website only · Google Signals off · no Google Ads link, no remarketing, no audience export · no heatmaps or session recording · detailed visit and event data kept for 14 months (`dataRetentionMonths`) · IP addresses not logged or stored · area names you type are sent with digits removed and cut to 30 characters · events never carry your name or mobile number (`GA4_PARAMS`). Source: `09` §1, §9.1–§9.2 · E10. Satisfies r.4(ii)–(iii). |
| PP-8 | **How long we keep your data** | List rendered from `RETENTION` (booking and waitlist records `[FILL:RETENTION_LEADS]` · WhatsApp chats `[FILL:RETENTION_CHATS]` · photos `[FILL:RETENTION_PHOTOS]` · detailed Google Analytics visit and event data 14 months · on-device data as in PP-6). Then: "After that we delete it, unless the law requires us to keep it longer." Source: `RETENTION` · `IDENTITY.RETENTION_*`. Satisfies r.5(4), s.8(7). |
| PP-9 | **How we protect your data** | "Every page of this website is served over a secure HTTPS connection. Booking records are kept in a private Google Sheet that only our team can open, and the web address our booking form sends them to is kept secret. We take no card or bank details online. If a data breach affects you, we will tell you and the Data Protection Board of India as the law requires." Source: `02` P002 · `07` §5a · `09` §9.3 · `SERVICE_RULES` `pay-after` · s.8(6). Satisfies r.4(v), r.5(8), s.8(5). |
| PP-10 | **Your rights** | List rendered from `RIGHTS` (`text` items; the `law` field prints after each as small slate text, e.g. "DPDP Act s.11"). Then: "To use any of these rights, WhatsApp us on [FILL:WHATSAPP_NUMBER] or email [FILL:EMAIL]. For a complaint, contact our Grievance Officer below." Source: `RIGHTS` · `09` §9.5 (7-day deletion) · `site.ts`. Satisfies r.5(6)–(7), ss.6(4), 11–14. |
| PP-11 | **Grievance Officer** | Card: `[FILL:GRIEVANCE_OFFICER_NAME]` · `[FILL:GRIEVANCE_EMAIL]` · `[FILL:GRIEVANCE_PHONE]` + "Our Grievance Officer replies to every complaint within one month of receiving it (`LAW.GRIEVANCE_REPLY`). If the reply does not resolve your complaint, you can complain to the Data Protection Board of India: [FILL:DPB_COMPLAINT_LINK]." Source: `IDENTITY.GRIEVANCE_*`, `IDENTITY.DPB_COMPLAINT_LINK` · `LAW` · `RIGHTS` `grievance`, `board`. Satisfies r.5(9), s.5(1)(iii), s.8(10), s.13. |
| PP-12 | **Children** | "You must be [FILL:MIN_AGE] or older to book with us. If you are younger, please ask a parent or guardian to book for you. We do not knowingly collect personal data from children." Source: `IDENTITY.MIN_AGE` · s.9. |
| PP-13 | **Changes to this policy** | "When we change this policy, we update the effective date at the top of this page. A new purpose for your data always needs your YES first (PP-4)." Source: D4 · `IDENTITY.POLICY_EFFECTIVE_DATE`. Satisfies r.4(i). |
| PP-14 | **Contact us** | WhatsApp `[FILL:WHATSAPP_NUMBER]` (wa.me link, `data-source="privacy-policy_page"`) · email `[FILL:EMAIL]` · phone `[FILL:PHONE]` (`tel:`, same source) · line "A real person replies on WhatsApp within 10 minutes, 9:00–19:00." Source: `site.ts` · `05` §4 · `00` §3.1 (D3) · `09` §2d (`<slug>_page`). No CTA band: this is a legal page. |

## 3 · Images

None. The page is text and tables only (no hero photo, no OG image of its own: it uses `/og/default.png`,
`04-TECHNICAL-SEO.md` §4).

## 4 · Ship checks

- [ ] Lawyer has reviewed and signed off the rendered page (`00` §9 item 7). The review settles: (a) whether a postal
      address must be published (IT Rules r.5(3)(d); Consumer Protection (E-Commerce) Rules 2020, if they apply),
      given that `05` §4 never displays `[FILL:BASE_ADDRESS]`; (b) whether Google Analytics cookies need consent under
      the DPDP Act (`09` §9.4 chose no cookie banner for Phase 1); (c) minimum retention periods before the
      `RETENTION_*` tokens are filled; (d) the cross-border wording (`CROSS_BORDER_NOTE`); (e) which DPDP Act and DPDP
      Rules provisions are in force on the effective date
- [ ] Every `IDENTITY` token in `legal.ts` filled; `grep -r "FILL:" website/` clean for this page (`00` §8)
- [ ] All tables render from `legal.ts`: `STORAGE_KEYS`, `LEAD_COLUMNS` + `LEAD_COLUMN_LABELS`, `WAITLIST_COLUMNS`,
      `OPERATOR_COLUMNS`, `PROCESSORS`, `RIGHTS`, `RETENTION`, `GA4_SETTINGS`, `NOT_USED`. No list is retyped in the page
- [ ] `STORAGE_KEYS` matches the code: every key from `grep -rhoE "pds_[a-z0-9_]+" website/src` (minus `legal.ts`) is
      in `STORAGE_KEYS`. `LEAD_COLUMNS` equals the keys of `bookingPayload()` in `src/lib/leads.ts`
- [ ] `CONSENT_TEXT` is identical to `09-ANALYTICS-TRACKING.md` §9.5, and the built page contains no `{whatsapp}` or
      `{email}` slot (`fillContact()` applied)
- [ ] A new third-party service (for example Cloudflare Web Analytics, optional per `09` §1) or the mailbox provider
      behind `[FILL:EMAIL]` is added to `PROCESSORS` before it goes live
- [ ] Title, meta and H1 exactly as §1; meta has no double quotes. P021 (CTA in meta) is N/A on legal pages; record
      it as N/A in the `02` audit
- [ ] Indexable and self-canonical; BreadcrumbList is the only schema; linked from the footer legal row on every page
      (`02` P051)
- [ ] `/privacy-policy/` set to `live` in `website/src/data/routes.ts` on publish day. This also switches on the
      booking form's consent-line link (`07` §3 Step 5, D4)
