import { prisma } from "./prisma";

export default async function addStatistics(
  type: string,
  query: string,
  hits?: number
) {
  await prisma.statistics.create({
    data: {
      type: type,
      query: query,
      hits: hits,
    },
  });
}
