import { RichTextEditor } from "@/modules/common/editor";
import { InputField } from "@/modules/common/input";
import { SelectField } from "@/modules/common/select";
import { useForm } from "react-hook-form";

export interface Model {
  name: string;
  header_image: string;
  content: string;
  published_date: string;
  created_at: string;
  likes: string;
  parameters: string;
  tags: string;
  status: string;
  provider: string;
  website: string;
  access_type: string;
}

export function CreateModelForm() {
  const { handleSubmit, control, setValue, getValues, watch } = useForm<Model>({
    // resolver: zodResolver(CreateModelSchema),
    mode: "onChange",
  });
  console.log(
    "Control:",
    watch("name"),
    watch("header_image"),
    watch("content"),
    watch("published_date"),
    watch("likes"),
    watch("parameters"),
    watch("tags"),
    watch("status"),
    watch("provider"),
    watch("website"),
    watch("access_type")
  );

  const onSubmit = handleSubmit(async (data) => {
    const content = getValues("content");
    data.content = content;
    console.log("Submitted data:", data);
  });
  return (
    <div className="w-full px-4 border border-green-600 rounded-lg shadow-md">
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
        />
        <InputField
          control={control}
          name="header_image"
          label="Header Image"
          placeholder="Header Image URL"
          required
          type="file"
        />
        <div className="grid gap-2">
          <label className="text-md">
            Content
            <span className="text-red-500 text-sm">*</span>
          </label>
          <RichTextEditor setValue={setValue} control={control} />
        </div>

        <div className="flex gap-2 items-center">
          <InputField
            control={control}
            name="published_date"
            label="Published Date"
            type="date"
            required
            className="w-full"
          />

          <InputField
            control={control}
            name="likes"
            label="Likes"
            type="text"
            required
            className="w-full"
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
          />
          <InputField
            control={control}
            name="tags"
            label="Tags"
            placeholder="Enter tags"
            required
            type="text"
            className="w-full"
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
          <InputField
            control={control}
            name="provider"
            label="Provider"
            placeholder="Enter provider"
            required
            type="text"
            className="w-full"
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
          />
          <InputField
            control={control}
            name="access_type"
            label="Access Type"
            placeholder="Enter access type"
            required
            type="text"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
