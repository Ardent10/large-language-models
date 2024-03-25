
export const NavbarMenu: {
  title: string;
  href: string;
  description: string;
  submenu: { submenuLabel: string }[];
}[] = [
  {
    title: "Browse",
    href: "/docs/primitives/alert-dialog",
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
