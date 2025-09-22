import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const MobileTooltip = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className="md:hidden">
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={props.title}
            slotProps={{
              popper: {
                disablePortal: true,
              },
            }}
          >
            <IconButton onClick={handleTooltipOpen}>
              {props.children}
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default MobileTooltip;
