---
colors:
  primary:       "#2563EB"
  primaryHover:  "#1D4ED8"
  primaryLight:  "#EFF6FF"
  accent:        "#10B981"
  background:    "#FFFFFF"
  surface:       "#F8FAFC"
  surfaceBorder: "#E2E8F0"
  foreground:    "#0F172A"
  muted:         "#64748B"
  mutedLight:    "#F1F5F9"
  error:         "#EF4444"
  success:       "#10B981"

typography:
  fontFamily:          "Inter, system-ui, -apple-system, sans-serif"
  monoFamily:          "JetBrains Mono, Menlo, monospace"
  baseFontSize:        "16px"
  lineHeight:          "1.6"
  headingLineHeight:   "1.2"
  headingTracking:     "-0.02em"

spacing:
  baseUnit:         "4px"
  section:          "96px"
  container:        "1280px"
  containerPadding: "24px"

borderRadius:
  sm:   "6px"
  default: "10px"
  lg:   "16px"
  xl:   "24px"
  full: "9999px"

shadows:
  sm:      "0 1px 3px rgba(0,0,0,0.08)"
  default: "0 4px 16px rgba(0,0,0,0.08)"
  lg:      "0 12px 40px rgba(0,0,0,0.10)"
  invoice: "0 8px 32px rgba(0,0,0,0.12)"
  primary: "0 4px 16px rgba(37,99,235,0.25)"
---

# InvoiceGen — Design System

## Brand Identity

Clean, professional, trustworthy. This is a tool for freelancers, consultants,
and small business owners. Every design decision reinforces **credibility** and
**speed**. No unnecessary decoration. No dark patterns. Just a fast, reliable
invoice tool.

## Design Principles

1. **Clarity over cleverness** — Users need to create invoices fast. Labels are
   obvious. Actions are one-click. No jargon.
2. **Paper metaphor** — The invoice preview uses a white-card, soft-shadow
   aesthetic so users can mentally map the digital tool to a printed document.
3. **Trust signals** — Clean whitespace, consistent spacing, and Inter typography
   make output look like it came from a real accounting firm.
4. **Lightweight interactions** — No heavy animations, no modals unless necessary.
   Everything feels instant.

## Colors

- **Primary `#2563EB`** — CTAs only (Download PDF, Add Item, Create Invoice).
  Hover: `#1D4ED8`. Never use on large backgrounds.
- **Foreground `#0F172A`** — All headings and primary text.
- **Accent `#10B981`** — Totals, "paid" badges, success states only.
- **Surface `#F8FAFC`** — Page background (slightly warm grey, not pure white).
- **Muted `#64748B`** — Labels, placeholders, secondary copy.
- **Error `#EF4444`** — Validation errors only.

### Never
- Do not use primary blue for body text links.
- Do not use accent green outside money/success contexts.
- Do not use gradients on the invoice paper (breaks printing).

## Typography

Use **Inter** (Google Fonts). Load weights 400, 500, 600, 700 only.

| Role           | Size       | Weight | Tracking   |
|----------------|------------|--------|------------|
| H1 (hero)      | 56px       | 700    | -0.02em    |
| H2 (section)   | 36px       | 700    | -0.02em    |
| H3 (card)      | 22px       | 600    | -0.01em    |
| Body           | 16px       | 400    | 0          |
| Label / small  | 14px       | 500    | 0.01em     |
| Invoice items  | 14px       | 400    | 0          |
| Invoice totals | 16px       | 600    | 0          |

## Spacing

Base unit = **4px**. Use multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96.

- Section vertical padding: 96px
- Card inner padding: 32px
- Form field gap: 16px
- Invoice table row height: 48px

## Components

### Buttons

```
Primary:   bg-blue-600 text-white rounded-[10px] px-6 py-3 font-semibold
           hover:bg-blue-700 transition-colors
           shadow: 0 4px 16px rgba(37,99,235,0.25)

Secondary: bg-white border border-slate-200 text-slate-900 rounded-[10px] px-6 py-3
           hover:bg-slate-50 hover:border-slate-300 transition-colors

Ghost:     text-blue-600 hover:bg-blue-50 rounded-[10px] px-4 py-2 transition-colors
```

### Form Inputs

```
bg-white border border-slate-200 rounded-[10px] px-4 py-3
text-sm text-slate-900 placeholder:text-slate-400
focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
transition-colors
```

### Invoice Paper (preview)

```
bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]
border border-slate-100 p-10
Max width: 794px (A4 at 96dpi)
```

### Cards / Feature Tiles

```
bg-white rounded-[16px] border border-slate-100
shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-8
hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow
```

## Layout

- Max content width: 1280px, centered, 24px horizontal padding on mobile
- Invoice tool: 2-column on desktop (45% form / 55% preview)
- Mobile: stacked — form first, preview below
- Hero copy: centered, max-width 680px

## Homepage Sections

1. **Hero** — Badge, H1, subtitle, primary + secondary CTAs, trust count
2. **Invoice Tool** — The React island (InvoiceGenerator.tsx), sticky preview
3. **Features** — 3×2 grid of benefit cards with blue icon tiles
4. **How It Works** — 3-step numbered flow
5. **FAQ** — `<details>` accordion, 6 questions
6. **CTA Banner** — Blue background, white button
7. **Footer** — Dark, 3-column

## Do's

- Use `font-semibold` for all form labels
- Add `aria-label` to all icon-only buttons
- Keep invoice preview scrollable on mobile
- Show running totals in real-time as users type
- Use `client:load` for the invoice React island

## Don'ts

- No gradients on invoice paper (breaks printing)
- Inter only — no other fonts
- No toast notifications for form field changes
- No full-page loading spinners — use inline loading states
- Do not truncate invoice line item descriptions
