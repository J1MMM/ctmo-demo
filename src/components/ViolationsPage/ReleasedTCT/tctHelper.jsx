import dayjs from "dayjs";

const releasedTCTColumn = [
  {
    field: "ticketNo",
    headerName: "TICKET NO.",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    align: "center",
    headerAlign: "center",
    headerClassName: "data-grid-header",
  },
  {
    field: "tctNo",
    headerName: "TCT NO. REALEASE",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "lastname",
    headerName: "LAST NAME",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "firstname",
    headerName: "FIRST NAME",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "mname",
    headerName: "M.I",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "dateReleased",
    headerName: "DATE OF RELEASE",
    flex: 1,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
];

const initialTicketDetails = {
  ticketNo: "",
  tctNo: "",
  lastname: "",
  firstname: "",
  mname: "",
  dateReleased: null,
};

export default {
  releasedTCTColumn,
  initialTicketDetails,
};
