import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check method
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { query, wantedDicts, langs } = req.body;
  if (!query || !wantedDicts || !langs) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  const payload = {
    operationName: "AllLemmas",
    variables: {
      inputValue: query,
      searchMode: "start",
      srcLangs: langs,
      targetLangs: langs,
      wantedDicts: wantedDicts,
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

  try {
    const response = await fetch("https://satni.uit.no/newsatni/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const stems = data.data.stemList.edges.map((edge: any) => edge.node.stem);
    res.status(200).json({
      totalItems: data.data.stemList.totalCount,
      stems,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
