export const DICT_ARTICLES_QUERY = `query DictArticles($lemma: String!, $srcLangs: [String]!, $targetLangs: [String]!, $wantedDicts: [String]!) {
  dictEntryList(
    exact: $lemma
    srcLangs: $srcLangs
    targetLangs: $targetLangs
    wantedDicts: $wantedDicts
  ) {
    dictName
    srcLang
    targetLang
    lookupLemmas {
      edges {
        node {
          lemma
          presentationLemma
          language
          pos
        }
      }
    }
    translationGroups {
      translationLemmas {
        edges {
          node {
            lemma
            presentationLemma
            language
            pos
          }
        }
      }
      restriction {
        restriction
      }
      exampleGroups {
        example
        translation
      }
    }
    
  }
}
`;
