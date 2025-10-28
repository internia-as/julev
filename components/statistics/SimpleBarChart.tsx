"use client";
import React from "react";

interface SimpleBarChartProps {
  data: Array<{
    type: string;
    _count: { id: number };
  }>;
  title: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item._count.id));

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LocalSearch":
        return "bg-blue-500";
      case "DivvunSearch":
        return "bg-green-500";
      case "GrammarCheck":
        return "bg-purple-500";
      case "Translation":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.type} className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-700">
              {getTypeLabel(item.type)}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`${getTypeColor(
                    item.type
                  )} h-4 rounded-full transition-all duration-300`}
                  style={{
                    width: `${(item._count.id / maxValue) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-16 text-right text-sm font-semibold text-gray-900">
              {item._count.id.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
