import { Button, Typography } from "@mui/material";
import React from "react";

const ContainedButton = ({ onClick, icon, title, disable }) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      disableFocusRipple
      disabled={disable}
      sx={{
        px: 2,
        py: 1,
      }}
    >
      {icon}
      {title}
    </Button>
  );
};

export default ContainedButton;
