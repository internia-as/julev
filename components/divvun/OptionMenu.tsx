import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import MoreIcon from "@mui/icons-material/More";
import ParadigmDialog from "./ParadigmDialog";
import InfoIcon from "@mui/icons-material/InfoOutline";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import speechAvailable from "@/lib/speechAvailable";
import Sikor from "./Sikor";
import TextToSpeech from "../translate/TextToSpeech";
import { SupportedTTSLanguages } from "@/types/divvun";

interface Props {
  lang: string;
  word: string;
  pos: string;
}

const OptionMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <ParadigmDialog
          lang={props.lang}
          word={props.word}
          pos={props.pos}
          label="Bøyingsmønster"
        />
        <Sikor
          language={props.lang}
          lemma={props.word}
          label="SIKOR tekstsamlinger"
        />
        <TextToSpeech
          lang={props.lang as SupportedTTSLanguages}
          text={props.word}
          setErrorMessage={() => {}}
          label="Tekst til tale"
          size="small"
        />
      </Menu>
    </>
  );
};

export default OptionMenu;
