import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Typography } from "@mui/material";
import { useModels } from "../hooks";
import { Suspense, lazy } from "react";

const ModelCard = lazy(() => import("../components/modelCard"));

export function BookmarkModels() {
  const { getModels, loading } = useModels();
  const [state] = useAppState();
  return (
    <Layout>
      <Box id="bookmark-container">
        {loading ? (
          <Box className="text-white h-screen">
            <Loader />
          </Box>
        ) : (
          <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
            <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
              REVISIT
            </Typography>

            <Suspense fallback={<Loader />}>
              <Box py={4} id="model-cards-container">
                <ModelCard data={state?.parentModels} />
              </Box>
            </Suspense>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
