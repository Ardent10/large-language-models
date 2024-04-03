import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { CustomTooltip } from "@/modules/common/tooltip";
import { useAppState } from "@/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubModelTemplate } from "../components/subModelTemplate";
import { Model, useModels } from "../hooks";

export function SubModel() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [state] = useAppState();
  const { increaseViewsForSubModels } = useModels();
  const navigate = useNavigate();
  const { subModelId } = useParams<{ subModelId: string }>();
  const currentModel = state?.subModels?.find(
    (model: Model) => model.id === subModelId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (subModelId && !!currentModel) {
      increaseViewsForSubModels(subModelId);
    }
  }, [subModelId]);

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
            <Box className="relative max-w-3xl w-full items-center justify-center text-center">
              <CustomTooltip label="Go back" placement="top">
                <IconButton
                  className="absolute top-6 sm:top-20 left-0 bg-white"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon fontSize="large" className="text-green-600" />
                </IconButton>
              </CustomTooltip>
              <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956] uppercase]">
                READ 
              </Typography>
            </Box>

            <SubModelTemplate subModel={currentModel} />
          </Box>
        )}
      </Layout>
    </>
  );
}
