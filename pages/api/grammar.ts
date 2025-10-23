import addStatistics from "@/lib/addStatistics";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.GRAMMAR_CHECKER_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lang, text, encoding } = req.body;
    const response = await fetch(`${BASE_URL}/${lang}?encoding=${encoding}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch grammar check",
        status: response.status,
      });
    }
    const data = await response.json();
    res.status(200).json(data);
    addStatistics("GrammarCheck", text);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
