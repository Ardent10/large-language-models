import { useAppState } from "@/store";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomSnackbar } from "../snackbar";
import { ColorModeContext } from "../theme";
import { Footer } from "./footer";
import { Header } from "./header";

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  const { mode } = useContext(ColorModeContext);
  const [state] = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.userProfile?.id) {
      return navigate("/login");
    }
  }, [state?.userProfile?.uid]);

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

      <Box
        id="layout"
        className="flex flex-col h-full bg-no-repeat bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/bg.svg')" }}
      >
        <Header mode={mode} />

        <main className="flex-grow">{children}</main>
        <Footer />
      </Box>
    </>
  );
}
