import { Error } from "@mui/icons-material";
import { Chip, Stack, Tooltip } from "@mui/material";
import dayjs from "dayjs";

function removeOneItemPerMatch(array1, array2) {
  const result = [];
  const arr2 = [...array2];

  // Iterate over each item in array1
  array1.forEach((item) => {
    // Find the index of the first occurrence of the item in array2
    const index = arr2.findIndex((item2) => item2 === item);
    // If a matching item is found, remove it from array2
    if (index !== -1) {
      arr2.splice(index, 1);
      result.push(item);
    } else {
      result.push(false);
    }
  });

  return result;
}

const initialFranchiseDetails = {
  id: "",
  date: null,
  mtop: "",
  lname: "",
  fname: "",
  mi: "",
  address: "",
  ownerSex: "",
  driverSex: "",
  contact: "",
  contact2: "",
  toda: "",
  drivername: "",
  driveraddress: "",
  or: "",
  cr: "",
  driverlicenseno: "",
  model: "",
  motorno: "",
  chassisno: "",
  plateno: "",
  stroke: "",
  remarks: "",
  daterelease: null,
  complaint: "",
  tplDate1: null,
  tplDate2: null,
  typeofFranchise: "",
  kindofBusiness: "",
  fuelDisp: "",
  tplProvider: "",
  route: "",
  paidViolations: "",
};

const clientsColumns = [
  {
    field: "mtop",
    headerName: "MTOP",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    align: "center",
    headerAlign: "center",
    headerClassName: "data-grid-header",
    renderCell: (params) => {
      const forRevoke =
        params.row?.complaint?.filter((str) => str?.trim() !== "").length >= 4;

      return (
        <Stack direction="row" gap={1}>
          <span>
            {forRevoke && <Error fontSize="small" sx={{ color: "#D74141" }} />}
          </span>
          <span>{params.row?.mtop}</span>
        </Stack>
      );
    },
  },
  {
    field: "lname",
    headerName: "LASTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "fname",
    headerName: "FIRSTNAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "mi",
    headerName: "MI",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "address",
    headerName: "ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "contact",
    headerName: "CONTACT NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) => params.value && `+63${params.value}`,
  },
  {
    field: "contact2",
    headerName: "CONTACT\u00a0NO.2",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) => params.value && `+63${params.value}`,
  },
  {
    field: "toda",
    headerName: "TODA",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "drivername",
    headerName: "DRIVER'S\u00a0NAME",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driveraddress",
    headerName: "DRIVER'S\u00a0ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "or",
    headerName: "O.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "cr",
    headerName: "C.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "driverlicenseno",
    headerName: "DRIVER'S\u00a0LICENSE\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "model",
    headerName: "MODEL",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "motorno",
    headerName: "MOTOR\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "chassisno",
    headerName: "CHASSIS\u00a0NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "plateno",
    headerName: "PLATE\u00a0NO.",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "stroke",
    headerName: "STROKE",
    width: 100,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "DATE RENEWAL",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "remarks",
    headerName: "REMARKS",
    width: 250,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "daterelease",
    headerName: "DATE RELEASE OF ST/TP",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "complaint",
    headerName: "COMPLAINT",
    width: 800,
    headerClassName: "data-grid-header",
    editable: false,

    renderCell: (params, i) => {
      const violations = params.row.complaint;
      const paidviolations = params.row.paidViolations;
      const result = removeOneItemPerMatch(violations, paidviolations);

      // console.log(params.row.mtop);
      // console.log(violations);
      // console.log(paidviolations);
      // console.log(result);
      if (typeof params.value[0] == "string") {
        return (
          <Stack key={i} direction="row" gap={1}>
            {violations.map((v, j) => {
              if (v != "" && v != null)
                return (
                  <Chip
                    key={j}
                    label={v}
                    color={result[j] == v ? "primary" : "error"}
                    size="small"
                  />
                );
            })}
          </Stack>
        );
      } else {
        return null;
      }
    },
  },
];

