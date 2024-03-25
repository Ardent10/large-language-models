import { CustomSnackbar } from "@/modules/common/snackbar";
import { VideoPlayer } from "@/modules/common/videoPlayer";
import { useAppState } from "@/store";
import { Box, Button, Grid, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/signupForm";

export function SignupPage() {
  const [state, dispatch] = useAppState();
  return (
    <>
      <CustomSnackbar
        open={state.toggleSnackbar.open}
        severity={
          state.toggleSnackbar.severity == "success" ? "success" : "error"
        }
        message={state.toggleSnackbar.message}
        vertical="bottom"
        horizontal="right"
      />
      <Box className="md:hidden">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </Box>
      <Grid container className="h-screen">
        <Link
          to="/login"
          className={
            "rounded-md absolute right-4 top-4 md:right-8 md:top-8  border-black hover:bg-black  dark:hover:bg-[#40be35f7] border dark:border-green-600"
          }
        >
          <Button
            className="text-black text-sm capitalize dark:text-green-700  hover:text-white"
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Link>
        <Grid item xs={6}>
          <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
            <div className="absolute inset-0" />
            <VideoPlayer
              videoSrc="/assets/login/matrix.mp4"
              poster="https://static.vecteezy.com/system/resources/thumbnails/009/657/336/original/streaming-data-flux-loop-free-video.jpg"
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Large Language Models Inc
            </div>
          </div>
        </Grid>
        <Grid item container xs={6} p={16} className="h-full">
          <Grid
            item
            xs={12}
            py={2}
            className="flex flex-col items-center justify-center"
          >
            <Typography
              variant="h1"
              className="text-6xl font-bold dark:text-[#47f738]"
            >
              Create an account
            </Typography>
            <Typography variant="body2" className="text-sm text-center">
              Enter your email and a password below to create your account
            </Typography>
          </Grid>
          <Grid item xs={12} px={4}>
            <SignupForm />
          </Grid>
          <Grid item xs={12}>
            <p className="px-8 text-center text-sm text-green-600">
              By clicking signup, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}