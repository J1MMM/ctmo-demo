import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import ContainedButton from "../common/ui/ContainedButton";
import DataTable from "../common/ui/DataTable";
import helper from "../common/data/helper";
import TableToolbar from "../common/ui/TableToolbar";
import FilterButton from "../common/ui/FilterButton";
import {
  DataGrid,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import emptyImg from "../../assets/images/empty.svg";

const initialDetails = {
  callsign: "",
  firstname: "",
  lastname: "",
  mi: "",
  apprehended: "",
};

const EmptyRowsOverlay = () => (
  <GridOverlay>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <img src={emptyImg} alt="" style={{ width: "100%", maxWidth: 100 }} />
      <Typography color="gray">No data found</Typography>
    </Box>
  </GridOverlay>
);

const LoadingComp = () => (
  <GridOverlay sx={{ bgcolor: "#f5f5f5" }}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Typography color="primary">Loading...</Typography>
      <LinearProgress sx={{ width: 200 }} />
    </Box>
  </GridOverlay>
);

const OfficersTable = () => {
  const { officers, officersLoading } = useData();
  const [officerInfo, setOfficerInfo] = useState(initialDetails);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [officerInfoShown, setOfficerInfoShown] = useState(false);
  const [addOfficerFormShown, setAddOfficerFormShown] = useState(false);

  const Toolbar = () => (
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
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Typography component={"span"} variant="h6">
          Apprehending Officers
        </Typography>
        <Chip
          label={`${officers.length} Total Officers`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      <GridToolbarContainer>
        <GridToolbarFilterButton
          sx={{
            px: 1,
            border: "1px solid #1A237E",
          }}
        />
      </GridToolbarContainer>
    </Box>
  );

  return (
    <>
      <DataGrid
        columns={helper.officersDashboardColumn}
        rows={officers.map((data) => ({ ...data, id: data._id }))}
        rowCount={totalRows}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        paginationModel={{ page: page, pageSize: pageSize }}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        loading={officersLoading}
        disableRowSelectionOnClick
        showCellVerticalBorder
        sx={{
          boxSizing: "border-box",
          ".data-grid-header": {
            bgcolor: "#1A237E",
            color: "#FFF",
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "&.MuiDataGrid-root": {
              border: "none",
              color: "#FFF",
            },
            ".MuiIconButton-sizeSmall": {
              color: "#FFF",
            },
          },
          border: "none",
        }}
        slots={{
          noRowsOverlay: EmptyRowsOverlay,
          loadingOverlay: LoadingComp,
          toolbar: Toolbar,
        }}
        slotProps={{
          panel: { placement: "bottom-end" },
        }}
      />
    </>
  );
};

export default OfficersTable;
