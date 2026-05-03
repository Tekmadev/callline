# CLAUDE CODE PROMPT — `tekmadev3` / Callline Marketing Site

> Save this file as `BRIEF.md` in the root of your project folder before starting Claude Code. Then in Claude Code, run: `read BRIEF.md and let's build this`.

---

## CONTEXT FOR YOU, CLAUDE CODE

You are building a marketing landing page for **Callline** — an AI phone receptionist that answers missed calls for home service businesses (HVAC, plumbing, electrical, roofing, landscaping, painting, etc.) and books the job into their calendar.

The legal entity is **TEKMADEV Innovations Inc.** (footer only). The consumer-facing brand is **Callline**. This is the third attempt at building this site, and the first two were generic. **Do not build a generic AI-startup site.** If your output looks like another Vercel template with a gradient hero and three feature cards, you have failed.

The single goal of the site: **a homeowner-services business owner lands here, feels something, and either calls our AI line at `1 (866) 966-1988` or books a demo.** That's it.

---

## NON-NEGOTIABLES

1. **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion (latest), `@react-three/fiber` + `@react-three/drei` for the 3D phone, `lenis` for smooth scrolling. No CMS. Content is hardcoded in TypeScript files and easy for me to edit.
2. **Deploy target:** Vercel. Build must pass `next build` cleanly with zero warnings.
3. **Aesthetic direction:** Editorial / Apple-luxury. Huge serif display type. Generous negative space. Slow, cinematic reveals. **Not** brutalist. **Not** Linear.app glow-tech. **Not** retro-futurist. Think `apple.com/macbook-pro` + `mubi.com` + `monotype.com`. Calm confidence. The animation does the talking, not the copy.
4. **The wow moment:** A 3D phone scene (built with React Three Fiber) that reacts to scroll. As the user scrolls through the hero into the second section, the phone rotates, a missed call notification appears, then transforms in real time into a confirmed booking on a calendar. This must feel **inevitable and cinematic**, not gimmicky. Reference: the Apple AirPods Pro page scroll experience, or `igloo.inc`. If you cannot make it feel inevitable, fall back to a hand-keyed Framer Motion sequence — but do not ship something that looks like a portfolio demo.
5. **Typography:** Use **Fraunces** (variable, optical sizing) for display headings, and **Inter Tight** for body. Do NOT use Inter regular, Roboto, Space Grotesk, or any other AI-default sans. Display sizes should be massive — `clamp(56px, 9vw, 144px)` for hero. Body should be 17–19px and breathe.
6. **Color palette:** Bone white background `#F4EFE6`, ink black text `#0E0E0C`, single accent `#FF5B1F` (used sparingly — for one button, one underline, one moment of color). Optional: a deep forest `#1A2E22` for one section's reversed treatment. Dark mode is optional, but if included, must be a true ink palette `#0E0E0C` / `#F4EFE6`, not gray-on-gray.
7. **Motion principles:**
   - All entrance animations use `easeOut` cubic bezier `[0.16, 1, 0.3, 1]` (Apple-style overshoot)
   - Stagger reveals at 80–120ms intervals — never simultaneous
   - Text masks reveal line-by-line on scroll, not character-by-character (too gimmicky)
   - Hero h1 should reveal with a vertical mask wipe, slow, ~1.4s
   - Smooth scroll via Lenis, but never so slow it feels broken on trackpads
8. **Accessibility:** All animations respect `prefers-reduced-motion`. The 3D scene must have a static fallback poster image. Site must be fully usable with motion off.
9. **Performance budget:** Lighthouse mobile ≥ 85 performance, ≥ 95 accessibility. The 3D model is lazy-loaded after the hero is interactive. No blocking scripts.
10. **No AI slop tells:** no purple-to-blue gradients, no glassmorphism cards floating in space, no "✨" emojis in headings, no "Built with" badges, no animated background blobs, no neumorphism, no stock photos of generic business people on phones.

---

## PAGE STRUCTURE (build in this order)

### 0. Setup

- Initialize: `npx create-next-app@latest callline --typescript --tailwind --app --src-dir`
- Install: `framer-motion three @react-three/fiber @react-three/drei lenis @vercel/analytics`
- Configure Tailwind v4 with custom font tokens, color tokens above, and a custom `--ease-cinema` cubic bezier
- Set up `app/layout.tsx` with Fraunces + Inter Tight loaded via `next/font/google`
- Set up Lenis as a client wrapper component used in layout
- Add `<Analytics />` from Vercel

### 1. Top bar (sticky, becomes solid on scroll)

- Left: `Callline` wordmark in Fraunces, 18px, letter-spaced -0.02em. Add a small live-status pulse dot.
- Right: a single text link "Book a demo" → scrolls to CTA. No nav menu. Resist the urge to add one.
- On scroll past 80px, background fades from transparent to `rgba(244,239,230,0.85)` with `backdrop-filter: blur(12px)`.

### 2. Hero section (`100vh`)

