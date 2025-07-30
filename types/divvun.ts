export interface DivvunSearch {
  totalItems: number;
  stems: string[];
}

export interface DivvunLookup {}

// Text-to-speech request interface
export enum SupportedTTSLanguages {
  SME = "sme",
  SMA_North = "sma_North",
  SMA_Mid = "sma_Mid",
  SMJ = "smj",
}
