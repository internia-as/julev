import getLang from "@/lib/getLang";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";

interface Props {
  item: string;
  expanded: string | false;
  name: string;
}

const DivvunTermArticle = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState([] as any);
  const [searching, setSearching] = React.useState(false);

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
        operationName: "termArticles",
      }),
    });
    const data = await res.json();
    setData(data.data.conceptList);
    setSearching(false);
  };

  useEffect(() => {
    if (props.item) {
      fetchData(props.item);
    }
  }, [props.item, props.expanded]);

  if (searching) {
    return (
      <div className="w-full py-5 flex justify-center">
        <CircularProgress size={20} />
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <p className="text-gray-800 font-bold">{data[0]?.name}</p>´
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{getLang(item.terms[0].expression.language)}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                {item.terms.map((term: any, index: number) => (
                  <p key={index}>{term.expression.lemma}</p>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DivvunTermArticle;
