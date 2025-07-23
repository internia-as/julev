import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutline";
import React from "react";

interface Props {}

const PosDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

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

export default PosDialog;
