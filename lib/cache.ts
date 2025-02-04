// cache.ts
import { prisma } from "./prisma";

let cachedData: any | null = null;

const fetchData = async () => {
  if (!cachedData) {
    console.log("Fetching data from database...");
    cachedData = await prisma.smj_translations.findMany();
  }
  return cachedData;
};

export default fetchData;
