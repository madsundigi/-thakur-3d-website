# Launch photos — `src/assets/photos/`

Real photos for the site go in **this folder**, under the exact filenames below. `src/components/Photo.astro`
looks each image up by filename at build time: if the file is here it renders an optimised AVIF/WebP `<Picture>`,
otherwise a grey dev placeholder from `public/placeholders/`. **Adding a photo needs no code change.** Drop the file
in and rebuild.

Rules: `website-plan/08-DESIGN-SYSTEM.md` §5. In short:

- **Own photos only.** These are our groomers, our customers' pets and real Ludhiana homes. Never use stock,
  watermarked downloads or AI-generated pets (08 §5.1).
- **Consent first.** Get the owner's okay on WhatsApp before a pet is featured, and store the reply (06 §4.3).
  Never show a human face without explicit consent, and never show house numbers or nameplates (08 §5.1.4).
- **Filenames are the contract.** Use them exactly as written: lowercase, hyphens, 3–6 words (08 §5.5, `02` P058).
  `.jpg` is expected. A `.jpeg`, `.png` or `.webp` with the same base name also works. Rename files **before** you
  copy them in. A file called `IMG_0023.jpg` never belongs here.
- **Source size.** Export the long edge at ≥ 1200 px. Before/after frames must be square and ≥ 1200 × 1200
  (08 §5.3). The build crops every image to its slot's ratio (centre crop) and generates the widths itself, so
  don't pre-crop or pre-compress.
- **Weight budgets** apply to the largest variant the build serves: hero ≤ 120 KB, cards ≤ 60 KB, before/after
  frames ≤ 80 KB, groomer photos ≤ 40 KB, page total ≤ 1 MB (08 §5.6 / §8). If Lighthouse flags a photo, re-shoot or
  simplify the frame. Don't add a lower-quality override.

## The launch shot list (08 §5.2: one half-day shoot, 12 shots)

| # | Filename (put it here) | Shot | Used on | Slot / ratio |
|---|---|---|---|---|
| 1 | `golden-retriever-bath-home-ludhiana.jpg` | Groomer bathing a Golden Retriever in a verandah, mid-lather, calm | Home hero + `/ludhiana/dog-grooming/` hero (different crops); OG photo source | Hero: 4:3 (16:10 crop on phones) |
| 2 | `groomer-arriving-doorstep-ludhiana.jpg` | Groomer at a society gate with branded kit bag ("arriving" shot) | `/how-it-works/`, `/about/`, GBP #12 | Card 4:3 |
| 3 | `sealed-sanitised-grooming-kit.jpg` | Sealed kit opened in front of the camera, blades/towels visible | `/safety-hygiene/`, trust strips, GBP #3 | Card 4:3 |
| 4 | `grooming-table-setup-balcony-ludhiana.jpg` | Grooming table set up on a balcony, dryer + tools laid out | Service-page body ("we bring everything" block) | Card 4:3 |
| 5 | `cat-grooming-at-home-ludhiana.jpg` | Cat groom, calm handling, cat on towel at home | `/ludhiana/cat-grooming/` hero | Hero 4:3 |
| 6 | `shih-tzu-full-groom-before-ludhiana.jpg` | Shih Tzu **before** full groom (square, same angle as #7) | Gallery pair A, GBP #5 | Pair 1:1 |
| 7 | `shih-tzu-full-groom-after-ludhiana.jpg` | Shih Tzu **after** full groom (same angle/light as #6) | Gallery pair A, GBP #6 | Pair 1:1 |
| 8 | `labrador-bath-brush-home-ludhiana.jpg` | Labrador mid-bath, happy, water running | `/pricing/` + Bath & Brush sections, blog | Card 4:3 / blog 16:9 |
| 9 | `dog-walker-beagle-park-ludhiana.jpg` | Walker with a Beagle on leash, neighbourhood park | `/ludhiana/dog-walking/` hero, GBP #9 | Hero 4:3 |
| 10 | `vet-home-visit-pomeranian-ludhiana.jpg` | Vet examining a Pomeranian at home, vaccine cold box visible | `/ludhiana/vet-at-home/` + `/ludhiana/dog-vaccination/` heroes, GBP #10 | Hero 4:3 |
| 11 | `dog-nail-trim-at-home.jpg` | Nail-trim close-up, clipper + paw | Nail service row, `/ludhiana/dog-grooming/` body | Card 4:3 |
| 12 | `petdoorstep-team-founder-ludhiana.jpg` | Team group shot with founder, branded tees | `/about/`, GBP #11, founder-photo crop | Card 4:3 |

Later photos, such as more before/after pairs, area-page heroes and groomer portraits, follow the same naming
pattern: `{subject-or-breed}-{service-or-action}-{qualifier}-{locality?}-ludhiana.jpg`. In a pair, `before`/`after`
is the qualifier, and `-01`, `-02` count a same-subject series (08 §5.5). The page that shows a photo names it in
its `<Photo name="…">` prop. Add the file here under that name.

## Alt text is set on the page, not here

Each `<Photo>` call carries its own alt, written to the 08 §5.4 formula:
`{breed or subject} + {what is happening} + at home in {locality}, Ludhiana`. Only name the locality when the photo
was really taken there, and keep it ≤ 125 characters. If a photo turns out to show a different breed or locality
from the one its page assumed, update that page's alt in the same commit.

## Launch gate

Grey placeholders are for development only. 08 §8.4 allows zero `placeholder-*` files in `dist`. Two things can
break that: a page that still renders a placeholder, and the placeholder files themselves, because everything in
`public/` is copied into `dist`. Before go-live:

1. Check that no page still renders a placeholder. This must print nothing; each file it lists is a page still
   waiting for its photo:

   ```bash
   npm run build && grep -rl 'placeholder-' dist --include='*.html'
   ```

2. Delete the placeholder folder: `rm -r public/placeholders`. Once step 1 is clean, nothing references it.
3. Rebuild and run the full gate (08 §0 gate 2 + 08 §8.4). Both commands must print nothing:

   ```bash
   npm run build
   grep -rl 'placeholder-' dist
   find dist -name 'placeholder-*'
   ```

Each placeholder SVG carries the text `placeholder-` in a comment, so the `grep` fails on its own while one still
ships. The `find` check is a backstop in case a file is ever renamed or re-exported without that comment.
