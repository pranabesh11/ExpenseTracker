import React from "react";
import { Snackbar, Alert } from "@mui/material";

type Severity = "error" | "warning" | "info" | "success";

type NotificationState = {
  open: boolean;
  message: string;
  severity: Severity;
};

let setNotification:
  | React.Dispatch<React.SetStateAction<NotificationState>>
  | null = null;

export const NotificationHolder: React.FC = () => {
  const [state, setState] = React.useState<NotificationState>({
    open: false,
    message: "",
    severity: "info",
  });

  setNotification = setState;

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};

const showNotification = (
  severity: Severity,
  msg: string | React.ReactNode
) => {
  if (!setNotification) return;

  setNotification({
    open: true,
    message: typeof msg === "string" ? msg : "",
    severity,
  });
};

export const ShowErrorNotification = (msg: string | React.ReactNode) =>
  showNotification("error", msg);

export const ShowWarningNotification = (msg: string | React.ReactNode) =>
  showNotification("warning", msg);

export const ShowSuccessNotification = (msg: string | React.ReactNode) =>
  showNotification("success", msg);

export const ShowInfoNotification = (msg: string | React.ReactNode) =>
  showNotification("info", msg);