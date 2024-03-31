import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { ModelCard } from "../components/modelCard";
import { useModels } from "../hooks";

export function AllModels() {
  const [state] = useAppState();
  const { getModels, loading } = useModels();

  useEffect(() => {
    async function fetchModelsData() {
      if (state?.parentModel?.length > 0) return;
      else await getModels();
    }
    fetchModelsData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="text-white h-screen">
          <Loader />
        </div>
      ) : (
        <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
          <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956] uppercase">
            EXPLORE
          </Typography>

          <Box py={4}>
            <ModelCard modelData={state?.parentModels} />
          </Box>
          <Divider className="flex  w-full gap-8 " />
        </Box>
      )}
    </Layout>
  );
}
