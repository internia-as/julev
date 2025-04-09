export const TERM_ARTICLES_QUERY = `
  query TermArticles($lemma: String!, $srcLangs: [String]!, $targetLangs: [String]!) {
    conceptList(exact: $lemma, srcLangs: $srcLangs, targetLangs: $targetLangs) {
      name
      definition
      explanation
      terms {
        expression {
          lemma
          presentationLemma
          language
          pos
        }
      }
    }
  }
`;
