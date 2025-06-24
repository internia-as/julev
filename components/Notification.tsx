"use client";
import { useNotification } from "@/hooks/useNotification";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

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
    >
      <div>
        {/* @ts-ignore: Alert might need to be imported from @mui/material/Alert */}
        <Alert
          severity={notification.severity}
          onClose={() => notification.setOpen(false)}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </div>
    </Snackbar>
  );
};

export default Notification;
