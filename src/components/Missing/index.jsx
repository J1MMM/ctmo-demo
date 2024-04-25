import { Box, Button, Grow, Typography } from "@mui/material";
import React from "react";
import img404 from "../../assets/images/404.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRightAlt } from "@mui/icons-material";

const Missing = () => {
  document.title = "Page 404";
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
            404 Error
          </Typography>
          <Typography variant="h2" fontWeight={500}>
            Page not found
          </Typography>
          <Typography variant="body1" color={"#3F3D56"} mt={1}>
            Sorry, the page you are looking for could not be found or has been
            removed
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
        <img src={img404} style={{ maxWidth: "30rem" }} />
      </Box>
    </Grow>
  );
};

export default Missing;
