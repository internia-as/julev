import { prisma } from "./prisma";

export default async function addStatistics(type: string, query: string) {
  await prisma.statistics.create({
    data: {
      type: type,
      query: query,
    },
  });
}