- Massive Fraunces display headline, italic, three lines:
  - Line 1: `Every missed call`
  - Line 2: `is a job` (with the word `job` in italic, `#FF5B1F`)
  - Line 3: `you didn't lose.`
- Reveal: each line masks up sequentially, 200ms stagger, 1.4s duration each, eased with our cinema curve.
- Subhead, ~50ch, body font, `#0E0E0C` at 70% opacity:
  > "Callline is an AI receptionist that answers every call you can't, books the job into your calendar, and texts the lead to you in under 60 seconds. Built for home service businesses across Ontario."
- Two CTAs side-by-side, but visually un-equal:
  - **Primary, big, accent-filled:** "Call our AI now → 1 (866) 966-1988" — clicking it triggers a `tel:` link on mobile, copies to clipboard with toast on desktop. Below the button in mono 11px: "Call it like a real customer would. The AI will book you a live demo at the end."
  - **Secondary, ghost link with arrow:** "Or book manually →" — opens Cal.com in a new tab. (Placeholder URL: `https://cal.com/shajeed/callline-demo` — leave as a const I can edit.)
- Bottom of viewport: the 3D phone enters the canvas from the right, slowly. Tilted at ~15deg. Silent. Just sitting there.

### 3. THE WOW SECTION — Scroll-driven 3D sequence (`300vh` scroll height, sticky canvas)

- Use `useScroll` from Framer Motion + an `<R3F>` Canvas with a sticky position.
- The phone is a stylized model. **Don't try to model an iPhone with full fidelity** (legal + complexity). Use a clean abstracted slab: rounded rectangle, screen, single side button. Use `MeshTransmissionMaterial` from drei for a subtle glass effect on the screen, and a brushed metal-ish material on the body using `MeshPhysicalMaterial` with `clearcoat: 1, roughness: 0.3`.
- **Sequence as user scrolls 0% → 100% of the section:**
  1. **0–20%**: Phone rotates from -15deg to face-on. Text on side appears: "Tuesday, 2:47 PM. You're under a sink."
  2. **20–40%**: A "missed call" notification slides onto the screen. Customer name: "Sarah K." Text: "Their water heater is leaking. They need someone tonight."
  3. **40–60%**: The notification dissolves into a transcript bubble — "Hi, I'm Callline, calling on behalf of [your business]. I can book you for tonight at 7pm — does that work?" Text on side: "Callline answered in 0.4 seconds."
  4. **60–80%**: Transcript dissolves into a calendar event card on the screen — "Sarah K. — Water heater repair — Tonight 7pm — Confirmed." Text on side: "Booked. Without you touching your phone."
  5. **80–100%**: Phone tilts back, screen now shows a stack of three booked jobs. Text on side: "While you finish the job in front of you."
- Each transition uses `MotionValue` mapped to scroll progress. Side text fades in/out with a 5% scroll buffer at each phase boundary.
- **Fallback if the 3D is too heavy:** a Framer Motion sequence using PNG/SVG mockups of the phone screen. Still cinematic, still scroll-driven, just 2D.

### 4. The numbers section (calm, full-width, single column, centered)

- One stat at a time, big. Fraunces 120px+ for the number, body sentence below.
- Stats (use these, sourced from real industry data):
  - **27%** — average inbound calls missed by home service businesses.
  - **85%** — callers who don't reach you and never call back.
  - **$126,000** — what the average small business loses per year to unanswered calls.
  - **0.4 seconds** — Callline's average answer time.
- Each stat scrolls into view independently with a 200ms reveal. Number ticks up from 0 to final value over 1.2s using a custom easing.

### 5. How it works (three steps, but presented as a single horizontal story, not three cards)

- Heading, italic Fraunces: "How a missed call becomes a booked job."
- Then a horizontally-scrolling or scroll-pinned story track. Three frames:
  1. **The call comes in.** When you don't pick up after 2 rings, Callline does. It already knows your services, hours, pricing, and which questions to ask.
  2. **Callline books the job.** It checks your calendar, offers real-time slots, confirms the address, and texts the customer a confirmation.
  3. **You get the lead.** SMS to your phone the moment the call ends — full transcript, customer details, booked time.
- No icons. No checkmarks. Just typography and one tasteful underline accent in `#FF5B1F`.

### 6. Live demo CTA section (full-bleed, dark forest `#1A2E22` background, bone text)

- Big italic Fraunces headline: "Don't read about it. Call it."
- Body: "Callline is on the line right now. Call from your own phone, pretend to be a homeowner with a leaking pipe. The AI will qualify you, book you, and text you a confirmation within 60 seconds."
- Single button, accent fill: `Call 1 (866) 966-1988 →`
- Below button in mono: "Available 24/7. This is the actual product."

### 7. Pricing — show all three structures (per Shajeed's request, he'll pick after seeing them)

