// Divvun short-term language name getter
export default function getLang(lang: string) {
  const langMap: { [key: string]: string } = {
    sma: "Sørsamisk",
    sme: "Nordsamisk",
    smj: "Lulesamisk",
    smn: "Inarisamisk",
    sms: "Skoltsamisk",
    fin: "Finsk",
    nob: "Norsk Bokmål",
    swe: "Svensk",
    lat: "Latin",
    eng: "Engelsk",
    nno: "nno",
    rus: "Rusisk",
  };

  return langMap[lang] || lang;
}
