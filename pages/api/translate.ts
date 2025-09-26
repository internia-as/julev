import { NextApiRequest, NextApiResponse } from "next";

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
  console.log("Fetched translation data successfully");
  console.log(response);

  const data = await response.json();
  res.status(200).json(data);
}
