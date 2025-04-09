import { TERM_ARTICLES_QUERY } from "@/graphql/queries/termArticles";

const URL = process.env.DIVVUN_API_URL as string;
export default async function getTermArticles(
  lemma: string,
  srcLangs: string[]
) {
  const payload = {
    operationName: "TermArticles",
    variables: { lemma, srcLangs, targetLangs: srcLangs },
    query: TERM_ARTICLES_QUERY,
  };

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DIVVUN_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
}
