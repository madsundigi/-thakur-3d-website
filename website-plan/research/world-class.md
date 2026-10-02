# World-Class Pet-Care & Local-Services Website Teardown
### Conversion & UX patterns to adapt for PetDoorStep (Ludhiana) — Astro static site + WhatsApp booking

**Date:** 2026-10-02
**Sites studied:** rover.com, wagwalking.com, barkbus.com (+ its city/FAQ pages), pawshake.com, groomit.me, petsmart.com grooming, furryland.us, zoomingroomin.com, barkandmane.com (ex-Aussie Pet Mobile), urbancompany.com, Booksy/Treatwell booking flows, plus Indian benchmarks (Supertails, Vetic) and Ludhiana incumbents (thePetNest, Mr n Mrs Pet).
**Method note:** direct page fetches were egress-blocked in this environment; teardown reconstructed from extensive search-engine content extraction of the live pages, their indexed copy, Yelp/Trustpilot/press coverage, and published UX case studies (Urban Company checkout redesign, multi-step-form research). All copy quoted below is actual indexed site copy.

---

## PART 1 — THE 25 BEST BLOCKS & PATTERNS

### A. HERO FORMULAS

#### 1. Emotional-identity hero (Barkbus)
- **What:** Headline "Your dog has a person. Now they have a stylist." Sub-promise: "Your dog gets one stylist, start to finish." Single primary CTA "Book Now", secondary "Call or text (800) 742-9255".
- **Why it converts:** Sells the relationship and the outcome, not the task. Flatters the owner ("your dog has a person" = you), instantly differentiates from commodity grooming. One obvious next step, no nav clutter competing with it.
- **Adapt for PetDoorStep:** Hero H1: "Ludhiana's pets get spa days now — at your doorstep." or "Your dog has a family. Now they have a groomer who comes home." Sub: "Background-verified groomers · sanitised kit for every pet · fixed prices · on-time slots." Primary CTA: "Book on WhatsApp" (green, WhatsApp icon), secondary: "Call 98xxx-xxxxx". Keep hero to one screen on a 360px phone.

#### 2. Outcome + neighborhood + trust-qualifier hero (Rover)
- **What:** "Loving pet care in your neighborhood™" + "Book trusted sitters and dog walkers." The word *neighborhood* does heavy lifting — care feels nearby and personal.
- **Why it converts:** "Trusted" + "your neighborhood" answers the two biggest anxieties (who are these people / will they come to me) in 8 words.
- **Adapt:** Use locality names literally in rotating hero text or sub-head: "Trusted doorstep pet care in Sarabha Nagar, BRS Nagar, Model Town & all of Ludhiana." On each locality page the H1 swaps in that locality. This is also exact-match SEO for "pet grooming at home in Sarabha Nagar".

#### 3. Hero with embedded booking widget (Rover)
- **What:** Rover's hero IS the booking start: service selector (Boarding / House Sitting / Drop-In / Day Care / Walking as icon tabs), location (zip), dates, dog-size chips (0-15 / 16-40 / 41-100 / 101+ lbs). Search button = commitment begun.
- **Why it converts:** Zero scroll to start transacting; selecting chips is play, not form-filling; commitment escalates ("foot-in-the-door").
- **Adapt:** Astro hero widget (vanilla JS, no backend): Step 0 inline in hero = [Dog 🐶 / Cat 🐱 toggle] + [Service dropdown: Bath & Groom / Full Groom / Walking / Vet Visit / Tick & Flea] + [Area dropdown: 10 localities + "Other"] + button "See price & book →" which jumps into the multi-step booking form with those 3 answers pre-filled. Everything stays client-side; final step deep-links to WhatsApp.

### B. PRICE TRANSPARENCY

#### 4. "One price, all-in" package framing (Barkbus)
- **What:** The Signature Service lists EVERYTHING included at no extra cost: "Warm filtered hydro-jet water bath, all-natural shampoos/conditioners/face wash, hand blow dry, gentle brush-out, ear cleaning, nail trimming & filing, teeth brushing, anal gland expression if needed." Explicit anti-nickel-and-diming copy: "No add-ons. No rushing. Teeth and ears included. Nails always part of the service." Plus: "No puppy upcharge — first grooms are priced the same."
- **Why it converts:** Kills the #1 fear with mobile services: surprise charges at the door. The itemised inclusion list also makes the price feel bigger-value.
- **Adapt:** Every package card shows a ✓-list of 8-10 inclusions and a ✗-list is never needed because nothing is extra except clearly-flagged add-ons (medicated shampoo, de-matting >15min). Print "Price you see is the price you pay — confirmed on WhatsApp before we arrive. No surprise charges at your door." Hindi/Hinglish echo: "Koi hidden charges nahi."

