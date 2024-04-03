import { Chips } from "@/modules/common/chip";
import { useAppState } from "@/store";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { Model } from "../../components/modelCard";
import { SubModel } from "../../hooks";
import { DateTimeFormat } from "../dateTimeFormat";

export function ModelTemplate({ model }: { model: Model }) {
  const [state] = useAppState();
  const mode = "dark";
  const createMarkup = (html: string) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return { __html: sanitizedHtml };
  };

  const subModels = state?.subModels?.filter(
    (subModel: SubModel) => subModel?.parent_id === model?.id
  );
  return (
    <Box
      p={3}
      height={"100%"}
      bgcolor={"black"}
      border={"1px solid green"}
      borderRadius={3}
    >
      {model ? (
        <Box className="max-w-3xl mx-auto px-4 py-8">
          <Box className="flex flex-col text-white">
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
            {subModels?.length > 0 && (
              <Box className="flex" gap={1}>
                <Typography fontSize={16}>Sub Models:</Typography>
                <Typography fontSize={16} color={"#64c956"}>
                  {subModels.map((subModel: SubModel) => (
                    <Link
                      to={`/models/${model.id}/${subModel.id}`}
                      className="text-[#64c956] hover:underline items-center flex"
                    >
                      {subModel.name}
                    </Link>
                  ))}
                </Typography>
              </Box>
            )}

            <Box className="flex items-center">
              <IconButton aria-label="love">
                <VisibilityIcon />
              </IconButton>
              <Typography color="#64c956" fontSize={16} fontWeight={500}>
                {model.likes}
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
              className={`text-lg text-white font-normal whitespace-pre-wrap ${
                mode === "dark"
                  ? "[&>pre]:bg-[#2d3e52] [&>pre]:rounded-xl [&>pre]:p-4 "
                  : "[&>pre]:text-black "
              } [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
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
