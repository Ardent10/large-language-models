import { Layout } from "@/modules/common/layout/layout";
import { useAppState } from "@/store";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Suspense, lazy, useEffect } from "react";
import { SkeletonCardLoader } from "../components/modelCard/skeletonCardLoader";
import { useModels } from "../hooks";
// Lazy load the ModelCard component
const ModelCard = lazy(() => import("../components/modelCard"));

export function AllSubModels() {
  const [state] = useAppState();
  const { getSubModels, loading } = useModels();

  useEffect(() => {
    async function fetchModelsData() {
      if (state?.subModels?.length > 0) return;
      else await getSubModels();
    }
    fetchModelsData();
  }, []);

  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-8 sm:px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956] uppercase">
         SUB MODELS
        </Typography>
        {loading ? (
          <SkeletonCardLoader />
        ) : (
          <Suspense fallback={<SkeletonCardLoader />}>
            <Box py={4} id="model-cards-container">
              <ModelCard data={state?.subModels} />
            </Box>
          </Suspense>
        )}
        <Divider className="flex  w-full gap-8 " />
      </Box>
    </Layout>
  );
}
