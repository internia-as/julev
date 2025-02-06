import { LocalTranslations } from "@/types/localTranslations";
import React from "react";

interface Props {
  result: LocalTranslations;
}

const ResultItem = (props: Props) => {
  return (
    <div className="w-full md:w-2/3 2xl:w-1/2">
      <li
        className=" border border-gray-200 rounded-lg bg-white shadow"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 50%, rgba(222,222,222,1) 100%)",
        }}
      >
        <div className="px-4 py-5 font-bold sm:px-6">{props.result.fra}</div>
        <div className=" px-4 py-5 sm:p-6">{props.result.til}</div>
      </li>
    </div>
  );
};

export default ResultItem;
