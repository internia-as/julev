// Divvun short-term part of speach getter
export default function getPos(pos: string) {
  const posMap: { [key: string]: string } = {
    v: "Verb",
    n: "Substantiv",
    adj: "Adjektiv",
    adv: "Adverb",
    pron: "Pronomen",
    prep: "Preposisjon",
    conj: "Konjunksjon",
    intj: "Interjeksjon",
    num: "Numeral",
    art: "Artikkel",
    part: "Partikkel",
    aux: "Hjelpeverb",
    interj: "Interjeksjon",
    excl: "Utropsord",
    det: "Determinativ",
    punc: "Tegnsetting",
  };

  return posMap[pos.toLowerCase()] || "";
}
