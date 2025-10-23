import addStatistics from "@/lib/addStatistics";
import { getLocalResults } from "@/lib/localSearch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, direction } = req.query as { q: string; direction: string };
  if (!q) {
    res.status(400).json({ error: "Missing query parameter" });
    return;
  }

  const results = await getLocalResults(
    q,
    direction as "nob" | "sm" | "relevance"
  );
  const resultsWithoutBigInt = JSON.parse(
    JSON.stringify(results, (_key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  res.status(200).json(resultsWithoutBigInt);
  addStatistics("LocalSearch", q);
}
