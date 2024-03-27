import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ModelTemplate } from "../components/modelTemplate";
import { Model } from "../hooks";

export function LLM() {
  const [state] = useAppState();
  const {modelId} = useParams<{modelId: string}>();
  const currentModel = state?.parentModels?.find(
    (model: Model) => model.id === modelId
  );

  return (
    <Layout>
      {state.isLoading ? (
        <div className="text-white h-screen">
          <Loader />
        </div>
      ) : (
        <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
          <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
            READ
          </Typography>

          <ModelTemplate model={currentModel} />
        </Box>
      )}
    </Layout>
  );
}
