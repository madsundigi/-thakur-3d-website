# 01 · SITEMAP — Every page, its job, its keyword, its blueprint

> Obeys `00-MASTER-PLAN.md` §5 URL rules. Primary keywords are reconciled with
> `03-KEYWORD-MAP.md` (that file wins on keyword wording). Status values:
> `planned → blueprinted → built → audited → live`.

## 1 · Page inventory

### Core & conversion pages
| URL | Page | Wave | Primary keyword target | Blueprint | Schema | Status |
|---|---|---|---|---|---|---|
| `/` | Home | 1 | pet grooming at home ludhiana · pet care services ludhiana | `blueprints/home.md` | LocalBusiness + WebSite + FAQPage | blueprinted |
| `/book/` | Book a service (widget host) | 1 | book dog grooming at home ludhiana | `blueprints/book.md` | BreadcrumbList (indexable; thin-safe content per blueprint) | built (Wave 0; audit pending) |
| `/pricing/` | Price list | 1 | dog grooming price ludhiana · pet grooming charges | `blueprints/pricing.md` | OfferCatalog + FAQPage + BreadcrumbList | blueprinted |
| `/thank-you/` | Booking confirmation | 1 | — (**noindex**) | in `book.md` | — | built (Wave 0; audit pending) |

### Money pages — city-service silo
| URL | Page | Wave | Primary keyword target | Blueprint | Schema | Status |
|---|---|---|---|---|---|---|
| `/ludhiana/dog-grooming/` | Dog Grooming at Home | 1 | dog grooming at home ludhiana · dog groomer near me | `blueprints/dog-grooming.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/cat-grooming/` | Cat Grooming at Home | 1 | cat grooming at home ludhiana | `blueprints/cat-grooming.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/dog-walking/` | Dog Walking | 1 | dog walker ludhiana · dog walking service near me | `blueprints/dog-walking.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/vet-at-home/` | Vet at Home | 1 | vet home visit ludhiana · veterinary doctor home service | `blueprints/vet-at-home.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/dog-vaccination/` | Dog Vaccination at Home | 2 | dog vaccination at home ludhiana | `blueprints/dog-vaccination.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/tick-flea-treatment/` | Tick & Flea Treatment | 2 | tick treatment for dogs ludhiana | `blueprints/tick-flea-treatment.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/puppy-grooming/` | Puppy Grooming | 2 | puppy grooming at home ludhiana | `blueprints/puppy-grooming.md` | Service + FAQPage + BreadcrumbList | blueprinted |
| `/ludhiana/` | Ludhiana city hub | 2 | pet care services in ludhiana | `_TEMPLATE-service-page.md` §3 City-hub variant | BreadcrumbList + WebPage (`about` → `#business`) | blueprinted |

### Area pages (long-tail local + "near me" support)
All Wave 2 · all from `blueprints/_TEMPLATE-area-page.md` · Schema: Service + BreadcrumbList · keyword pattern: *pet grooming / dog groomer in {area} ludhiana*

| URL | Area |
|---|---|
| `/ludhiana/areas/sarabha-nagar/` | Sarabha Nagar |
| `/ludhiana/areas/brs-nagar/` | BRS Nagar |
| `/ludhiana/areas/model-town/` | Model Town |
| `/ludhiana/areas/civil-lines/` | Civil Lines |
| `/ludhiana/areas/dugri/` | Dugri |
| `/ludhiana/areas/pakhowal-road/` | Pakhowal Road |
| `/ludhiana/areas/south-city/` | South City |
| `/ludhiana/areas/ferozepur-road/` | Ferozepur Road |
| `/ludhiana/areas/haibowal-kalan/` | Haibowal Kalan |
| `/ludhiana/areas/kitchlu-nagar/` | Kitchlu Nagar |

