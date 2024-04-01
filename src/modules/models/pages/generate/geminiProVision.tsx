import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GeminiProVisionForm } from "../../components/geminiProVision/geminiProVisionForm";
import { ResetForm } from "../../components/resetModelForm";
import { useAIModels } from "../../hooks";
import { marked } from "marked";

export function GeminiProVision() {
  const [state, dispatch] = useAppState();
  const [previewImage, setPreviewImage] = useState("");
  const { GeminiProVision, loading } = useAIModels();

  const defaultValues = {
    search: "",
    gemini_pro_vision_img: null,
  };
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    // Clean up the prompt result from previous model
    if (state?.promptResult?.text) {
      dispatch({
        type: "setPromptResult",
        payload: {
          promptResult: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    handleImageChange();
  }, [watch("gemini_pro_vision_img")]);

  function handleImageChange() {
    const file = watch("gemini_pro_vision_img");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file as unknown as Blob);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (data?.gemini_pro_vision_img && data?.search) {
      GeminiProVision({
        promptString: data.search,
        imgFiles: [data.gemini_pro_vision_img],
      });
    }
  });

  const createMarkup = (html: string) => {
    // Sanitize html
    const sanitizedHtml = DOMPurify.sanitize(html);

    // Convert markdown to html
    const markedHtml = marked.parse(sanitizedHtml);

    return { __html: markedHtml };
  };
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24 ">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-7xl lg:text-9xl py-8 text-[#64c956]">
          GEMINI PRO VISION
        </Typography>
        <Box className="h-full md:w-3/5 relative">
          <ResetForm
            setPreviewImage={setPreviewImage}
            reset={reset}
            defaultValues={defaultValues}
          />
          <Paper
            elevation={3}
            className="flex flex-wrap items-center justify-center min-h-[30rem] w-full rounded-xl"
            sx={{
              backgroundImage: previewImage
                ? `url('${previewImage}')`
                : 'url("/assets/navbar/cat.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Paper
            elevation={3}
            className="flex flex-wrap  justify-center min-h-[10rem] w-full rounded-xl p-5 my-5"
          >
            {state?.promptResult?.text ? (
              <>
                <Typography className="text-2xl font-semibold text-[#64c956]">
                  Prompt Result
                </Typography>
                <Box
                  className={`text-lg text-white max-h-[50vh] overflow-auto font-normal whitespace-pre-wrap [&>pre]:bg-[#666666] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
                  dangerouslySetInnerHTML={
                    createMarkup(state?.promptResult?.text) as unknown as {
                      __html: string | TrustedHTML;
                    }
                  }
                />
              </>
            ) : loading ? (
              <Loader componentLoader={true} />
            ) : (
              <Typography className="text-2xl font-semibold text-[#64c956]">
                Write something to generate...
              </Typography>
            )}
          </Paper>

          <GeminiProVisionForm
            control={control}
            loading={loading}
            onSubmit={onSubmit}
          />
        </Box>
      </Box>
    </Layout>
  );
}
