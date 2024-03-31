import { PrimaryButton } from "@/modules/common/button";
import { Dropzone } from "@/modules/common/dropzone";
import { RichTextEditor } from "@/modules/common/editor";
import { InputField } from "@/modules/common/input";
import { SelectField } from "@/modules/common/select";
import { ChipSelector } from "@/modules/common/select/chipSelector";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { useAppState } from "@/store";
import { ModelTags } from "@/utils/constants";
import { Typography } from "@mui/material";
import { useModels } from "../../hooks";

export interface Model {
  name: string;
  header_image: File ;
  content: string;
  published_date: string ;
  created_at: string;
  likes: number;
  parameters: string;
  tags: string[];
  status: string;
  provider: string;
  website: string;
  access_type: string;
}

interface CreateModelFormProps {
  handleSubmit: any;
  getValues: (name: string) => string;
  control: any;
  setValue: any;
}

export function CreateModelForm({
  handleSubmit,
  getValues,
  control,
  setValue,
}: CreateModelFormProps) {
  const [state, dispatch] = useAppState();
  const { createModel } = useModels();

  const onSubmit = handleSubmit(async (data: Model) => {
    const content = getValues("content");
    data.content = content;

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
          <div className="grid gap-2">
            <Typography component="h4" variant="h6">
              Header Image
              <span className="text-red-600">*</span>
            </Typography>

            <Dropzone control={control} name="header_image" />
          </div>
          <div className="grid gap-2">
            <Typography component="h4" variant="h6">
              Content
              <span className="text-red-600">*</span>
            </Typography>

            <RichTextEditor setValue={setValue} getValues={getValues}/>
          </div>

          <div className="flex gap-2 items-center">
            <InputField
              control={control}
              name="published_date"
              label="Published Date"
              type="date"
              minDate={new Date()}
              required
              className="w-full"
              inputPadding={1}
            />

            <InputField
              control={control}
              name="likes"
              label="Likes"
              type="number"
              required
              className="w-full"
              inputPadding={1}
            />
          </div>
          <div className="flex gap-2">
            <InputField
              control={control}
              name="parameters"
              label="Parameters"
              placeholder="Enter parameters"
              required
              type="text"
              className="w-full"
              inputPadding={1}
            />
            <InputField
              control={control}
              name="access_type"
              label="Access Type"
              placeholder="Enter access type"
              required
              type="text"
              className="w-full"
              inputPadding={1}
            />
          </div>

          <div className="flex gap-2">
            <InputField
              control={control}
              name="website"
              label="Website"
              placeholder="Enter website URL"
              required
              type="text"
              className="w-full"
              inputPadding={1}
            />
            <InputField
              control={control}
              name="provider"
              label="Provider"
              placeholder="Enter provider"
              required
              type="text"
              className="w-full"
              inputPadding={1}
            />
          </div>
          <div className="flex gap-2">
            <SelectField
              control={control}
              name="status"
              title="Status"
              required
              data={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
              ]}
            />
            <ChipSelector
              control={control}
              name="tags"
              label="Tags"
              required
              data={ModelTags}
              placeholder="Select tags"
            />
          </div>
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
