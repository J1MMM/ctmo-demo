import { Box, Grow, Typography } from "@mui/material";
import React from "react";
import emptyImage from "../../../assets/images/empty.svg";
const Empty = ({ message }) => {
  return (
    <Grow in={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
        margin={5}
        boxSizing="border-box"
        height="55vh"
      >
        <img
          src={emptyImage}
          style={{
            width: "100%",
            maxWidth: "8rem",
          }}
        />
        <Typography
          component={"span"}
          variant="h6"
          textAlign="center"
          color="#2F2E41"
        >
          {message}
        </Typography>
      </Box>
    </Grow>
  );
};

export default Empty;
