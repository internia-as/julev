"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import LocalResultList from "./LocalResultList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { MapData } from "@/types/mapData";
import MapResults from "../MapResults";

const LocalResults = () => {
  const state = useGlobalState();
  const [mapResults, setMapResults] = useState<MapData[]>([]);

  const {
    results,
    initialLoading,
    loading,
    hasMore,
    totalCount,
    error,
    loadingRef,
  } = useInfiniteScroll({
    query: state.query,
    direction: state.direction,
    limit: 30,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      state.setQuery(q);
    }
  }, []);

  const fetchMapResults = async (query: string) => {
    try {
      const mapResponse = await fetch(`/api/kartverket?q=${query}`);
      const mapData = await mapResponse.json();
      setMapResults(mapData.navn || []);
    } catch (error) {
      console.error("Error fetching map results:", error);
      setMapResults([]);
    }
  };

  useEffect(() => {
    if (state.query) {
      fetchMapResults(state.query);
    } else {
      setMapResults([]);
    }
  }, [state.query]);

  if (state.query === "") return <></>;

  if (error) {
    return (
      <div
        className="flex flex-col items-center w-full md:w-3/4 2xl:w-1/2 text-red-500"
        style={{ marginTop: "20.5rem" }}
      >
        Error: {error}
      </div>
    );
  }

  if (initialLoading) {
    return (
      <>
        <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </>
    );
  }

  return (
    <>
      <LocalResultList
        results={results}
        query={state.query}
        loading={loading}
        hasMore={hasMore}
        totalCount={totalCount}
        loadingRef={loadingRef}
      />
      {mapResults.length > 0 && <MapResults results={mapResults} />}
    </>
  );
};

export default LocalResults;
