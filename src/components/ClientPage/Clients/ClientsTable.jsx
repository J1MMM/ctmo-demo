import { Add, Filter, FilterAlt, FilterList } from "@mui/icons-material";
import React, { memo, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ClientInfo from "./ClientInfo";
import TableLayout from "../../common/ui/TableLayout";

import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddFranchiseForm from "./AddFranchiseForm";
import { Box, Button, Grow, Stack, Typography } from "@mui/material";
import helper from "../../common/data/helper";
import {
  GridPreferencePanelsValue,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  gridPreferencePanelStateSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import TableToolbar from "../../common/ui/TableToolbar";
import OutlinedButton from "../../common/ui/OutlinedButton";
import FilterButton from "../../common/ui/FilterButton";

const ClientsTable = memo(() => {
  const axiosPrivate = useAxiosPrivate();
  const { franchises, setFranchises, franchisesLoading } = useData();
  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [initialFormInfo, setinitialFormInfo] = useState({});
  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);
  const [paidViolations, setPaidViolations] = useState([]);

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    let foundFranchise = franchises.find((v) => v.id == e.id);

    setFranchiseDetails(foundFranchise);
    setinitialFormInfo(foundFranchise);

    const violations = foundFranchise.complaint;
    let paidviolations = foundFranchise.paidViolations;
    const result = helper.removeOneItemPerMatch(violations, paidviolations);
    console.log("result");
    console.log(violations);
    console.log(paidViolations);
    console.log(result);
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
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Clients Management"
            description="Efficiently monitor client status and details"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="Add Client"
                  icon={<Add sx={{ color: "#FFF" }} />}
                  onClick={() => setAddclient(true)}
                />
              </>
            }
          />
        )}
        columns={helper.clientsColumns}
        rows={franchises}
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
        loading={franchisesLoading}
        getRowClassName={getRowClassName}
      />

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        setFranchiseDetails={setFranchiseDetails}
        initialFormInfo={initialFormInfo}
        paidViolations={paidViolations}
        printable
      />

      <AddFranchiseForm open={addclient} onClose={setAddclient} />
    </>
  );
});

export default ClientsTable;
