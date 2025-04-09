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
        <TableCell>{data[0]?.name}</TableCell>
      </TableHead>
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow>
            <TableCell>{getLang(item.terms[0].expression.language)}</TableCell>
            {item.terms.map((term: any, index: number) => (
              <TableRow>
                <TableCell>{term.expression.lemma}</TableCell>
              </TableRow>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DivvunTermArticle;
