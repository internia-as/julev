import fetchSatni from "@/lib/divvun/fetchSatni";
import getPayload from "@/lib/divvun/getPayload";
import { getParadigmTemplates } from "@/lib/divvun/getParadigmTemplates";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { lang, term, pos, type } = req.body;

    let paradigmTemplates = getParadigmTemplates(pos as string);
    if (type === "init") {
      paradigmTemplates = [paradigmTemplates[0]];
    }

    const payload = getPayload(
      "Generated",
      term as string,
      undefined,
      undefined,
      lang as string,
      paradigmTemplates
    );

    const data = await fetchSatni(payload);
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
