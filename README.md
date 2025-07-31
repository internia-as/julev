This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Setup

First, Setup DATABASE_URL in .env with this format: database-type://username:password@host:port/database-name

```bash
npx prisma db pull

npx prisma generate
```

# Running with Docker

```bash
docker build -t julev .
docker run --env-file .env -p 3000:3000 julev
```

# External docs

[Divvun API](https://divvun.github.io/divvun-api/)
[Borealium](https://borealium.org/nb/about/)
[Giellatekno](https://giellatekno.uit.no/smilang.nob.html)
