"use client";
import ResultList from "./ResultList";
import { useEffect, useState } from "react";

interface Props {
  query: string;
}

const Results = (props: Props) => {
  // const results = await getLocalResults(props.query); // This is not allowed in the browser
  const [results, setResults] = useState([]);

  // Fetch results from the API
  const fetchResults = async () => {
    fetch(`/api/localSearch?q=${props.query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  };

  useEffect(() => {
    if (props.query) fetchResults();
  }, [props.query]);

  if (props.query === "") return <></>;
  return <ResultList results={results} query={props.query} />;
};

export default Results;
