import { NextApiRequest, NextApiResponse } from "next";
import { withRateLimit } from "@/lib/withRateLimit";

const KARTVERKET_URL = process.env.KARTVERKET_URL;
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query as { q: string };
  if (!q) {
    res.status(400).json({ error: "Missing query parameter" });
    return;
  }
  const response = await fetch(
    `${KARTVERKET_URL}?sok=${encodeURIComponent(
      q
    )}&fuzzy=false&treffPerSide=500&filter=stedsnavn`
  );
  const data = await response.json();
  res.status(200).json(data);
}

export default withRateLimit(handler, "kartverket");
