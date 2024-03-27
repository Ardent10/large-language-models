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


      <Grid container className="h-screen md:visible">
        <PrimaryButton
          onClick={() => navigate("/login")}
          variant={mode == "dark" ? "outlined" : "contained"}
          className="shadow-[0_2px_10px] w-auto absolute top-8 right-8 light:text-black light:bg-transparent text-sm capitalize dark:text-white dark:hover:text-white"
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
        <Grid
          item
          container
          xs={12}
          md={6}
          className="h-full sm:p-8 lg:p-32"
          sx={{
            backgroundImage: { xs: "url(/assets/matrix-bg.webp)", md: "none" },
            border: "1px solid green",
          }}
        >
          <Grid
            item
            xs={12}
            className="flex flex-col items-center justify-center"
          >
            <Typography
              variant="h1"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold dark:text-[#47f738]"
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" className="text-sm text-center">
              It's time to take the pill and see how deep the rabbit hole goes.
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
