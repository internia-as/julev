import { ALL_LEMMAS_QUERY } from "@/graphql/queries/allLemmas";
import { GENERATED_QUERY } from "@/graphql/queries/generated";
import { TERM_ARTICLES_QUERY } from "@/graphql/queries/termArticles";
import { DICT_ARTICLES_QUERY } from "@/graphql/queries/dictArticles";

export default function getPayload(
  operationName: string,
  term: string,
  srcLangs?: string[],
  wantedDicts?: string[],
  lang?: string,
  paradigmTemplates?: string[]
) {
  switch (operationName) {
    case "AllLemmas":
      return {
        operationName,
        variables: {
          inputValue: term,
          searchMode: "start",
          srcLangs,
          targetLangs: srcLangs,
          wantedDicts,
        },
        query: ALL_LEMMAS_QUERY,
      };
    case "TermArticles":
      return {
        operationName,
        variables: { lemma: term, srcLangs, targetLangs: srcLangs },
        query: TERM_ARTICLES_QUERY,
      };
    case "DictArticles":
      return {
        operationName: "DictArticles",
        variables: {
          lemma: term,
          srcLangs,
          targetLangs: srcLangs,
          wantedDicts,
        },
        query: DICT_ARTICLES_QUERY,
      };
    case "Generated":
      return {
        operationName,
        query: GENERATED_QUERY,
        variables: {
          language: lang,
          origform: term,
          paradigmTemplates,
        },
      };
    default:
      throw new Error(`Unknown operation name: ${operationName}`);
  }
}
