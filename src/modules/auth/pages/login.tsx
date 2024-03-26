import { PrimaryButton } from "@/modules/common/button";
import { Logo } from "@/modules/common/layout/logo";
import { CustomSnackbar } from "@/modules/common/snackbar";
import { ColorModeContext } from "@/modules/common/theme";
import { useAppState } from "@/store";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/loginForm";

export function LoginPage() {
  const [state, dispatch] = useAppState();
  const { mode } = useContext(ColorModeContext);
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
          onClick={() => navigate("/signup")}
          variant={mode == "dark" ? "outlined" : "contained"}
          className="w-auto absolute top-8 right-8 light:text-black light:bg-transparent text-sm capitalize dark:text-white dark:hover:text-white"
          endIcon={<PersonAddAltRoundedIcon />}
          title="Sign Up"
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
            className="flex flex-col items-center justify-center"
          >
            <Typography
              variant="h1"
              className="text-6xl font-bold dark:text-[#47f738]"
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" className="text-sm text-center">
              It's time to take the pill and see how deep the rabbit hole goes.
            </Typography>
          </Grid>
          <Grid item xs={12} px={8}>
            <LoginForm />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
