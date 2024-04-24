import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import ContainedButton from "../../common/ui/ContainedButton";
import DataTable from "../../common/ui/DataTable";
import AddViolators from "./AddViolatorForm";
import helper from "../../common/data/helper";
import Vhelper from "./Vhelper";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";
import ROLES_LIST from "../../common/data/ROLES_LIST";
import ViolationModal from "./ViolationModal";
import useAuth from "../../../hooks/useAuth";

const ViolationsTable = () => {
  document.title =
    "Violators Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const { auth } = useAuth();
  const { violations, violationsLoading, violationsList } = useData();
  const [addViolatorOpen, setAddViolatorOpen] = useState(false);
  const [vioModalShown, setVioModalShown] = useState(false);
  useState(false);
  const [violationDetails, setViolationsDetails] = useState(
    Vhelper.initialDetails
  );
  const [initialViolationDetails, setInitialViolationsDetails] = useState(
    Vhelper.initialDetails
  );
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRows, setTotalRows] = useState(0);

  const handleDoubleClick = (e) => {
    let foundviolations = violations.find((v) => v._id == e.id);

    if (violationsList.length > 0) {
      foundviolations.violation = foundviolations.violation?.map((item1) => {
        const foundObject = violationsList?.find(
          (item2) => item2?._id === item1?._id
        );
        return foundObject;
      });
    }

    setVioModalShown(true);
    setViolationsDetails(foundviolations);
    setInitialViolationsDetails(foundviolations);
  };

  const paymentBtnClick = () => {
    console.log("click");
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Violators"
            description="Record of violations committed"
            actionButtons={
              <>
                <FilterButton />
                {auth.roles[0] !== ROLES_LIST.Cashier && (
                  <ContainedButton
                    title="add violator"
                    icon={<Add sx={{ color: "#FFF" }} />}
                    onClick={() => setAddViolatorOpen(true)}
                  />
                )}
              </>
            }
          />
        )}
        columns={helper.violationsTableColumns}
        rows={violations.map((data) => ({ ...data, id: data._id }))}
        rowCount={totalRows}
        onFilterModelChange={() => setPage(0)}
        onPaginationModelChange={(e) => {
          setPage(e.page);
          setPageSize(e.pageSize);
        }}
        onCellDoubleClick={handleDoubleClick}
        onStateChange={(e) =>
          setTotalRows(helper.countTrueValues(e?.visibleRowsLookup))
        }
        loading={violationsLoading}
        page={page}
        pageSize={pageSize}
      />

      <AddViolators open={addViolatorOpen} onClose={setAddViolatorOpen} />

      <ViolationModal
        open={vioModalShown}
        onClose={setVioModalShown}
        violationDetails={violationDetails}
        setViolationDetails={setViolationsDetails}
        initialViolationDetails={initialViolationDetails}
      />
    </>
  );
};

export default ViolationsTable;
