"use client";
import React from "react";
import { useGlobalState } from "../GlobalContext";

interface Props {
  query: string;
}

const DivvunResults = (props: Props) => {
  const state = useGlobalState();

  if (props.query === "" || state.mode === "local") return <></>;
  return <div>DivvunResults</div>;
};

export default DivvunResults;
