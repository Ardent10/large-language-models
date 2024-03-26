import {
  Chip,
  Grid,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { Error } from "../error";
import { InputLabel } from "../input/inputLabel";
import { ColorModeContext } from "../theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
    },
  },
};

interface SelectorProps {
  title?: string;
  flexDirection?: string;
  fontSize?: number;
  data: any;
  name: string;
  control: any;
  selectHeadingGridSpace?: number;
  selectFieldGridSpace?: number;
  required?: boolean;
  fontWeight?: number;
  disable?: boolean;
  sendId?: boolean;
  placeHolder?: string;
}

export function SelectField({
  data,
  name,
  control,
  title,
  flexDirection,
  fontSize,
  selectHeadingGridSpace,
  selectFieldGridSpace,
  required,
  fontWeight,
  disable,
  sendId,
  placeHolder,
}: SelectorProps) {
  const { mode } = useContext(ColorModeContext);
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, isDirty, error },
        formState: { isValid },
      }) => {
        return (
          <Grid container width={"100%"}>
            {title && (
              <Grid
                item
                xs={flexDirection === "row" ? selectHeadingGridSpace : 12}
              >
                <InputLabel
                  label={title}
                  required={required}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                />
              </Grid>
            )}
            <Grid item xs={flexDirection === "row" ? selectFieldGridSpace : 12}>
              <Select
                placeholder={placeHolder && placeHolder}
                size="small"
                sx={{
                  p: 1,
                  width: "100%",
                  borderRadius: "5px",
                  ".MuiOutlinedInput-notchedOutline": {
                    border:
                      mode === "dark" ? "1px solid white" : "1px solid black",
                  },
                }}
                defaultValue={""}
                value={value}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                input={<OutlinedInput />}
                error={
                  error || (required && isTouched && !value) ? true : false
                }
                inputRef={ref}
                required={required}
                MenuProps={MenuProps}
                inputProps={{
                  "aria-label": "Without label",
                }}
                renderValue={() => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{
                      backgroundColor: "#93e560",
                      color: "#FFF",
                    }}
                  />
                )}
                disabled={disable}
              >
                {data.map((d: any) => {
                  return (
                    <MenuItem
                      key={d.id ? d.id : d.label}
                      value={sendId === true ? d.id : d.label}
                      className="bg-green-500"
                    >
                      {d.icon && (
                        <ListItemIcon>
                          <img src={d.icon} alt="icon" height={10} width={10} />
                        </ListItemIcon>
                      )}
                      {(d.showLabel && d.showLabel) || d.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Error error={error} />
          </Grid>
        );
      }}
    />
  );
}
