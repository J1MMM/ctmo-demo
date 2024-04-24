import { FilterList, ViewColumn } from "@mui/icons-material";
import { Badge, Button } from "@mui/material";
import React from "react";

export default function OutlinedButton({ title, icon, onClick }) {
  return (
    <Button
      startIcon={icon}
      disableFocusRipple
      variant="outlined"
      size="small"
      sx={{
        px: 2,
        py: 1,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
