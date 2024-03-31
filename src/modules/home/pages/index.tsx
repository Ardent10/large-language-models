import { Section } from "@/modules/common/section";
import { Layout } from "@common/layout/layout";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Hero } from "../components/hero";
import { FramerCard } from "@/modules/common/card/framerCard";

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
        <Section  title="WHAT?">
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

const TerminalTypewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <Box className="px-4 w-full items-center flex">
      <Typography
        variant="body1"
        className="text-green-600 sm:text-3xl whitespace-pre-wrap"
      >
        {displayText}
      </Typography>
    </Box>
  );
};

const AppDescription = () => {
  const description = `Welcome to Large Language Models, your gateway to cutting-edge AI innovation. With a focus on empowering users, our platform offers a range of services tailored to meet your needs: \n
1. Create custom models: Build AI models suited to your specific requirements with our intuitive interface. \n
2. Explore pre-built models: Dive into our curated collection to discover the latest advancements in AI technology and explore new use cases. \n
3. Generate content effortlessly: Utilize powerful models like GPT-3.5 Turbo, DALL-E, and Gemini to generate text, images, and more with ease. \n
4. Comprehensive model library: Access a diverse array of LLMs, each designed to excel in specific domains, from language translation to creative artistry. \n
5. Dedicated models page: Delve deeper into each model's features, capabilities, and potential use cases through detailed documentation and examples. Join us at Large Language Models and experience the future of AI innovation firsthand.`;

  return (
    <Box className="py-8 min-h-[20rem]">
      <Box className="w-full flex flex-col justify-center items-center">
        <Box className="overflow-hidden ">
          <TerminalTypewriter text={description} />
        </Box>
      </Box>
    </Box>
  );
};