- Three offer cards in a single row on desktop, stacked on mobile.
- **Card 1:** $1,997 setup + $497/mo. 30-day "5 booked jobs or you don't pay the monthly" guarantee.
- **Card 2:** $0 setup + $797/mo. No guarantee. No commitment, cancel anytime.
- **Card 3:** Free 14-day pilot, then $597/mo if you keep it.
- Top of section: small italic note "Three ways in. Same outcome. Pick what feels right."
- Each card: title, price (large Fraunces), one paragraph, single CTA button "Start with this →" linking to the same booking flow but with a `?plan=` query param.
- **NOTE TO SHAJEED:** these are easy to delete — each card is its own component in `components/pricing/`. Delete two before going live.

### 8. FAQ (8 questions max, accordion, no icons)

- Type-led design. Question in Fraunces 24px italic, answer in Inter Tight body.
- Soft 1px hairline rules between items. Smooth height animation on expand.
- Cover: "How is this different from voicemail?", "Does it sound like a robot?", "What if the customer wants a real person?", "What if I already have a receptionist?", "How does it know my services?", "What if I miss the SMS?", "Can I review the calls?", "What happens if it books a time I'm not available?"

### 9. Footer

- Bone background, ink text. Three columns:
  - Left: large `Callline` wordmark, then in mono 11px: "A product of TEKMADEV Innovations Inc." then "© 2026"
  - Middle: a single line — "Built in Hamilton, Ontario. Available across the GTA and beyond."
  - Right: contact line — "hello@callline.ai" + the AI line number again
- Last line, full width, mono, very small, low opacity: "This site itself was built by AI. Including this footer."

---

## TECHNICAL NOTES

- **Smooth scroll setup:** Wrap the body in a `<LenisProvider>` client component. Initialize with `lerp: 0.1, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- **Font loading:** `next/font/google` for both fonts. `display: 'swap'`. Pre-connect set up. Variable font for Fraunces with `axes: ['SOFT', 'WONK', 'opsz']`.
- **3D scene location:** `components/three/PhoneScene.tsx`. Lazy-load with `dynamic(() => import(...), { ssr: false, loading: () => <PhonePoster /> })`. The poster is a static PNG fallback that I can swap in.
- **Content lives in:** `content/copy.ts` as a typed object. Every string on the site comes from there so I can edit copy without touching JSX.
- **Tailwind config:** Custom CSS variables for fonts and colors. Use Tailwind v4's `@theme` block in `globals.css`.
- **SEO:** Proper Next.js metadata in `app/layout.tsx`. `title: "Callline — Never miss a call. Never miss a job."`, `description: ...`, `openGraph` with a custom OG image (use a generated route at `app/opengraph-image.tsx`).
- **Robots/sitemap:** Generate via Next 15 conventions.
- **Analytics:** Vercel Analytics on by default. Plausible-style event hooks for: `call_button_clicked`, `cal_link_clicked`, `pricing_card_clicked`.

---

## EXECUTION ORDER (DO THIS, IN THIS ORDER)

1. Scaffold the project. Confirm `npm run dev` works on a blank page.
2. Set up fonts, color tokens, Lenis wrapper, base layout. Verify tokens render correctly with a hello-world.
3. Build the top bar.
4. Build the hero section with full motion. **Get this perfect before moving on.** This is 60% of the site's impact.
5. Build the wow section. Start with the 2D Framer Motion fallback first — get the storytelling right. Only then build the R3F 3D version. **Do not start with R3F.** That trap has killed two previous attempts.
6. Build sections 4 → 9 in order. Each gets its own component file.
7. Wire up the `tel:` link, copy-to-clipboard toast, and Cal.com link.
8. Run `next build` and fix every warning. Test mobile at 375px width and tablet at 768px. Test with `prefers-reduced-motion: reduce`.
9. Generate a custom OG image.
10. Push to a fresh GitHub repo named `tekmadev3`. Connect to Vercel. Deploy.

---

## WHAT I (SHAJEED) WILL DO BEFORE YOU START

- Create an empty folder called `tekmadev3` and `cd` into it
- Run Claude Code from that folder
- Have my GitHub account ready
- Have my Vercel account ready

## WHAT I'LL DO AFTER YOU SHIP

- Buy the `callline.ai` (or `callline.com`/`callline.co`) domain
- Connect it in Vercel
- Replace the placeholder Cal.com URL with my real one
- Decide which of the 3 pricing cards to keep, delete the other two
- Replace the static phone poster fallback with a real screenshot if needed

---

## ASK ME BEFORE YOU CODE

Before you start writing files, ask me these three questions and wait for answers:

1. **"Do you want me to use real screenshots of GHL/your AI in the 3D scene, or stylized mock screens?"** (My answer will likely be: stylized mock screens, this is a marketing site, not a product tour.)
2. **"Do you have a logo concept, or should I generate a wordmark in Fraunces and call that the logo for v1?"**
3. **"Should I add a third CTA section between FAQ and footer that captures emails for a 'launching soon in your city' list, or keep it focused on the demo call?"**

Then build.

---

## A NOTE ON QUALITY

This is a sales tool that runs ads against it for $300/month. Every visitor cost real money. **Slop costs me clients.** Don't take shortcuts on the hero, the wow section, or the typography. If something looks generic, it is generic. Stop, throw it out, and try again. I trust your judgment — use it.
