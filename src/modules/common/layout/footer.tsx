import { IconButton } from "@mui/material";
import { CustomTooltip } from "../tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";

export function Footer() {
  return (
    <div>
      <footer className="mt-8 mx-3 sm:mx-12  border-t border-l border-r  border-green-600  rounded-t-xl shadow ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src="/assets/logo.png" className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">
                LLM, Inc.
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <CustomTooltip placement="bottom" label="⭐ Star on Github">
                  <IconButton
                    size="medium"
                    href="https://github.com/Ardent10/large-language-models"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon fontSize="large" />
                  </IconButton>
                </CustomTooltip>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-green-300 sm:mx-auto  lg:my-8" />
          <span className="block text-sm text-white sm:text-center">
            © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:underline">
              Large Language Model Inc™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
