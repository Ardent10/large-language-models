import { Dropzone } from "@/modules/common/dropzone";
import { InputField } from "@/modules/common/input";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { Box, IconButton } from "@mui/material";

interface GeminiProVisionFormProps {
  control: any;
  loading: boolean;
  onSubmit: any;
}

export function GeminiProVisionForm({
  control,
  loading,
  onSubmit,
}: GeminiProVisionFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} className="max-w-[1/2] w-full  py-8 gap-4">
        <Box className="mb-4">
          <Dropzone control={control} name="gemini_pro_vision_img" />
        </Box>
        <Box className=" relative">
          <InputField
            control={control}
            name="search"
            label=""
            placeholder="Write something to generate..."
            type="text"
            inputPadding={1}
            className="border border-green-500 bg-black"
            disable={loading}
          />
          <IconButton
            type="submit"
            className="absolute top-2 right-2 bg-[#64c956] hover:bg-green-800"
          >
            <KeyboardDoubleArrowRightRoundedIcon />
          </IconButton>
        </Box>
      </form>
    </>
  );
}
