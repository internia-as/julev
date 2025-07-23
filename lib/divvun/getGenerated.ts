import { GENERATED_QUERY } from "@/graphql/queries/generated";

const URL = process.env.DIVVUN_API_URL as string;
export default async function getGenerated(
  term: string,
  lang: string,
  paradigmTemplates: string[]
) {
  const payload = {
    operationName: "TermArticles",
    query: GENERATED_QUERY,
    variables: {
      language: lang,
      origform: term,
      paradigmTemplates,
    },
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
