import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Divider, Typography } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import { Model } from "../components/modelCard";
import { SkeletonCardLoader } from "../components/modelCard/skeletonCardLoader";
import { useModels } from "../hooks";
const ModelCard = lazy(() => import("../components/modelCard"));

export function FeaturedModels() {
  const [state] = useAppState();
  const { getModels, loading } = useModels();
  const [mostViewedModels, setMostViewedModels] = useState<Model[]>([]);

  useEffect(() => {
    if (!state?.parentModels?.length) {
      getModels();
    }
    const mostViewedModels: Model[] = state?.parentModels
      ?.sort((a: Model, b: Model) => b.likes - a.likes)
      .slice(0, 6);
    setMostViewedModels(mostViewedModels);
  }, [state?.parentModels]);

  return (
    <Layout>
      {loading ? (
        <div className="text-white h-screen">
          <Loader />
        </div>
      ) : (
        <Box className="flex flex-col items-center justify-center w-full px-8 sm:px-16 mt-24">
          <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956] uppercase">
            FEATURED🔥
          </Typography>

          {loading ? (
            <SkeletonCardLoader />
          ) : (
            <Suspense fallback={<SkeletonCardLoader />}>
              <Box py={4} id="model-featured-container">
                <ModelCard modelData={state?.parentModels} />
              </Box>
            </Suspense>
          )}
          <Divider className="flex  w-full gap-8 " />
        </Box>
      )}
    </Layout>
  );
}
