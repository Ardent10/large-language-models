import { Layout } from "@/modules/common/layout/layout";
import { Box, Paper, Typography } from "@mui/material";
import { GenerateModelForm } from "../../components/generateModelForm";

export function GPT() {
  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
          GPT3.5 TURBO
        </Typography>

        <Box className="h-full w-3/5">
          <Paper
            elevation={3}
            className="flex flex-wrap items-center justify-center min-h-[30rem] w-full rounded-xl"
            sx={{
              backgroundImage: 'url("/assets/navbar/cat.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Box>
            <GenerateModelForm />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
