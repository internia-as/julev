import { NextApiRequest, NextApiResponse } from "next";
import addStatistics from "@/lib/addStatistics";

const BASE_URL = process.env.TRANSLATE_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { langpair, q, markUnknown, callBack } = req.body;

  const response = await fetch(
    `${BASE_URL}?langpair=${langpair}&q=${q}&markUnknown=${markUnknown}&callBack=${callBack}`
  );

  if (!response.ok) {
    return res.status(response.status).json({
      error: "Failed to fetch translation",
      status: response.status,
    });
  }

  const data = await response.json();

  // Track translation statistics
  addStatistics("Translation", q);

  res.status(200).json(data);
}
