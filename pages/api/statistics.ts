import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get total count by type
    const totalsByType = await prisma.statistics.groupBy({
      by: ["type"],
      _count: {
        id: true,
      },
    });

    // Get total count overall
    const totalCount = await prisma.statistics.count();

    // Get searches by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const searchesByDate = await prisma.statistics.groupBy({
      by: ["type"],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get recent searches (last 10)
    const recentSearches = await prisma.statistics.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        type: true,
        query: true,
        createdAt: true,
      },
    });

    // Get popular queries
    const popularQueries = await prisma.statistics.groupBy({
      by: ["query", "type"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    });

    res.status(200).json({
      totalsByType,
      totalCount,
      searchesByDate,
      recentSearches,
      popularQueries,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
