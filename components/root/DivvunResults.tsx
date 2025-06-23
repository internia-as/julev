"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "../GlobalContext";
import DivvunResultList from "./DivvunResultList";

const DivvunResults = () => {
  const state = useGlobalState();
  const [results, setResults] = React.useState();

  useEffect(() => {
    if (state.query) {
      fetchResults();
    } else {
      console.log("No query");
      setResults(undefined);
    }
  }, [state.query, state.languages, state.dictionaries]);

  const fetchResults = async () => {
    const res = await fetch(`/api/divvun/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "allLemmas",
        query: state.query,
        searchMode: "start",
        wantedDicts: state.dictionaries
          .filter((d) => d.selected)
          .map((d) => d.short),
        langs: state.languages.filter((l) => l.selected).map((l) => l.short),
      }),
    });
    const data = await res.json();
    setResults(data);
  };

  if (state.query === "") return <></>;
  return <DivvunResultList results={results} query={state.query} />;
};

export default DivvunResults;
