"use client";
import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  color = "bg-blue-500",
}) => {
  return (
    <div className="w-60 bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center">
        <div
          className={`min-w-12 min-h-12 ${color} rounded-lg flex items-center justify-center`}
        >
          <span className="text-white font-bold text-lg">
            {value.toString().charAt(0)}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-900">
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
