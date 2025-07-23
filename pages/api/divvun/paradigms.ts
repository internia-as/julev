import { getParadigmTemplates } from "@/lib/divvun/paradigms";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { lang, term, pos, type } = req.query;
    let paradigmTemplates = getParadigmTemplates(
      lang as string,
      pos as string
    );
    if (type === "init" && ) {
      paradigmTemplates = [paradigmTemplates[0]];
    }
    const data = await getGenerated(term as string, lang as string, paradigmTemplates);

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
