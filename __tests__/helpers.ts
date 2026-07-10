// __tests__/helpers.ts
// Helper functions for creating mock requests and responses

import { NextApiRequest, NextApiResponse } from "next";
import { vi } from "vitest";

/**
 * Create a mock NextApiRequest
 */
export function createMockRequest(overrides: Partial<NextApiRequest> = {}): NextApiRequest {
  return {
    headers: {},
    body: {},
    query: {},
    method: "GET",
    url: "/",
    cookies: {},
    ...overrides,
  } as unknown as NextApiRequest;
}

/**
 * Create a mock NextApiResponse with json and status methods
 */
export function createMockResponse(): NextApiResponse {
  const res: Partial<NextApiResponse> = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
    writeHead: vi.fn().mockReturnThis(),
  };
  return res as NextApiResponse;
}

/**
 * Create a mock fetch response
 */
export function mockFetchResponse(
  options: {
    ok?: boolean;
    status?: number;
    body?: any;
    text?: string;
    arrayBuffer?: ArrayBuffer;
    headers?: Record<string, string>;
  } = {}
) {
  const {
    ok = true,
    status = 200,
    body,
    text,
    arrayBuffer,
    headers = {},
  } = options;

  const mockResponse = {
    ok,
    status,
    headers: new Map(Object.entries(headers)),
    json: async () => body,
    text: async () => text || JSON.stringify(body),
    arrayBuffer: async () => arrayBuffer || new ArrayBuffer(0),
    blob: async () => new Blob([JSON.stringify(body)], { type: "application/json" }),
  };

  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
  return mockResponse;
}

/**
 * Create mock translation data for local search tests
 */
export function createMockTranslations(
  count: number = 10
): Array<{
  id: number;
  fra: string | null;
  til: string | null;
  oversatt_fra: string | null;
  oversatt_til: string | null;
  kredittering: string | null;
  sikor_hits: number | null;
}> {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    fra: i % 2 === 0 ? `test phrase ${i + 1}` : null,
    til: i % 2 === 0 ? null : `samisk frase ${i + 1}`,
    oversatt_fra: i % 2 === 0 ? "nob" : "smj",
    oversatt_til: i % 2 === 0 ? "smj" : "nob",
    kredittering: i % 3 === 0 ? "Test Attribution" : null,
    sikor_hits: i % 4 === 0 ? Math.floor(Math.random() * 100) : null,
  }));
}

/**
 * Create mock statistics data
 */
export function createMockStatistics(
  count: number = 10
): Array<{
  id: number;
  type: string;
  query: string;
  createdAt: Date;
}> {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    type: ["Translation", "GrammarCheck", "LocalSearch", "DivvunSearch"][i % 4],
    query: `test query ${i + 1}`,
    createdAt: new Date(Date.now() - i * 86400000), // Each entry one day apart
  }));
}