// cache.ts
import { LocalTranslations } from "@/types/localTranslations";
import { prisma } from "./prisma";

let cachedData: LocalTranslations[] | null = null;

const fetchLocalTranslations = async (): Promise<LocalTranslations[]> => {
  if (!cachedData) {
    const dbResults = await prisma.smj_translations.findMany({
      select: {
        id: true,
        fra: true,
        til: true,
        oversatt_fra: true,
        oversatt_til: true,
        kredittering: true,
        sikor_hits: true,
      },
    });
    cachedData = dbResults;
  }
  if (!cachedData)
    throw new Error("Failed to fetch local translations from database");
  return cachedData;
};

export default fetchLocalTranslations;
