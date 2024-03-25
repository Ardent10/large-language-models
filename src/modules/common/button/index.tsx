import { useAppState } from "@/store";
import { Button, CircularProgress } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface props {
  title: string;
  width?: number | string;
  height?: number;
  padding?: string | number;
  fontSize?: number;
  type?: string;
  disabled?: boolean;
  onClick?: any;
  backgroundColor?: string;
  color?: string;
  buttonChild?: HTMLElement | ReactNode;
  disableElevation?: boolean;
  borderRadius?: string;
  borderNoBgColor?: boolean;
  borderColor?: string;
  link?: string;
  textTransform?: string;
  hoverColor?: string;
  fontWeight?: number;
  showLoaderonBtn?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
  className?: string;
  variant: "contained" | "outlined" | "text";
}

export function PrimaryButton(props: props) {
  const [state] = useAppState();
  const [isLoading, setIsLoading] = useState(false || props.isLoading);

  useEffect(() => {
    setIsLoading(state?.isLoading ? state?.isLoading : false);
  }, [state?.isLoading]);
  return (
    <Button
      disableElevation={props.disableElevation && props.disableElevation}
      href={props.link ? props.link : ""}
      onClick={props.onClick}
      type={props.type}
      variant={props.variant}
      disabled={props.disabled || isLoading}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      fullWidth
      className={props.className}
      sx={{
        ":hover": {
          backgroundColor: props.hoverColor ? props.hoverColor : "#40be35f7",
          color: "#FFF",
        },
      }}
    >
      <>
        {props?.showLoaderonBtn && isLoading ? (
          <CircularProgress size={20} sx={{ color: "#FFF" }} />
        ) : (
          <>
            {props.buttonChild && props.buttonChild}
            {props.title}
          </>
        )}
      </>
    </Button>
  );
}
