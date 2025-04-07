"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useGlobalState } from "../GlobalContext";
import DictionaryList from "./DictionaryList";
import { Button, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DictionaryMenu = (props: Props) => {
  const state = useGlobalState();

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <DialogTitle className="bg-blue-700 text-center text-white font-medium">
              Tilgjengelige ordbøker i {state.mode}
            </DialogTitle>
            <DictionaryList />
            <Button
              className="justify-center w-full"
              onClick={() => props.setOpen(false)}
            >
              Begynn å søk!
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DictionaryMenu;
