"use client";
import React from "react";

interface SuggestionsProps {
  suggestions: Array<{
    id: string;
    word: string;
    translation: string;
    direction: string;
    comment: string | null;
    status: string;
    createdAt: string;
  }>;
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ordforslag fra brukere
      </h3>
      {suggestions.length === 0 && (
        <p className="text-sm text-gray-500">Ingen forslag ennå</p>
      )}
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {suggestion.word} → {suggestion.translation}
              </span>
              <span className="text-xs text-gray-500">
                {suggestion.direction === "sm" ? "Lulesamisk → Norsk" : "Norsk → Lulesamisk"}
                {" · "}
                {new Date(suggestion.createdAt).toLocaleDateString("nb-NO")}
              </span>
            </div>
            {suggestion.comment && (
              <p className="text-sm text-gray-600 mt-1">{suggestion.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
