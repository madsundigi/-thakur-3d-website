# Pet Care at Your Doorstep — Ludhiana Launch Strategy

> **Next step of this project:** the Phase-1 website planning system lives in
> [`../website-plan/`](../website-plan/00-MASTER-PLAN.md) — brand **PetDoorStep**,
> start at `00-MASTER-PLAN.md`.

A business strategy & feasibility report for an on-demand doorstep **pet-care
services** venture (grooming, bathing, dog walking, vet-at-home and more)
launching in **Ludhiana, Punjab, India**. Working brand used in the report:
**PawMitra** (placeholder — swap for your final name).

## Files

| File | What it is |
|------|-----------|
| `PawMitra-Ludhiana-Pet-Care-Strategy.pdf` | **The deliverable** — a 26-page designed report. Open this. |
| `pet-care-ludhiana-strategy.html` | The source document the PDF is rendered from. Edit this to change content. |

## What's inside the report

1. Executive summary & verdict (go / no-go)
2. Why pet care, why now — the India market opportunity
3. Why Ludhiana is a smart first market
4. The ground-level problems pet parents face today
5. Service-by-service deep dive & gap analysis (with pricing)
6. **App vs website — what to build first** (recommendation: web + WhatsApp first)
7. Competitor analysis — national, local & indirect, with a positioning map
8. How you make money — revenue streams & unit economics
9. Earnings potential — 3 scenarios with charts
10. What it costs to start — lean vs funded budgets
11. Go-to-market — getting your first 100 customers
12. The roadmap — Phase 0 to Punjab-wide expansion
13. SWOT + advantages & disadvantages
14. Risks & mitigations
15. The verdict & a 30-day action checklist
16. Sources & assumptions

## Regenerating the PDF

The PDF is rendered from the HTML with headless Chromium (Playwright):

```bash
NODE_PATH="$(npm root -g)" node render.js \
  pet-care-ludhiana-strategy.html \
  PawMitra-Ludhiana-Pet-Care-Strategy.pdf
```

Market figures are cited from public 2024–2025 industry reports (see the report's
Sources appendix). Financial projections are **illustrative scenarios**, not
guarantees — validate with a real pilot before committing capital.
