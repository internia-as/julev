"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { LocalTranslations } from "@/types/localTranslations";

interface UseInfiniteScrollProps {
  query: string;
  direction: string;
  limit?: number;
}

interface PaginatedResponse {
  results: LocalTranslations[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    hasMore: boolean;
  };
}

export const useInfiniteScroll = ({
  query,
  direction,
  limit = 30,
}: UseInfiniteScrollProps) => {
  const [results, setResults] = useState<LocalTranslations[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      if (!query.trim()) {
        setResults([]);
        setHasMore(false);
        setTotalCount(0);
        return;
      }

      // Prevent duplicate requests
      if (loading || (pageNum > 1 && !hasMore)) {
        return;
      }

      if (pageNum === 1) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const res = await fetch(
          `/api/localSearch?q=${encodeURIComponent(
            query
          )}&direction=${direction}&page=${pageNum}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: PaginatedResponse = await res.json();

        if (reset || pageNum === 1) {
          setResults(data.results);
        } else {
          setResults((prev) => [...prev, ...data.results]);
        }

        setHasMore(data.pagination.hasMore);
        setTotalCount(data.pagination.totalCount);
        setPage(pageNum);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [query, direction, limit, loading, hasMore]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchResults(page + 1);
    }
  }, [loading, hasMore, page, fetchResults]);

  const reset = useCallback(() => {
    setResults([]);
    setPage(1);
    setHasMore(false);
    setTotalCount(0);
    setError(null);
    fetchResults(1, true);
  }, [fetchResults]);

  // Set up intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore]);

  // Reset and fetch when query or direction changes
  useEffect(() => {
    reset();
  }, [query, direction]);

  return {
    results,
    loading,
    initialLoading,
    hasMore,
    totalCount,
    error,
    loadMore,
    reset,
    loadingRef,
  };
};