### Trust, info & supply pages
| URL | Page | Wave | Primary keyword target | Blueprint | Schema | Status |
|---|---|---|---|---|---|---|
| `/how-it-works/` | How it works | 1 | — (conversion support) | `blueprints/how-it-works.md` | HowTo + BreadcrumbList | blueprinted |
| `/about/` | About / our story | 1 | petdoorstep (brand) | `blueprints/about.md` | AboutPage + BreadcrumbList | blueprinted |
| `/contact/` | Contact | 1 | pet grooming contact number ludhiana | `blueprints/contact.md` | LocalBusiness + ContactPage + BreadcrumbList | blueprinted |
| `/faq/` | Master FAQ | 1 | pet grooming at home questions | `blueprints/faq.md` | FAQPage + BreadcrumbList | blueprinted |
| `/reviews/` | Reviews & results | 2 | petdoorstep reviews | `blueprints/reviews.md` | BreadcrumbList only — no Review markup (see 04) | blueprinted |
| `/safety-hygiene/` | Safety & hygiene standards | 2 | — (trust differentiator) | `blueprints/safety-hygiene.md` | BreadcrumbList | blueprinted |
| `/join-as-groomer/` | Careers: groomers/walkers | 2 | pet groomer jobs ludhiana | `blueprints/join-as-groomer.md` | BreadcrumbList + JobPosting per live role | blueprinted |
| `/offers/` | Offers & Groom Club | 2 | dog grooming offers ludhiana | `blueprints/offers.md` | BreadcrumbList + OfferCatalog (live offers) | blueprinted |

### Blog (informational silo — supports money pages)
| URL | Page | Wave | Source |
|---|---|---|---|
| `/blog/` | Blog index | 2 | `_TEMPLATE-blog-post.md` §6 Index variant |
| `/blog/<post-slug>/` | 26 posts, 1/week | 3 | topics + keywords in `10-CONTENT-CALENDAR.md`; anatomy in `_TEMPLATE-blog-post.md` |

### Legal & utility
| URL | Wave | Blueprint | Notes |
|---|---|---|---|
| `/privacy-policy/` | 1 | `blueprints/privacy-policy.md` | Mention lead data, WhatsApp, analytics (data: `website/src/data/legal.ts`) |
| `/terms/` | 1 | `blueprints/terms.md` | Service terms incl. pet-handling consent (data: `website/src/data/legal.ts`) |
| `/refund-policy/` | 2 | — | Must match what we honour (reschedule/refund rules) |
| `/404` | 1 | `04-TECHNICAL-SEO.md` §1.6 | Friendly + search + top services links |
| `/sitemap-0.xml`, `/robots.txt` | 1 | `04-TECHNICAL-SEO.md` §1.5, §7.1 | Auto via Astro integration (see `04-TECHNICAL-SEO.md`) |

**Count: 44 planned URLs** (14 Wave 1 · 21 Wave 2 · blog ongoing Wave 3) → ~55+ live pages by month 6.

## 2 · Internal-linking rules (the silo glue)

1. **Header nav:** Home · Services (dropdown: all live money pages) · Pricing · How it works · Reviews · Book Now (button). Every nav item renders only once its page is live (`08` §4.3) — so "Reviews" is hidden until `/reviews/` ships; the footer ★ line links `[FILL:GBP_LINK]` meanwhile.
2. **Every money page links to:** `/pricing/` + `/book/` + 2–3 sibling services + 3 nearest area pages + 1–2 supporting blog posts.
3. **Every area page links to:** all 4+ core money pages (with area-contextual anchor text) + `/book/`.
4. **Every blog post links to:** exactly the money page(s) named in `10-CONTENT-CALENDAR.md` (BOFU anchor in first half of post) + 2 related posts.
5. **Footer (site-wide):** all services, top 5 areas, trust pages, legal, NAP block (per `05-LOCAL-SEO.md`).
6. **Breadcrumbs** on every page below home: `Home › Ludhiana › {Service}` / `Home › Ludhiana › {Area}` (no "Areas" level, per `08` §4.18) — with BreadcrumbList schema.
7. Anchor text: descriptive + varied ("dog grooming at home in Sarabha Nagar"), never bare "click here".

## 3 · Future (expansion preview — do NOT build yet; triggers in `11-EXPANSION-PLAYBOOK.md`)

`/jalandhar/…` `/amritsar/…` `/chandigarh/…` `/patiala/…` city silos (clone procedure in file 11) ·
`/services/<service>/` national hubs · Hindi versions under `/hi/` with hreflang.
