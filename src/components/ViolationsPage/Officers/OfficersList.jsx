import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useData from "../../../hooks/useData";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddOfficer from "./AddOfficer";
import helper from "../../common/data/helper";
import OfficerInfo from "./OfficerInfo";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";

const initialDetails = {
  callsign: "",
  firstname: "",
  lastname: "",
  mi: "",
  apprehended: "",
};

const OfficersTable = () => {
  document.title = "Officers List | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const { officers, officersLoading } = useData();
  const [officerInfo, setOfficerInfo] = useState(initialDetails);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [officerInfoShown, setOfficerInfoShown] = useState(false);
  const [addOfficerFormShown, setAddOfficerFormShown] = useState(false);

  const handleDoubleClick = (e) => {
    const foundOfficer = officers.find((v) => v._id == e.id);
    console.log(foundOfficer);
    setOfficerInfo(foundOfficer);
    setOfficerInfoShown(true);
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Officers List"
            description="Manage CTMO Officers"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="Add Officer"
                  onClick={() => setAddOfficerFormShown(true)}
                  icon={<Add sx={{ color: "#FFF" }} />}
                />
              </>
            }
          />
        )}
        columns={helper.officersTableColumn}
        rows={officers.map((data) => ({ ...data, id: data._id }))}
        rowCount={totalRows}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        loading={officersLoading}
        page={page}
        pageSize={pageSize}
        onCellDoubleClick={handleDoubleClick}
      />

      <AddOfficer open={addOfficerFormShown} onClose={setAddOfficerFormShown} />
      <OfficerInfo
        open={officerInfoShown}
        onClose={setOfficerInfoShown}
        officerInfo={officerInfo}
        setOfficerInfo={setOfficerInfo}
      />
    </>
  );
};

export default OfficersTable;
