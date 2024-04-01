import { CustomTooltip } from "@/modules/common/tooltip";
import { useAppState } from "@/store";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { IconButton } from "@mui/material";

interface ResetFormProps {
  setPreviewImage?: (value: string) => void;
  reset: any;
  defaultValues: any;
  className?: string;
}

export function ResetForm({
  setPreviewImage,
  reset,
  defaultValues,
  className,
}: ResetFormProps) {
  const [state, dispatch] = useAppState();
  function handleReset() {
    setPreviewImage && setPreviewImage("");
    dispatch({
      type: "setPromptResult",
      payload: {
        promptResult: null,
      },
    });
    reset(defaultValues );
  }
  return (
    <CustomTooltip label="Restart" placement="right">
      <IconButton
        className={`absolute -right-12  ${className}`}
        onClick={handleReset}
      >
        <RestartAltRoundedIcon fontSize="large" className="text-green-600" />
      </IconButton>
    </CustomTooltip>
  );
}
