export enum LangPair {
  SME_NO = "sme|nob",
  SME_SMA_MID = "sme|sma_Mid",
  SME_SMA_NORTH = "sme|sma_North",
  SME_SMN = "sme|smn",
  SME_SMJ = "sme|smj",
  SMJ_SME = "smj|sme",
  SMA_SME = "sma|sme",
  SMN_SME = "smn|sme",
}

export interface TranslationRequest {
  langpair: LangPair;
  q: string;
  markUnknown: "yes" | "no";
  callBack: string;
}
