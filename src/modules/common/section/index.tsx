import { Box, Typography } from "@mui/material";

export function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Box
      id="custom-section"
      className="shadow min-h-screen flex flex-col justify-center items-center px-8 sm:px-16  lg:px-16 xl:px-20 py-12 "
    >
      <Box className="bg-[#171717] border border-green-600 w-full h-full rounded-xl pt-8 sm:p-12  md:p-8 lg:p-12 xl:p-16">
      <Typography className="text-4xl font-bold text-center text-green-600 capitalize">
        {title}
      </Typography>
        {children}
      </Box>
    </Box>
  );
}
