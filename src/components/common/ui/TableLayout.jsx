import { Box, Grow, Paper, Typography } from "@mui/material";
import React from "react";

const TableLayout = ({ title, subTitle, button, children }) => {
  return (
    <Grow in>
      <Paper
        elevation={0}
        sx={{
          p: 0,
          borderRadius: 3,
          minHeight: "calc(100vh-80px)",
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          bgcolor="#FFF"
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
              {subTitle}
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ mb: { xs: 2, sm: 2, md: 0 } }}
          >
            {button}
          </Box>
        </Box>
        <Box display="flex" gap={3} flexWrap="wrap">
          {children}
        </Box>
      </Paper>
    </Grow>
  );
};

export default TableLayout;
