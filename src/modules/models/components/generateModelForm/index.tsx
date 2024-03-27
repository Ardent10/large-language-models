import { InputField } from "@/modules/common/input";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { useAppState } from "@/store";
import { SearchSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { Box, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAIModels } from "../../hooks";

interface GenerateModelFormProps {
  modelApiFunction: (search: string) => void;
}

export function GenerateModelForm({
  modelApiFunction,
}: GenerateModelFormProps) {
  const [state, dispatch] = useAppState();
  const { Gpt } = useAIModels();

  const { handleSubmit, control, getValues, setValue } = useForm({
    mode: "onBlur",
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    modelApiFunction(data.search);
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
