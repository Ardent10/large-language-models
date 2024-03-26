import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Typography } from "@mui/material";
import { ModelCard } from "../components/modelCard";
import { useModels } from "../hooks";

export function BookmarkModels() {
  const { getModels, loading } = useModels();
  const [state] = useAppState();
  return (
    <Layout>
      <Box className="h-screen">
        {loading ? (
          <div className="text-white h-screen">
            <Loader />
          </div>
        ) : (
          <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
            <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
              REVISIT
            </Typography>

            <Box py={4}>
              <ModelCard modelData={state?.parentModels} />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
