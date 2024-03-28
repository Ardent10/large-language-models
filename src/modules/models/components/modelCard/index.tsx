import { Chips } from "@/modules/common/chip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTimeFormat } from "../dateTimeFormat";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
export type Model = {
  id?: string;
  name: string;
  header_image: string;
  content: string;
  published_date: string;
  created_at: string;
  likes: number;
  parameters: string;
  tags: string[];
  status: string;
  provider: string;
  website: string;
  access_type: string;
};

interface ModelCardProps {
  modelData:Model[];
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function ModelCard({ modelData }: ModelCardProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpandClick = (idx: number) => {
    setExpanded((prevExpanded) => (prevExpanded === idx ? null : idx));
  };

  return (
    <>
      {modelData ? (
        <Grid container spacing={4}>
          {modelData?.map((model, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
              <Link to={`/models/${model.id}`}>
                <Card
                  sx={{
                    minWidth: "100%",
                    borderRadius: 4,
                    border: "1px solid #64c956",
                    ":hover": {
                      boxShadow: "0 0 10px 0 rgb(0 0 0 / 10%)",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardHeader
                    title={model.name}
                    sx={{ fontSize: 18, fontWeight: 600, color: "#64c956" }}
                    subheader={
                      <DateTimeFormat
                        dateTime={model.published_date}
                        format="DD MMM, YYYY"
                      />
                    }
                  />
                  <CardActions disableSpacing>
                    <CardContent sx={{ p: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={14}
                        fontWeight={500}
                      >
                        {model.name}
                      </Typography>
                    </CardContent>
                    <ExpandMore
                      expand={expanded === idx}
                      onClick={() => handleExpandClick(idx)}
                      aria-expanded={expanded === idx}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>

                  <Collapse in={expanded === idx} timeout="auto" unmountOnExit>
                    <CardContent sx={{ py: 0 }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: model?.content?.substring(0, 300),
                        }}
                      />
                      ...
                      <Link
                        className="text-green-600"
                        to={`/models/${model.id}`}
                      >
                        Read More
                      </Link>
                    </CardContent>
                  </Collapse>

                  <CardMedia
                    component="img"
                    sx={{ height: 300 }}
                    src={model.header_image}
                    alt="post"
                  />

                  <CardActions>
                    <Box className="flex justify-between w-full">
                      <Box className="flex items-center">
                        <Box className="flex items-center">
                          <IconButton aria-label="love">
                            <VisibilityIcon />
                          </IconButton>
                          <Typography
                            color="#64c956"
                            fontSize={16}
                            fontWeight={500}
                          >
                            {model.likes}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Chips chipsArray={model.tags} />
                      </Box>
                    </Box>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography fontSize={24} variant="h1" textAlign="center">
          No Models Available at the Moment.
        </Typography>
      )}
    </>
  );
}
