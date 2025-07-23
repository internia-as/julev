import fetchSatni from "@/lib/divvun/fetchSatni";
import getPayload from "@/lib/divvun/getPayload";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { query, wantedDicts, langs, operationName } = req.body;
    let data;

    if (operationName === "AllLemmas") {
      const payload = await getPayload(
        operationName,
        query,
        langs,
        wantedDicts
      );
      const response = await fetchSatni(payload);
      const stems = response.data.stemList.edges.map(
        (edge: any) => edge.node.stem
      );
      data = {
        totalItems: response.data.stemList.totalCount,
        stems,
      };
    } else if (operationName === "TermArticles") {
      const payload = getPayload(operationName, query, langs);
      data = await fetchSatni(payload);
    }

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
