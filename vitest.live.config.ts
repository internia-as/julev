import { defineConfig } from "vitest/config";
import path from "path";

// Live integration test config: makes REAL calls to the external APIs.
// Kept separate from the default (mocked) suite so `npm test` stays offline
// and CI-safe. Run with `npm run test:live`.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@types": path.resolve(__dirname, "./types"),
      "@graphql": path.resolve(__dirname, "./graphql"),
    },
  },
  test: {
    globals: true,
    environment: "node", // real Node fetch, no jsdom, no fetch mock
    setupFiles: ["./__tests__/live/setup.ts"],
    include: ["__tests__/live/**/*.test.ts"],
    exclude: ["node_modules", ".next", "dist"],
    server: {
      deps: {
        inline: ["@prisma/client"],
      },
    },
    testTimeout: 30000,
    hookTimeout: 15000,
  },
});