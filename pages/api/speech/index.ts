import { NextApiRequest, NextApiResponse } from "next";

const SPEECH_API_URL = process.env.TEXT_TO_SPEECH_URL;

type Body = {
  text: string;
  lang: string;
  voice: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { text, lang, voice } = req.body as Body;

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
    case "sma": // Divvun short-term language code for South Sami
      lang = "sma";
      voice = "aanna";
      break;
    case "smj":
      voice = "abmut";
      break;
    default:
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
  } else {
    console.log("Audio fetched successfully from external API", response);
  }

  res.setHeader("Content-Type", "audio/wav");
  const audioBuffer = await response.arrayBuffer();
  res.status(200).send(Buffer.from(audioBuffer));
}
