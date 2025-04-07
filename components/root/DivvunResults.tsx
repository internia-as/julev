"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "../GlobalContext";
import DivvunResultList from "./DivvunResultList";

interface Props {
  query: string;
}

const DivvunResults = (props: Props) => {
  const state = useGlobalState();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState();

  useEffect(() => {
    if (props.query) fetchResults();
  }, [props.query]);

  const fetchResults = async () => {
    setLoading(true);
    const res = await fetch(`/api/divvun/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "allLemmas",
        query: props.query,
        searchMode: "start",
        wantedDicts: state.dictionaries.map((d) => d.short),
        langs: [
          "sma",
          "sme",
          "smj",
          "smn",
          "sms",
          "fin",
          "nob",
          "swe",
          "lat",
          "eng",
          "nno",
          "rus",
        ],
      }),
    });
    console.log("Response from Divvun API:", res);
    const data = await res.json();
    console.log("Data from Divvun API:", data);
    setResults(data);
    setLoading(false);
  };

  if (props.query === "" || state.mode === "local") return <></>;
  return <DivvunResultList results={results} query={props.query} />;
};

export default DivvunResults;
