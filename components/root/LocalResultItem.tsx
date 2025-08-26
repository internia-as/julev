import { splitText, highlightText, linkifyJf } from "@/lib/textFormating";
import { LocalTranslations } from "@/types/localTranslations";
import React from "react";
import TextToSpeech from "../translate/TextToSpeech";
import { SupportedTTSLanguages } from "@/types/divvun";
import Sikor from "../divvun/Sikor";

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

  const wordIsSami = result.oversatt_fra.toLocaleLowerCase() == "samisk";

  return (
    <div className="w-full px-1">
      <li
        className=" border border-gray-200 rounded-lg bg-white shadow mb-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 50%, rgba(222,222,222,1) 100%)",
        }}
      >
        <div className="flex justify-between px-4 py-5 font-bold sm:px-6">
          <div className="flex space-x-2 items-center">
            <h3 className="" dangerouslySetInnerHTML={{ __html: fra }} />
            {wordIsSami && (
              <TextToSpeech
                text={fra}
                lang={SupportedTTSLanguages.SMJ}
                setErrorMessage={() => {}}
              />
            )}
          </div>
          <p className="font-normal text-sm text-indigo-700">
            {props.result.kredittering}
          </p>
        </div>
        <div className="flex justify-between sm:px-6 pb-4 px-2">
          <p dangerouslySetInnerHTML={{ __html: til }} />
          {wordIsSami && (
            <Sikor language="smj" lemma={fra.trim().split(", ")[0]} />
          )}
        </div>
      </li>
    </div>
  );
};

export default LocalResultItem;
