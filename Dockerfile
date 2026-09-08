# Shared base: node:alpine (musl) is the lightweight variant. Prisma's query engine links
# against OpenSSL and detects the libssl version when it generates engines, so openssl MUST
# be present in every stage below — otherwise the runtime can't find it. node:alpine already
# ships libssl; we pin it explicitly to keep the engine-variant selection deterministic.
FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache openssl

# Full install (build toolchain) — cached until package.json/lockfile change
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund

# Production-only install for the runtime image (drops vitest, jsdom, typescript, ...)
FROM base AS prod-deps

COPY package.json package-lock.json ./

RUN npm ci --omit=dev --no-audit --no-fund

FROM base AS builder

ARG NEXT_PUBLIC_SIKOR_URL=https://gtweb.uit.no/korp/
ENV NEXT_PUBLIC_SIKOR_URL=$NEXT_PUBLIC_SIKOR_URL
ENV DATABASE_URL=mysql://user:pass@localhost:3306/database_name

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Alpine uses busybox groupadd/useradd (no --system/--gid flags); addgroup/adduser come from
# the shadow package. -S creates a system account, -G attaches the user to the group.
RUN apk add --no-cache shadow \
    && addgroup -S nextjs \
    && adduser -S nextjs -G nextjs

# Prod deps + the Prisma client generated during build (npm ci --omit=dev does not generate it)
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/graphql ./graphql
COPY --from=builder /app/hooks ./hooks
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/types ./types

RUN chown -R nextjs:nextjs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["npm", "start"]