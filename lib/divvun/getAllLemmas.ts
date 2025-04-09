import { ALL_LEMMAS_QUERY } from "@/graphql/queries/allLemmas";

const URL = process.env.DIVVUN_API_URL as string;
export default async function getAllLemmas(
  query: string,
  searchMode: string = "start",
  srcLangs: string[],
  wantedDicts: string[]
) {
  const payload = {
    operationName: "AllLemmas",
    variables: {
      inputValue: query,
      searchMode,
      srcLangs,
      targetLangs: srcLangs,
      wantedDicts,
    },
    query: ALL_LEMMAS_QUERY,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  const stems = data.data.stemList.edges.map((edge: any) => edge.node.stem);
  return {
    totalItems: data.data.stemList.totalCount,
    stems,
  };
}
