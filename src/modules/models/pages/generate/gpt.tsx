import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Paper, Typography } from "@mui/material";
import { GenerateModelForm } from "../../components/generateModelForm";
import { useAIModels } from "../../hooks";

export function GPT() {
  const [state] = useAppState();
  const { Gpt, loading } = useAIModels();
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956]">
          GPT3.5 TURBO
        </Typography>

        <Box className="h-full w-3/5">
          <Paper
            elevation={3}
            className="p-8 flex flex-wrap bg-[#212121] items-center justify-center min-h-[30rem] w-full rounded-xl"
          >
            {loading && <Loader componentLoader={true} />}
            <Typography className="font-semibold text-2xl  py-8 ">
              Hello, {state?.userProfile?.firstName} How can I help you today?
            </Typography>
          </Paper>

          <Box>
            <GenerateModelForm modelApiFunction={Gpt} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
