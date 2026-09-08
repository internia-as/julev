"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import DivvunResultList from "./DivvunResultList";
import { trackEvent } from "@/lib/umamiTrackEvents";

const DivvunResults = () => {
  const state = useGlobalState();
  const [results, setResults] = React.useState();
  const [searching, setSearching] = React.useState(false);

  useEffect(() => {
    // Wait until languages and dictionaries are loaded before searching.
    // Otherwise the request sends empty srcLangs/wantedDicts, Divvun returns
    // 0 results, and that empty result gets cached for 24h.
    if (state.languages.length === 0 || state.dictionaries.length === 0)
      return;
    if (state.query) {
      setSearching(true);
      fetchResults();
    } else {
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
        operationName: "AllLemmas",
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
    setSearching(false);
    trackEvent("Divvun Search", {
      languages: state.languages.map((t) => t.short).join(","),
    });
  };

  if (state.query === "") return <></>;
  return (
    <DivvunResultList
      results={results}
      query={state.query}
      isSearching={searching}
      setIsSearching={setSearching}
    />
  );
};

export default DivvunResults;
