import { Chips } from "@/modules/common/chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Typography } from "@mui/material";
import { Model } from "../../components/modelCard";

export function ModelTemplate({ model }: { model: Model }) {
  console.log("MODEL", model);
  const mode = "dark";
  const createMarkup = (html: string) => {
    return { __html: html };
  };
  console.log("MODEL", model);

  return (
    <Box p={3} bgcolor={"black"} border={"1px solid green"} borderRadius={3}>
      {model ? (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <img
            src={model.header_image}
            alt="model-img"
            className="rounded-xl shadow-lg"
          />
          <Typography className="text-3xl py-4 font-bold mb-4">
            {model.name}
          </Typography>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Tags:</h2>
            <div className="flex flex-wrap">
              <Chips chipsArray={model?.tags} />
            </div>
          </div>
          <Typography className="mb-2">Provider: {model.provider}</Typography>
          <Typography className="mb-2">
            <a
              href={model.website}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel=" noopener noreferrer"
            >
              {model.website}
            </a>
          </Typography>
          <Typography fontSize={16} className="mb-2">
            Published Date: {model.published_date}
          </Typography>
          <Typography fontSize={16} className="mb-2">
            Created At: {model.created_at}
          </Typography>
          <Box className="flex items-center">
            <IconButton aria-label="love">
              <FavoriteIcon />
            </IconButton>
            <Typography color="#64c956" fontSize={16} fontWeight={500}>
              {model.likes}
            </Typography>
          </Box>
          <Typography fontSize={16} className="mb-2">
            Parameters: {model.parameters}
          </Typography>
          <Typography fontSize={16} className="mb-2">
            Access Type: {model.access_type}
          </Typography>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Content:</h2>
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
                dangerouslySetInnerHTML={createMarkup(model.content)}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">No Data Found</h1>
        </div>
      )}
    </Box>
  );
}
