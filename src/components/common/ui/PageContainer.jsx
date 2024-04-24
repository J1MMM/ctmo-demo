import { Box, Paper } from "@mui/material";
import React from "react";

const PageContainer = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        minHeight: "80vh",
      }}
    >
      <Box
        bgcolor="#fff"
        display="flex"
        justifyContent="space-between"
        pb={1}
        boxSizing="border-box"
        zIndex="99"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
          mb: {
            xs: 0,
            sm: 0,
            md: 2,
          },
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={2} width={"100%"}>
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default PageContainer;
