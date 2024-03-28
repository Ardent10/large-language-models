import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Model, ModelCard } from "../components/modelCard";
import { useModels } from "../hooks";

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
        <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
          <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
            FEATURED🔥
          </Typography>

          <Box py={4}>
            <ModelCard modelData={mostViewedModels ? mostViewedModels : []} />
          </Box>
          <Divider className="flex  w-full gap-8 " />
        </Box>
      )}
    </Layout>
  );
}
