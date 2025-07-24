// Verb paradigms for different languages
const V_SME = [
  "mun",
  "don",
  "son",
  "moai",
  "doai",
  "soai",
  "mii",
  "dii",
  "sii",
];
const V_SMJ = ["mån", "duon", "sån", "måj", "dåj", "såj", "mij", "dij", "sij"];
const V_SMA = [
  "manne",
  "datne",
  "dïhte",
  "månnoeh",
  "dotne/dåtnoeh",
  "dah guaktah",
  "mij",
  "dijjieh",
  "dah",
];
const V_SMN = [
  "mun",
  "tun",
  "sun",
  "muoi",
  "tuoi",
  "suoi",
  "mij",
  "tij",
  "sij",
];

// Noun paradigms for different languages
const N_SME = ["Nom", "Acc", "Gen", "Ill", "Loc", "Com", "Ess"];
const N_SMJ = ["Nom", "Acc", "Gen", "Ill", "Ine", "Ela", "Com", "Abe", "Ess"];
const N_SMA = ["Nom", "Acc", "Gen", "Ill", "Ine", "Ela", "Com", "Ess"];
const N_SMN = ["Nom", "Acc", "Gen", "Ill", "Loc", "Com", "Abe", "Par", "Ess"];
const N_FIN = [
  "Nom",
  "Gen",
  "Par",
  "All",
  "Abl",
  "Abe",
  "Ill",
  "Ine",
  "Ela",
  "Abe",
  "Ess",
  "Tra",
  "Ins",
];

// Adjective paradigms for different languages
const A_SME = [
  "Attr",
  "Sg/Nom",
  "Pl/Nom",
  "Sg/Acc",
  "Pl/Acc",
  "Sg/Gen",
  "Pl/Gen",
  "Sg/Ill",
  "Pl/Ill",
  "Sg/Loc",
  "Pl/Loc",
  "Sg/Com",
  "Pl/Com",
  "Ess",
];
const A_SMJ = [
  "Attr",
  "Sg/Nom",
  "Pl/Nom",
  "Sg/Acc",
  "Pl/Acc",
  "Sg/Gen",
  "Pl/Gen",
  "Sg/Ill",
  "Pl/Ill",
  "Sg/Ine",
  "Pl/Ine",
  "Sg/Ela",
  "Pl/Ela",
  "Sg/Com",
  "Pl/Com",
  "Sg/Abe",
  "Pl/Abe",
  "Ess",
];
const A_SMA = [
  "Attr",
  "Sg/Nom",
  "Pl/Nom",
  "Sg/Acc",
  "Pl/Acc",
  "Sg/Gen",
  "Pl/Gen",
  "Sg/Ill",
  "Pl/Ill",
  "Sg/Ine",
  "Pl/Ine",
  "Sg/Ela",
  "Pl/Ela",
  "Sg/Com",
  "Pl/Com",
  "Ess",
];

// Return the first column based on the index, part of speech, and language
export const getColumn = (index: number, pos: string, lang: string) => {
  switch (pos) {
    case "V":
      return getVerbs(index, lang);
    case "N":
      return getNouns(index, lang);
    case "A":
      return getAdjectives(index, lang);
    default:
      return `Unknown POS: ${pos}`;
  }
};

const getVerbs = (index: number, lang: string) => {
  switch (lang) {
    case "sme":
      return V_SME[index] || "";
    case "smj":
      return V_SMJ[index] || "";
    case "sma":
      return V_SMA[index] || "";
    default:
      return "";
  }
};

const getNouns = (index: number, lang: string) => {
  switch (lang) {
    case "sme":
      return N_SME[index] || "";
    case "smj":
      return N_SMJ[index] || "";
    case "sma":
      return N_SMA[index] || "";
    case "smn":
      return N_SMN[index] || "";
    case "fin":
      return N_FIN[index] || "";
    default:
      return "";
  }
};

const getAdjectives = (index: number, lang: string) => {
  switch (lang) {
    case "sme":
      return A_SME[index] || "";
    case "smj":
      return A_SMJ[index] || "";
    case "sma":
      return A_SMA[index] || "";
    default:
      return "";
  }
};
