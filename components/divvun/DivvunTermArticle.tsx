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
import TextToSpeech from "../translate/TextToSpeech";
import speechAvailable from "@/lib/speechAvailable";
import Sikor from "./Sikor";
import ParadigmDialog from "./ParadigmDialog";
import { useTranslations } from "next-intl";
import QuestionMarkIcon from "@mui/icons-material/QuestionMarkRounded";
import MobileTooltip from "../MobileTooltip";
import OptionMenu from "./OptionMenu";

interface Props {
  item: string;
  expanded: string | false;
  name: string;
}

const DivvunTermArticle = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState([] as any);
  const [searching, setSearching] = React.useState(false);
  const t = useTranslations();
  const dict = state.dictionaries.filter(
    (d) => d.short === "termwiki" && d.selected
  );

  useEffect(() => {
    if (props.item && dict.length > 0) {
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
      <div
        key={termIndex}
        className="flex space-x-1 items-center text-indigo-600 font-semibold"
      >
        <p>{term.expression.lemma}</p>
        <p className="md:hidden">({term.expression.pos})</p>
      </div>
    ));

    const posDetails = item.terms
      .filter((term: any) => ["N", "V", "A"].includes(term.expression.pos))
      .map((term: any) => (
        <React.Fragment key={`${term.expression.lemma}-${term.expression.pos}`}>
          <div className="hidden md:flex flex-col md:flex-row space-y-1 items-center">
            <p className="text-gray-600 hidden md:inline-block">
              ({t(`pos.${term.expression.pos.toLowerCase()}`)})
            </p>
            <ParadigmDialog
              lang={term.expression.language}
              word={term.expression.lemma}
              pos={term.expression.pos}
            />
            <Sikor
              language={term.expression.language}
              lemma={term.expression.lemma}
            />
            {speechAvailable(term.expression.language) && (
              <TextToSpeech
                text={term.expression.lemma}
                lang={term.expression.language}
                setErrorMessage={() => {}}
                size="small"
              />
            )}
          </div>
          <div className="md:hidden flex">
            {item.definition ? (
              <MobileTooltip title={item.definition}>
                <QuestionMarkIcon className="text-gray-600" fontSize="small" />
              </MobileTooltip>
            ) : (
              <div className="w-10"></div>
            )}
            <OptionMenu
              lang={term.expression.language}
              word={term.expression.lemma}
              pos={term.expression.pos}
            />
          </div>
        </React.Fragment>
      ));

    return (
      <>
        <TableCell>
          <div className="flex flex-col">{termLemmas}</div>
        </TableCell>

        <TableCell>
          <div className="flex">{posDetails}</div>
        </TableCell>
      </>
    );
  };

  if (dict.length === 0 || data.length === 0) {
    return <></>;
  }

  return (
    <div className="px-1 md:px-4 bg-blue-50 rounded-xl border border-blue-200 shadow-md">
      <div className="w-full text-xs font-semibold flex justify-between border-b border-gray-400 py-4">
        <p className="px-2">
          {t("divvun.source")}: {t("dictionaries.termwiki")}
        </p>
        <p className="px-2">
          {t("divvun.category")}: {data[0]?.name}
        </p>
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
                  <p>{t(`languages.${item.terms[0].expression.language}`)}</p>
                </div>
              </TableCell>
              {getLoopCells(item)}
              <TableCell>
                <p className="hidden md:inline-block flex-wrap">
                  {item.definition}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DivvunTermArticle;
