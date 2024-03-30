import { Section } from "@/modules/common/section";
import { Layout } from "@common/layout/layout";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
          <AppDescription />
        </Section>
        <Section>
          <Typography className="text-4xl font-bold text-center text-green-600 capitalize">
            HOW?
          </Typography>
          <Box className="w-full h-full sm:py-8">
            <iframe
              className="w-full h-full rounded-xl"
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
      <Typography variant="body1" className="text-green-600 sm:text-3xl">
        {displayText}
      </Typography>
    </Box>
  );
};


const AppDescription = () => {
  const description = `Welcome to Large Language Models, your gateway to cutting-edge AI innovation. With a focus on empowering users, our platform offers a range of services tailored to meet your needs:
- Create custom models: Build AI models suited to your specific requirements with our intuitive interface.
- Explore pre-built models: Dive into our curated collection to discover the latest advancements in AI technology and explore new use cases.
- Generate content effortlessly: Utilize powerful models like GPT-3.5 Turbo, DALL-E, and Gemini to generate text, images, and more with ease.
- Comprehensive model library: Access a diverse array of LLMs, each designed to excel in specific domains, from language translation to creative artistry.
- Dedicated models page: Delve deeper into each model's features, capabilities, and potential use cases through detailed documentation and examples. Join us at [Your App Name] and experience the future of AI innovation firsthand.`;

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
