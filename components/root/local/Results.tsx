import { getLocalResults } from "@/lib/utils";
import ResultList from "./ResultList";

interface Props {
  query: string;
}

const Results = async (props: Props) => {
  const res = await getLocalResults(props.query);

  if (props.query === "") return <></>;

  if (res.length === 0) {
    return <p>No results found</p>;
  }
  return <ResultList results={res} />;
};

export default Results;
