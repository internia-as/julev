// Divvun short-term language image getter
export default function getLangImg(lang: string) {
  const langMap: { [key: string]: string } = {
    sma: "/images/flags/sm.jpeg",
    sme: "/images/flags/sm.jpeg",
    smj: "/images/flags/sm.jpeg",
    smn: "/images/flags/sm.jpeg",
    sms: "/images/flags/sm.jpeg",
    fin: "/images/flags/fin.png",
    nob: "/images/flags/nob.png",
    swe: "/images/flags/swe.webp",
    eng: "/images/flags/eng.png",
    rus: "/images/flags/rus.png",
  };

  return langMap[lang] || "/images/flags/globe.png";
}
