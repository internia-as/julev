import { NextApiRequest, NextApiResponse } from "next";

const SPEECH_API_URL = process.env.TEXT_TO_SPEECH_URL;

type Query = {
  text: string;
  lang: string;
  voice: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.query as Query;

  let lang = req.query.lang;
  let voice = "";

  switch (lang) {
    case "sme":
      lang = "se";
      voice = "biret";
      break;
    case "sma_North":
      lang = "sma";
      voice = "aanna";
      break;

    case "sma_Mid":
      lang = "sma";
      voice = "aanna";
      break;
    case "smj":
      voice = "abmut";
      break;
  }

  const url = SPEECH_API_URL + `${lang}/${voice}`;
  const response = await fetch(url as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(response.status).json({
      error: "Failed to fetch audio from external API",
      details: errorText,
    });
  }

  res.setHeader("Content-Type", "audio/wav");
  const audioBuffer = await response.arrayBuffer();
  res.status(200).send(Buffer.from(audioBuffer));
}
