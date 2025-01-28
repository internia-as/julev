import { getLocalResults } from "@/lib/utils";
import ResultItem from "./ResultItem";

interface Props {
  query: string;
}

const Results = async (props: Props) => {
  const res = await getLocalResults(props.query);

  if (props.query === "") return <></>;

  if (res.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {res.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))}
      </div>
    </>
  );
};

export default Results;
