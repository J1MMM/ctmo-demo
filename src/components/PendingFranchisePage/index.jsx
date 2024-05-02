import React, { memo, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useData from "../../hooks/useData";
import PendingFranchiseInfo from "./PendingFranchise.info";

import ContainedButton from "../common/ui/ContainedButton";
import DataTable from "../common/ui/DataTable";
import { Box, Button, Grow, Paper, Stack, Typography } from "@mui/material";
import helper from "../common/data/helper";

import TableToolbar from "../common/ui/TableToolbar";
import OutlinedButton from "../common/ui/OutlinedButton";
import FilterButton from "../common/ui/FilterButton";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../common/data/ROLES_LIST";

const PendingFranchiseTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    pendingFranchises,
    setPendingFranchises,
    pendingFranchisesLoading,
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
    let foundFranchise = pendingFranchises.find((v) => v.id == e.id);

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

  return (
    <Box sx={{ p: 3 }}>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Pending Franchises"
            description="Efficiently monitor franchise status and details"
            actionButtons={
              <>
                <FilterButton />
              </>
            }
          />
        )}
        columns={helper.clientsColumns}
        rows={pendingFranchises}
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
        loading={pendingFranchisesLoading}
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
      />
    </Box>
  );
};

export default PendingFranchiseTable;
