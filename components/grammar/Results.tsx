import { GrammarResult } from "@/types/grammarResult";
import { useTranslations } from "next-intl";
import ErrorCard from "./ErrorCard";

interface Props {
  results: GrammarResult | null;
  lang: string | null;
}

const Results = (props: Props) => {
  const t = useTranslations("grammar_checker");

  const formatResult = (result: GrammarResult) => {
    const { text, errs } = result;

    let lastIndex = 0;

    const content = errs.flatMap((error, index) => {
      const { start_index, end_index, error_text } = error;

      // Correcting end_index (programmatically) to match error_text length
      const correctedEndIndex = start_index + error_text.length;

      if (text.slice(start_index, correctedEndIndex) !== error_text) {
        console.warn(
          `Error spans incorrectly: "${text.slice(
            start_index,
            end_index
          )}". Expected "${error_text}". Adjusting programmatically.`
        );
      }

      // Fragments of the text with error spans
      const fragments = [
        // Non-error text before the current error segment
        <span key={`${index}-before`}>
          {text.slice(lastIndex, start_index)}
        </span>,

        // Correctly highlighted error segment
        <span
          key={`${index}-error`}
          style={{
            color: "red",
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          title={error.description} // Add a tooltip with error description
        >
          {text.slice(start_index, correctedEndIndex)}
        </span>,
      ];

      // Update the index tracker
      lastIndex = correctedEndIndex;

      return fragments;
    });

    // Add any remaining text after the last error
    content.push(<span key="after">{text.slice(lastIndex)}</span>);

    return <>{content}</>;
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 space-y-2 bg-gray-100 p-4 rounded-md border border-gray-300">
      <h3 className="text-gray-700 font-semibold    ">{t("results")}:</h3>
      {props.results ? (
        <>
          <div className="w-full border px-4 py-2 border-gray-300 rounded-sm bg-white">
            {formatResult(props.results)}
          </div>
          <div className="flex flex-col space-y-2">
            {props.results.errs.map((e, index) => (
              <ErrorCard key={index} error={e} lang={props.lang} />
            ))}
          </div>
        </>
      ) : (
        <div className="h-16"></div>
      )}
    </div>
  );
};

export default Results;
