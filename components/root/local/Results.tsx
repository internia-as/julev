import { getLocalResults } from "@/lib/localSearch";
import ResultList from "./ResultList";

interface Props {
  query: string;
}

const Results = async (props: Props) => {
  const res = await getLocalResults(props.query);

  if (props.query === "") return <></>;
  return <ResultList results={res} query={props.query} />;
};

export default Results;
