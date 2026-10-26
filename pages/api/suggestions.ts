import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/withRateLimit";

const DIRECTIONS = ["nob", "sm"];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { word, translation, direction, comment, website } = req.body ?? {};

  // Hidden field that only bots fill in; pretend success
  if (website) {
    return res.status(201).json({ message: "Takk for forslaget" });
  }

  if (
    typeof word !== "string" ||
    typeof translation !== "string" ||
    !word.trim() ||
    !translation.trim() ||
    word.length > 200 ||
    translation.length > 500 ||
    !DIRECTIONS.includes(direction) ||
    (comment !== undefined && (typeof comment !== "string" || comment.length > 1000))
  ) {
    return res.status(400).json({ message: "Invalid suggestion" });
  }

  try {
    await prisma.suggestions.create({
      data: {
        word: word.trim(),
        translation: translation.trim(),
        direction,
        comment: comment?.trim() || null,
      },
    });
    res.status(201).json({ message: "Takk for forslaget" });
  } catch (error) {
    console.error("Error saving suggestion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default withRateLimit(handler, "suggestions");
