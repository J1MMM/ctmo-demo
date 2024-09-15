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
import useAuth from "../../../hooks/useAuth";
import ROLES_LIST from "../../common/data/ROLES_LIST";
import ExportButton from "../../common/ui/ExportButton";
import useFranchises from "../../../api/useFranchises";

const ClientsTable = memo(() => {
  const axiosPrivate = useAxiosPrivate();
  const {
    franchises,
    setFranchises,
    franchisesLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    rowCount,
    setRowCount,
    filterModel,
    setFilterModel,
    setFranchisesLoading,
    sortModel,
    setSortModel,
  } = useData();

  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [initialFormInfo, setinitialFormInfo] = useState({});
  const [clientInfo, setClientInfo] = useState(false);
  const [addclient, setAddclient] = useState(false);

  const [paidViolations, setPaidViolations] = useState([]);
  const { auth } = useAuth();

  const admin = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.Admin));
  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));

  const handleRowDoubleClick = (e) => {
    setClientInfo(true);
    let foundFranchise = franchises.find((v) => v.id == e.id);
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

  function removeEmptyStrings(array) {
    const filteredArray = array.filter((item) => item.trim() !== "");

    return filteredArray;
  }

  const handleFilterChange = (model) => {
    setFilterModel(model);
    setPage(0); // Reset to first page on filter change
  };

  useEffect(() => {
    return () => {
      setFilterModel({ items: [] });
      setSortModel([]);
    };
  }, []);

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Clients Management"
            description="Efficiently monitor client status and details"
            actionButtons={
              <>
                {admin && <ExportButton />}
                <FilterButton />
                {admin || ctmo1 ? (
                  <ContainedButton
                    title="Add Client"
                    icon={<Add sx={{ color: "#FFF" }} />}
                    onClick={() => setAddclient(true)}
                  />
                ) : null}
              </>
            }
          />
        )}
        filterMode={"server"}
        paginationMode={"server"}
        sortingMode={"server"}
        columns={helper.clientsColumns}
        rows={franchises}
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        onCellDoubleClick={(e) => handleRowDoubleClick(e)}
        onFilterModelChange={(model) => handleFilterChange(model)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        // onStateChange={(e) =>
        //   setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        // }
        loading={franchisesLoading}
        getRowClassName={getRowClassName}
      />

      <ClientInfo
        open={clientInfo}
        onClose={setClientInfo}
        franchiseDetails={franchiseDetails}
        setFranchiseDetails={setFranchiseDetails}
        initialFormInfo={initialFormInfo}
        setinitialFormInfo={setinitialFormInfo}
        paidViolations={paidViolations}
        printable
      />

      <AddFranchiseForm open={addclient} onClose={setAddclient} />
    </>
  );
});

export default ClientsTable;
