"use client";
import { SupportedTTSLanguages } from "@/types/divvun";
import React from "react";

interface Props {
  langFrom?: SupportedTTSLanguages;
  langTo?: SupportedTTSLanguages | null;
}

const FileTranslate = (props: Props) => {
  return <div>File</div>;
};

export default FileTranslate;
