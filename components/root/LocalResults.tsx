"use client";
import { useGlobalState } from "@/components/GlobalContext";
import LocalResultList from "./LocalResultList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface Props {
  query: string;
}

const LocalResults = (props: Props) => {
  const [results, setResults] = useState([]);
  const state = useGlobalState();
  const [loading, setLoading] = useState(false);

  // Fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    const res = await fetch(`/api/localSearch?q=${props.query}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    if (props.query) fetchResults();
  }, [props.query]);

  if (props.query === "" || state.mode === "divvun") return <></>;
  if (loading)
    return (
      <>
        <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <CircularProgress />
      </>
    );
  return <LocalResultList results={results} query={props.query} />;
};

export default LocalResults;
