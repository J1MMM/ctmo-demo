import { Box } from "@mui/material";
import React from "react";

export default function BorderBox({ children, sx }) {
  return (
    <Box
      sx={{
        position: "relative",
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse",

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
