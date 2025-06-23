"use client";
import { useGlobalState } from "@/components/GlobalContext";
import LocalResultList from "./LocalResultList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const LocalResults = () => {
  const state = useGlobalState();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    const res = await fetch(`/api/localSearch?q=${state.query}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    if (state.query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [state.query]);

  if (state.query === "") return <></>;
  if (loading)
    return (
      <>
        <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <CircularProgress />
      </>
    );
  return <LocalResultList results={results} query={state.query} />;
};

export default LocalResults;
