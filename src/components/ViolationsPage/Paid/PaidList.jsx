import { Box, Button, Divider, Grow, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import DataTable from "../../common/ui/DataTable";
import helper from "../../common/data/helper";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";
import PaymentViolationsInfo from "../Violations/PaymentViolationInfo";
import Vhelper from "../Violations/Vhelper";

const PaidTable = () => {
  document.title = "Paid List | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
  const axiosPrivate = useAxiosPrivate();
  const { paidList, violationsList } = useData();

  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");

  const [noResponse, setNoResponse] = useState(false);
  const [clientInfo, setClientInfo] = useState(false);
  const [initialViolationsInfo, setinitialViolationsInfo] = useState(
    Vhelper.initialDetails
  );
  const [violationsInfo, setViolationsInfo] = useState(Vhelper.initialDetails);
  const [violationsInfoShown, setViolationsInfoShown] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleDoubleClick = (e) => {
    let foundviolations = paidList.find((v) => v._id == e.id);

    if (violationsList.length > 0) {
      foundviolations.violation = foundviolations.violation?.map((item1) => {
        const foundObject = violationsList?.find(
          (item2) => item2?._id === item1?._id
        );
        return foundObject;
      });
    }

    setViolationsInfoShown(true);
    setViolationsInfo(foundviolations);
    setinitialViolationsInfo(foundviolations);
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Paid List"
            description="Manage all paid clients efficiently"
            actionButtons={
              <>
                <FilterButton />
              </>
            }
          />
        )}
        columns={helper.paidListColumn}
        rows={paidList.map((data) => ({ ...data, id: data._id }))}
        rowCount={totalRows}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        page={page}
        pageSize={pageSize}
        onCellDoubleClick={handleDoubleClick}
      />

      <PaymentViolationsInfo
        paid={true}
        open={violationsInfoShown}
        onClose={setViolationsInfoShown}
        initialViolationDetails={initialViolationsInfo}
        violationDetails={violationsInfo}
        setViolationDetails={setViolationsInfo}
      />
    </>
  );
};

export default PaidTable;
