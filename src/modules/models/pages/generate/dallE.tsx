import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { GenerateModelForm } from "../../components/generateModelForm";
import { useAIModels } from "../../hooks";

export function DallE() {
  const [state, dispatch] = useAppState();
  const { DallE, loading } = useAIModels();
  useEffect(() => {
    // Clean up the prompt result from previous model
    dispatch({
      type: "setPromptResult",
      payload: {
        promptResult: null,
      },
    });
  }, []);
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl  md:text-9xl py-8 text-[#64c956]">
          DALL-E
        </Typography>

        <Box className="h-full sm:w-3/5">
          <Paper
            elevation={3}
            className="flex flex-wrap items-center justify-center min-h-[30rem] w-full rounded-xl"
            sx={{
              backgroundImage: state?.promptResult
                ? `url(${state.prompResult})`
                : `url("/assets/navbar/cat.webp")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {loading && <Loader componentLoader={true} />}
          </Paper>
          <Box>
            <GenerateModelForm modelApiFunction={DallE} />
          </Box>
          <Box>
            <Typography className=" text-2xl  py-8 text-red-500">
              Note: The Admin has exceeded the free tier limit for this model.
              Any API call will result in an error. However you can still use
              the model locally with you own API Key credits.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
