/* eslint-disable no-constant-condition */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";

interface props {
  children?: React.ReactElement;
  borderRadius?: number;
  width: number;
  height?: number;
  padding: number;
  open: boolean;
  transform?: string;
  BackdropClick?: boolean;
  CloseModal: any;
  OpenModal?: any;
  backdropBackgroundColor?: string;
  opacity?: string;
  className?: string;
}

export function BasicModal({
  width,
  height,
  padding,
  borderRadius,
  open,
  backdropBackgroundColor,
  opacity,
  CloseModal,
  OpenModal,
  BackdropClick,
  transform,
  children,
  className,
}: props) {
  const handleBackdropClick = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason !== "backdropClick" || "escapeKeyDown") {
      OpenModal;
    }
  };
  return (
    <Modal
      // sx={className}
      open={open}
      onClose={BackdropClick === true ? handleBackdropClick : CloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown={true}
    >
      <Box>{children}</Box>
    </Modal>
  );
}
