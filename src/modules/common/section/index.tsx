import { Box } from "@mui/material";

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <Box className="shadow  h-screen flex flex-col justify-center items-center px-16 md:px-8 lg:px-16 xl:px-20 py-12 ">
      <Box className="bg-[#171717] border border-green-600 w-full h-full rounded-xl sm:p-12  md:p-8 lg:p-12 xl:p-16">
        {children}
      </Box>
    </Box>
  );
}
