"use client";
import React from "react";

interface MissingWordsProps {
  words: Array<{
    query: string;
    _count: { id: number };
  }>;
}

const MissingWords: React.FC<MissingWordsProps> = ({ words }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Søk uten treff
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Ord folk leter etter som ordboka ikke har
      </p>
      {words.length === 0 && (
        <p className="text-sm text-gray-500">Ingen data ennå</p>
      )}
      <div className="space-y-3">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
              {word.query}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {word._count.id} ganger
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissingWords;
