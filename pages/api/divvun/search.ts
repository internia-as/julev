import fetchSatni from "@/lib/divvun/fetchSatni";
import getPayload from "@/lib/divvun/getPayload";
import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "@/lib/redisClient";
import addStatistics from "@/lib/addStatistics";

const CACHE_TTL = { expiration: { type: "EX" as const, value: 86400 } };

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
        data = JSON.parse(cachedData);
      } else {
        const payload = await getPayload(
          operationName,
          query,
          langs,
          wantedDicts
        );
        const response = await fetchSatni(payload);
        const stemList = response?.data?.stemList;
        const stems = (stemList?.edges ?? []).map(
          (edge: any) => edge.node.stem
        );
        data = {
          totalItems: stemList?.totalCount ?? 0,
          stems,
        };

        // Only cache non-empty results so a transient empty response (or an
        // empty srcLangs/wantedDicts request) isn't served for the full TTL.
        if (data.totalItems > 0) {
          redisClient.set(cacheKey, JSON.stringify(data), CACHE_TTL);
        }
      }
      addStatistics("DivvunSearch", query);
    } else if (operationName === "TermArticles") {
      const cacheKey = `TermArticles:${query}:${langs.join(",")}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        data = JSON.parse(cachedData);
      } else {
        const payload = getPayload(operationName, query, langs, wantedDicts);
        const response = await fetchSatni(payload);
        data = response;
        const conceptList = response?.data?.conceptList;
        if (Array.isArray(conceptList) && conceptList.length > 0) {
          redisClient.set(cacheKey, JSON.stringify(data), CACHE_TTL);
        }
      }
    } else if (operationName === "DictArticles") {
      const cacheKey = `DictArticles:${query}:${langs.join(
        ","
      )}:${wantedDicts.join(",")}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        data = JSON.parse(cachedData);
      } else {
        const payload = getPayload(operationName, query, langs, wantedDicts);
        const response = await fetchSatni(payload);
        data = response;
        const dictEntryList = response?.data?.dictEntryList;
        if (Array.isArray(dictEntryList) && dictEntryList.length > 0) {
          redisClient.set(cacheKey, JSON.stringify(data), CACHE_TTL);
        }
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
