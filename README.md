# Peerya

Modern landing page for **Peerya** — committed global learning teams with AI accountability.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist API

- `GET /api/waitlist` — returns `{ count }`
- `POST /api/waitlist` — body `{ "email": "you@example.com" }`

Emails and count are stored in `data/waitlist.json`. To reset or seed the count, edit that file:

```json
{
  "count": 42,
  "emails": []
}
```

> **Vercel note:** Serverless deployments use a read-only filesystem. Signups are kept in memory across warm invocations; for durable storage in production, connect Vercel KV, Postgres, or a service like Resend/Airtable and update `src/lib/waitlist.ts`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Deploy — no extra configuration required.

```bash
npm run build
```

## Project structure

```
src/
  app/
    api/waitlist/route.ts   # Waitlist endpoints
    page.tsx                # Landing page
    layout.tsx              # Root layout + metadata
    globals.css             # Design system
  components/
    ScrollReveal.tsx        # Scroll fade-in observer
  lib/
    waitlist.ts             # Waitlist persistence
data/
  waitlist.json             # Waitlist store
```
