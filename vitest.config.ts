import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@types": path.resolve(__dirname, "./types"),
      "@graphql": path.resolve(__dirname, "./graphql"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      resources: "usable",
      url: "http://localhost:3000",
    },
    setupFiles: ["./__tests__/setup.ts"],
    include: ["__tests__/**/*.test.ts", "__tests__/**/*.test.tsx"],
    exclude: [
      "node_modules",
      ".next",
      "dist",
      "__tests__/live/**",
    ],
    server: {
      deps: {
        inline: ["@prisma/client"],
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "__tests__/",
        ".next/",
        "dist/",
        "coverage/",
      ],
    },
  },
});