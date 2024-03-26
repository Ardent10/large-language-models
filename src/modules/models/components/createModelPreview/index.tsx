import { Grid, Typography } from "@mui/material";
import { ModelTemplate } from "../modelTemplate/index.tsx";
import {Model } from "../../pages/createModel.tsx"


export function CreateModelPreview({ model }: { model: Model }) {
  return (
    <Grid container>
      <Grid
        xs={12}
        item
        className={`w-full grid gap-4  ${
          model ? "" : "bg-gray-300"
        } items-center justify-center rounded-xl`}
      >
        {model ? (
          <ModelTemplate model={model} />
        ) : (
          <Typography className="text-3xl py-4 font-bold mb-4">
            No Preview Available. Please fill out the form to see the preview.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
