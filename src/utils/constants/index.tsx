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
    submenu: [{
      submenuLabel: "Model Creation",
      description: "Create a new LLM model from scratch.",

    }],
  },
  {
    title: "Try Out",
    href: "/try",
    icon:"/assets/navbar/van.webp",
    description:
      "Integrate LLM models like Gemini and DALL-E.",
    submenu: [
      {
        submenuLabel: "How to Use",
        description: "Integrate LLM models into your app.",
      },
      {
        submenuLabel: "Tutorials",
        description:
          "Explore docs on using LLM models effectively.",
      },
    ],
  },
  {
    title: "How It Works",
    href: "/features",
    description: "Discover additional features of the application.",
    submenu: [
      {
        submenuLabel: "Roadmap",
        description: "Development roadmap for upcoming features.",
      },
      {
        submenuLabel: "Updates",
        description: "Stay informed about the latest updates and enhancements.",
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
