import { Box, Grow, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const OverviewCard = ({ index, data }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100 * index);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <Grow in={show}>
      <Paper
        className="dashboard-card"
        elevation={3}
        sx={{
          borderRadius: 2,
          width: "100%",
          minWidth: "230px",
          minHeight: "170px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: index == 0 ? "primary.main" : "#FFF",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          zIndex="5"
        >
          <Box display="flex" alignItems="center">
            <Typography
              component={"span"}
              variant="h6"
              fontSize="medium"
              color={index == 0 ? "#FFF" : "InactiveCaptionText"}
            >
              {data.title}
            </Typography>
          </Box>
          <Box
            bgcolor={index == 0 ? "rgba(225,225,225,.3)" : "#ECEDFC"}
            borderRadius={100}
            width={40}
            height={40}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {data.icon}
          </Box>
        </Box>
        <Typography
          component={"span"}
          variant="h4"
          fontWeight="500"
          sx={{ mt: { xs: 0, sm: 2 } }}
          color={index == 0 ? "#FFF" : "#000"}
        >
          {data.data}
        </Typography>
        <Typography
          component={"span"}
          variant="caption"
          mt={"auto"}
          color={index == 0 ? "#FFF" : "InactiveCaptionText"}
        >
          {data.subText}
        </Typography>
      </Paper>
    </Grow>
  );
};

export default OverviewCard;
