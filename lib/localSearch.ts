// localSearch.ts
import { LocalTranslations } from "@/types/localTranslations";
import fetchLocalTranslations from "./cache";

interface PaginatedResults {
  results: LocalTranslations[];
  totalCount: number;
  hasMore: boolean;
}

export const getLocalResults = async (
  query: string,
  direction: "nob" | "sm" | "relevance",
  page: number = 1,
  limit: number = 30
): Promise<PaginatedResults> => {
  const data = await fetchLocalTranslations();

  if (!query.trim()) {
    return {
      results: [],
      totalCount: 0,
      hasMore: false,
    };
  }

  const q = query.toLowerCase();
  const filteredData = filterData(data, q, direction);

  const totalCount = filteredData.length;
  const offset = (page - 1) * limit;
  const results = filteredData.slice(offset, offset + limit);
  const hasMore = offset + limit < totalCount;

  return {
    results,
    totalCount,
    hasMore,
  };
};

const filterData = (
  data: LocalTranslations[],
  q: string,
  direction: "nob" | "sm" | "relevance"
) => {
  let filteredData = data
    .filter((item: LocalTranslations) => item.fra || item.til) // Ensure valid data
    .sort((a: LocalTranslations, b: LocalTranslations) => {
      const fraA = a.fra?.toLowerCase() || "";
      const fraB = b.fra?.toLowerCase() || "";
      const tilA = a.til?.toLowerCase() || "";
      const tilB = b.til?.toLowerCase() || "";

      const priority = (str: string) => {
        if (str === q) return 1; // Exact match
        if (str.startsWith(q)) return 2; // Starts with
        if (str.includes(q)) return 3; // Contains/ends with
        return 4; // No match
      };

      // Compute priority for both "fra" and "til"
      const priorityA = Math.min(priority(fraA), priority(tilA));
      const priorityB = Math.min(priority(fraB), priority(tilB));

      return priorityA - priorityB; // Sort by priority
    })
    .filter((item: LocalTranslations) => {
      // Keep only items that match at least one rule
      const fra = item.fra?.toLowerCase() || "";
      const til = item.til?.toLowerCase() || "";

      return (
        fra === q ||
        fra.startsWith(q) ||
        fra.includes(q) ||
        til === q ||
        til.startsWith(q) ||
        til.includes(q)
      );
    });

  // Apply additional sorting only if direction is not "relevance"
  if (direction !== "relevance") {
    filteredData = filteredData.sort(
      (a: LocalTranslations, b: LocalTranslations) => {
        // Sort by "oversatt_fra" based on direction
        const oversattFraA = a.oversatt_fra?.toLowerCase() || "";
        const oversattFraB = b.oversatt_fra?.toLowerCase() || "";

        if (direction === "nob") {
          return oversattFraA.localeCompare(oversattFraB); // Ascending order
        } else {
          return oversattFraB.localeCompare(oversattFraA); // Descending order
        }
      }
    );
  }

  return filteredData;
};
