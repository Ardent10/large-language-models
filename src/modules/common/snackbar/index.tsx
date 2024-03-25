import { useAppState } from "@/store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";

interface props {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  open: boolean;
  vertical: "bottom" | "top";
  horizontal: "left" | "right";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomSnackbar({
  message,
  severity,
  open,
  vertical,
  horizontal,
}: props) {
  const [state, dispatch] = useAppState();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    setOpenSnackbar(open);
  }, [open]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({
      type: "setToggleSnackbar",
      payload: {
        open: false,
        severity: "",
        message: "",
      },
    });

    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", fontSize: 14 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
