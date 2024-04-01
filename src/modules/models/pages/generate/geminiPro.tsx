import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect } from "react";
import { GenerateModelForm } from "../../components/generateModelForm";
import { useAIModels } from "../../hooks";

export function GeminiPro() {
  const [state, dispatch] = useAppState();
  const { GeminiPro, loading } = useAIModels();
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

  const createMarkup = (html: string) => {
    // Sanitize html
    const sanitizedHtml = DOMPurify.sanitize(html);

    // Convert markdown to html
    const markedHtml = marked.parse(sanitizedHtml);

    return { __html: markedHtml };
  };
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956]">
          GEMINI PRO
        </Typography>

        <Box className="h-full sm:w-3/5 relative">
          <Paper
            elevation={3}
            className="flex flex-wrap bg-[#212121] items-center p-8 justify-center min-h-[30rem] w-full rounded-xl"
          >
            {loading && <Loader componentLoader={true} />}

            {!loading && state?.promptResult ? (
              <Box
                component="div"
                className={`text-lg text-white max-h-[50vh] overflow-auto font-normal whitespace-pre-wrap [&>pre]:bg-[#666666] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
                dangerouslySetInnerHTML={
                  createMarkup(state?.promptResult?.text) as unknown as {
                    __html: string | TrustedHTML;
                  }
                }
              />
            ) : (
              <Typography className="flex items-center font-semibold text-2xl py-8 ">
                Hello,
                <Typography color="green" className="font-semibold text-2xl">
                  &nbsp; {state?.userProfile?.firstName} &nbsp;
                </Typography>
                How can I help you today?
              </Typography>
            )}
          </Paper>

          <Box>
            <GenerateModelForm
              modelApiFunction={GeminiPro}
              isLoading={loading}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
