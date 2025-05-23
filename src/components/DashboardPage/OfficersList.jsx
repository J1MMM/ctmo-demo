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
      <Typography component={"span"} color="gray">
        No data found
      </Typography>
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
      <Typography component={"span"} color="primary">
        Loading...
      </Typography>
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
          label={`9 Total Officers`}
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
        rows={[
          {
            id: "67454f6d67bb975062b3ef16",
            callsign: "  729",
            firstname: "JERSON",
            lastname: "LANIC",
            mi: "",
            fullname: "JERSON LANIC",
            apprehended: 14,
          },
          {
            id: "66053017cadb1bd7a5d20c24",
            callsign: "302",
            lastname: "ZABALA",
            firstname: "JOEL",
            mi: "",
            apprehended: 11,
            fullname: "JOEL ZABALA",
          },
          {
            id: "66bc154321543bce5ded53fa",
            callsign: "001",
            firstname: "PNP",
            lastname: "SPC",
            mi: "",
            fullname: "PNP SPC",
            apprehended: 6,
            __v: 0,
          },
          {
            id: "66053017cadb1bd7a5d20c29",
            callsign: "636",
            lastname: "ARROGANCIA",
            firstname: "EMERSON",
            mi: "",
            apprehended: 6,
            fullname: "EMERSON ARROGANCIA",
          },
          {
            id: "6729bd057ec924f4d19a0afc",
            callsign: "732",
            firstname: "ROBERTO",
            lastname: "EVAL",
            mi: "",
            fullname: "ROBERTO EVAL",
            apprehended: 4,
            __v: 0,
          },
          {
            id: "66053017cadb1bd7a5d20c57",
            callsign: "635",
            lastname: "FELICIDARIO",
            firstname: "MIKEE",
            mi: "",
            apprehended: 3,
            fullname: "MIKEE FELICIDARIO",
          },
          {
            id: "66053017cadb1bd7a5d20c56",
            callsign: "658",
            lastname: "FRANCISCO",
            firstname: "HAZEL",
            mi: "",
            apprehended: 3,
            fullname: "HAZEL FRANCISCO",
          },
          {
            id: "67510cb9c39905830bb6ea38",
            callsign: "731",
            firstname: "ELLORD ANGELO ",
            lastname: "NACINO",
            mi: "",
            fullname: "ELLORD ANGELO  NACINO",
            apprehended: 2,
            __v: 0,
          },
          {
            id: "66bc0e3121543bce5ded46cb",
            callsign: "733",
            firstname: "JESRIEL",
            lastname: "GARCIA",
            mi: "",
            fullname: "JESRIEL GARCIA",
            apprehended: 0,
            __v: 0,
          },
        ]}
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
