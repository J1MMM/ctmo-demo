import React, { memo, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useData from "../../hooks/useData";
import PendingFranchiseInfo from "./PendingFranchise.info";

import ContainedButton from "../common/ui/ContainedButton";
import DataTable from "../common/ui/DataTable";
import {
  Box,
  Button,
  Chip,
  Grow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import helper from "../common/data/helper";

import TableToolbar from "../common/ui/TableToolbar";
import OutlinedButton from "../common/ui/OutlinedButton";
import FilterButton from "../common/ui/FilterButton";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../common/data/ROLES_LIST";

const PendingFranchisePaid = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    pendingFranchisesPaid,
    setPendingFranchises,
    pendingFranchisesPaidLoading,
    setPendingFranchisesLoading,
  } = useData();

  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [initialFormInfo, setinitialFormInfo] = useState({});
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);
  const [paidViolations, setPaidViolations] = useState([]);
  const { auth } = useAuth();

  const admin = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.Admin));
  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    let foundFranchise = pendingFranchisesPaid.find((v) => v.id == e.id);

    setFranchiseDetails(foundFranchise);
    setinitialFormInfo(foundFranchise);

    const violations = foundFranchise.complaint;
    let paidviolations = foundFranchise.paidViolations;
    const result = helper.removeOneItemPerMatch(violations, paidviolations);

    setPaidViolations(result);
  };

  const getRowClassName = (params) => {
    const nonEmptyLength = params.row.complaint?.filter(
      (str) => str?.trim() !== ""
    )?.length;
    if (nonEmptyLength >= 4) {
      return "colored-row";
    }
    return ""; // Return an empty string for rows without highlighting
  };

  const refNoCol = {
    field: "refNo",
    headerName: "Ref No.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  };
  const transactionCol = {
    field: "transaction",
    headerName: "TRANSACTION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params, i) => {
      const bgcolor =
        params.value == "New Franchise"
          ? "#7E57C2"
          : params.value == "Transfer Franchise"
          ? "#02B2AF"
          : "#409AE9";
      return (
        params.value && (
          <Chip label={params.value} sx={{ bgcolor: bgcolor, color: "#FFF" }} />
        )
      );
    },
  };

  return (
    <Box>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Paid List"
            description="collection of franchises that have already been paid."
            actionButtons={
              <>
                <FilterButton />
              </>
            }
          />
        )}
        columns={[refNoCol, transactionCol, ...helper.clientsColumns]}
        rows={pendingFranchisesPaid}
        rowCount={totalRows}
        page={page}
        pageSize={pageSize}
        onCellDoubleClick={(e) => handleRowDoubleClick(e)}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        loading={pendingFranchisesPaidLoading}
        getRowClassName={getRowClassName}
      />

      <PendingFranchiseInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        setFranchiseDetails={setFranchiseDetails}
        initialFormInfo={initialFormInfo}
        paidViolations={paidViolations}
        printable
        paid={true}
      />
    </Box>
  );
};

export default PendingFranchisePaid;
