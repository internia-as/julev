"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import DivvunResultList from "./DivvunResultList";
import { useNotification } from "@/hooks/useNotification";

const DivvunResults = () => {
  const state = useGlobalState();
  const notification = useNotification();
  const [results, setResults] = React.useState();

  useEffect(() => {
    validate();
    if (state.query) {
      fetchResults();
    } else {
      setResults(undefined);
    }
  }, [state.query, state.languages, state.dictionaries]);

  const validate = () => {
    if (state.languages.length === 0) {
      notification.setOpen(true);
      notification.setSeverity("warning");
      notification.setMessage("Please select at least one language.");
      return false;
    }
    if (state.dictionaries.filter((d) => d.selected).length === 0) {
      notification.setOpen(true);
      notification.setSeverity("warning");
      notification.setMessage("Please select at least one dictionary.");
      return false;
    }
  };

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
