import addStatistics from "@/lib/addStatistics";
import { getLocalResults } from "@/lib/localSearch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    q,
    direction,
    page = "1",
    limit = "30",
  } = req.query as {
    q: string;
    direction: string;
    page: string;
    limit: string;
  };

  if (!q) {
    res.status(400).json({ error: "Missing query parameter" });
    return;
  }

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    res.status(400).json({ error: "Invalid page parameter" });
    return;
  }

  if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    res.status(400).json({ error: "Invalid limit parameter (1-100)" });
    return;
  }

  const { results, totalCount, hasMore } = await getLocalResults(
    q,
    direction as "nob" | "sm" | "relevance",
    pageNumber,
    limitNumber
  );

  const resultsWithoutBigInt = JSON.parse(
    JSON.stringify(results, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  addStatistics("LocalSearch", q);
  res.status(200).json({
    results: resultsWithoutBigInt,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalCount,
      hasMore,
    },
  });
}
