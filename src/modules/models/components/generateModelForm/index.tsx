import { PrimaryButton } from "@/modules/common/button";
import { InputField } from "@/modules/common/input";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { useAppState } from "@/store";
import { TextToImageSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModels } from "../../hooks";

export function GenerateModelForm() {
  const [state, dispatch] = useAppState();
  const { createModel } = useModels();

  const { handleSubmit, control, getValues, setValue } = useForm({
    mode: "onBlur",
    resolver: zodResolver(TextToImageSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    // createModel(data);
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
      <div className="w-full px-4 border border-green-600 rounded-xl shadow-md">
        <form
          onSubmit={onSubmit}
          className="max-w-[1/2] w-full grid gap-4 h-full py-8"
        >
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="Model Name"
            required
            type="text"
            inputPadding={1}
          />

          <PrimaryButton
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            title="Submit"
            variant={"text"}
            showLoaderonBtn={true}
            disabled={state?.isLoading}
          />
        </form>
      </div>
    </>
  );
}
