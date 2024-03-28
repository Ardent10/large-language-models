import { InputField } from "@/modules/common/input";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { useAppState } from "@/store";
import { SearchSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { Box, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";

interface GenerateModelFormProps {
  modelApiFunction: (search: string) => void;
  customOnSubmit?: () => void;
}

export function GenerateModelForm({
  modelApiFunction,
  customOnSubmit,
}: GenerateModelFormProps) {
  const [state] = useAppState();

  const { handleSubmit, control, getValues, setValue } = useForm({
    mode: "onBlur",
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (customOnSubmit) {
      customOnSubmit();
    } else {
      modelApiFunction(data.search);
    }
  });

  return (
    <>
      <CustomSnackbar
        open={state.toggleSnackbar.open}
        severity={
          state.toggleSnackbar.severity == "success" ? "success" : "error"
        }
        message={state.toggleSnackbar.message}
        vertical="bottom"
        horizontal="right"
      />
      <div className="w-full   rounded-xl ">
        <form onSubmit={onSubmit} className="max-w-[1/2] w-full  py-8">
          <Box className=" relative">
            <InputField
              control={control}
              name="search"
              label=""
              placeholder="Write something to generate..."
              type="text"
              inputPadding={1}
              className="border border-green-500 bg-black"
            />
            <IconButton
              type="submit"
              onClick={(e) => {
                {
                  e.preventDefault();
                  onSubmit();
                }
              }}
              className="absolute top-2 right-2 bg-[#64c956] hover:bg-green-800"
            >
              <KeyboardDoubleArrowRightRoundedIcon />
            </IconButton>
          </Box>
        </form>
      </div>
    </>
  );
}
