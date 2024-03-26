import { Box, Chip, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

type data = {
  id?: number;
  label: string;
};

interface Props {
  data: data[];
  name: string;
  control: any;
  label: string;
  required: boolean;
  flexDirection?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  selectHeadingGridSpace?: number;
  disable?: boolean;
  placeholder?: string;
}

export function ChipSelector({
  label,
  name,
  control,
  data,
  required,
  flexDirection,
  fontSize,
  color,
  fontWeight,
  selectHeadingGridSpace,
  placeholder,
}: Props) {
  const { setValue } = useForm();
  const { mode } = useContext(ColorModeContext);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedChips>) => {
    const {
      target: { value },
    } = event;
    setSelectedChips(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setValue(name, value);
  };

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
            {label && (
              <Grid
                item
                xs={flexDirection === "row" ? selectHeadingGridSpace : 12}
              >
                <InputLabel
                  label={label}
                  required={required}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  color={color}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Select
                placeholder={placeholder}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  ".MuiOutlinedInput-notchedOutline": {
                    border:
                      mode === "dark" ? "1px solid white" : "1px solid black",
                  },
                }}
                fullWidth
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedChips}
                onBlur={onBlur}
                error={
                  error || (required && isTouched && !value) ? true : false
                }
                onChange={(e) => {
                  handleChange(e);
                  onChange(e.target.value);
                }}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip
                        key={value}
                        label={value}
                        sx={{ backgroundColor: "#93e560", color: "#FFF" }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data.map((d, idx) => (
                  <MenuItem
                    className="bg-green-600"
                    key={d.id ? d.id : idx}
                    value={d.label}
                  >
                    {d.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Error error={error} />
          </Grid>
        );
      }}
    />
  );
}
