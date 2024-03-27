import { useParams } from "react-router-dom";
import { DallE } from "./dallE";
import { GeminiPro } from "./geminiPro";
import { GeminiProVision } from "./geminiProVision";
import { GPT } from "./gpt";

export function GenerateModelsByModelName() {
  const { modelName } = useParams<{ modelName: string }>();

  if (modelName === "gpt") {
    return <GPT />;
  } else if (modelName === "dall-e") {
    return <DallE />;
  } else if (modelName === "gemini-pro") {
    return <GeminiPro />;
  } else if (modelName === "gemini-pro-vision") {
    return <GeminiProVision />;
  } else {
    return null;
  }
}
