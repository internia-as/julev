"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import LocalResultList from "./LocalResultList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { MapData } from "@/types/mapData";
import MapResults from "../MapResults";

const LocalResults = () => {
  const state = useGlobalState();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapResults, setMapResults] = useState<MapData[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      state.setQuery(q);
    }
  }, []);
  // Fetch results from the API
  const fetchResults = async () => {
    setLoading(true);
    //  const res = await fetch(`/api/localSearch?q=${state.query}`);
    //  const data = await res.json();
    //  setResults(data);
    const res = await fetch(
      `/api/localSearch?q=${state.query}&direction=${state.direction}`
    );
    const data = await res.json();
    setResults(data);
    setLoading(false);
    const mapResponse = await fetch(`/api/kartverket?q=${state.query}`);
    const mapData = await mapResponse.json();
    setMapResults(mapData.navn);
    console.log(mapData);
  };

  useEffect(() => {
    if (state.query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [state.query, state.direction]);

  if (state.query === "") return <></>;
  if (loading)
    return (
      <>
        <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </>
    );
  return (
    <>
      <LocalResultList results={results} query={state.query} />
      {mapResults.length > 0 && <MapResults results={mapResults} />}
    </>
  );
};

export default LocalResults;
