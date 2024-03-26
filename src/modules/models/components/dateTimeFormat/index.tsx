import { Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

interface props {
  format: string;
  dateTime: string;
  fontSize?: number;
}

export const DateTimeFormat = ({ dateTime, format, fontSize }: props) => {
  return (
    <Typography fontSize={fontSize ? fontSize : 12}>
      {dayjs().to(dayjs(dateTime))}
      {/* {dayjs(dateTime).format(format)} */}
    </Typography>
  );
};
