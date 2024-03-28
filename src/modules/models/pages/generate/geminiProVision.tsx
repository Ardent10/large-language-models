import { Dropzone } from "@/modules/common/dropzone";
import { InputField } from "@/modules/common/input";
import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import { useAIModels } from "../../hooks";

export function GeminiProVision() {
  const [state] = useAppState();
  const { GeminiProVision, loading } = useAIModels();
  const { control, handleSubmit, getValues } = useForm({});

  const onSubmit = handleSubmit(async (data) => {
    const search = getValues("search");
    GeminiProVision({
      promptString: data.search,
      img: data.gemini_pro_vision_img[0],
    });
  });

  const createMarkup = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return { __html: sanitizedHtml };
  };
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956]">
          GEMINI PRO VISION
        </Typography>

        <Box className="h-full sm:w-3/5">
          <Paper
            elevation={3}
            className="flex flex-wrap items-center justify-center min-h-[30rem] w-full rounded-xl"
            sx={{
              backgroundImage: state?.promptResult?.text
                ? state?.promptResult?.text
                : 'url("/assets/navbar/cat.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {loading && <Loader componentLoader={true} />}
            <Box
              className={`text-lg text-white max-h-[50vh] overflow-auto font-normal whitespace-pre-wrap [&>pre]:bg-[#666666] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
              dangerouslySetInnerHTML={createMarkup(state?.promptResult?.text)}
            />
          </Paper>
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
              />
              <IconButton
                type="submit"
                className="absolute top-2 right-2 bg-[#64c956] hover:bg-green-800"
              >
                <KeyboardDoubleArrowRightRoundedIcon />
              </IconButton>
            </Box>
          </form>
          <Typography className="text-center tex-xl font-semibold text-red-900">
            Note: For simplicity we are currently using the cat image above,
            feel free to prompt anything related to it.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
