import {
  Grid,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Error } from "../error";
import { InputLabel } from "../input/inputLabel";

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
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  margin?: string;
  menuItemFontSize?: number;
  menuItemFontWeight?: number;
  menuItemFontColor?: string;
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
  backgroundColor?: string;
}

export function SelectField({
  title,
  display,
  justifyContent,
  alignItems,
  flexDirection,
  width,
  height,
  fontSize,
  color,
  margin,
  menuItemFontSize,
  menuItemFontWeight,
  menuItemFontColor,
  data,
  name,
  control,
  selectHeadingGridSpace,
  selectFieldGridSpace,
  required,
  fontWeight,
  disable,
  sendId,
  placeHolder,
  backgroundColor,
}: SelectorProps) {
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
          <Grid container>
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
                // sx={styles.selectStyle}
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
                disabled={disable}
              >
                {data.map((d: any) => {
                  return (
                    <MenuItem
                      key={d.id ? d.id : d.label}
                      value={sendId === true ? d.id : d.label}
                      // sx={styles.menuItemStyle}
                    >
                      {d.icon && (
                        <ListItemIcon>
                          <img
                            src={d.icon}
                            alt="country"
                            height={10}
                            width={10}
                          />
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
