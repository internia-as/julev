# Julev — Agent Instructions

## Dev Commands

- `npm ci` — install deps (lockfile present)
- `npm run dev` — dev server (Turbopack, port 3000)
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — lint (next lint / ESLint)
- `npm test` — run tests (Node's built-in `node --test tests/*.test.js`; currently placeholder only)

## Setup

1. Copy `.env.example` → `.env`, set all required URLs
2. `npx prisma db pull` — sync schema from existing MySQL database
3. `npx prisma generate` — generate Prisma client (required before dev/build)
4. Optional Redis: `docker compose up redis -d`

## Architecture

Hybrid Next.js 15 app: **App Router** (`app/**`) for UI pages, **Pages Router** (`pages/api/**`) for API routes. Client components in `app/**` call `fetch('/api/...')` to hit server-side endpoints in `pages/api/**`.

### Data Layer
- **MySQL** via Prisma (`prisma/schema.prisma`). Singleton client in `lib/prisma.ts` — always import from there, never instantiate directly.
- **Redis** (`lib/redisClient.ts`) — caches Divvun GraphQL responses (86400s TTL). Auto-connects on import via IIFE.
- **External APIs** — all proxied through `pages/api/**`: translate, grammar checker, TTS, Divvun/Satni GraphQL, SIKOR corpus, Kartverket place search.

### i18n
`next-intl` with messages in `messages/<locale>.json` (nob, eng, smj). Default locale `nob`, overridden by `lang` cookie. Config in `i18n/request.ts`.

### Path Aliases
- `@/*` → repo root
- `@types/*` → `types/*`
- `@graphql/*` → `graphql/*`

## Conventions & Gotchas

- **BigInt serialization**: Prisma models use `BigInt` IDs. Must use JSON replacer pattern before `JSON.stringify`. Follow `pages/api/localSearch.ts` (line 46).
- **In-memory translation cache**: `lib/cache.ts` caches `smj_translations` in a module-level variable. Process restart is the only invalidation.
- **Env vars**: Client components can only read `NEXT_PUBLIC_*`. All other secrets/URLs belong in `pages/api/**` or `lib/**` server-side code.
- **Global UI state**: Search query, direction, dictionaries, languages live in React context (`hooks/useGlobalState.tsx`). Settings persist to `localStorage`.
- **Statistics tracking**: API routes call `addStatistics()` from `lib/addStatistics.ts` after successful requests. Do this server-side, not in client components.
- **Redis auto-connect**: Importing `lib/redisClient.ts` triggers an async IIFE that connects to Redis. Missing/failing REDIS_URL will log to console but not crash.

## Docker

Build requires `.env` to be present (Dockerfile copies it). Redis available via `docker compose up redis`.