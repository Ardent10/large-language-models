import { Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { Error } from "../error";
import { ColorModeContext } from "../theme";
import { InputLabel } from "./inputLabel";

interface props {
  name: string;
  type: string;
  placeholder?: string;
  direction?: "row" | "column";
  disable?: boolean;
  control?: any;
  required?: boolean;
  inputHeadingType?: string;
  label?: string;
  inputHeadingLabelFontWeight?: number;
  inputHeadingLabelFontSize?: number;
  inputHeadingLabelColor?: string;
  inputTextPaddingLeft?: string;
  inputHeadingGridSpace?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  inputFieldGridSpace?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  leftMarginToInputField?: string;
  onChange?: any;
  rest?: any;
  forgetPasswordLink?: boolean;
  maxDate?: Date | string;
  minDate?: Date | string;
  inputFieldPadding?: string | number;
  className?: string;
}

export const InputField = ({
  name,
  type,
  placeholder,
  direction,
  disable,
  control,
  required,
  inputHeadingType,
  label,
  inputHeadingLabelFontWeight,
  inputHeadingLabelFontSize,
  inputHeadingLabelColor,
  inputTextPaddingLeft,
  inputHeadingGridSpace,
  inputFieldGridSpace,
  leftMarginToInputField,
  rest,
  forgetPasswordLink,
  maxDate,
  minDate,
  className,
}: props) => {
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
          <Grid
            container
            direction={direction}
            alignItems={direction === "row" ? "center" : ""}
          >
            <InputLabel
              label={label}
              forgetPasswordLink={forgetPasswordLink}
              required={required}
              fontWeight={
                inputHeadingLabelFontWeight ? inputHeadingLabelFontWeight : 600
              }
              fontSize={
                inputHeadingLabelFontSize ? inputHeadingLabelFontSize : 16
              }
              color={
                inputHeadingLabelColor ? inputHeadingLabelColor : "#8a89fa"
              }
            />

            <Grid item xs={direction === "row" ? inputFieldGridSpace : 12}>
              <TextField
                sx={{
                  borderRadius: "5px",
                  ".MuiOutlinedInput-notchedOutline": {
                    border:
                      mode === "dark" ? "1px solid white" : "1px solid black",
                  },
                }}
                type={type}
                placeholder={placeholder}
                fullWidth={true}
                InputLabelProps={{
                  shrink: false,
                }}
                disabled={disable}
                size="small"
                error={
                  error || (required && isTouched && !value) ? true : false
                }
                value={value}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
                inputProps={{
                  max: maxDate ? maxDate : undefined,
                  min: minDate ? minDate : undefined,
                }}
                onKeyDown={(e) => (type === "date" ? e.preventDefault() : {})}
                {...rest}
              />
            </Grid>
            <Error error={error} />
          </Grid>
        );
      }}
    />
  );
};
