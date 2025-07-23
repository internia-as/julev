import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutline";
import React, { useEffect } from "react";

interface Body {
  lang: string;
  term: string;
  pos: string;
  type?: string;
}

interface Props {
  lang: string;
  word: string;
  pos: string;
}

const ParadigmDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [paradigms, setParadigms] = React.useState<string[]>([]);

  let body: Body = {
    lang: props.lang,
    term: props.word,
    pos: props.pos,
  };

  useEffect(() => {
    body.type = "init";
    fetchData(true);
  }, []);

  const fetchData = async (init: boolean) => {
    const res = await fetch(`/api/divvun/paradigms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.data?.generated) {
      if (init && data.data.generated.length > 0) {
        setDisabled(false);
      }
      return data.data.generated;
    }
  };

  const handleOpen = async () => {
    setOpen(true);
    const generated = await fetchData(false);
    setParadigms(generated.map((item: any) => item.analyses));
  };

  const getTableHead = () => {
    if (props.pos === "V") {
      return (
        <>
          <TableCell />
          <TableCell>Present</TableCell>
          <TableCell>Perfectum</TableCell>
        </>
      );
    }
  };

  const getFirstColumn = (index: number) => {
    if (props.pos === "V") {
      switch (index) {
        case 0:
          return "mun";
        case 1:
          return "don";
        case 2:
          return "son";
        case 3:
          return "moai";
        case 4:
          return "doai";
        case 5:
          return "soai";
        case 6:
          return "mii";
        case 7:
          return "dii";
        case 8:
          return "sii";
        default:
          return "";
      }
    }
    return "";
  };

  const getTableBody = () => {
    // Split paradigms into chunks of size 2
    const chunks = [];
    for (let i = 0; i < paradigms.length; i += 2) {
      chunks.push(paradigms.slice(i, i + 2));
    }

    console.log(chunks);

    // Map through chunks and render rows
    return chunks.map((chunk: any, index: number) => (
      <TableRow key={index}>
        {/* Column 1: Index or other content */}
        <TableCell>{getFirstColumn(index)}</TableCell>

        {/* Column 2: Analyses for first paradigm in the chunk */}
        <TableCell>
          {chunk[0].map((analysis: any, i: number) => (
            <p key={i}>{analysis.wordform}</p>
          ))}
        </TableCell>

        {/* Column 3: Analyses for second paradigm in the chunk (if it exists) */}
        <TableCell>
          {chunk[1]?.map((analysis: any, i: number) => (
            <p key={i}>{analysis.wordform}</p>
          ))}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <Tooltip title="Vis bøyningsmønster">
        <IconButton
          onClick={handleOpen}
          disabled={disabled}
          color="primary"
          size="small"
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          Bøyningsmønster
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>{getTableHead()}</TableRow>
            </TableHead>
            <TableBody>{getTableBody()}</TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParadigmDialog;
