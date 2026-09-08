# Julev

Julev is a collection of digital [Sámi](https://en.wikipedia.org/wiki/Sami_languages) language resources, with a focus on **Lule Sámi** (Lulesamisk / *smj*). It brings together dictionaries, machine translation, grammar checking, speech synthesis, corpus search, and place-name search in a single web app.

The interface is available in **English**, **Norwegian (bokmål)**, and **Lule Sámi**.

## Features

- **Julevbágo** (`/`) — search Lule Sámi dictionaries, with directional results (Lule Sámi ↔ Norwegian), relevance/sorting options, dictionary & language filters, and a keyboard for the Sami alphabet.
- **Divvun search** (`/divvun`) — search across many Sami dictionaries via the [Divvun / Satni](https://divvun.github.io/divvun-api/) GraphQL API, with part-of-speech info and inflection paradigms.
- **Translate** (`/translate`) — machine translation powered by [Giellatekno](https://giellatekno.uit.no/smilang.nob.html) / [Apertium](https://www.apertium.org/), with text-to-speech playback.
- **Grammar checker** (`/grammar-checker`) — check text for grammar errors and get suggestions, backed by the Giellatekno grammar service.
- **SIKOR corpus search** — look up real usage examples in the [SIKOR](https://gtweb.uit.no/korp/) Sami text corpus.
- **Place-name search** (`/app`) — search Norwegian/Sami place names via the [Kartverket](https://www.kartverket.no/) geonames service and view results on a Leaflet map.
- **Statistics** (`/statistics`) — aggregate usage statistics (tracked with [Umami](https://umami.is/)) shown with Chart.js.

## Tech stack

- [Next.js](https://nextjs.org) (App Router + Pages Router for API routes) and React 19
- [Prisma](https://www.prisma.io/) + MySQL — dictionary translations and usage statistics
- [Redis](https://redis.io/) — caching
- [Tailwind CSS](https://tailwindcss.com/) + [MUI](https://mui.com/) for styling
- [next-intl](https://next-intl.dev/) for internationalization
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for tests
- [Docker](https://www.docker.com/) / docker compose for the full local stack

## Getting Started

### Prerequisites

- Node.js 22
- MySQL and Redis (or use the Docker setup below)

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment

Copy the example env file and fill in the values you need:

```bash
cp .env.example .env
```

The file contains:

- **Internal** — `DATABASE_URL` and `REDIS_URL`.
- **External** — endpoints for Divvun/Satni, SIKOR, Apertium translation, Giellatekno TTS and grammar, and the Kartverket geonames service. The defaults in `.env.example` point at the public services and work out of the box.

### 3. Generate the Prisma client

Point `DATABASE_URL` in `.env` at your database, then:

```bash
npx prisma db pull    # introspect an existing database (or apply migrations)
npx prisma generate   # generate the Prisma client
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite (Vitest) |
| `npm run test:live` | Run the "live" tests that hit the real external services |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run seed` | Seed the database |

## Running with Docker

`docker-compose.yaml` wires up the whole stack: **Redis**, **MySQL**, a one-shot **`prisma migrate deploy`** job, and the **app**.

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000). The compose file reads a few variables (e.g. `DB_ROOT_PASSWORD`, `DB_NAME`) with sensible defaults, and applies the database migrations automatically before the app starts.

To build and run the app image on its own (against an external DB and Redis):

```bash
docker build -t julev .
docker run --env-file .env -p 3000:3000 julev
```

## External docs

- [Divvun API](https://divvun.github.io/divvun-api/)
- [Borealium](https://borealium.org/nb/about/)
- [Giellatekno](https://giellatekno.uit.no/smilang.nob.html)
- [Apertium](https://www.apertium.org/)
- [SIKOR](https://gtweb.uit.no/korp/)