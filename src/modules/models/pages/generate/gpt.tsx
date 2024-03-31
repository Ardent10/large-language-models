import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import { GenerateModelForm } from "../../components/generateModelForm";
import { useAIModels } from "../../hooks";
import { useEffect } from "react";

export function GPT() {
  const [state] = useAppState();
  const { Gpt, loading } = useAIModels();
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
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956]">
          GPT3.5 TURBO
        </Typography>

        <Box className="h-full sm:w-3/5">
          <Paper
            elevation={3}
            className="p-8 flex flex-wrap bg-[#212121] items-center justify-center min-h-[30rem] w-full rounded-xl"
          >
            {loading && <Loader componentLoader={true} />}
            <Typography className="flex items-center font-semibold text-2xl  py-8 ">
              Hello,
              <Typography color="green" className="font-semibold text-2xl">
                &nbsp; {state?.userProfile?.firstName} &nbsp;
              </Typography>
              How can I help you today?
            </Typography>
            {state?.promptResult && (
              <Typography className="font-semibold text-2xl  py-8 ">
                {state?.promptResult}
              </Typography>
            )}
          </Paper>

          <Box>
            <GenerateModelForm modelApiFunction={Gpt} />
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
function dispatch(arg0: { type: string; payload: { promptResult: null; }; }) {
  throw new Error("Function not implemented.");
}

