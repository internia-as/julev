import getSikorCollections from "@/lib/getSikorCollections";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SIKOR_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { language, lemma } = req.query;
  const corpus = getSikorCollections(language as string);
  const url = `${BASE_URL}backend-${language}/query?corpus=${corpus.join(
    ","
  )}&cqp=[lemma%20=%20"${lemma}"]&start=0&end=0`;

  const response = await fetch(url as string);

  if (!response.ok) {
    return res.status(response.status).json({
      error: "Failed to fetch data from SIKOR",
      status: response.status,
    });
  }

  const data = await response.json();
  res.status(200).json(data);
}
