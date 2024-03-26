import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { PrimaryButton } from "../button";

interface props {
  height?: number | string;
  width?: number;
  cardItems?: Array<any>;
  children?: any;
  px?: number;
  py?: number;
  title?: string;
  position?: "absolute" | "relative" | "fixed";
  cardAction?: boolean;
  cardMedia?: string;
  cardMediaheight?: number;
  divider?: boolean;
  buttonOnHeader?: boolean;
  btnOnClick?: any;
  btnLabel?: string;
  btnDisabled?: boolean;
  btnType?: string;
}

export function BasicCard(props: props) {
  return (
    <Grid container id="basic-card">
      <Grid item xs={12} px={props.px} py={props.py}>
        <Card
          sx={{
            minWidth: props.width ? props.width : "100%",
            height: props.height,
            position: props?.position,
          }}
        >
          {props.cardMedia && (
            <CardMedia
              sx={{ height: props.cardMediaheight }}
              image={props.cardMedia}
              title="icon"
            />
          )}
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ fontSize: 22, fontWeight: 500 }} gutterBottom>
                {props.title}
              </Typography>
              {props.buttonOnHeader && (
                <PrimaryButton
                  variant="text"
                  title={props?.btnLabel ? props.btnLabel : ""}
                  type={props.btnType}
                  borderColor="1px solid #8a89fa"
                  backgroundColor="#8a89fa"
                  fontSize={12}
                  fontWeight={500}
                  width={110}
                  height={30}
                  disableElevation
                  buttonChild={<LocalOfferIcon fontSize="small" />}
                  onClick={props.btnOnClick}
                  disabled={props.btnDisabled}
                />
              )}
            </Box>
            {props.divider && <Divider />}
            {props.children}
          </CardContent>
          {props.cardAction && (
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
