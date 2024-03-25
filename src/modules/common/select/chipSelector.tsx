import { Box, Chip, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  fontWeight?: number;
  backgroundColor?: string;
  selectHeadingGridSpace?: number;
  selectFieldGridSpace?: number;
  disable?: boolean;
  placeHolder?: string;
}

export function ChipSelector({
  label,
  name,
  control,
  data,
  required,
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
  fontWeight,
  backgroundColor,
  selectFieldGridSpace,
  selectHeadingGridSpace,
  disable,
  placeHolder,
}: Props) {
  const { setValue } = useForm();

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
                        sx={{ backgroundColor: "#8a89fa", color: "#FFF" }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data.map((d, idx) => (
                  <MenuItem
                    key={d.id ? d.id : idx}
                    value={d.label}
                    // sx={styles.selectedStyle}
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
