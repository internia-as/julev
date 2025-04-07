import { TERM_ARTICLES_QUERY } from "@/graphql/queries/termArticles";

const URL = process.env.DIVVUN_API_URL;
export default async function getTermArticles(
  lemma: string,
  srcLangs: string[]
) {
  const payload = {
    operationName: "TermArticles",
    variables: { lemma, srcLangs, targetLangs: srcLangs },
    query: TERM_ARTICLES_QUERY,
  };

  return data;
}
