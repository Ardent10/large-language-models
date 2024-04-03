import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import * as React from "react";

interface ChipData {
  key: number | string;
  label: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

interface Props {
  // To use when object is passed
  key?: number | string;
  label?: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  // To use when array is passed
  chipsArray?: (ChipData | string)[];
  onDelete?: boolean;
}

const convertToChipData = (array: (ChipData | string)[]): ChipData[] => {
  return array.map((item, index) => {
    if (typeof item === "string") {
      return { key: index, label: item };
    } else {
      return item;
    }
  });
};

export function Chips(props: Props) {
  const [chipData, setChipData] = React.useState<ChipData[]>([]);

  React.useEffect(() => {
    if (props.chipsArray) {
      setChipData(convertToChipData(props.chipsArray));
    }
  }, [props.chipsArray]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        m: 0,
        p: 0,
        bgcolor: "transparent",
      }}
      component="ul"
      elevation={0}
    >
      {chipData.length > 0 ? (
        chipData.map((data, id) => {
          return (
            <Chip
              clickable
              sx={{ margin: 0.5, backgroundColor: "#64c956", color: "#FFF" }}
              key={data?.key ? data?.key : id}
              icon={data?.icon}
              label={data?.label}
              onDelete={props.onDelete ? handleDelete(data) : undefined}
            />
          );
        })
      ) : (
        <Chip
          clickable
          sx={{ margin: 0.5, backgroundColor: "#64c956", color: "#FFF" }}
          key={props?.key}
          icon={props?.icon}
          label={props?.label}
        />
      )}
    </Paper>
  );
}
