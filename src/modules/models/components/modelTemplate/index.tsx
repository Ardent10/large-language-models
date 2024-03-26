import { Chips } from "@/modules/common/chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Typography } from "@mui/material";
import { Model } from "../../components/modelCard";
import { DateTimeFormat } from "../dateTimeFormat";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export function ModelTemplate({ model }: { model: Model }) {
  const mode = "dark";
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <Box p={3} bgcolor={"black"} border={"1px solid green"} borderRadius={3}>
      {model ? (
        <Box className="max-w-3xl mx-auto px-4 py-8">
          <Box className="flex flex-col ">
            <img
              src={model.header_image}
              alt="model-img"
              className="rounded-xl shadow-lg"
            />
            <Typography className="text-3xl py-4 font-bold mb-4">
              {model.name}
            </Typography>

            <Box className="flex" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Provider:{" "}
              </Typography>
              <Typography fontSize={16} color={"#64c956"}>
                {model.provider}
              </Typography>
            </Box>

            <Box className="flex" gap={1}>
              <Typography fontSize={16}>Website:</Typography>
              <Typography fontSize={16} color={"#64c956"}>
                <a
                  href={model.website}
                  className="text-[#64c956] hover:underline items-center flex"
                  target="_blank"
                  rel=" noopener noreferrer"
                >
                  {model.website}
                  <OpenInNewRoundedIcon fontSize="small" color="primary" />
                </a>
              </Typography>
            </Box>

            <Box className="flex" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Published Date:
              </Typography>

              <DateTimeFormat
                fontSize={16}
                dateTime={model.published_date}
                format="DD MMM, YYYY"
              />
            </Box>

            <Box className="flex items-center">
              <IconButton aria-label="love">
                <FavoriteIcon />
              </IconButton>
              <Typography color="#64c956" fontSize={16} fontWeight={500}>
                {model.likes}
              </Typography>
            </Box>

            <Box className="flex" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Parameters:
              </Typography>
              <Typography fontSize={16} color={"#64c956"}>
                {model.parameters}
              </Typography>
            </Box>

            <Box className="flex" gap={1}>
              <Typography fontSize={16}>Access Type:</Typography>
              <Typography fontSize={16} color={"#64c956"}>
                {model.access_type}
              </Typography>
            </Box>

            <Box className="flex py-2 items-center" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Tags:
              </Typography>
              <Box className="flex flex-wrap">
                <Chips chipsArray={model?.tags} />
              </Box>
            </Box>
          </Box>
          <Box className="content pt-4">
            <Box
              className={`text-lg font-normal whitespace-pre-wrap`}
              dangerouslySetInnerHTML={createMarkup(model.content)}
            />
          </Box>
        </Box>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">No Data Found</h1>
        </div>
      )}
    </Box>
  );
}
