export const GENERATED_QUERY = `query Generated($origform: String!, $language: String!, $paradigmTemplates: [String]!) {
  generated(
    origform: $origform
    language: $language
    paradigmTemplates: $paradigmTemplates
  ) {
    paradigmTemplate
    analyses {
      wordform
      weight
      __typename
    }
    __typename
  }
}
`;
