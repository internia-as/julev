import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutline";
import React, { useEffect } from "react";

interface Props {
  lang: string;
  word: string;
  pos: string;
}

const ParadigmDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  useEffect(() => {
    initFetch();
  }, []);

  const initFetch = async () => {
    const res = await fetch(
      `/api/divvun/paradigms?lang=${props.lang}&term=${props.word}&post=${props.pos}&type=init`
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <Tooltip title="Vis bøyningsmønster">
        <IconButton>
          <InfoIcon onClick={() => setOpen(true)} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          Bøyningsmønster
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default ParadigmDialog;
