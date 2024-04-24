import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useData from "../../../hooks/useData";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TableLayout from "../../common/ui/TableLayout";
import ContainedButton from "../../common/ui/ContainedButton";
import helper from "../../common/data/helper";
import DataTable from "../../common/ui/DataTable";
import TableToolbar from "../../common/ui/TableToolbar";
import FilterButton from "../../common/ui/FilterButton";
import tctHelper from "./tctHelper";
import TCTInfo from "./TCTInfo";
import AddTCT from "./AddTCT";

const ReleasedtctTable = () => {
  document.title = "Released TCT | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";

  const { tickets, ticketLoading } = useData();
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [resMsg, setResMsg] = useState("");
  const [releasedTCTInfo, setReleasedTCTInfo] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(
    tctHelper.initialTicketDetails
  );

  const handleDoubleClick = (e) => {
    const foundData = tickets.find((v) => v._id == e.id);
    console.log(foundData);
    setTicketDetails(foundData);
    setEditModalShow(true);
  };

  return (
    <>
      <DataTable
        Toolbar={() => (
          <TableToolbar
            title="Released TCT"
            description="Manage all released TCT efficiently"
            actionButtons={
              <>
                <FilterButton />
                <ContainedButton
                  title="Add Ticket"
                  onClick={() => setAddModalShow(true)}
                  icon={<Add sx={{ color: "#FFF" }} />}
                />
              </>
            }
          />
        )}
        columns={tctHelper.releasedTCTColumn}
        rows={tickets.map((data) => ({ ...data, id: data._id }))}
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
        loading={ticketLoading}
        onCellDoubleClick={handleDoubleClick}
      />

      <AddTCT open={addModalShow} onClose={setAddModalShow} />

      <TCTInfo
        open={editModalShow}
        onClose={setEditModalShow}
        ticketDetails={ticketDetails}
        setTicketDetails={setTicketDetails}
      />
    </>
  );
};

export default ReleasedtctTable;
