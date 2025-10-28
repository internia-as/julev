"use client";
import React from "react";

interface RecentSearchesProps {
  searches: Array<{
    type: string;
    query: string;
    createdAt: string;
  }>;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Siste aktivitet
      </h3>
      <div className="space-y-3">
        {searches.map((search, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(
                  search.type
                )}`}
              >
                {getTypeLabel(search.type)}
              </span>
              <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {search.query}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {formatDate(search.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
