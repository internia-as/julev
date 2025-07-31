import { useGlobalState } from "@/hooks/useGlobalState";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import ParadigmDialog from "./ParadigmDialog";
import getPos from "@/lib/getPos";
import Sikor from "./Sikor";
interface Props {
  expanded: string | false;
  name: string;
  item: string;
}

const DivvunDictArticle = (props: Props) => {
  const state = useGlobalState();
  const [results, setResults] = React.useState([] as any);
  const [searching, setSearching] = React.useState(false);
  const dicts = state.dictionaries
    .filter((d) => d.selected)
    .map((d) => d.short);

  React.useEffect(() => {
    if (props.item && dicts.length > 0) {
      fetchData(props.item);
    }
  }, [props.item, props.expanded]);

  const fetchData = async (item: string) => {
    if (props.expanded !== props.name) return;
    setSearching(true);
    const res = await fetch("/api/divvun/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: item,
        langs: state.languages.filter((l) => l.selected).map((l) => l.short),
        wantedDicts: state.dictionaries
          .filter((d) => d.selected)
          .map((d) => d.short),
        operationName: "DictArticles",
      }),
    });
    const data = await res.json();
    setResults(data.data.dictEntryList);
    setSearching(false);
  };

  if (searching) {
    return (
      <div className="w-full py-5 flex justify-center">
        <CircularProgress size={20} />
      </div>
    );
  }

  const getDictFullname = (short: string) => {
    const dict = state.dictionaries.find((d) => d.short === short);
    return dict ? dict.title : short;
  };

  const getPosDetails = (pos: string, lang: string, term: string) => {
    if (pos !== "N" && pos !== "V" && pos !== "A") {
      return <></>;
    }
    return (
      <div className="flex items-center">
        <p className="text-gray-600">({getPos(pos)})</p>
        <ParadigmDialog lang={lang} word={term} pos={pos} />
        <Sikor language={lang} lemma={term} />
      </div>
    );
  };

  return (
    <div>
      {results.map((result: any, index: number) => (
        <div
          key={index}
          className="p-4 mb-4 bg-blue-50 rounded-xl border border-blue-200 shadow-md"
        >
          <div className="w-full text-xs font-semibold  border-b border-gray-400 py-4">
            <p>Kilde: {getDictFullname(result.dictName)}</p>
          </div>
          {result.lookupLemmas.edges.map((edge: any, index: number) => (
            <div
              className="w-full text-sm items-center flex justify-between"
              key={index}
            >
              <p className="inline mr-1 text-gray-600 font-semibold">
                {edge.node.lemma}
              </p>
              <div>
                {getPosDetails(
                  edge.node.pos,
                  edge.node.language,
                  edge.node.lemma
                )}
              </div>
            </div>
          ))}
          {result.translationGroups.map((group: any, index: number) => (
            <div key={index} className="border-b border-gray-200 py-1">
              {group.translationLemmas.edges.map((edge: any, index: number) => (
                <div
                  className="w-full items-center flex justify-between"
                  key={index}
                >
                  <p className="inline mr-1 text-indigo-600 font-semibold">
                    {edge.node.lemma}{" "}
                    <span className="text-gray-600 font-normal">
                      {group.restriction?.restriction &&
                        `(${group.restriction.restriction})`}
                    </span>
                  </p>
                  <div>
                    {getPosDetails(
                      edge.node.pos,
                      edge.node.language,
                      edge.node.lemma
                    )}
                  </div>
                </div>
              ))}
              {group.exampleGroups.map((group: any, index: number) => (
                <div key={index}>
                  <p>{group.example}</p>
                  <p className="italic">{group.translation}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DivvunDictArticle;
