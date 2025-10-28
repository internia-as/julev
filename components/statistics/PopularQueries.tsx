"use client";
import React from "react";

interface PopularQueriesProps {
  queries: Array<{
    query: string;
    type: string;
    _count: { id: number };
  }>;
}

const PopularQueries: React.FC<PopularQueriesProps> = ({ queries }) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "LocalSearch":
        return "Lulesamisk søk";
      case "DivvunSearch":
        return "Samisk søk";
      case "GrammarCheck":
        return "Grammatikksjekk";
      case "Translation":
        return "Oversettelse";
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "LocalSearch":
        return "bg-blue-100 text-blue-800";
      case "DivvunSearch":
        return "bg-green-100 text-green-800";
      case "GrammarCheck":
        return "bg-purple-100 text-purple-800";
      case "Translation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Populære forespørsler
      </h3>
      <div className="space-y-3">
        {queries.map((query, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-gray-400 w-6">
                #{index + 1}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(
                  query.type
                )}`}
              >
                {getTypeLabel(query.type)}
              </span>
              <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {query.query}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {query._count.id} ganger
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularQueries;
