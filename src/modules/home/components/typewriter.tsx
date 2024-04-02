import { DateTimeFormat } from "@/modules/models/components/dateTimeFormat";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
    <Box className="px-4 min-w-full items-center flex flex-col">
      <Box
        id="terminal-header"
        className="bg-white w-full py-1 px-4 sm:px-8 rounded-t-xl flex items-center justify-center relative"
      >
        <Box className="flex absolute left-3">
          <span className="w-2 h-2 sm:w-5 sm:h-5 rounded-full bg-red-500 mr-2"></span>
          <span className="w-2 h-2 sm:w-5 sm:h-5 rounded-full bg-yellow-500 mr-2"></span>
          <span className="w-2 h-2 sm:w-5 sm:h-5 rounded-full bg-green-500"></span>
        </Box>
        <Typography
          variant="body1"
          fontFamily="monospace"
          className="text-green-600 sm:text-3xl whitespace-nowrap text-center"
        >
          <FolderRoundedIcon fontSize="large" /> $LargeLanguageModels
        </Typography>
      </Box>

      <Box
        id="terminal-body"
        className="rounded-b-xl bg-[#2d3e52] p-8 w-full h-[130vh] sm:h-[120vh]"
      >
        <Typography
          variant="body1"
          fontFamily={"monospace"}
          className="text-green-600 sm:text-3xl whitespace-pre-wrap w-full"
        >
          {"> " + displayText}
        </Typography>
      </Box>
    </Box>
  );
};

export function AppDescription() {
  const description = `Welcome to Large Language Models, your gateway to cutting-edge AI innovation. With a focus on empowering users, our platform offers a range of services tailored to meet your needs: \n
1. Create custom models: Build AI models suited to your specific requirements with our intuitive interface. \n
2. Explore pre-built models: Dive into our curated collection to discover the latest advancements in AI technology and explore new use cases. \n
3. Generate content effortlessly: Utilize powerful models like GPT-3.5 Turbo, DALL-E, and Gemini to generate text, images, and more with ease. \n
4. Comprehensive model library: Access a diverse array of LLMs, each designed to excel in specific domains, from language translation to creative artistry. \n
5. Dedicated models page: Delve deeper into each model's features, capabilities, and potential use cases through detailed documentation and examples. Join us at Large Language Models and experience the future of AI innovation firsthand.`;

  return (
    <Box className="py-8 min-h-[20rem] w-full">
      <Box className="w-full flex flex-col justify-center items-center">
        <Box className="overflow-hidden w-full">
          <TerminalTypewriter text={description} />
        </Box>
      </Box>
    </Box>
  );
}
