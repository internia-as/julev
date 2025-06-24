"use client";
import {
  NotificationContextType,
  NotificationType,
} from "@/types/notification";
import { createContext, ReactNode, useContext, useState } from "react";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [state, setState] = useState<NotificationType>({
    open: false,
    message: "",
    severity: "info",
  });

  const setOpen = (open: boolean) => {
    setState((prevState) => ({ ...prevState, open }));
  };
  const setMessage = (message: string) => {
    setState((prevState) => ({ ...prevState, message }));
  };
  const setSeverity = (severity: "success" | "error" | "info" | "warning") => {
    setState((prevState) => ({ ...prevState, severity }));
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, setOpen, setMessage, setSeverity }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
