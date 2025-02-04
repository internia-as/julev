// utils.ts
import { LocalTranslations } from "@/types/localTranslations";
import fetchLocalTranslations from "./cache";

export const getLocalResults = async (
  query: string
): Promise<LocalTranslations[]> => {
  const data = await fetchLocalTranslations();
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  const filteredData = filterData(data, q);

  return filteredData;
};

const filterData = (data: LocalTranslations[], q: string) => {
  return data
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
};