#### 5. Price-by-size matrix (PetSmart / Furry Land / Wag)
- **What:** PetSmart prices by weight tier (Small <25lb $45-65 → XL 90lb+ $85-120+); Furry Land city pages show "from $140 (0-25 lbs) to $200+ (110+ lbs)"; Wag tiers by duration (20/30/60-min walks). "Check Prices" is a first-class pre-login step: pick species → breed → age → see estimated prices for ALL services.
- **Why it converts:** Users self-serve a quote in seconds; a from-price anchors expectations and pre-qualifies leads so WhatsApp chats are shorter and closer to closing.
- **Adapt:** A pricing table on EVERY service page: rows = Small (<10kg, e.g. Shih Tzu, Lhasa) / Medium (10-25kg, e.g. Beagle, Cocker) / Large (25kg+, e.g. Labrador, GSD, Golden) with named example breeds Ludhiana owners actually have; columns = package (Basic Bath ₹699 / Bath & Tidy ₹1,199 / Full Groom ₹1,799 / Premium Spa ₹2,499 — exact numbers, "starting" only where coat condition matters). Add a note row for Persian/long-coat cats. Dedicated /pricing page aggregating all matrices = strong "pet grooming price in Ludhiana" SEO target.

#### 6. Instant quote before contact (Groomit)
- **What:** "Enter your address, select your pet's details and service type, and you'll see instant pricing and available times. Book in 60 seconds." Price shown BEFORE any account/payment. Flexibility discounts are explicit: book 2-7 days ahead ("Eco") or recurring = cheaper; same-day shows exact premium upfront.
- **Why it converts:** Price certainty removes the main reason people stall; the flexibility discount shifts demand to efficient routing days (fewer dead kms — directly relevant to a doorstep business's unit economics).
- **Adapt:** In the booking widget, the moment size + package are chosen, show a live price line that sticks on screen through remaining steps ("Your price: ₹1,799 · Full Groom · Large dog"). Offer ₹100-200 off for "flexible slot (any time that day)" and 10-15% off monthly recurring grooms — shown as selectable toggles that update the live price.

### C. BOOKING-WIDGET STEP DESIGN

#### 7. The 4-step wizard with live price + progress (Groomit / Barkbus portal / Booksy)
- **What:** Common winning sequence: ① Area/zip check → ② Pet & service (breed, size, coat) → ③ Date & time slot from real availability → ④ Contact & confirm. Barkbus validates zip first with an error message if unserved. Booksy's insight: "clients see live availability, pick a slot, get instant confirmation" — 24/7, no waiting for business hours.
- **Why it converts:** Area check first = no wasted effort for unserved users (and a waitlist lead when outside area). Research: progress indicators cut abandonment 20-25%; 3-5 fields per step; 3-5 steps total (6+ bleeds even committed users); one HVAC firm got +41% completed bookings cutting to name/phone/time-slot.
- **Adapt (full spec in Part 2):** 4 steps, dot-progress "Step 2 of 4", price ribbon always visible, ends in a wa.me deep link with the entire structured order pre-filled. Static-site-friendly: slots are "preferred windows" (Morning 9-12 / Afternoon 12-4 / Evening 4-8 + date picker), confirmed by human on WhatsApp within X minutes.

#### 8. Dual-channel booking: self-serve + human concierge (Barkbus)
- **What:** "Book directly from your phone or browser — or our in-house Concierge team is here for anything. Call or text (800) 742-9255." The phone/text number appears in header, hero, FAQ, footer, every city page.
- **Why it converts:** Catches both personas: the self-server and the talker (in India, a huge share wants to talk/WhatsApp first). Text/call framing feels premium ("concierge") instead of call-center.
- **Adapt:** Every page: sticky "Book Now" (opens widget) + "WhatsApp us" (wa.me) + tap-to-call tel: link. Brand the human side: "Our Pet Care Manager replies on WhatsApp in under 10 minutes, 8am-9pm." Reply speed is the single biggest first-24h conversion factor in chat channels — staff it.

#### 9. Urban Company checkout lessons (cart persistence, slot truth, address memory)
- **What:** UC case studies found: biggest frustration = being told on a LATER screen that the chosen slot/pro is unavailable; fixes included true availability at selection time, persistent cart on home screen for returners, and pre-selected address for returning single-address users. UC service cards also show rating + booking volume per service ("4.8 ★ · 10M+ bookings").
- **Why it converts:** Never let a user invest effort then fail; returners re-book in 2 taps.
- **Adapt:** (a) Never show a slot UI that implies guaranteed confirmation — label "preferred time, we confirm on WhatsApp in minutes"; (b) persist widget state in localStorage so a return visit resumes at the same step with a "Finish your booking — Bruno's Full Groom" banner; (c) show "★ 4.9 · 300+ grooms in Ludhiana" style proof chips on service cards as soon as numbers are real (never fake them; start with "150+ happy pets in first 3 months" once true).

### D. TRUST & SAFETY PRESENTATION

#### 10. A named, dedicated protection program (Rover: RoverProtect / Pawshake Guarantee)
- **What:** Rover brands safety: every sitter passes an enhanced third-party background check (blue badge = basic, gold = enhanced, shown on every profile), the Rover Guarantee covers up to $25,000 in vet care, 24/7 support, secure payments, "95% of reviewed bookings have a perfect 5-star rating." Pawshake bundles "free veterinary coverage, Happiness Guarantee, Booking Guarantee, in-house support" under "The Pawshake Guarantee."
- **Why it converts:** A NAMED program ("RoverProtect") turns diffuse reassurances into one memorable asset; badges make vetting legible at a glance.
- **Adapt:** Create the "PetDoorStep Promise" — its own page + a 4-icon strip repeated on every page: ① Police-verified & Aadhaar-verified groomers ② Fresh sanitised kit per pet (sealed in front of you) ③ Fixed price, confirmed before arrival ④ On-time or ₹100 off. Add "Satisfaction promise: not happy? We re-groom free within 48 hours." Give each groomer a visible ID badge in photos. This single pattern is PetDoorStep's biggest differentiation lever in Ludhiana.

#### 11. The vetting-story block — show HOW you hire (Barkbus "Pawdition")
- **What:** Barkbus publicises its hiring funnel: application → phone screen → virtual interview with a Grooming Manager → on-site technical grooming assessment they call "The Pawdition" → offer + background check; minimum 1 year professional experience; above-market pay and benefits (= stylist quality & retention).
- **Why it converts:** Specific process beats adjectives. "Background-verified" is a claim; a 5-step funnel with a cute name is proof.
- **Adapt:** "How we choose your groomer" section (About page + condensed homepage block): "Only 1 in 10 applicants makes it: document & police verification → skill test on a live groom supervised by our head groomer → 2-week shadow training on our hygiene protocol → monthly re-training." Name the head groomer. Photograph the skill test.

#### 12. Named groomer profiles (Rover sitter profiles / Groomit choose-your-groomer)
- **What:** Rover profiles carry photo, experience, services, response time, review count, badges; Groomit lets users pick a groomer by photos/experience/verified reviews or take the "Best Match." Repeat-rebooking with the same person is a retention engine.
- **Why it converts:** People trust faces, not companies — especially for someone entering their home.
- **Adapt:** "Meet your groomers" page: real photo, first name, years of experience, speciality (e.g., "Persian cat de-matting", "aggressive-dog handling"), verification badges, a 2-line human bio ("Gurpreet has groomed 1,200+ dogs; his own lab is called Sheru"). In WhatsApp confirmation always send groomer name + photo + "verified" note before the visit — and promote "request the same groomer every time."

#### 13. Live visit updates / report card promise (Wag pup report / Barkbus mid-groom photos)
- **What:** Wag delivers GPS route, photos, pee/poop log after every walk; Barkbus "sends owners photos of their dogs throughout the grooming session."
- **Why it converts:** Converts an invisible service into shareable evidence; the expectation of updates is itself a trust signal at booking time.
- **Adapt:** Promise it on the site: "During every visit you get before/during/after photos on WhatsApp. Dog-walking clients get a daily walk report: route, duration, potty + water log." Cost: zero (WhatsApp). Also seeds your UGC gallery. For walking, a simple shared Google Maps live-location during walks = Wag-level GPS feature for free.

#### 14. Meet & Greet ritual (Pawshake / Rover)
- **What:** Free no-obligation Meet & Greet before first booking; Rover's safety centre even publishes example questions to ask.
- **Why it converts:** De-risks the first purchase; in-person/video contact collapses distrust.
- **Adapt:** "First time? Book a free 10-minute meet-and-greet — your groomer says hello to your pet at your door (or on video call) before you confirm anything." Great for anxious/aggressive pets and for the vet-at-home service; costs one short stop, wins lifetime customers.

### E. REVIEWS / UGC

#### 15. Aggregate + platform-anchored review proof (Barkbus / Rover)
- **What:** Barkbus: "60,000+ verified five-star reviews across Google and Yelp" — big number + third-party platforms named (their Yelp pages show 519 reviews/518 photos in LA alone). Rover: "95% of reviewed bookings have a perfect 5-star rating."
- **Why it converts:** Big round number = category leadership; naming Google/Yelp makes it verifiable; a percentage reframes quality ("95% perfect").
- **Adapt:** Drive every happy customer to Google reviews (QR card handed after groom + WhatsApp follow-up link). Show on site: "★4.9 on Google · 120+ Ludhiana pet parents" with a link to the live Google profile (verifiability beats volume early on). Refresh the count monthly in a single Astro data file.

#### 16. Testimonials with locality + pet name + photo
- **What:** Best groomer sites run review cards that name the neighborhood and the dog; grooming-website research is unambiguous: "the before-and-after photograph is the single most persuasive content a pet grooming business can produce."
- **Why it converts:** "Simran from Sarabha Nagar, with Bruno (Golden Retriever)" is 10x more credible than "Great service! — Customer." Hyper-local reviews double as locality-page content.
- **Adapt:** Review card schema: pet photo (from the visit), pet name + breed, owner first name + locality, service taken, 2-3 line quote, 5 stars, date. Rotate 3 per locality page matching THAT locality. Collect via post-visit WhatsApp: "Reply with 2 lines about today's groom + okay to feature Bruno's photo?"

#### 17. Before/after transformation gallery + Instagram embed
- **What:** Grooming-site best practice: before/after pairs categorised by breed/coat/cut; an embedded Instagram grid at page bottom proves the business is alive this week.
- **Why it converts:** Visual proof sells grooming faster than any paragraph; breed filtering lets an owner find THEIR dog.
- **Adapt:** /gallery with filter chips (Shih Tzu, Labrador, GSD, Golden, Persian cat, Indie). Each entry: before/after slider or side-by-side, breed, service, locality. Astro-friendly: images in repo + a JSON data file; Instagram via lightweight embed or static "latest 6 posts" grid refreshed at build. Watermark corner: petdoorstep.in — the photos WILL be shared in Ludhiana pet WhatsApp groups.

### F. SERVICE-DETAIL PAGE ANATOMY

#### 18. The complete service page template (synthesis: Barkbus + PetSmart + Groomit + UC)
- **What (observed common anatomy):** ① Service hero (name + locality + from-price + CTA) → ② "What's included" ✓-checklist → ③ price-by-size table → ④ how it works 3-4 steps → ⑤ who it's for / recommended frequency ("every 4-6 weeks") → ⑥ add-ons → ⑦ groomer/vetting trust strip → ⑧ before/after photos → ⑨ reviews for THIS service → ⑩ FAQ accordion (service-specific) → ⑪ related services → ⑫ closing CTA + sticky CTA throughout. PetSmart adds vaccination/health requirements; Barkbus adds "what happens during the appointment" narrative ("no cages, no waiting room, no handoffs between six strangers... warm water and a plan built for your dog's breed and coat").
- **Why it converts:** Answers every objection in the order users raise them; repeated CTAs catch readiness whenever it peaks; the narrative walkthrough lets the owner pre-live the appointment.
- **Adapt:** Make this the locked Astro template for all Phase-1 service pages (at-home dog groom, cat groom, puppy's first groom, dog walking, vet-at-home, tick & flea). Write the "your 60-90 minutes with us" timeline block: arrival & kit sanitisation shown to you → pre-groom health check (ears/skin/ticks) → service steps → photo report + care tips on WhatsApp. Add a visible "We bring everything: water, power backup if needed, towels, table — your home stays clean" paragraph (the #1 unspoken doorstep question).

#### 19. FAQ pattern (Barkbus FAQ page + PetSmart grooming FAQ)
- **What:** Barkbus FAQs answer operational anxieties: what happens during the appointment, pricing logic ("$120-350+, varies by size, breed, coat condition"), booking channels, service areas. PetSmart's covers health/vaccination requirements, age minimums, matting policy, cancellation.
- **Why it converts:** FAQs are the objection-handling layer AND a featured-snippet/AI-answer SEO surface (FAQPage schema).
- **Adapt:** Two tiers: global /faq (30+ Qs) + 5-8 service-specific Qs per service page. Must-answer set for Ludhiana: Do I need to provide water/electricity? Is the kit really sanitised (show the process)? Male/female groomer choice? What if my dog bites? Do you groom aggressive dogs / dogs in heat? Vaccination needed? Cash/UPI/card? What if I'm not home — can my parents supervise? Winter grooming (water temperature)? Tick season (monsoon) advice? Cancellation/reschedule on WhatsApp? Add FAQPage JSON-LD on every one.

### G. MOBILE & CTA MECHANICS

#### 20. Sticky bottom CTA bar (home-services landing-page research + Barkbus phone/text persistence)
- **What:** Converting local-service pages keep contact in the thumb zone: sticky bottom bar, ≥48px tap targets, working tel: links. Click-to-call buttons can lift calls ~200%; 56% of homeowners now prefer online booking to calls — so the winning bar carries BOTH.
- **Why it converts:** The mobile user's decision moment can occur anywhere on the page; the bar removes all scroll-back friction.
- **Adapt:** Global sticky bottom bar (mobile only): [WhatsApp 🟢] [Book Now] [Call 📞] — three buttons, Book Now largest/centre. On service pages the bar shows the live from-price ("Full Groom from ₹1,799 · Book"). Hide while booking widget is open. Desktop: sticky header CTA instead.

#### 21. WhatsApp deep-link engineering (wa.me best practice)
- **What:** `https://wa.me/91XXXXXXXXXX?text=<prefilled>` — prefilled first message dramatically raises send-rate (user types nothing) and tells you the source. Reply speed is the biggest first-24h conversion factor.
- **Why it converts:** Removes the blank-screen problem; pre-structures the lead so the human can quote instantly; source codes make a static site measurable.
- **Adapt:** Every WhatsApp CTA carries a context-specific prefill. Booking-widget final step composes: "Hi PetDoorStep! Booking request 🐾 Pet: Bruno, Golden Retriever (Large) | Service: Full Groom ₹1,799 | Area: Sarabha Nagar | Date: Sat 12 Oct, Morning | Ref: FG-SN-web". Plain page CTAs prefill per page: "Hi! I'm on your Dog Walking page for Model Town — monthly plan details please. [DW-MT]". The short ref code = free attribution analytics from a static site. Publish and enforce an SLA: "replies in <10 min, 8am-9pm."

### H. LOCALITY / CITY PAGES & SEO SURFACES

#### 22. The city/neighborhood page template (Barkbus /ca/los-angeles → /pasadena, /burbank; Furry Land location pages)
- **What:** Barkbus runs state → city → suburb pages, each with localized H1 ("Los Angeles Dog Grooming"), the service pitch, NEIGHBORHOODS SERVED list ("West Hollywood, Santa Monica, Beverly Hills, Silver Lake, Los Feliz, Pasadena, Brentwood, South Bay"), local reviews, booking CTA, local phone. Furry Land does city pages + long-tail variants ("Dog Grooming Specials Near Me in Orlando").
- **Why it converts/ranks:** Captures "near me"/locality intent with a page that actually mentions the user's area; neighborhoods-served list internally links the whole cluster.
- **Adapt:** Build /ludhiana/<locality>/ pages for Sarabha Nagar, BRS Nagar, Model Town, Civil Lines, Dugri, Pakhowal Road, South City, Ferozepur Road, Haibowal Kalan, Kitchlu Nagar. Each must have UNIQUE local substance (this is what makes it non-thin, unlike thePetNest): landmarks ("2 min from Sarabha Nagar market"), that locality's common breeds/society rules, 2-3 reviews from that locality, locality-specific FAQ (parking/society entry), a static map, same-day availability note. Architecture scales later: /jalandhar/, /chandigarh/ reuse the template → Punjab expansion is config, not redesign.

#### 23. Price/informational SEO pages (Wag's "Dog walking rates in {city}" pages)
- **What:** Wag publishes rate pages per city with median prices by duration ("median cost of a dog walk in New York is $18 for 20 min, $24/30, $37/60") updated monthly — they rank for every "how much does dog walking cost in X" query and funnel into booking.
- **Why it converts:** Price-research queries are high-intent; owning the answer page means owning the shopper one step before purchase.
- **Adapt:** Publish "Dog grooming price list in Ludhiana (2026)" , "Dog walking cost in Ludhiana: monthly packages compared", "Vet home-visit charges in Ludhiana" — each with YOUR real table, what affects price, competitor-range honesty ("salon grooming in Ludhiana runs ₹500-2,500; doorstep ₹800-3,500 — here's why"), updated-on date, CTA into the matching service page. These + breed guides ("Shih Tzu grooming guide for Indian summers") are the informational cluster the brief asks for.

### I. PHOTOGRAPHY & CONTENT STYLE

#### 24. Real-operation photography, not stock (Barkbus vans / Yelp photo volume / Zoomin Groomin)
- **What:** Barkbus imagery = branded vans at real curbs, one groomer + one dog, mid-groom photos; its customers add hundreds more on Yelp (518 photos in LA). Zoomin Groomin leads with the climate-controlled van and one-on-one cage-free attention. Nothing looks like a stock library.
- **Why it converts:** Users can tell stock from real in milliseconds; real kit/branded gear photos prove the operation exists and set service expectations.
- **Adapt:** Photo checklist for launch week (one half-day shoot): groomer in branded apron + ID badge at a real Ludhiana doorstep; the sealed-kit opening moment; table setup in a veranda/lobby; mid-bath happy dog; before/after pairs; the WhatsApp report screenshot; team group shot. Indian homes, Indian breeds (plenty of Labs, Shih Tzus, GSDs, Indies — not huskies on lawns). Every image gets descriptive alt text with service+locality keywords.

### J. RETENTION & OFFER MECHANICS

#### 25. Recurring plans & bundle economics (Groomit Eco/recurring discounts, PetSmart buy-5-get-1, Wag/Rover repeat-sitter loops)
- **What:** Groomit discounts flexible-date and recurring bookings; PetSmart sells a "Super Savings Package" (5 grooms + 1 free); marketplaces engineer repeat-with-same-provider loops.
- **Why it converts:** Grooming is a 4-8-week cycle and walking is monthly — the business is retention; pre-committed plans smooth routing and cash flow.
- **Adapt:** On every groom confirmation: "Book Bruno's next groom now for 6 weeks later and save ₹200." Site blocks: "Monthly Care Plans" (Walk+ plans ₹3,000-6,000/mo as per pricing; Groom Club: 5 grooms, 6th free, priority slots, same groomer). A simple printed/PDF loyalty card works without any backend.

---

## PART 2 — BOOKING FLOW TEARDOWN (synthesis → PetDoorStep spec)

**Observed flows:**
- **Groomit:** address → pet details (breed/size/needs) → service+groomer level → instant price → time → confirm. "Book in 60 seconds." Price always before commitment.
- **Barkbus:** zip validation (error if unserved) → dog & breed → service → date/time → contact; concierge call/text as parallel path; price range communicated, exact quote via portal/concierge.
- **Rover:** service → location → dates → dog size → browse sitters (profiles w/ badges+reviews) → message/Meet & Greet → book; payment held by platform.
- **Urban Company:** service card (rating + booking count) → cart (add-ons, "frequently added together") → address → slot grid → payment; redesign focused on real slot truth, fewer steps, cart persistence, saved addresses.
- **Booksy/Treatwell:** service list w/ prices → staff pick → live slot grid → instant confirmation; "the fewer clicks between seeing the work and picking a time, the higher the conversion."

**Drop-off science (form research):** 3-5 steps total; 3-5 fields per step; progress indicator (+20-25% completion) but never "step 1 of 9"; easiest/least-personal questions first, phone number last; show price early and keep it visible; thumb-size controls; chips/selects over typing; one HVAC service +41% bookings after cutting to name/phone/slot.

### PetDoorStep booking widget — exact spec (static Astro + JS, no backend)
Progress: 4 dots + "Step X of 4". Live price ribbon pinned after Step 2. State in localStorage (resume banner on return). Each step = one screen on mobile, big chip buttons, Back always available.

- **Step 1 — Area & pet (4 taps):** Locality dropdown/chips (10 localities + "Other Ludhiana" + "Outside Ludhiana") · Dog/Cat toggle · size chips with breed examples (Small <10kg · Medium 10-25kg · Large 25kg+). *Edge:* "Outside Ludhiana" → friendly block: "We're coming to your area soon! Leave your WhatsApp number / join waitlist" (captures the lead instead of a dead end — Barkbus zip-check pattern).
- **Step 2 — Service & add-ons:** Package cards with price FOR THE CHOSEN SIZE already computed (no "from" ambiguity now), ✓-inclusions on card, optional add-ons as checkboxes with prices (tick & flea dip +₹300, de-matting +₹200, nail-only etc.). Price ribbon appears: "Your price: ₹1,799 — no hidden charges."
- **Step 3 — Date & time window:** Next-14-days date strip (today/tomorrow emphasised, "Today" hidden after 4pm) · window chips Morning 9-12 / Afternoon 12-4 / Evening 4-7 · honesty line: "We confirm your exact slot on WhatsApp within 10 minutes" (avoids UC's false-availability trap) · optional "Flexible — any window (save ₹100)".
- **Step 4 — Pet name & handoff:** Pet's name (personalises the WhatsApp message; skippable) · "Anything we should know? (skin issues, anxious, first groom)" optional textarea · big green button "Confirm on WhatsApp →" composing the full structured wa.me message (pet, breed/size, service+add-ons, price, locality, date+window, notes, ref code). Below: "No advance payment. Pay cash/UPI after the service." *That line is itself a conversion weapon in India.*
- **Edge handling:** invalid/empty fields → inline messages, never alerts; WhatsApp not installed (desktop) → wa.me web fallback + visible phone number; user abandons → state persists + resume banner; price-affecting coat condition → disclosed in Step 2 card footnote ("severe matting may add ₹200-300 — always told before we start, never after").
- **Measurement on a static site:** ref codes per source/page/locality inside the prefill + simple client-side event pings (Plausible/GA4) per step = full funnel visibility without a backend.

---

## PART 3 — 5 THINGS EVERY WORLD-CLASS SITE DOES THAT LUDHIANA COMPETITORS DON'T

(Ludhiana reality: thePetNest/Mr n Mrs Pet/Petgroomly/Urban Pets run thin template city pages — generic copy swapped per city, callback/enquiry forms, no named staff, no local proof. Local clinics have basic brochure sites or only GMB/Justdial listings.)

1. **Exact prices on the page.** Barkbus/Groomit/PetSmart/Wag all publish numbers or instant quotes; Ludhiana aggregators hide behind "request a callback"/vague packages. A full ₹-price matrix by size & breed per service makes PetDoorStep instantly the most trustworthy result in the market — and wins every price-intent query.
2. **Named humans with a vetting story.** Rover/Groomit show the actual person, their experience, badges and reviews; Barkbus publicises its hiring funnel. No Ludhiana competitor shows a single groomer's face or verification. "Meet your groomer" + "How we hire (1-in-10)" is near-zero cost and locally unprecedented.
3. **A named guarantee/safety program.** RoverProtect, Pawshake Guarantee, Barkbus one-price promise vs. zero published guarantees locally. The "PetDoorStep Promise" (verified groomers, sealed sanitised kit, fixed price, on-time-or-₹100-off, free re-groom) occupies trust ground nobody in Punjab holds.
4. **Visual proof at volume.** 60k reviews, 500+ customer photos, before/after galleries, mid-service photo updates vs. stock images and five anonymous testimonials locally. Real Ludhiana dogs + locality-tagged reviews + WhatsApp photo reports compound into an unfakeable moat.
5. **A real booking flow, not an enquiry form.** World-class sites convert in 60 seconds with live pricing, slot choice and instant confirmation; local players offer forms that go nowhere or just a phone number. The 4-step widget → structured WhatsApp handoff (with no-advance-payment reassurance) delivers an app-grade flow on a static site.
6. *(Bonus)* **Depth of locality + informational content.** City pages with genuinely local substance and price/breed/seasonal guides (Wag rate pages, Barkbus neighborhood lists) vs. copy-paste city templates — this is PetDoorStep's entire organic-SEO opening, and the same template scales to Jalandhar/Chandigarh/Punjab in Phase 2.

---

## Sources
- [Rover homepage](https://www.rover.com/) · [Rover dog boarding](https://www.rover.com/dog-boarding/) · [Rover search](https://www.rover.com/search/) · [RoverProtect](https://www.rover.com/rover-protect/) · [Rover safety reviews — Canine Journal](https://www.caninejournal.com/rover-dog-sitting-reviews/) · [Is Rover Safe](https://caninecabcompany.com/is-rover-safe/)
- [Barkbus](https://www.barkbus.com/) · [Barkbus FAQ](https://www.barkbus.com/faq) · [Barkbus Los Angeles](https://www.barkbus.com/ca/los-angeles) · [Barkbus LA Yelp (519 reviews/518 photos)](https://www.yelp.com/biz/barkbus-mobile-dog-grooming-los-angeles-3) · [Barkbus profile — Pulse2](https://pulse2.com/barkbus-jeff-safenowitz-profile/) · [Barkbus hiring — Indeed](https://www.indeed.com/cmp/Barkbus-2/faq/hiring-process)
- [Wag!](https://wagwalking.com/) · [Wag NYC rates page](https://wagwalking.com/dog-walking/ny-new-york) · [Wag review — Dogster](https://www.dogster.com/lifestyle/wag-dog-walker-app/)
- [Pawshake](https://en.pawshake.ch/) · [How Pawshake works](https://support.pawshake.com/hc/en-be/articles/115002030183-How-does-Pawshake-work)
- [Groomit](https://www.groomit.me/) · [Groomit how it works](https://www.groomit.me/how-it-works) · [Groomit prices](https://www.groomit.me/pet-grooming-prices)
- [PetSmart grooming prices — PetSmartWays](https://petsmartways.com/petsmart-grooming-prices/) · [PetSmart grooming FAQ](https://services.petsmart.com/content/grooming-faq) · [Super Savings Package](https://services.petsmart.com/content/super-savings-package-faq)
- [Furry Land](https://furryland.us/) · [Furry Land Austin](https://furryland.us/locations/austin-mobile-pet-groomers/) · [Bark & Mane (ex-Aussie Pet Mobile)](https://www.barkandmane.com/dog-grooming/) · [Zoomin Groomin](https://www.zoomingroomin.com/)
- [UC AC-booking UX case study — Medium/UXM](https://medium.com/uxm-community/fixing-the-heat-a-ux-journey-through-urban-companys-ac-service-booking-experience-to-impact-137e4bd7e7ef) · [UC checkout redesign — Hard Copy/3 Sided Coin](https://thehardcopy.co/3-sided-coin-designs-a-new-checkout-for-urban-company/) · [UC custom-package case study](https://bootcamp.uxdesign.cc/enhancing-the-user-experience-of-booking-a-customized-package-on-the-urban-companys-app-an-b51b5295ad76)
- [Booksy online booking](https://biz.booksy.com/blog/get-clients-book-appointments-online) · [Treatwell online booking](https://www.treatwell.ie/partners/resources/blog/online-booking-for-salons/)
- [Multi-step form best practices — Heyflow](https://heyflow.com/blog/multi-step-form/) · [Drop-off research — Reform](https://www.reform.app/blog/multi-step-form-drop-off-rates-how-to-reduce-them) · [Form design — Venture Harbour](https://ventureharbour.com/form-design-best-practices/)
- [wa.me click-to-chat guide](https://u2l.ai/blog/whatsapp-click-to-chat-link) · [Click-to-chat revenue — Chatarmin](https://chatarmin.com/en/blog/click-to-chat-for-whatsapp)
- [Grooming website guide — MoeGo](https://www.moego.pet/blog/pet-grooming-business-websites) · [Click-to-call landing pages — Invoca](https://www.invoca.com/blog/7-awesome-examples-of-landing-pages-that-drive-click-to-call) · [Home-service landing checklist](https://bekindlocal.com/the-high-converting-checklist-for-home-service-landing-pages-in-2026/)
- [Supertails home vet](https://supertails.com/pages/at-home-vet-services) · [Vetic](https://vetic.in/vet-mumbai) · [thePetNest Ludhiana](https://thepetnest.com/pet-grooming/ludhiana) · [Mr n Mrs Pet Ludhiana](https://www.mrnmrspet.com/dog-grooming-in-ludhiana)
