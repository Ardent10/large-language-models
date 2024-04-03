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
    title: "Sub Models",
    href: "/sub-models",
    icon: "/assets/navbar/submodels.png",
    description: "Explore various sub-models and their details.",
    submenu: [
      {
        submenuLabel: "Sub Model Catalog",
        description: "Browse through available sub-models.",
      },
      {
        submenuLabel: "Sub Model Details",
        description: "View detailed information on sub-models.",
      },
    ],
  },
  {
    title: "Create",
    href: "/models/create",
    description: "Create your own LLM model.",
    icon: "/assets/navbar/cat.webp",
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
    icon: "/assets/navbar/sphere.jpg",
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

export const LLMCardsDara  = [
  {
    title: "What are Large Language Models?",
    description: "Large Language Models (LLMs) are a type of artificial intelligence (AI) model that excels at understanding and generating human-like text. These models are trained on vast amounts of text data and learn to predict the next word or sequence of words based on context. They have revolutionized natural language processing tasks and are capable of generating coherent and contextually relevant text across a wide range of topics.",
    image: "llm_image_1.jpg",
    // Add any additional fields as needed
  },
  {
    title: "How do Large Language Models work?",
    description: "Large Language Models work by leveraging deep learning techniques, particularly transformer-based architectures like GPT (Generative Pre-trained Transformer). These models consist of multiple layers of neurons that process input text in parallel, allowing them to capture complex patterns and relationships in language. During training, they learn to predict the next word in a sequence given the previous words, and this knowledge is then used to generate text during inference.",
    image: "llm_image_2.jpg",
    // Add any additional fields as needed
  },
  {
    title: "Applications of Large Language Models",
    description: "Large Language Models have a wide range of applications across various domains. They are used for tasks such as language translation, content generation, text summarization, question answering, sentiment analysis, and more. They are also employed in fields like healthcare, finance, education, and entertainment to automate tasks, improve efficiency, and enhance user experiences.",
    image: "llm_image_3.jpg",
    // Add any additional fields as needed
  },
  {
    title: "Benefits of Large Language Models",
    description: "Large Language Models offer several benefits, including the ability to generate human-like text, understand context, and adapt to different writing styles. They can assist users in generating content, automating repetitive tasks, and gaining insights from large volumes of text data. Additionally, they can be fine-tuned for specific use cases, making them highly versatile and customizable.",
    image: "llm_image_4.jpg",
    // Add any additional fields as needed
  },
  {
    title: "Challenges and Limitations",
    description: "While Large Language Models have shown impressive capabilities, they also face challenges and limitations. These include issues related to bias and fairness in language generation, the need for large computational resources for training and inference, and concerns about the environmental impact of running such models. Addressing these challenges is essential to ensure the responsible and ethical deployment of LLMs.",
    image: "llm_image_5.jpg",
    // Add any additional fields as needed
  },
  {
    title: "Future Directions",
    description: "The future of Large Language Models holds promise for further advancements and innovations. Researchers are working on developing more efficient and scalable architectures, addressing bias and fairness issues, improving model interpretability, and exploring new applications and use cases. With ongoing research and development efforts, LLMs are poised to continue reshaping the landscape of natural language processing and AI.",
    image: "llm_image_6.jpg",
    // Add any additional fields as needed
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
    name: "Gemini Pro",
    href: "/models/generate/gemini-pro",
    description:
      " Gemini 1.5 delivers dramatically enhanced performance with a more efficient architecture.",
    image: "/assets/generate/gemini.jpg",
    tags: ["LLM", "OpenAI"],
  },
  {
    id: 2,
    name: "Gemini Pro Vision",
    href: "/models/generate/gemini-pro-vision",
    description:
      "Gemini Pro Vision is a Gemini LLM that understands input from text and visual modalities (image and video).",
    image: "/assets/generate/gemini-pro.png",
    tags: ["LLM", "OpenAI"],
  },
  {
    id: 3,
    name: "GPT-3.5 Turbo",
    href: "/models/generate/gpt",
    description:
      "OpenAI's third-generation language prediction model. It is the largest language model ever created.",
    image: "/assets/generate/gpt.jpg",
    tags: ["LLM", "GPT", "OpenAI"],
  },
  {
    id: 4,
    name: "DALL-E",
    href: "/models/generate/dall-e",
    description:
      "OpenAI's image generation model that generates images from textual descriptions.",
    image: "/assets/generate/dall-e.jpeg",
    tags: ["LLM", "OpenAI"],
  },
];
