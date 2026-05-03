# Callline · Build Status

> Living doc. I (Claude) update this as we go so you can pick up where we left off without scrolling back through chat. Last updated: 2026-05-03 (session 2).

---

## DONE

### Foundation
- [x] Next.js 16.2.4 + React 19.2.4 + Tailwind v4 + TypeScript scaffolded
- [x] Latest deps installed: framer-motion 12, @react-three/fiber 9, @react-three/drei 10, three 0.184, lenis 1.3, @vercel/analytics 2
- [x] Tailwind v4 `@theme` tokens: bone, ink, ember, forest, cinema easing
- [x] Fraunces (variable, SOFT/WONK/opsz) + Inter Tight via `next/font/google`
- [x] Lenis smooth-scroll wrapper with `prefers-reduced-motion` opt-out
- [x] All copy lives in `src/content/copy.ts`. No em dashes anywhere.

### Sections (in scroll order)
- [x] Sticky top bar (translucent + blur on scroll, live pulse dot, single "Book a demo" link)
- [x] Hero (cinematic line-mask reveal, italic ember "job", dual CTA, copy-to-clipboard on desktop / `tel:` on mobile)
- [x] Wow section: 320vh sticky scroll-pinned 5-phase sequence (idle → missed call → transcript → calendar → stack)
- [x] Phone mockup (CSS perspective + Framer Motion, replaced R3F)
  - Originally built in R3F but the `<Html>` overlay scaling fought the 3D slab and rendered as a giant black rectangle
  - Switched to pure CSS phone slab with brushed-dark metal gradient, side button, volume buttons, glass bezel, screen reflection sheen
  - Hero mode: gentle floating tilt loop on rotateY/X/Z + Y bob (CSS 3D transforms)
  - Wow mode: scroll-progress driven rotation + scale via `useTransform`
  - Idle screen shows ember halo + pulsing dot so the device visibly breathes
  - R3F code preserved at `src/components/three/PhoneScene.tsx` for future revisit; no longer wired in
- [x] 2D fallback (`PhonePoster.tsx`) for SSR + reduced motion
- [x] Numbers section: 4 stats with 0→value tickers
- [x] How it works: 3 steps, typography-led, single ember underline accent
- [x] Live demo CTA: forest dark, big italic "Don’t read about it. Call it."
- [x] Pricing: 3 cards (delete 2 before launch, see "On you")
- [x] FAQ: 8 items, smooth height accordion
- [x] Footer: TEKMADEV credit, location, contact, ember-free editorial close

### SEO + AEO
- [x] Full JSON-LD `@graph`: Organization, WebSite, LocalBusiness, ProfessionalService, SoftwareApplication, Service, FAQPage, WebPage, OfferCatalog
- [x] 29 GTA/Ontario service cities listed individually in schema
- [x] 16 home service trades named in schema
- [x] `robots.txt` explicitly allows 21 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.)
- [x] `llms.txt` at `/llms.txt` for AEO summary
- [x] `sitemap.xml`
- [x] OG image route renders (1200x630 PNG, verified)
- [x] Geo metadata (geo.region, ICBM, business contact data)
- [x] Hreflang `en-CA` / `en-US`

### Quality gates
- [x] `npm run build` clean
- [x] `npm run lint` clean
- [x] All 7 sections render server-side (curl verified)
- [x] No em dashes anywhere in `src/`

---

## ON YOU (only Shajeed can do these)

- [ ] Buy domain `callline.ai` (or `.com` / `.co`)
- [ ] Connect domain in Vercel
- [ ] Replace `CAL_BOOKING_URL` in `src/lib/constants.ts` with your real Cal.com link
- [ ] Pick which of the 3 pricing cards to keep, delete the other 2
  - Delete the data: `src/content/copy.ts` → `pricing.plans` array
  - The card component itself stays; just shrink the array
- [x] Pushed to GitHub: https://github.com/Tekmadev/callline (main branch)
- [x] Deployed to Vercel: https://callline-two.vercel.app
  - Homepage, OG image, llms.txt, robots.txt, sitemap.xml all 200 OK in production
- [ ] (Optional) Replace SVG poster fallback (`src/components/three/PhonePoster.tsx`) with a real product screenshot
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools after deploy
- [ ] Create `hello@callline.ai` mailbox so the footer email link works
- [ ] Verify the AI demo line (`1-866-966-1988`) is actually live before driving traffic

---

## NICE TO HAVE (not blocking launch)

- [ ] Add an `AggregateRating` block to schema once you have 3+ real customer testimonials
- [ ] Per-city landing pages (`/locations/[city]`) for hyper-local SEO
- [ ] Twitter/X handle → drop into `metadata.twitter.creator` in `src/app/layout.tsx`
- [ ] Founder LinkedIn/X → add to `socialProfiles` in `src/lib/seo/site.ts` (feeds `Organization.sameAs`)
- [ ] Real customer logos / a thin trust bar
- [ ] A short case-study post or two (long tail SEO)
- [ ] Replace placeholder copy in `src/content/copy.ts` if any of the example bookings (Sarah K., Marco D., Priya R.) feel off

---

## OPEN QUESTIONS / DECISIONS PENDING

_none right now. ask away and I’ll add items here._

---

## HOW THIS DOC WORKS

- Claude updates this file at the end of any session that changes the project.
- "DONE" is what shipped. "ON YOU" is what only you can do. "NICE TO HAVE" is post-launch upside.
- If you want something added, tell me in chat and I’ll write it here.
- If something here is stale, tell me and I’ll fix it.
