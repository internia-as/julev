import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

interface SeedRecord {
  id: number;
  fra: string;
  til: string;
  oversatt_fra: string;
  oversatt_til: string;
  kredittering: string;
  publisert: number;
  kildeId: number;
  brukerforslag: number;
  brukerepost: string;
  behandlingId: number;
  sikor_hits: number | null;
}

const prisma = new PrismaClient();

async function main() {
  const dataPath = resolve(__dirname, "seed-data.json");
  const records = JSON.parse(readFileSync(dataPath, "utf-8")) as SeedRecord[];

  console.log(`Seeding ${records.length} records into smj_translations...\n`);

  const ids = records.map((r) => BigInt(r.id));
  const existing = await prisma.smj_translations.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });
  const existingIds = new Set(existing.map((r) => r.id.toString()));

  let created = 0;
  let updated = 0;

  for (const record of records) {
    const id = BigInt(record.id);
    const { id: _id, ...data } = record;

    await prisma.smj_translations.upsert({
      where: { id },
      create: { ...data, id },
      update: data,
    });

    if (existingIds.has(id.toString())) {
      updated++;
      console.log(`  [update] id=${record.id}`);
    } else {
      created++;
      console.log(`  [create] id=${record.id}`);
    }
  }

  console.log(`\nDone. ${created} created, ${updated} updated, ${records.length} total.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });