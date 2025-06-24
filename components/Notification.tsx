"use client";
import { useNotification } from "@/hooks/useNotification";
import { Snackbar } from "@mui/material";

const Notification = () => {
  const notification = useNotification();
  if (!notification) {
    return null; // or handle the case where notification is not available
  }

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={() => notification.setOpen(false)}
      message={notification.message}
    />
  );
};

export default Notification;
