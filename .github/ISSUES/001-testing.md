---
name: Feature Request
about: Suggest a new feature or improvement
title: 'Establish comprehensive unit and integration test suite'
labels: 'enhancement'
assignees: ''
---

## Problem description

The codebase currently has zero real tests — only a single placeholder (`1 + 1 === 2`) using Node's native `node:test` runner. This means:

- No safety net for refactoring or adding new features (e.g., exam mode).
- No automated regression detection.
- Contributors cannot verify their changes with confidence.
- CI/CD pipelines have nothing to run.

The current test infrastructure (`node --test tests/*.test.js`) is minimal and lacks snapshot testing, DOM testing, mocking, and React component testing capabilities.

## Proposed solution

### Phase 1 — Infrastructure (Week 1-2)

- Migrate from Node's native `node:test` to **Vitest** (fast, TypeScript-first, Jest-compatible API, works with Next.js 15).
- Install `@testing-library/react` and `jsdom` for React component testing.
- Create Vitest config with proper Next.js/TypeScript setup.
- Add test utilities: mocks, fixtures, and factory helpers.

### Phase 2 — Unit Tests (Week 3-5)

| Area | Priority | Files |
|------|----------|-------|
| API Routes | High | `pages/api/translate.ts`, `pages/api/grammar.ts`, `pages/api/localSearch.ts`, `pages/api/sikor.ts`, `pages/api/kartverket.ts`, `pages/api/speech/index.ts` |
| Lib Utilities | High | `lib/addStatistics.ts`, `lib/cache.ts`, `lib/prisma.ts`, `lib/redisClient.ts`, `lib/fetchTextToSpeech.ts`, `lib/speechAvailable.ts` |
| Divvun Fetchers | Medium | `lib/divvun/fetchSatni.ts`, GraphQL resolvers in `graphql/` |
| Hooks | Medium | `hooks/useGlobalState.tsx` |

### Phase 3 — Integration Tests (Week 6-7)

- API route integration tests: mock external services (Apertium, Divvun, SIKOR, Kartverket) and verify request/response shapes.
- Prisma/DB integration: test database operations with a test database or mocked Prisma client.
- Redis cache integration: verify cache hit/miss behavior for Divvun responses.

### Phase 4 — Component Tests (Week 8)

- Core UI components: `SearchField`, `Navbar`, `Sidebar`, translation components (`TextTranslate`, `LanguageSelect`).
- Verify accessibility: test that labels, ARIA attributes, and keyboard navigation are present.

### Phase 5 — CI Integration (Week 9-10)

- Add GitHub Actions workflow: run `npm run lint && npm run build && npm test` on push and PR.
- Configure coverage threshold (e.g., 70% minimum).
- Add PR checklist item: "Tests pass and coverage is maintained."

## Alternatives considered (optional)

- **Jest**: Well-established but slower and requires more config for Next.js 15 / React 19.
- **Playwright/Cypress**: Excellent for E2E, but out of scope for Phase 1–3; can be added later for critical user flows.
- **Stick with Node's native runner**: Not viable — lacks React/DOM testing support.

## Additional context

Timeline from project plan: **July–October 2026** (Activity 6: "Etablere tester og CI/CD-pipelines"). This is a prerequisite for reliable open-source contributions and the exam mode feature.