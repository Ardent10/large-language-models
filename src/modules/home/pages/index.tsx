import { FramerCard } from "@/modules/common/card/framerCard";
import { Section } from "@/modules/common/section";
import { Layout } from "@common/layout/layout";
import { Box } from "@mui/material";
import { Hero } from "../components/hero";
import { AppDescription } from "../components/typewriter";
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
        
        <Section title="WHAT?">
          <AppDescription />
        </Section>
        <Section title="HOW?">
          <Box className="w-full min-h-screen px-2 sm:py-8">
            <iframe
              className="w-full rounded-xl min-h-screen"
              src="https://whimsical.com/embed/C32pdRJzyTKjRJWf3q4Wnc"
            ></iframe>
          </Box>
        </Section>
      </Box>
    </Layout>
  );
}
