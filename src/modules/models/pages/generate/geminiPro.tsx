import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import { GenerateModelForm } from "../../components/generateModelForm";
import { useAIModels } from "../../hooks";
import DOMPurify from "dompurify";

export function GeminiPro() {
  const [state] = useAppState();
  const { GeminiPro, loading } = useAIModels();

  const createMarkup = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return { __html: sanitizedHtml };
  };
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956]">
          GEMINI PRO
        </Typography>

        <Box className="h-full sm:w-3/5">
          <Paper
            elevation={3}
            className="flex flex-wrap bg-[#212121] items-center p-8 justify-center min-h-[30rem] w-full rounded-xl"
          >
            {loading && <Loader componentLoader={true} />}

            {state?.promptResult ? (
              <Box
                className={`text-lg text-white max-h-[50vh] overflow-auto font-normal whitespace-pre-wrap [&>pre]:bg-[#666666] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
                dangerouslySetInnerHTML={createMarkup(state?.promptResult?.text)}
              />
            ) : (
              <Typography className="flex items-center font-semibold text-2xl  py-8 ">
                Hello,
                <Typography color="green" className="font-semibold text-2xl">
                  &nbsp; {state?.userProfile?.firstName} &nbsp;
                </Typography>
                How can I help you today?
              </Typography>
            )}
          </Paper>

          <Box>
            <GenerateModelForm modelApiFunction={GeminiPro} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
