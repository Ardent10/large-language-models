import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import * as React from "react";

const TooltipContainer = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#222",
    margin: "auto",
    padding: "0",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "10px 15px",
    fontSize: "13px",
    backgroundColor: "#222",
  },
}));

type placement =
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

interface props {
  label: string;
  children: React.ReactElement;
  placement: placement;
}

export function CustomTooltip({ label, children, placement }: props) {
  return (
    <>
      <TooltipContainer title={label} placement={placement}>
        {children}
      </TooltipContainer>
    </>
  );
}
