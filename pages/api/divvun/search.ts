import fetchSatni from "@/lib/divvun/fetchSatni";
import getPayload from "@/lib/divvun/getPayload";
import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redisClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { query, wantedDicts, langs, operationName } = req.body;
    let data;

    if (operationName === "AllLemmas") {
      const cacheKey = `AllLemmas:${query}:${langs.join(
        ","
      )}:${wantedDicts.join(",")}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit: AllLemmas");
        console.log(`cacheKey: ${cacheKey}`);
        data = JSON.parse(cachedData);
        console.log(data);
      } else {
        console.log("Cache miss: AllLemmas");
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

        redisClient.set(cacheKey, JSON.stringify(data), { EX: 300 });
      }
    } else if (operationName === "TermArticles") {
      const cacheKey = `TermArticles:${query}:${langs.join(",")}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit: TermArticles");
        console.log(`cacheKey: ${cacheKey}`);
        data = JSON.parse(cachedData);
        console.log(data);
      } else {
        console.log("Cache miss: TermArticles");
        const payload = getPayload(operationName, query, langs, wantedDicts);
        data = await fetchSatni(payload);
      }
    } else if (operationName === "DictArticles") {
      const cacheKey = `DictArticles:${query}:${langs.join(
        ","
      )}:${wantedDicts.join(",")}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit: DictArticles");
        console.log(`cacheKey: ${cacheKey}`);
        data = JSON.parse(cachedData);
        console.log(data);
      } else {
        console.log("Cache miss: DictArticles");
        const payload = getPayload(operationName, query, langs, wantedDicts);
        data = await fetchSatni(payload);
        redisClient.set(cacheKey, JSON.stringify(data), { EX: 300 });
      }
    } else {
      res.status(400).json({ message: "Invalid operation name" });
      return;
    }

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
