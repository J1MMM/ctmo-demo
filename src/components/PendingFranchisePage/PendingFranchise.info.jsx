import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  Fade,
  FormControl,
  FormHelperText,
  Grow,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useData from "../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OutlinedTextField from "../common/ui/OutlinedTextField";
import FlexRow from "../common/ui/FlexRow";
import Fieldset from "../common/ui/Fieldset";
import DialogForm from "../common/ui/DialogForm";
import ConfirmationDialog from "../common/ui/ConfirmationDialog";
import SnackBar from "../common/ui/SnackBar";
import AlertDialog from "../common/ui/AlertDialog";
import spcbrgy from "../common/data/spcbrgy";
import helper from "../common/data/helper";
import { useReactToPrint } from "react-to-print";
import ROLES_LIST from "../common/data/ROLES_LIST";
import useAuth from "../../hooks/useAuth";
import { MuiTelInput } from "mui-tel-input";
import { PrintOutlined } from "@mui/icons-material";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import CashierFranchiseReceipt from "../Receipt/CashierFranchiseReceipt";
import CashierFranchiseReceiptPrintable from "../Receipt/receipt.franchise.printable";
import dayjs from "dayjs";

const PendingFranchiseInfo = ({
  open,
  onClose,
  franchiseDetails,
  setFranchiseDetails,
  initialFormInfo,
  paid,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [disable, setDisable] = useState(false);
  const [dropConfirm, setDropConfirm] = useState(false);
  const [transferForm, setTransferForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [transferAlertShown, setTransferAlertShown] = useState(false);
  const [updateAlertShown, setUpdateAlertShown] = useState(false);
  const [closingAlert, setClosingAlert] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const { setFranchises, franchises, pendingFranchises, setPendingFranchises } =
    useData();
  const [alertShown, setAlertShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [transferConfirmation, setTransferConfirmation] = useState(false);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  const [cancelOrModal, setCancelOrModal] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const { auth } = useAuth();

  const admin = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.Admin));
  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));
  const ctmo2 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO2));

  const dateNow = new Date();
  // const createdAt = dayjs(franchiseDetails.createdAt);
  // const now = dayjs();
  // const twentyFourHoursAgo = now.subtract(24, "hour");
  // const allowToCancelOr = createdAt.isAfter(twentyFourHoursAgo);

  const handleUpdateSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("/franchise/pending", {
        ...franchiseDetails,
        collectingOfficer: auth?.fullname,
      });

      setFranchiseDetails((prev) => ({
        ...prev,
        collectingOfficer: auth?.fullname,
      }));
      setReceiptData(response.data?.receiptData);
      setPendingFranchises((prev) =>
        prev.filter((franchise) => franchise.id != franchiseDetails.id)
      );

      const recordExist = franchises.find(
        (v) => v.mtop == franchiseDetails.mtop
      );

      const formattedData = helper.formatFranchise({
        ...response.data?.newFranchiseData,
        collectingOfficer: auth?.fullname,
      });

      if (recordExist) {
        setFranchises((prev) => {
          const newFranchises = prev.map((franchise) => {
            if (franchise.mtop == response.data?.newFranchiseData?.MTOP) {
              return formattedData;
            } else {
              return franchise;
            }
          });
          return helper.sortData(newFranchises, "mtop");
        });
      } else {
        setFranchises((prev) => {
          const newFranchises = [...prev, formattedData];
          return helper.sortData(newFranchises, "mtop");
        });
      }

      setUpdateForm(false);
      setReadOnly(true);
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise Payment successfully. Your changes have been saved and are now reflected in the system."
      );
      setReceiptModal(true);
      onClose(false);
    } catch (error) {
      console.log(error);
      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg("Franchise payment failed. " + error.response.data.message);
      } else {
        setAlertMsg("franchise payment failed. Please try again later.");
      }
    }
    setUpdateConfirmation(false);
    setAlertShown(true);
    setDisable(false);
  };

  const handleCancelOr = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post(
        "/franchise/cashier-cancel-pending",
        franchiseDetails
      );

      // setReceiptData(response.data?.receiptData);

      setPendingFranchises((prev) =>
        prev.filter((franchise) => franchise.id != franchiseDetails.id)
      );

      const recordExist = franchises.find(
        (v) => v.mtop == franchiseDetails.mtop
      );

      if (recordExist) {
        setFranchises((prev) => {
          const newFranchises = prev.map((franchise) => {
            if (franchise.mtop == franchiseDetails.mtop) {
              return { ...franchise, pending: false };
            } else {
              return franchise;
            }
          });
          return helper.sortData(newFranchises, "mtop");
        });
      }

      setUpdateForm(false);
      setReadOnly(true);
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise cancel OR successfully. Your changes have been saved and are now reflected in the system."
      );
      onClose(false);
    } catch (error) {
      console.log(error);
      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg(
          "Franchise transaction failed. " + error.response.data.message
        );
      } else {
        setAlertMsg("franchise transaction failed. Please try again later.");
      }
    }
    // setUpdateConfirmation(false);
    setCancelOrModal(false);
    setAlertShown(true);
    setDisable(false);
  };

  const goBack = () => {
    if (updateForm) {
      setFranchiseDetails(initialFormInfo);
    } else {
      onClose(false);
      setFranchiseDetails(helper.initialFranchiseDetails);
    }
    setClosingAlert(false);
    setUpdateForm(false);
    setTransferForm(false);
    setReadOnly(true);
  };

  const handleCloseOnclick = () => {
    if (updateForm) {
      let formIsModified;

      if (updateForm) {
        formIsModified = helper.checkedFormModified(
          initialFormInfo,
          franchiseDetails
        );
      }

      if (formIsModified) {
        setClosingAlert(true);
        return;
      }
    }

    goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateConfirmation(true);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <DialogForm
        onSubmit={handleSubmit}
        title={paid ? "Franchise Details" : "Pending Franchise Details"}
        open={open}
        onClose={handleCloseOnclick}
        actions={
          !paid ? (
            <>
              <Collapse
                in={readOnly}
                mountOnEnter
                unmountOnExit
                timeout={readOnly ? 300 : 0}
              >
                <Box display="flex" gap={1}>
                  {/* <Button
                    disabled={disable}
                    variant="outlined"
                    size="small"
                    onClick={handleCancelOr}
                  >
                    cancel
                  </Button> */}
                  <Button
                    disabled={disable}
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => setCancelOrModal(true)}
                  >
                    cancel OR
                  </Button>
                  <Button
                    disabled={disable}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        paymentOrDate: dateNow,
                      }));
                      setReadOnly(false);
                      setUpdateForm(true);
                    }}
                  >
                    proceed to payment
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
                  <Button
                    disabled={disable}
                    variant="outlined"
                    size="small"
                    onClick={handleCloseOnclick}
                  >
                    cancel
                  </Button>
                  <Button
                    disabled={disable}
                    variant="contained"
                    size="small"
                    type="submit"
                  >
                    submit
                  </Button>
                </Box>
              </Collapse>
            </>
          ) : (
            <>
              <Button
                disabled={disable}
                variant="contained"
                size="small"
                onClick={() => {
                  setReceiptModal(true);
                }}
              >
                view receipt
              </Button>
            </>
          )
        }
      >
        <Fieldset legend="Payment Details">
          <FlexRow>
            <OutlinedTextField
              readOnly={readOnly}
              required={true}
              label="O.R."
              value={franchiseDetails?.paymentOr}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  paymentOr: e.target.value,
                }))
              }
            />

            <FormControl margin="dense" focused fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="O.R. Date"
                  value={franchiseDetails.paymentOrDate}
                  readOnly={readOnly}
                  onChange={(date) =>
                    setFranchiseDetails((prev) => ({
                      ...prev,
                      paymentOrDate: date,
                    }))
                  }
                  slotProps={{ textField: { required: true } }}
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>
        </Fieldset>
        <br />
        <FlexRow>
          <OutlinedTextField
            required={true}
            label="MTOP"
            value={franchiseDetails?.mtop}
            sx={{ maxWidth: 250 }}
            readOnly={true}
            disabled={!readOnly}
          />

          <FormControl margin="dense" focused>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Renewal"
                value={franchiseDetails.date}
                readOnly={true}
                onChange={(date) =>
                  setFranchiseDetails((prev) => ({ ...prev, date: date }))
                }
                slotProps={{ textField: { required: true } }}
                disabled={!readOnly}
              />
            </LocalizationProvider>
          </FormControl>
        </FlexRow>

        <Fieldset legend="Owner's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Firstname"
              readOnly={true}
              value={franchiseDetails?.fname}
              disabled={!readOnly}
            />
            <OutlinedTextField
              label="MI"
              value={franchiseDetails?.mi}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              required={true}
              label="Lastname"
              value={franchiseDetails?.lname}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                readOnly={true}
                label="Sex"
                required
                fullWidth
                value={
                  franchiseDetails.ownerSex ? franchiseDetails.ownerSex : ""
                }
                disabled={!readOnly}
              >
                <MenuItem value="male">
                  <Stack direction="row" gap={0.5}>
                    Male
                    <PiGenderMaleBold size={14} color="rgb(2,170,232)" />
                  </Stack>
                </MenuItem>
                <MenuItem value="female">
                  <Stack direction="row" gap={0.5}>
                    Female
                    <PiGenderFemaleBold size={14} color="#EF5890" />
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>
            <MuiTelInput
              disabled={true}
              label="Contact No."
              required
              fullWidth
              margin="dense"
              defaultCountry="PH"
              disableDropdown
              forceCallingCode
              value={franchiseDetails.contact}
              onChange={(num) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact: num,
                }))
              }
            />

            <Autocomplete
              readOnly={true}
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.address}
              disabled={!readOnly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  required
                  label="Address"
                />
              )}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Fullname"
              value={franchiseDetails?.drivername}
              readOnly={true}
              disabled={!readOnly}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                readOnly={true}
                label="Sex"
                required
                fullWidth
                value={
                  franchiseDetails.driverSex ? franchiseDetails.driverSex : ""
                }
                disabled={!readOnly}
              >
                <MenuItem value="male">
                  <Stack direction="row" gap={0.5}>
                    Male
                    <PiGenderMaleBold size={14} color="rgb(2,170,232)" />
                  </Stack>
                </MenuItem>
                <MenuItem value="female">
                  <Stack direction="row" gap={0.5}>
                    Female
                    <PiGenderFemaleBold size={14} color="#EF5890" />
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>
            <MuiTelInput
              disabled={true}
              label="Contact No."
              required
              fullWidth
              margin="dense"
              defaultCountry="PH"
              disableDropdown
              forceCallingCode
              value={franchiseDetails.contact2}
              onChange={(num) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact2: num,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <Autocomplete
              readOnly={true}
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.driveraddress}
              disabled={!readOnly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  required
                  label="Address"
                />
              )}
            />
            <OutlinedTextField
              required={true}
              label="Driver's License no."
              value={franchiseDetails?.driverlicenseno}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Make"
              value={franchiseDetails?.make}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              required={true}
              label="Model"
              value={franchiseDetails?.model}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              required={true}
              readOnly={true}
              label="Plate no."
              value={franchiseDetails?.plateno}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Motor No."
              value={franchiseDetails?.motorno}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              label="Stroke"
              value={franchiseDetails?.stroke}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Chassis No."
              value={franchiseDetails?.chassisno}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={franchiseDetails?.fuelDisp}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="OR no."
              value={franchiseDetails?.or}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              required={true}
              label="CR no."
              value={franchiseDetails?.cr}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails?.tplProvider}
              readOnly={true}
              disabled={!readOnly}
            />

            <FormControl margin="dense" fullWidth>
              <Box
                component={"fieldset"}
                display="flex"
                gap={1}
                alignItems="center"
                borderRadius={1}
                border="1px solid lightgrey"
              >
                <legend style={{ color: "gray" }}>TPL Effectivity</legend>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={true}
                    value={franchiseDetails?.tplDate1 || null}
                    disabled={!readOnly}
                  />
                </LocalizationProvider>
                <Typography component={"span"} variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={true}
                    value={franchiseDetails?.tplDate2 || null}
                    disabled={!readOnly}
                  />
                </LocalizationProvider>
              </Box>
            </FormControl>
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={franchiseDetails?.typeofFranchise}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails?.kindofBusiness}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="TODA"
              value={franchiseDetails?.toda}
              readOnly={true}
              disabled={!readOnly}
            />
            <OutlinedTextField
              label="Route"
              value={franchiseDetails?.route}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
          <FlexRow>
            <FormControl margin="dense" fullWidth focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Release of ST/TP"
                  value={franchiseDetails?.daterelease || null}
                  readOnly={true}
                  disabled={!readOnly}
                />
              </LocalizationProvider>
            </FormControl>
            <OutlinedTextField
              label="Remarks"
              value={franchiseDetails?.remarks}
              readOnly={true}
              disabled={!readOnly}
            />
          </FlexRow>
        </Fieldset>
      </DialogForm>

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        msg={alertMsg}
        severity={alertSeverity}
      />

      <ConfirmationDialog
        open={closingAlert}
        setOpen={setClosingAlert}
        confirm={goBack}
        title="Confirmation"
        content="Closing this form will discard all the data you have entered into the input fields. Are you sure you want to close it?"
        label="Yes, close it"
      />

      <ConfirmationDialog
        open={updateConfirmation}
        setOpen={setUpdateConfirmation}
        confirm={handleUpdateSubmit}
        title="Payment Confirmation"
        content="Before proceeding, please confirm the payment details below. After confirmation, the updated franchise information will be added to the system."
        disabled={disable}
      />

      <ConfirmationDialog
        open={cancelOrModal}
        setOpen={setCancelOrModal}
        confirm={handleCancelOr}
        title="Cancel OR Confirmation"
        content="Are you sure you want to cancel? The franchise data will revert to its previous state after cancellation."
        disabled={disable}
      />

      <DialogForm
        open={receiptModal}
        onClose={() => setReceiptModal(false)}
        title="Payment Receipt"
        actions={
          <>
            <Button
              disabled={disable}
              variant="outlined"
              size="small"
              onClick={() => {
                setReceiptModal(false);
              }}
            >
              close
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              size="small"
              onClick={handlePrint}
              startIcon={<PrintOutlined />}
            >
              Print
            </Button>
          </>
        }
      >
        <CashierFranchiseReceipt
          fullname={"Lucio Geraldo G. Ciolo"}
          franchiseDetails={franchiseDetails}
          receiptData={receiptData}
        />
      </DialogForm>
      <Box display="none">
        <CashierFranchiseReceiptPrintable
          ref={componentRef}
          fullname={"Lucio Geraldo G. Ciolo"}
          franchiseDetails={franchiseDetails}
          receiptData={receiptData}
        />
      </Box>
    </>
  );
};

export default PendingFranchiseInfo;
