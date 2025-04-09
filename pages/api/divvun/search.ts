import getAllLemmas from "@/lib/divvun/getAllLemmas";
import getTermArticles from "@/lib/divvun/getTermArticles";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { query, wantedDicts, searchMode, langs, operationName } = req.body;
    let data;
    switch (operationName) {
      case "allLemmas":
        data = await getAllLemmas(query, "start", langs, wantedDicts);
        break;
      case "termArticles":
        data = await getTermArticles(query, langs);
        break;
    }
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
