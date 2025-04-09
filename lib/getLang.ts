export default function getLang(lang: string) {
  const langMap: { [key: string]: string } = {
    sma: "Sør Samisk",
    sme: "Nord Samisk",
    smj: "Lule Samisk",
    smn: "Inari Samisk",
    sms: "Skolt Samisk",
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
