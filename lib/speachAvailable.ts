// return if text to speech is available for a given language
export default function speachAvailable(lang: string) {
  switch (lang) {
    case "sma": // South Sami
      return true;
    case "sme": // North Sami
      return true;
    case "smj": // Lule Sami
      return true;
    default:
      return false;
  }
}
