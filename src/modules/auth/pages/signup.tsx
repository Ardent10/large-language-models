import { PrimaryButton } from "@/modules/common/button";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { VideoPlayer } from "@/modules/common/videoPlayer";
import { useAppState } from "@/store";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SignupForm } from "../components/signupForm";
import { useContext } from "react";
import { ColorModeContext } from "@/modules/common/theme";
import { Logo } from "@/modules/common/layout/logo";

export function SignupPage() {
  const { mode } = useContext(ColorModeContext);
  const [state, dispatch] = useAppState();
  const navigate = useNavigate();
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
        <PrimaryButton
          onClick={() => navigate("/login")}
          variant={mode == "dark" ? "outlined" : "contained"}
          className="w-auto absolute top-8 right-8 light:text-black light:bg-transparent text-sm capitalize dark:text-white dark:hover:text-white"
          endIcon={<LoginIcon />}
          title="Login"
        />
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: "url(/assets/matrix-bg.webp)",
            border: "1px solid green",
          }}
        >
          <div className="absolute z-20 top-8 left-8 flex items-center ">
            <Logo />
          </div>
        </Grid>
        <Grid item container xs={6} p={16} className="h-full">
          <Grid
            item
            xs={12}
            py={2}
            className="flex flex-col items-center justify-center"
          >
            <Typography variant="h1" className="text-6xl font-bold">
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
                className="underline underline-offset-4 hover:text-primary "
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
