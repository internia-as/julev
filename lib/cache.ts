// cache.ts
import { LocalTranslations } from "@/types/localTranslations";
import { prisma } from "./prisma";

let cachedData: LocalTranslations[] | null = null;

const fetchLocalTranslations = async (): Promise<LocalTranslations[]> => {
  if (!cachedData) cachedData = await prisma.smj_translations.findMany();
  if (!cachedData)
    throw new Error("Failed to fetch local translations from database");
  return cachedData;
};

export default fetchLocalTranslations;
