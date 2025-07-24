import getLang from "@/lib/getLang";
import getLangImg from "@/lib/getLangImg";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import getPos from "@/lib/getPos";
import TextToSpeech from "../translate/TextToSpeech";
import speachAvailable from "@/lib/speachAvailable";
import Sikor from "./Sikor";
import ParadigmDialog from "./ParadigmDialog";

interface Props {
  item: string;
  expanded: string | false;
  name: string;
}

const DivvunTermArticle = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState([] as any);
  const [searching, setSearching] = React.useState(false);

  useEffect(() => {
    if (props.item) {
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
        operationName: "TermArticles",
      }),
    });
    const data = await res.json();
    setData(data.data.conceptList);
    setSearching(false);
  };

  if (searching) {
    return (
      <div className="w-full py-5 flex justify-center">
        <CircularProgress size={20} />
      </div>
    );
  }

  const getLoopCells = (item: any) => {
    const termLemmas = item.terms.map((term: any, termIndex: number) => (
      <div key={termIndex} className="flex space-x-1 items-center">
        <p>{term.expression.lemma}</p>
        {speachAvailable(term.expression.language) && (
          <TextToSpeech
            text={term.expression.lemma}
            lang={term.expression.language}
            setErrorMessage={() => {}}
            size="small"
          />
        )}
      </div>
    ));

    const posDetails = item.terms
      .filter((term: any) => ["N", "V", "A"].includes(term.expression.pos))
      .map((term: any) => (
        <div
          key={`${term.expression.lemma}-${term.expression.pos}`}
          className="flex items-center"
        >
          <p className="text-gray-600">({getPos(term.expression.pos)})</p>
          <ParadigmDialog
            lang={term.expression.language}
            word={term.expression.lemma}
            pos={term.expression.pos}
          />
          <Sikor />
        </div>
      ));

    const emptyContent = item.terms.map((_: any, termIndex: any) => (
      <p key={termIndex}></p>
    ));

    return (
      <>
        <TableCell>
          <div className="flex flex-col">{termLemmas}</div>
        </TableCell>

        <TableCell>
          <div className="flex flex-col">{posDetails}</div>
        </TableCell>

        <TableCell>
          <div className="flex flex-col">{emptyContent}</div>
        </TableCell>
      </>
    );
  };

  return (
    <>
      <div className="w-full text-sm font-semibold flex justify-between">
        <p>Kilde: Giellagáldus flerspråklige termer</p>
        <p>Kategori: {data[0]?.name}</p>
      </div>
      <Table>
        <TableBody>
          {data.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex space-x-2 underline items-center">
                  <img
                    className="w-5 h-5 rounded-full"
                    src={getLangImg(item.terms[0].expression.language)}
                  />
                  <p>{getLang(item.terms[0].expression.language)}</p>
                </div>
              </TableCell>

              {getLoopCells(item)}
              <TableCell>
                <p>{item.definition}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DivvunTermArticle;
