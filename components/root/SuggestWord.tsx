"use client";
import { useState } from "react";

interface Props {
  query: string;
  direction: string;
}

const SuggestWord = ({ query, direction }: Props) => {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState(query);
  const [translation, setTranslation] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const suggestDirection = direction === "sm" ? "sm" : "nob";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word,
          translation,
          direction: suggestDirection,
          comment,
          website,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="mt-4 text-green-700">
        Takk! Forslaget blir vurdert før det legges inn i ordboka.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 underline text-slate-700 hover:text-slate-900"
      >
        Savner du dette ordet? Foreslå det
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 w-full max-w-md">
      <label className="flex flex-col text-sm">
        {suggestDirection === "nob" ? "Norsk ord" : "Lulesamisk ord"}
        <input
          required
          maxLength={200}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border border-gray-300 p-2"
        />
      </label>
      <label className="flex flex-col text-sm">
        {suggestDirection === "nob" ? "Lulesamisk oversettelse" : "Norsk oversettelse"}
        <input
          required
          maxLength={500}
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="border border-gray-300 p-2"
        />
      </label>
      <label className="flex flex-col text-sm">
        Kommentar (valgfritt)
        <textarea
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 p-2"
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />
      <p className="text-xs text-gray-500">
        Ikke skriv navn eller andre personopplysninger.
      </p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-slate-600 text-white font-bold py-2 hover:bg-slate-900 disabled:opacity-50"
      >
        Send forslag
      </button>
      {status === "error" && (
        <p className="text-red-600 text-sm">Noe gikk galt. Prøv igjen senere.</p>
      )}
    </form>
  );
};

export default SuggestWord;
