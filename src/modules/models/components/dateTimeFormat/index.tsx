import { Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

interface props {
  format: string | undefined;
  dateTime: string | Date | undefined;
  fontSize?: number;
}

export const DateTimeFormat = ({ dateTime, format, fontSize }: props) => {
  return (
    <Typography fontSize={fontSize ? fontSize : 12} color={"#64c956"}>
      {format ? dayjs(dateTime).format(format) : dayjs().to(dayjs(dateTime))}
    </Typography>
  );
};
