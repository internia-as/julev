import getLang from "@/lib/getLang";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";

interface Props {
  item: string;
}

const DivvunTermArticle = (props: Props) => {
  const [data, setData] = React.useState([] as any);

  const fetchData = async (item: string) => {
    const res = await fetch("/api/divvun/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: item,
        langs: [
          "sma",
          "sme",
          "smj",
          "smn",
          "sms",
          "fin",
          "nob",
          "swe",
          "lat",
          "eng",
          "nno",
          "rus",
        ],
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
            <div className="flex flex-col">
              {item.terms.map((term: any, index: number) => (
                <TableCell key={index}>{term.expression.lemma}</TableCell>
              ))}
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DivvunTermArticle;
