import { ColorModeContext } from "@/modules/common/theme";
import { useContext } from "react";

export function CreateModelPreview() {
  const { mode } = useContext(ColorModeContext);
  const createMarkup = (html: string) => {
    return { __html: html };
  };
  return (
    <div className=" w-full grid gap-4  bg-gray-300 items-center justify-center rounded-xl">
      <div className="">
        <h1 className=" text-center mb-3 text-2xl">Preview</h1>
        <div className="content">
          <div
            className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#ff4d4d]"
                            : "[&>h1]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h2]:text-white"
                            : "[&>h2]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h3]:text-white"
                            : "[&>h3]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h4]:text-white"
                            : "[&>h4]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h5]:text-white"
                            : "[&>h5]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h6]:text-white"
                            : "[&>h6]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>p]:text-[#7efff5]"
                            : "[&>p]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ul]:text-white"
                            : "[&>ul]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        `}
            dangerouslySetInnerHTML={createMarkup(
              "value to send to markup function later"
            )}
          ></div>
        </div>
      </div>
      No Preview Available. Please fill out the form to see the preview.
    </div>
  );
}
