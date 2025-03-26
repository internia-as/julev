import { splitText, highlightText, linkifyJf } from "@/lib/textFormating";
import { LocalTranslations } from "@/types/localTranslations";
import React from "react";

interface Props {
  result: LocalTranslations;
  query: string;
}

const LocalResultItem = (props: Props) => {
  const { query, result } = props;
  let { fra, til } = result;

  // Formating the text
  // Splitting the text on ";<br />"
  fra = splitText(fra, ";");
  til = splitText(til, ";");
  // Highlighting the text
  fra = highlightText(fra, query);
  til = highlightText(til, query);
  // Link the text after "jf."
  fra = linkifyJf(fra);
  til = linkifyJf(til);

  return (
    <div className="w-full">
      <li
        className=" border border-gray-200 rounded-lg bg-white shadow"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 50%, rgba(222,222,222,1) 100%)",
        }}
      >
        <div className="flex justify-between px-4 py-5 font-bold sm:px-6">
          <h3 className="" dangerouslySetInnerHTML={{ __html: fra }} />
          <p className="font-normal text-sm text-indigo-700">
            {props.result.kredittering}
          </p>
        </div>
        <p
          className=" px-4 py-5 sm:p-6"
          dangerouslySetInnerHTML={{ __html: til }}
        />
      </li>
    </div>
  );
};

export default LocalResultItem;
