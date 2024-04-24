import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { DataProvider } from "./context/DataProvider.jsx";
import logs from "./components/common/data/logs.js";
// console.log(logs.name, logs.style);
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Poppins, sans-serif",
    },
  },
  palette: {
    primary: {
      main: "#1A237E",
      light: "#FFD500",
    },
    secondary: {
      main: "#FFF",
      light: "#FFF",
    },

    common: {
      main: "#FFF",
    },
  },

  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       padding: "12px",
    //       borderRadius: "8px",
    //     },
    //     contained: {
    //       fontWeight: "bold",
    //     },
    //     sizeSmall: {
    //       padding: "8px",
    //     },
    //   },
    // },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  </ThemeProvider>
);
