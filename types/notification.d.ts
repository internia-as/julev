export interface NotificationType {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export interface NotificationContextType {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  setOpen: (open: boolean) => void;
  setMessage: (message: string) => void;
  setSeverity: (severity: "success" | "error" | "info" | "warning") => void;
}
