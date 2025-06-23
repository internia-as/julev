import { splitText, highlightText, linkifyJf } from "@/lib/textFormating";
import { LocalTranslations } from "@/types/localTranslations";
import React from "react";
import TextToSpeech from "../translate/TextToSpeech";
import { IconButton } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

const SIKOR_ULR = process.env.NEXT_PUBLIC_SIKOR_URL;

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

  const redirectToSikor = () => {
    // TODO: redirect to SIKOR
    console.log("Redirecting to SIKOR with ID:", SIKOR_ULR);
  };

  return (
    <div className="w-full">
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
            {result.oversatt_fra.toLocaleLowerCase() == "samisk" && (
              <TextToSpeech
                text={fra}
                lang={"smj"}
                setErrorMessage={() => {}}
              />
            )}
          </div>
          <p className="font-normal text-sm text-indigo-700">
            {props.result.kredittering}
          </p>
        </div>
        <div className="flex justify-between sm:px-6 pb-4">
          <p dangerouslySetInnerHTML={{ __html: til }} />
          <IconButton>
            <FormatAlignJustifyIcon
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                // Handle click event to show more details or perform an action
                redirectToSikor();
              }}
            />
          </IconButton>
        </div>
      </li>
    </div>
  );
};

export default LocalResultItem;