function createClientsData(
  id,
  mtop,
  lname,
  fname,
  mi,
  address,
  contact,
  contact2,
  toda,
  drivername,
  driveraddress,
  or,
  cr,
  driverlicenseno,
  model,
  motorno,
  chassisno,
  plateno,
  stroke,
  date,
  remarks,
  daterelease,
  complaint,
  dateArchived,
  ownerSex,
  driverSex,
  tplProvider,
  tplDate1,
  tplDate2,
  fuelDisp,
  typeofFranchise,
  kindofBusiness,
  route,
  paidViolations
) {
  return {
    id,
    mtop,
    lname,
    fname,
    mi,
    address,
    contact,
    contact2,
    toda,
    drivername,
    driveraddress,
    or,
    cr,
    driverlicenseno,
    model,
    motorno,
    chassisno,
    plateno,
    stroke,
    date,
    remarks,
    daterelease,
    complaint,
    dateArchived,
    ownerSex,
    driverSex,
    tplProvider,
    tplDate1,
    tplDate2,
    fuelDisp,
    typeofFranchise,
    kindofBusiness,
    route,
    paidViolations,
  };
}
function countTrueValues(obj) {
  let count = 0;
  for (const key in obj) {
    if (obj[key] === true) {
      count++;
    }
  }
  return count;
}

const checkedFormModified = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }
  for (let key of keys1) {
    if (!(key in obj2) || obj1[key] !== obj2[key]) {
      return true;
    }
  }

  return false;
};

const handleScrollToTop = () => {
  document
    .getElementById("client-info-content")
    .scrollTo({ top: 0, behavior: "smooth" });
};

const handleScrollToBottom = () => {
  const element = document.getElementById("client-info-content");
  element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
};

const formatFranchise = (franchise) => {
  return createClientsData(
    franchise._id,
    franchise.MTOP,
    franchise.LASTNAME,
    franchise.FIRSTNAME,
    franchise.MI,
    franchise.ADDRESS,
    franchise.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
    franchise.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
    franchise.TODA,
    franchise.DRIVERS_NAME,
    franchise.DRIVERS_ADDRESS,
    franchise.OR,
    franchise.CR,
    franchise.DRIVERS_LICENSE_NO,
    franchise.MODEL,
    franchise.MOTOR_NO,
    franchise.CHASSIS_NO,
    franchise.PLATE_NO,
    franchise.STROKE,
    franchise.DATE_RENEWAL && new Date(franchise.DATE_RENEWAL),
    franchise.REMARKS,
    franchise.DATE_RELEASE_OF_ST_TP &&
      new Date(franchise.DATE_RELEASE_OF_ST_TP),
    franchise.COMPLAINT,
    franchise.DATE_ARCHIVED && new Date(DATE_ARCHIVED),
    franchise.OWNER_SEX,
    franchise.DRIVERS_SEX,
    franchise.TPL_PROVIDER,
    franchise.TPL_DATE_1 && new Date(franchise.TPL_DATE_1),
    franchise.TPL_DATE_2 && new Date(franchise.TPL_DATE_2),
    franchise.FUEL_DISP,
    franchise.TYPE_OF_FRANCHISE,
    franchise.KIND_OF_BUSINESS,
    franchise.ROUTE,
    franchise.PAID_VIOLATIONS
  );
};

const violationsTableColumns = [
  {
    field: "ticketNo",
    headerName: "TICKET NO.",
    width: 200,
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
    field: "name",
    headerName: "VIOLATOR'S NAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "officer",
    headerName: "APPREHENDING OFFICER",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "dateApprehension",
    headerName: "DATE OF APPREHENSION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "confiscatedDL",
    headerName: "CONFISCATED D.L",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "address",
    headerName: "ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "typeVehicle",
    headerName: "TYPE OF VEHICLE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "franchiseNo",
    headerName: "TRICYCLE FRANCHISE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "plateNo",
    headerName: "PLATE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "timeViolation",
    headerName: "TIME OF VIOLATION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("hh:mm A"),
  },
  {
    field: "placeViolation",
    headerName: "PLACE OF VIOLATION",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "amount",
    headerName: "TOTAL AMOUNT",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value),
  },
  {
    field: "remarks",
    headerName: "REMARKS",
    width: 300,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "violation",
    headerName: "VIOLATIONS COMMITTED",
    width: 500,
    headerClassName: "data-grid-header",
    editable: false,
    renderCell: (params, i) => {
      return (
        params.value && (
          <Stack key={i} direction="row" gap={1}>
            {params.value.map(
              (v, i) =>
                v?.violation && (
                  <Chip key={i} label={v.violation} variant="Outlined" />
                )
            )}
          </Stack>
        )
      );
    },
  },
];

