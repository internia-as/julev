# Julev — Agent Instructions

Dictionary/translation web app for Sami and other Nordic languages (Apertium, Divvun/Satni, Giellatekno, SIKOR, Kartverket).

## Dev Commands (Node 22)

- `npm ci` — install deps (lockfile present)
- `npx prisma generate` — generate the Prisma client. **Required before `dev`, `build`, and `test`** (client is not committed).
- `npm run dev` — dev server (Turbopack, port 3000)
- `npm run build` / `npm start` — build / run production server
- `npm run lint` — ESLint via `next lint`
- `npm test` — unit suite (Vitest): 137 tests / 21 files. **Offline & mocked**, CI-safe.
- `npx vitest run <path>` — single test file; add `-t "name"` to run one test
- `npm run test:watch` / `test:coverage` / `test:ui`

### Live tests (real network)

- `npm run test:live` — runs `__tests__/live/**`, which make **REAL calls to production external APIs** (translate, grammar, TTS, SIKOR, Kartverket, Divvun). Not run by `npm test` (excluded in `vitest.config.ts`). Can be slow/flaky/rate-limited; CI runs it only on push to `main`, non-blocking.
- Test layout: `__tests__/unit/**` (mocked, jsdom, offline — `npm test`) vs `__tests__/live/**` (real fetch, node env — `test:live`). `__tests__/setup.ts` mocks `fetch`, `localStorage`, `matchMedia`, and `window.Audio`.

## Setup

1. Copy `.env.example` → `.env` (external API URLs + `DATABASE_URL`, `REDIS_URL`)
2. `npx prisma generate` — required before dev/build/test
3. Local services: `docker compose up redis -d` (Redis only) or full stack (see Docker)
4. Migrations live in `prisma/migrations`; prod/compose applies them with `npx prisma migrate deploy`. For a fresh local schema use `npx prisma db pull`.

## Architecture

Hybrid Next.js 15: **App Router** (`app/**`) for UI pages, **Pages Router** (`pages/api/**`) for API routes. Client components in `app/**` call `fetch('/api/...')` to hit `pages/api/**`.

### Data layer
- **MySQL** via Prisma (`prisma/schema.prisma`). Models: `smj_translations`, `statistics`. Singleton client in `lib/prisma.ts` — always import from there, never instantiate directly.
- **Redis** (`lib/redisClient.ts`) — caches Divvun GraphQL responses, 86400s TTL (`pages/api/divvun/search.ts`). Auto-connects on import via IIFE.
- **External APIs** — all proxied through `pages/api/**`: translate (Apertium), grammar, TTS, Divvun/Satni GraphQL, SIKOR corpus, Kartverket place search.

### i18n
`next-intl`; messages in `messages/<locale>.json` (`nob`, `eng`, `smj`). Default `nob`, overridden by `lang` cookie. Config: `i18n/request.ts`.

### Path aliases
`@/*` → root · `@types/*` → `types/*` · `@graphql/*` → `graphql/*` (set in `tsconfig.json` and both Vitest configs).

## Conventions & Gotchas

- **BigInt serialization**: Prisma models use `BigInt` IDs. Convert before `JSON.stringify` with the replacer pattern in `pages/api/localSearch.ts:46`.
- **In-memory translation cache**: `lib/cache.ts` caches `smj_translations` in a module-level var. Process restart is the only invalidation.
- **Env vars**: client components can only read `NEXT_PUBLIC_*`. All other secrets/URLs stay server-side in `pages/api/**` / `lib/**`.
- **Global UI state**: search query, direction, dictionaries, languages live in React context (`hooks/useGlobalState.tsx`); settings persist to `localStorage`.
- **Statistics**: API routes call `addStatistics()` (`lib/addStatistics.ts`) after a success — server-side, not in client components.
- **Redis auto-connect**: importing `lib/redisClient.ts` triggers an async connect IIFE. Missing/failing `REDIS_URL` logs to console but does not crash.

## Docker

- `docker compose up` runs the full local stack: `redis` + `db` (MySQL 8.4, default DB `ordbok`) + `db-migrate` (runs `prisma migrate deploy`) + `app` (port 3000).
- Standalone build: `docker build -t julev . && docker run --env-file .env -p 3000:3000 julev`. The **build** needs no `.env` (uses `ARG NEXT_PUBLIC_SIKOR_URL` + a dummy `DATABASE_URL`, like CI); `--env-file .env` is only for the **runtime** container.

## CI (`.github/workflows/ci.yml`)

- Node 22. Jobs: unit tests (`npm ci` → `prisma generate` → `npm test`), production build, live tests (main-push only, non-blocking). **Lint is not run in CI** — run it locally.