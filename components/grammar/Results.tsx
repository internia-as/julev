import { GrammarResult } from "@/types/grammarResult";
import { useTranslations } from "next-intl";

interface Props {
  results: GrammarResult | null;
}

const Results = (props: Props) => {
  const t = useTranslations("grammar_checker");

  return (
    <div className="flex flex-col w-full md:w-1/2 space-y-2 bg-gray-100 p-4 rounded-md border border-gray-300">
      <h3>{t("results")}:</h3>
      {props.results ? (
        <>
          <div className="w-full border px-4 py-2 border-gray-300 rounded-sm bg-white">
            Summary
          </div>
          <div className="w-full border px-4 py-2 border-gray-300 rounded-sm bg-white">
            Details
          </div>
        </>
      ) : (
        <div className="h-16"></div>
      )}
    </div>
  );
};

export default Results;
