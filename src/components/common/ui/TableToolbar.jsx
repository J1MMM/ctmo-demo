import { Box, Typography } from "@mui/material";
import React from "react";

export default function TableToolbar({ title, description, actionButtons }) {
  return (
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
          md: 0,
        },
      }}
    >
      <Box sx={{ mb: { xs: 1, sm: 1, md: 0 } }}>
        <Box display="flex" alignItems="center" gap={1} mb={-0.5}>
          <Typography component={"span"} variant="h5">
            {title}
          </Typography>
        </Box>
        <Typography
          component={"span"}
          variant="caption"
          color="InactiveCaptionText"
        >
          {description}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ mb: { xs: 2, sm: 2, md: 0 } }}
      >
        {actionButtons}
      </Box>
    </Box>
  );
}
