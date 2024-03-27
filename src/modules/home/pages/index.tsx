import { Section } from "@/modules/common/section";
import { Layout } from "@common/layout/layout";
import { Box, Typography } from "@mui/material";
import { Hero } from "../components/hero";

export function Home() {
  return (
    <Layout>
      <Box
        sx={{
          backgroundImage: "url(/assets/matrix-bg.webp)",
          zIndex: -2,
        }}
      >
        <Hero />
        <Section>
          <Typography className="text-4xl font-bold text-center text-green-600 capitalize">
            WHAT?
          </Typography>
          <Box className="w-full h-full sm:py-8">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://whimsical.com/embed/C32pdRJzyTKjRJWf3q4Wnc"
            ></iframe>
          </Box>
        </Section>
        <Section>
          <Typography className="text-4xl font-bold text-center text-green-600 capitalize">
            WHERE?
          </Typography>
        </Section>
        <Section>
          <Typography className="text-4xl font-bold text-center text-green-600 capitalize">
            HOW?
          </Typography>
        </Section>
      </Box>
    </Layout>
  );
}
