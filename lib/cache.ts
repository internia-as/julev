// cache.ts
import { LocalTranslations } from "@/types/localTranslations";
import { prisma } from "./prisma";

let cachedData: LocalTranslations[] | null = null;

const fetchLocalTranslations = async (): Promise<LocalTranslations[]> => {
  if (!cachedData) {
    const dbResults = await prisma.smj_translations.findMany();
    cachedData = dbResults.map((row) => ({
      id: row.id,
      fra: row.fra ?? "",
      til: row.til ?? "",
      oversatt_fra: row.oversatt_fra ?? "",
      oversatt_til: row.oversatt_til ?? "",
      kredittering: row.kredittering ?? "",
      sikor_hits: row.sikor_hits ?? null,
    }));
  }
  if (!cachedData)
    throw new Error("Failed to fetch local translations from database");
  return cachedData;
};

export default fetchLocalTranslations;
