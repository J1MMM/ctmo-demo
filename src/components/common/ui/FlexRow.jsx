import { Box } from "@mui/material";
import React from "react";

const FlexRow = ({ children }) => {
  return (
    <Box
      display="flex"
      gap={1}
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FlexRow;
