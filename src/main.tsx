import { AppStateProvider, globalReducers, initialState } from "@/store";
import { ColorModeContextProvider } from "@modules/common/theme";
import { StyledEngineProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AppStateProvider reducer={globalReducers} initialState={initialState}>
          <ColorModeContextProvider>
            <App />
          </ColorModeContextProvider>
        </AppStateProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
);
