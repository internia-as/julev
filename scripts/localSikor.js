import { PrismaClient } from "@prisma/client/default.js";
const prisma = new PrismaClient();

const getWords = async () => {
  // Find all the reocrds where oversatt_fra equals samisk
  return await prisma.smj_translations.findMany({
    where: {
      oversatt_fra: "samisk",
    },
    select: {
      id: true,
      fra: true,
    },
  });
};

const words = await getWords();
const filtered = [];
words.forEach((w) => {
  const w1 = w.fra?.split(" ")[0];
  const w2 = w1?.split(",")[0];
  if (w2) {
    filtered.push({ id: w.id, word: w2 });
  }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (const w of filtered) {
  try {
    const res = await fetch(
      `http://localhost:3001/api/sikor?language=smj&lemma=${encodeURIComponent(
        w.word
      )}`
    );
    if (!res.ok) {
      console.error("Fetch failed for", w.word, res.status);
    } else {
      const data = await res.json();
      if (data.hits && data.hits > 0) {
        await prisma.smj_translations.update({
          where: { id: w.id },
          data: { sikor_hits: data.hits },
        });
      }
    }
  } catch (err) {
    console.error("Error processing", w.word, err);
  }

  // wait between requests (e.g. 200ms)
  await sleep(300);
}
