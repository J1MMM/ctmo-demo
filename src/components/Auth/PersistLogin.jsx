import React, { useEffect, useState } from "react";
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
import loading_bg from "../../assets/images/loading-bg.jpg";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = UseRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={loading_bg}
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
          <Box
            width="100%"
            height="100vh"
            position="absolute"
            zIndex={1}
            sx={{ opacity: 0.8 }}
            bgcolor={"#080037"}
          />
          <Box
            height={"100vh"}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={2}
            boxSizing="border-box"
            zIndex={2}
          >
            <Typography
              color="secondary"
              textAlign="center"
              fontWeight={600}
              maxWidth={800}
              lineHeight={1.2}
              sx={{
                fontSize: {
                  xs: 30,
                  sm: 35,
                  md: 40,
                  lg: 48,
                },
                letterSpacing: {
                  md: "3px",
                },
              }}
            >
              TRICYCLE FRANCHISING AND RENEWAL SYSTEM
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                maxHeight: 250,
                maxWidth: 250,
              }}
            >
              <img
                className="glowingBorder"
                src={ctmo_logo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginTop: -30,
                }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              gap={1}
            >
              <Typography
                color="secondary"
                fontWeight="500"
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 20,
                    md: 22,
                  },
                }}
              >
                Loading please wait...
              </Typography>
              <LinearProgress
                sx={{
                  width: "100%",
                  maxWidth: 380,
                  bgcolor: "InactiveCaptionText",
                }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
