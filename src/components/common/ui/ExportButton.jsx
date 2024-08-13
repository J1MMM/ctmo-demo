import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";

export default function ExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        sx={{
          px: 2,
          py: 1,
          border: "1px solid #1A237E",
        }}
      />
    </GridToolbarContainer>
  );
}
