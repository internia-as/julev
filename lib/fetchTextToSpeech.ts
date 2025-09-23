import { SupportedTTSLanguages } from "@/types/divvun";

const fetchTextToSpeech = async (text: string, lang: SupportedTTSLanguages) => {
  try {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        lang: lang,
      }),
    });
    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
    return null;
  } catch (error) {
    console.error("Error fetching text-to-speech:", error);
    return false;
  }
};

export default fetchTextToSpeech;
