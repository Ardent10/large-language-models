import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { Box, Typography } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ModelTemplate } from "../components/modelTemplate";
import { Model, useModels } from "../hooks";

export function LLM() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [state] = useAppState();
  const { likeModel } = useModels();
  const { modelId } = useParams<{ modelId: string }>();
  const currentModel = state?.parentModels?.find(
    (model: Model) => model.id === modelId
  );

  useEffect(() => {
    if (modelId && !!currentModel) {
      likeModel(modelId);
    }
  }, [modelId]);

  return (
    <>
      <motion.div
        className="fixed z-1 w-full top-0 left-0 right-0 h-3 origin-left rounded-xl  bg-green-600"
        style={{ scaleX }}
      />
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
    </>
  );
}
