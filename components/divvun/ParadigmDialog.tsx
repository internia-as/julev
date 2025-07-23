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
  const [disabled, setDisabled] = React.useState(true);

  useEffect(() => {
    initFetch();
  }, []);

  const initFetch = async () => {
    // TODO: Fix double API calls
    const res = await fetch(`/api/divvun/paradigms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: props.lang,
        term: props.word,
        pos: props.pos,
        type: "init",
      }),
    });
    const data = await res.json();
    if (data.data?.generated && data.data.generated.length > 0) {
      console.log(data.data);
      setDisabled(false);
    }
  };

  return (
    <div>
      <Tooltip title="Vis bøyningsmønster">
        <IconButton disabled={disabled} color="primary" size="small">
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
