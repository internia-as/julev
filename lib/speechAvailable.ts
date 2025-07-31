// return if text to speech is available for a given language
export default function speechAvailable(lang: string | null) {
  switch (lang) {
    case "sma": // South Sami
      return true;
    case "sme": // North Sami
      return true;
    case "smj": // Lule Sami
      return true;
    case "sma_Mid":
      return true;
    case "sma_North":
      return true;
    default:
      return false;
  }
}
