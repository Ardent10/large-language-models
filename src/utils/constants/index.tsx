export const NavbarMenu: {
  title: string;
  href: string;
  description: string;
  icon?: string;
  submenu: { submenuLabel: string; description: string }[];
}[] = [
  {
    title: "Models",
    href: "/models",
    icon: "/assets/navbar/openai.png",
    description: "Explore various LLM models and their details.",
    submenu: [
      {
        submenuLabel: "Model Catalog",
        description: "Browse through available LLM models.",
      },
      {
        submenuLabel: "Model Details",
        description: "View detailed information on LLM models.",
      },
    ],
  },
  {
    title: "Create",
    href: "/models/create",
    description: "Create your own LLM model.",
    icon:"/assets/navbar/cat.webp",
    submenu: [
      {
        submenuLabel: "Model Creation",
        description: "Create a new LLM model from scratch.",
      },
    ],
  },
  {
    title: "Generate",
    href: "/models/generate",
    icon: "/assets/navbar/van.webp",
    description: "Integrate LLM models like Gemini and DALL-E.",
    submenu: [
      {
        submenuLabel: "How to Use",
        description: "Integrate LLM models into your app.",
      },
      {
        submenuLabel: "Tutorials",
        description: "Explore docs on using LLM models effectively.",
      },
    ],
  },
  {
    title: "Featured🔥",
    href: "/models/featured",
    description: "Discover additional features of the application.",
    icon:"/assets/navbar/sphere.jpg",
    submenu: [
      {
        submenuLabel: "Explore",
        description: "Learn more about the most loved models.",
      },
      {
        submenuLabel: "Practice",
        description: "Get the most out of the application.",
      },
    ],
  },
];

export const ModelTags = [
  { id: 1, label: "LLM" },
  { id: 2, label: "GPT" },
  { id: 3, label: "OpenAI" },
  { id: 4, label: "Microsoft" },
  { id: 5, label: "ChatGPT" },
  { id: 6, label: "API" },
  { id: 7, label: "Gemini" },
  { id: 8, label: "Google" },
  { id: 9, label: "Bard" },
  { id: 10, label: "PaLM 2" },
  { id: 11, label: "Llama 2" },
  { id: 12, label: "Vicuna" },
  { id: 13, label: "Claude 2" },
  { id: 14, label: "Stable Beluga" },
  { id: 15, label: "StableLM" },
  { id: 16, label: "Coral" },
  { id: 17, label: "Falcon" },
  { id: 18, label: "MPT" },
  { id: 19, label: "Mixtral 8x7B" },
  { id: 20, label: "XGen-7B" },
  { id: 21, label: "Grok" },
];

// "Only .jpg, .jpeg, .png and .webp formats are supported."
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const MAX_IMAGE_SIZE = 1024 * 1024 * 5;

export const AIModels = [
  {
    id: 1,
    name: "GPT-3.5 Turbo",
    href: "/models/generate/gpt",
    description: "OpenAI's third-generation language prediction model. It is the largest language model ever created.",
    image: "/assets/generate/gpt.jpg",
    tags: ["LLM", "GPT", "OpenAI"],
  },
  {
    id: 2,
    name: "DALL-E",
    href: "/models/generate/dall-e",
    description:
      "OpenAI's image generation model that generates images from textual descriptions.",
    image: "/assets/generate/dall-e.jpeg",
    tags: ["LLM", "OpenAI"],
  },
  {
    id: 3,
    name: "Gemini Pro",
    href: "/models/generate/gemini-pro",
    description:
      " Gemini 1.5 delivers dramatically enhanced performance with a more efficient architecture.",
    image: "/assets/generate/gemini.jpg",
    tags: ["LLM", "OpenAI"],
  },
  {
    id: 4,
    name: "Gemini Pro Vision",
    href: "/models/generate/gemini-pro-vision",
    description:
      "Gemini Pro Vision is a Gemini LLM that understands input from text and visual modalities (image and video).",
    image: "/assets/generate/gemini-pro.png",
    tags: ["LLM", "OpenAI"],
  },
];
