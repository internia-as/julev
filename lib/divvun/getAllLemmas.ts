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
    query: `query AllLemmas($inputValue: String!, $searchMode: String!, $srcLangs: [String]!, $targetLangs: [String]!, $wantedDicts: [String]!, $after: String) {
        stemList(
          first: 100
          search: $inputValue
          mode: $searchMode
          srcLangs: $srcLangs
          targetLangs: $targetLangs
          wantedDicts: $wantedDicts
          after: $after
        ) {
          totalCount
          edges {
            node {
              stem
            }
          }
        }
      }`,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("Response from Divvun API:", response);

  const data = await response.json();
  const stems = data.data.stemList.edges.map((edge: any) => edge.node.stem);
  return {
    totalItems: data.data.stemList.totalCount,
    stems,
  };
}
