import React from "react";

interface Props {
  result: any;
}

const ResultItem = (props: Props) => {
  return (
    <li className="w-full md:w-2/3 2xl:w-1/2 rounded-lg bg-white shadow">
      <div className="px-4 py-5 font-bold sm:px-6">{props.result.title}</div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">Translation</div>
    </li>
  );
};

export default ResultItem;
