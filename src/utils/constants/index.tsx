export const NavbarMenu: {
  title: string;
  href: string;
  description: string;
  submenu: { submenuLabel: string }[];
}[] = [
  {
    title: "Browse",
    href: "/models",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    submenu: [{ submenuLabel: "features" }, { submenuLabel: "feedback" }],
  },
  {
    title: "Models",
    href: "/models",
    description:
      "For sighted users to preview content available behind a link.",
    submenu: [{ submenuLabel: "latest" }, { submenuLabel: "playground" }],
  },
  {
    title: "Try Out",
    href: "/models/create",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    submenu: [{ submenuLabel: "how to use" }, { submenuLabel: "tutorials" }],
  },
  {
    title: "Features",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
    submenu: [{ submenuLabel: "roadmap" }, { submenuLabel: "updates" }],
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