const officersTableColumn = [
  {
    field: "callsign",
    headerName: "CALL SIGN",
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    align: "center",
    headerAlign: "center",
    headerClassName: "data-grid-header",
    flex: 1,
  },

  {
    field: "firstname",
    headerName: "FIRSTNAME",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
  },
  {
    field: "lastname",
    headerName: "LASTNAME",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
  },
  {
    field: "mi",
    headerName: "M.I.",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
  },
  {
    field: "apprehended",
    headerName: "NO. OF APPREHENDED",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
  },
];
const officersDashboardColumn = [
  {
    field: "callsign",
    headerName: "CALL SIGN",
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    align: "center",
    headerAlign: "center",
    headerClassName: "data-grid-header",
    width: 100,
    renderCell: (params) => {
      const warning = params.row?.apprehended < 1;

      return (
        <Stack direction="row" gap={1}>
          <span>
            {warning && (
              <Tooltip title="No apprehensions">
                <Error fontSize="small" sx={{ color: "#D74141" }} />
              </Tooltip>
            )}
          </span>
          <span>{params.row.callsign}</span>
        </Stack>
      );
    },
  },

  {
    field: "fullname",
    headerName: "FULLNAME",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
  },

  {
    field: "apprehended",
    headerName: "APPREHENDED",
    headerClassName: "data-grid-header",
    editable: false,
    flex: 1,
    sort: "asc",
    valueFormatter: (params) =>
      `${params.value} ${params.value > 1 ? "violators" : "violator"}`,
  },
];

const paidListColumn = [
  {
    field: "receiptNo",
    headerName: "RECEIPT NO.",
    width: 150,
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
    field: "payor",
    headerName: "NAME OF PAYOR",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,
    headerClassName: "data-grid-header",
  },
  {
    field: "datePaid",
    headerName: "DATE OF PAYMENT",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,

    headerClassName: "data-grid-header",
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "ticketNo",
    headerName: "TICKET NO.",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    menu: false,
    option: false,
    sort: false,

    headerClassName: "data-grid-header",
  },

  {
    field: "name",
    headerName: "VIOLATOR'S NAME",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "officer",
    headerName: "APPREHENDING OFFICER",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "dateApprehension",
    headerName: "DATE OF APPREHENSION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "confiscatedDL",
    headerName: "CONFISCATED D.L",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "address",
    headerName: "ADDRESS",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "typeVehicle",
    headerName: "TYPE OF VEHICLE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "franchiseNo",
    headerName: "TRICYCLE FRANCHISE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "plateNo",
    headerName: "PLATE NO.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "timeViolation",
    headerName: "TIME OF VIOLATION",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("hh:mm A"),
  },
  {
    field: "placeViolation",
    headerName: "PLACE OF VIOLATION",
    width: 280,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "or",
    headerName: "O.R.",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
  },
  {
    field: "orDate",
    headerName: "O.R DATE",
    width: 200,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: (params) =>
      params.value && dayjs(params.value).format("ddd, MMM D YYYY"),
  },
  {
    field: "amount",
    headerName: "TOTAL AMOUNT",
    width: 150,
    headerClassName: "data-grid-header",
    editable: false,
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value),
  },
  {
    field: "remarks",
    headerName: "REMARKS",
    width: 300,
    headerClassName: "data-grid-header",
    editable: false,
  },

  {
    field: "violation",
    headerName: "VIOLATIONS COMMITTED",
    width: 500,
    headerClassName: "data-grid-header",
    editable: false,
    renderCell: (params, i) => {
      return (
        params.value && (
          <Stack key={i} direction="row" gap={1}>
            {params.value.map(
              (v, i) =>
                v?.violation && (
                  <Chip key={i} label={v.violation} variant="Outlined" />
                )
            )}
          </Stack>
        )
      );
    },
  },
];
function createOfficersData(
  id,
  callsign,
  firstname,
  lastname,
  mi,
  apprehended
) {
  return {
    id,
    callsign,
    firstname,
    lastname,
    mi,
    apprehended,
  };
}

const sortData = (array, field) => {
  return array.sort((a, b) => {
    const fieldA = parseInt(a[field]);
    const fieldB = parseInt(b[field]);
    if (fieldA < fieldB) {
      return -1;
    }
    if (fieldA > fieldB) {
      return 1;
    }
    return 0;
  });
};

const sortDesc = (array, field) => {
  return array.sort((a, b) => {
    const fieldA = parseInt(a[field]);
    const fieldB = parseInt(b[field]);
    if (fieldA > fieldB) {
      // Changed to >
      return -1; // Reversed the comparison
    }
    if (fieldA < fieldB) {
      // Changed to <
      return 1; // Reversed the comparison
    }
    return 0;
  });
};

export default {
  createClientsData,
  clientsColumns,
  countTrueValues,
  initialFranchiseDetails,
  checkedFormModified,
  handleScrollToTop,
  handleScrollToBottom,
  formatFranchise,
  officersTableColumn,
  violationsTableColumns,
  sortData,
  sortDesc,
  createOfficersData,
  paidListColumn,
  removeOneItemPerMatch,
  officersDashboardColumn,
};
