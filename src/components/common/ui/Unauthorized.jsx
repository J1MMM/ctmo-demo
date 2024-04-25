import { Box, Grow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import unauthorizedImg from "../../../assets/images/403.svg";
import { ArrowRight, ArrowRightAlt } from "@mui/icons-material";

const Unauthorized = () => {
  document.title = "Unauthorized";

  const navigate = useNavigate();
  return (
    <Grow in={true}>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={5}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          },
        }}
      >
        <Box maxWidth={500}>
          <Typography color="#6C63FF" fontWeight={"bold"} variant="h5">
            403 Error
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            Access forbidden
          </Typography>
          <Typography variant="body1" color={"#3F3D56"} mt={1}>
            You tired to access a page you did not have prior authorize for
          </Typography>

          <NavLink
            to="/"
            style={{
              color: "primary",
              display: "block",
              marginTop: "24px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            <Box display="flex" alignItems="center" color="#6C63FF">
              Go back <ArrowRightAlt />
            </Box>
          </NavLink>
        </Box>
        <img src={unauthorizedImg} style={{ maxWidth: "30rem" }} />
      </Box>
    </Grow>
  );
};

export default Unauthorized;
