# Colorado Front Range Roofing — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.coloradofrroofing.com/.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
```

## Deployment

Push to GitHub, import the repository into Vercel (Framework: Vite), and add `cfr.blueprintwebstudio.com` in Vercel's Domains panel. Set the DNS record at Porkbun to the exact target Vercel provides. Configure `VITE_CONCEPT_END_DATE` in Vercel and redeploy.

## Before client presentation

- Confirm business details, awards, permit counts, and company-reported metrics.
- Replace illustrative Unsplash photography with approved company-owned photos or appropriately licensed photos.
- Obtain approval for logo/branding and any republished content before public production use.
- Replace the CSS brand mark with an authorized logo if available.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- Contact actions currently use phone/email only. There is no live inspection request form or data collection.
- Countdown is a display-only timer, not an access-control or database-backed expiration mechanism.
- Review remaining pages, SEO structure, privacy disclosures, and accessibility before a production launch.
