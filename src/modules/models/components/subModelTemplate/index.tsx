import { Chips } from "@/modules/common/chip";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { SubModel } from "../../hooks";
import { DateTimeFormat } from "../dateTimeFormat";
import { Link } from "react-router-dom";

interface SubModelTemplateProps {
  subModel: SubModel;
}

export function SubModelTemplate({ subModel }: SubModelTemplateProps) {

  const createMarkup = (html: string) => {
    // Sanitize html
    const sanitizedHtml = DOMPurify.sanitize(html);

    // Convert markdown to html
    const markedHtml = marked.parse(sanitizedHtml);

    return { __html: markedHtml };
  };

  return (
    <Box
      p={3}
      // height={"100%"}
      bgcolor={"black"}
      border={"1px solid green"}
      borderRadius={3}
    >
      {subModel ? (
        <Box className="max-w-3xl mx-auto px-4 py-8">
          <Box className="flex flex-col text-white">
            <img
              src={subModel.header_image}
              alt="model-img"
              className="rounded-xl shadow-lg"
            />
            <Typography className="text-3xl py-4 font-bold mb-4">
              {subModel.name}
            </Typography>

            <Box className="flex" gap={1}>
              <Typography fontSize={16}>Parent Model:</Typography>
              <Typography fontSize={16} color={"#64c956"}>
                <Link
                  to={`/models/${subModel.parent_id}`}
                  className="text-[#64c956] hover:underline items-center flex"
                >
                  {subModel.parents_blog}
                </Link>
              </Typography>
            </Box>

            <Box className="flex" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Published Date: 
              </Typography>

              <DateTimeFormat
                fontSize={16}
                dateTime={subModel.publish_date}
                format="DD MMM, YYYY"
              />
            </Box>

            <Box className="flex items-center">
              <IconButton aria-label="love">
                <VisibilityIcon />
              </IconButton>
              <Typography color="#64c956" fontSize={16} fontWeight={500}>
                {subModel.likes}
              </Typography>
            </Box>

            <Box className="flex py-2 items-center" gap={1}>
              <Typography fontSize={16} fontWeight={500}>
                Tags:
              </Typography>
              <Box className="flex flex-wrap">
                <Chips chipsArray={subModel?.tags} />
              </Box>
            </Box>
          </Box>
          <Box className="content pt-4">
            <Box
              component="div"
              className={`text-lg text-white  font-normal whitespace-pre-wrap [&>pre]:bg-[#666666] [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:whitespace-pre-wrap [&>code]:whitespace-break-spaces`}
              dangerouslySetInnerHTML={
                createMarkup(subModel.content) as unknown as {
                  __html: string | TrustedHTML;
                }
              }
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
