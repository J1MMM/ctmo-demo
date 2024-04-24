import { Box } from "@mui/material";
import React from "react";

function Fieldset({ legend, children }) {
  return (
    <Box
      component={"fieldset"}
      sx={{
        border: "1px solid #1A237E",
        borderRadius: 2,
        mt: 2,
      }}
    >
      <legend style={{ color: "#1A237E" }}>{legend}</legend>
      {children}
    </Box>
  );
}

export default Fieldset;
