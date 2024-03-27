import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <Box id="logo" className="flex items-center w-full">
        <img src="/assets/logo.png" height={40} width={40} />
        <Typography
          variant="h5"
          fontWeight={600}
          className="w-full"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          Large Language Models (LLM)
        </Typography>
      </Box>
    </Link>
  );
}
