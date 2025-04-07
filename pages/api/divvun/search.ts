import getAllLemmas from "@/lib/divvun/getAllLemmas";
import getTermArticles from "@/lib/divvun/getTermArticles";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { query, wantedDicts, searchMode, langs, operationName } = req.body;
    switch (operationName) {
      case "allLemmas":
        const data = await getAllLemmas(query, "start", langs, wantedDicts);
        res.status(200).json(data);
        break;
      case "termArticles":
        getTermArticles(lemma, langs);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
