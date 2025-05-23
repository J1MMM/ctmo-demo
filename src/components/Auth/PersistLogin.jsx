import React, { Suspense, useEffect, useState } from "react";
import UseRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import ctmo_logo from "../../assets/images/logo2.png";
import loading_bg from "../../assets/images/loading-bg.webp";
import { useTimeout } from "@mui/x-data-grid/internals";
import LoadingScreen from "./LoadingScreen";

const PersistLogin = () => {
  const refresh = UseRefreshToken();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fn();
  });

  return (
    <>
      <Typography
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 999,
          borderRadius: "8px",
        }}
        fontSize={24}
        padding={"8px 16px"}
        bgcolor={"#000"}
        color={"red"}
      >
        Demo Mode
      </Typography>{" "}
      {isLoading ? <LoadingScreen /> : <Outlet />}
    </>
  );
};

export default PersistLogin;
