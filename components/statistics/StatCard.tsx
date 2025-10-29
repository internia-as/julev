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
    <div className="w-60 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center">
        <div
          className={`${color} w-full p-4 rounded-t-lg text-white flex flex-col justify-center items-center`}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm ">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold w-full flex justify-center pb-4 text-gray-900">
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
