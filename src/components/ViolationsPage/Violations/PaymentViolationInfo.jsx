import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import {
  DatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexRow from "../../common/ui/FlexRow";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import helper from "../../common/data/helper";
import { useTheme } from "@mui/material/styles";
import useViolations from "../../../api/useViolations";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import SnackBar from "../../common/ui/SnackBar";
import Vhelper from "./Vhelper";
import { Clear, PrintOutlined, QrCode } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import useAuth from "../../../hooks/useAuth";
import ROLES_LIST from "../../common/data/ROLES_LIST";
import CashierViolationReceipt from "../../Receipt/CashierViolationReceipt";
import ReceiptViolationPrintable from "../../Receipt/receipt.violation.printable";
import CashierViolationGeneralF from "../../Receipt/CashierViolationGeneralF";
import CashierViolationTrustF from "../../Receipt/CashierViolationTrustF";
import ReceiptViolationPrintableGF from "../../Receipt/receipt.violation.printable.gf";
import ReceiptViolationPrintableTF from "../../Receipt/receipt.violation.printable.tf";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PaymentViolationsInfo = ({
  open,
  onClose,
  violationDetails,
  setViolationDetails,
  initialViolationDetails,
  paid,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { officersNames, violationsList, setViolations } = useData();
  const [disable, setDisable] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [editAlertShown, setEditAlertShown] = useState(false);
  const [closingAlert, setClosingAlert] = useState(false);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setViolationDetails((prev) => ({ ...prev, violation: value }));
  };

  const handleSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.patch("/violation", violationDetails);
      setViolationDetails((prev) => ({ ...prev, receiptNo: response.data }));
      setViolations((prev) => {
        return prev?.filter((v) => v._id !== violationDetails._id);
      });
      setReadOnly(true);
      setAlertSeverity("success");
      setAlertMsg("Payment processed successfully.");
      onClose(false);
      setReceiptModalOpen(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Update Violations Error.");
      console.log(error);
    }
    setAlertShown(true);
    setUpdateConfirmation(false);
    setDisable(false);
  };

  const handleClose = () => {
    if (!readOnly && initialViolationDetails != violationDetails) {
      setClosingAlert(true);
      return;
    }
    onClose(false);
    setReadOnly(true);
    setViolationDetails(Vhelper.initialDetails);
  };

  const optionOthersSelected = Boolean(
    violationDetails.violation.find((v) => v.violation == "OTHERS")
  );

  const componentRef = useRef(null);
  const componentRefGF = useRef(null);
  const componentRefTF = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrintGF = useReactToPrint({
    content: () => componentRefGF.current,
  });
  const handlePrintTF = useReactToPrint({
    content: () => componentRefTF.current,
  });

  return (
    <>
      <DialogForm
        open={open}
        title={readOnly ? "Violations Info" : "Violation Payment"}
        onClose={handleClose}
        onSubmit={(e) => {
          e.preventDefault();
          setUpdateConfirmation(true);
        }}
        actions={
          paid ? (
            <>
              <Collapse
                in={
                  auth.roleCode === ROLES_LIST.Cashier ||
                  auth.roleCode === ROLES_LIST.Admin
                }
                mountOnEnter
                unmountOnExit
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setReceiptModalOpen(true)}
                >
                  view receipt
                </Button>
              </Collapse>
            </>
          ) : (
            <>
              <Collapse
                in={readOnly}
                mountOnEnter
                unmountOnExit
                timeout={readOnly ? 300 : 0}
              >
                <Box display="flex" gap={1}>
                  <Button variant="outlined" size="small" onClick={handleClose}>
                    cancel
                  </Button>
                  <Button
                    disabled={disable}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      helper.handleScrollToTop();
                      setReadOnly(false);
                      setEditAlertShown(true);
                    }}
                  >
                    Proceed to Payment
                  </Button>
                </Box>
              </Collapse>
              <Collapse
                in={!readOnly}
                mountOnEnter
                unmountOnExit
                timeout={!readOnly ? 300 : 0}
              >
                <Box display="flex" gap={1}>
                  <Button variant="outlined" size="small" onClick={handleClose}>
                    cancel
                  </Button>
                  <Button
                    disabled={disable}
                    variant="contained"
                    size="small"
                    type="submit"
                  >
                    mark as paid
                  </Button>
                </Box>
              </Collapse>
            </>
          )
        }
      >
        <Box width={600}>
          <FlexRow>
            <OutlinedTextField
              required={true}
              disabled={disable}
              label="Name of Payor"
              value={violationDetails?.payor}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  payor: e.target.value,
                }))
              }
              readOnly={readOnly}
            />
            <OutlinedTextField
              disabled={disable}
              label="Remarks"
              value={violationDetails?.remarks}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
              readOnly={readOnly}
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="OR GF"
              value={violationDetails?.or}
              readOnly={readOnly}
            />
            <OutlinedTextField
              required={true}
              label="OR TF"
              value={violationDetails?.ortf}
              readOnly={readOnly}
            />
            <FormControl margin="dense" fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  readOnly={readOnly}
                  label="OR Date"
                  slotProps={{ textField: { required: true } }}
                  value={
                    violationDetails?.orDate &&
                    new Date(violationDetails?.orDate)
                  }
                  onChange={(date) =>
                    setViolationDetails((prev) => ({
                      ...prev,
                      orDate: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              readOnly={true}
              required
              disabled={disable}
              label="Ticket No."
              value={violationDetails?.ticketNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  ticketNo: e.target.value,
                }))
              }
            />
            <FormControl margin="dense" fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  readOnly={true}
                  label="Date of Apprehension"
                  slotProps={{ textField: { required: true } }}
                  value={new Date(violationDetails?.dateApprehension)}
                  onChange={(date) =>
                    setViolationDetails((prev) => ({
                      ...prev,
                      dateApprehension: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Name of Violator"
              required
              readOnly={true}
              value={violationDetails?.name}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={disable}
              label="Address"
              readOnly={true}
              value={violationDetails?.address}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Type of Vehicle</InputLabel>
              <Select
                readOnly={true}
                label="Type of Vehicle"
                IconComponent={
                  violationDetails.typeVehicle?.length > 1
                    ? () => (
                        <IconButton
                          disabled={true}
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={(e) => {
                            setViolationDetails((prev) => ({
                              ...prev,
                              typeVehicle: "",
                            }));
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )
                    : undefined
                }
                value={violationDetails?.typeVehicle}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    typeVehicle: e.target.value,
                  }))
                }
              >
                <MenuItem value={"Tricycle (MTC)"}>Tricycle (MTC)</MenuItem>
                <MenuItem value={"Private"}>Private</MenuItem>
                <MenuItem value={"MC"}>MC</MenuItem>
                <MenuItem value={"PUJ"}>PUJ</MenuItem>
                <MenuItem value={"UV"}>UV</MenuItem>
                <MenuItem value={"Truck/Bus"}>Truck/Bus</MenuItem>
              </Select>
            </FormControl>

            <OutlinedTextField
              disabled={disable}
              label="Franchise No."
              value={violationDetails?.franchiseNo}
              readOnly={true}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  franchiseNo: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              disabled={disable}
              label="Plate No."
              readOnly={true}
              value={violationDetails?.plateNo}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  plateNo: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Confiscated D.L.</InputLabel>
              <Select
                disabled={disable}
                readOnly={true}
                label="Confiscated D.L."
                IconComponent={
                  violationDetails.confiscatedDL?.length > 1
                    ? () => (
                        <IconButton
                          disabled={true}
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={(e) => {
                            setViolationDetails((prev) => ({
                              ...prev,
                              confiscatedDL: "",
                            }));
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )
                    : undefined
                }
                value={violationDetails.confiscatedDL}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    confiscatedDL: e.target.value,
                  }))
                }
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Non Pro"}>Non Pro</MenuItem>
                <MenuItem value={"Pro"}>Pro</MenuItem>
                <MenuItem value={"Temporary DL"}>Temporary DL</MenuItem>
                <MenuItem value={"Ticket"}>Ticket</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  readOnly={true}
                  label="Time of Violation"
                  value={new Date(violationDetails.timeViolation)}
                  onChange={(newValue) => {
                    setViolationDetails((prev) => ({
                      ...prev,
                      timeViolation: newValue,
                    }));
                  }}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </LocalizationProvider>
            </FormControl>

            <OutlinedTextField
              disabled={disable}
              label="Place of Violation"
              readOnly={true}
              value={violationDetails?.placeViolation}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  placeViolation: e.target.value,
                }))
              }
            />
          </FlexRow>

          <Autocomplete
            clearIcon={false}
            readOnly={true}
            options={officersNames}
            fullWidth
            value={violationDetails?.officer || null}
            onChange={(_, value) =>
              setViolationDetails((prev) => ({
                ...prev,
                officer: value,
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Apprehending Officer"
              />
            )}
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="violations-committed">
              Violations Committed
            </InputLabel>
            <Select
              readOnly={true}
              labelId="violations-committed"
              multiple
              value={violationDetails?.violation}
              onChange={handleChange}
              input={<OutlinedInput label="Violations Committed" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((data, i) => (
                    <Chip key={i} label={data.violation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {violationsList.map((data, i) => (
                <MenuItem key={i} value={data}>
                  <Checkbox
                    checked={violationDetails.violation.indexOf(data) > -1}
                  />
                  {data.violation}
                </MenuItem>
              ))}
            </Select>
            <Collapse in={optionOthersSelected} unmountOnExit mountOnEnter>
              <OutlinedTextField
                readOnly={true}
                required
                disabled={disable}
                label="Specify the violation committed"
                value={violationDetails.others}
                onChange={(e) =>
                  setViolationDetails((prev) => ({
                    ...prev,
                    others: e.target.value,
                  }))
                }
              />
            </Collapse>
            <FormHelperText
              sx={{
                color: "error.main",
                textAlign: "end",
                fontSize: "medium",
              }}
            >
              {`Total Amount: ${violationDetails?.violation
                ?.reduce((total, obj) => total + obj?.price, 0)
                .toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}`}
            </FormHelperText>
          </FormControl>
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={closingAlert}
        setOpen={setClosingAlert}
        confirm={() => {
          setClosingAlert(false);
          setReadOnly(true);
          setViolationDetails(initialViolationDetails);
          helper.handleScrollToTop();
        }}
        title="Confirmation"
        content="Closing this form will discard all the data you have entered into the input fields. Are you sure you want to close it?"
        label="Yes, close it"
      />

      <ConfirmationDialog
        open={updateConfirmation}
        setOpen={setUpdateConfirmation}
        confirm={handleSubmit}
        title="Payment Confirmation"
        content="Are you sure you want to mark this violation as paid? Once submitted, the data will be moved to the paid list."
        disabled={disable}
      />

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />

      <SnackBar
        open={editAlertShown}
        onClose={setEditAlertShown}
        msg="Please provide the necessary details below. Ensure all information is accurate before submitting."
        severity={"info"}
        position={{ horizontal: "center", vertical: "top" }}
      />

      <DialogForm
        title="Transaction Receipt"
        open={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        actions={
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setReceiptModalOpen(false)}
            >
              cancel
            </Button>
            {/* <Button
              size="small"
              variant="contained"
              startIcon={<PrintOutlined />}
              onClick={handlePrint}
            >
              print
            </Button> */}
          </>
        }
      >
        <Box display={"flex"} gap={2}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"end"}
            gap={1}
          >
            <CashierViolationGeneralF
              violationDetails={violationDetails}
              fullname={violationDetails?.collectingOfficer}
            />
            <Button
              size="small"
              variant="contained"
              startIcon={<PrintOutlined />}
              onClick={handlePrintGF}
            >
              print
            </Button>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"end"}
            gap={1}
          >
            <CashierViolationTrustF
              violationDetails={violationDetails}
              fullname={violationDetails?.collectingOfficer}
            />
            <Button
              size="small"
              variant="contained"
              startIcon={<PrintOutlined />}
              onClick={handlePrintTF}
            >
              print
            </Button>
          </Box>
        </Box>
      </DialogForm>

      <Box display="none">
        <ReceiptViolationPrintableGF
          ref={componentRefGF}
          violationDetails={violationDetails}
          fullname={violationDetails?.collectingOfficer}
        />
        <ReceiptViolationPrintableTF
          ref={componentRefTF}
          violationDetails={violationDetails}
          fullname={violationDetails?.collectingOfficer}
        />
      </Box>
    </>
  );
};

export default PaymentViolationsInfo;
