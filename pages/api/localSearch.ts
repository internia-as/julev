import { getLocalResults } from "@/lib/localSearch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query as { q: string };
  if (!q) {
    res.status(400).json({ error: "Missing query parameter" });
    return;
  }
  const results = await getLocalResults(q);
  res.status(200).json(results);
}
