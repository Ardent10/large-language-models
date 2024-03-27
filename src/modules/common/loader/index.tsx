import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const breathingAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface LoaderProps {
  componentLoader?: boolean;
}

export function Loader({ componentLoader }: LoaderProps) {
  return (
    <Box
      width="100%"
      minHeight={componentLoader ? "100%" : "0"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position={componentLoader ? "sticky" : "fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          animation: `${breathingAnimation} 1.5s infinite`,
          overflow: "hidden",
        }}
      >
        <img src="/assets/logo.png" height={50} alt="llm" />
        <Box
          width="100%"
          marginTop={1}
          sx={{
            backgroundColor: "#a2ee63",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <LinearProgress
            variant="indeterminate"
            sx={{
              ".MuiLinearProgress-bar": { backgroundColor: "#FFFF" },
              ".css-8rzi15-MuiLinearProgress-root": {
                backgroundColor: "#64c956",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
