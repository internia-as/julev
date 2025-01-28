import React from "react";

interface Props {
  result: any;
}

const ResultItem = (props: Props) => {
  return (
    <div className="w-1/2 rounded-lg bg-white shadow">
      <div className="px-4 py-5 font-bold sm:px-6">Item</div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">Translation</div>
    </div>
  );
};

export default ResultItem;
