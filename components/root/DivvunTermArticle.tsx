import getLang from "@/lib/getLang";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalState } from "../GlobalContext";

interface Props {
  item: string;
}

const DivvunTermArticle = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState([] as any);

  const fetchData = async (item: string) => {
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
    console.log(data.data.conceptList);
  };

  useEffect(() => {
    if (props.item) {
      fetchData(props.item);
    }
  }, [props.item]);

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
