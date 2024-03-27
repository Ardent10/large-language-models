import { Layout } from "@/modules/common/layout/layout";
import { Loader } from "@/modules/common/loader";
import { useAppState } from "@/store";
import { AIModels } from "@/utils/constants";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useModels } from "../hooks";

export function GenerateModels() {
  const { getModels, loading } = useModels();
  const [state] = useAppState();
  return (
    <Layout>
      <Box>
        {loading ? (
          <div className="text-white h-screen">
            <Loader />
          </div>
        ) : (
          <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
            <Typography className="font-semibold md:text-9xl py-8 text-[#64c956]">
              CHOOSE
            </Typography>

            <Grid container spacing={4} height={"100%"}>
              {AIModels.map((model) => (
                <Grid
                  key={model.id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="flex items-center justify-center h-full"
                >
                  <Link to={model.href}>
                    <Card
                      sx={{ maxWidth: 345 }}
                      key={model.id}
                      className="border border-green-600 rounded-xl"
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={model.image}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {model.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {model.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
