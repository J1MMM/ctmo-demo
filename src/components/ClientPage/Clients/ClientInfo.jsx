import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Fade,
  FormControl,
  FormControlLabel,
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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import FlexRow from "../../common/ui/FlexRow";
import Fieldset from "../../common/ui/Fieldset";
import DialogForm from "../../common/ui/DialogForm";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import SnackBar from "../../common/ui/SnackBar";
import AlertDialog from "../../common/ui/AlertDialog";
import spcbrgy from "../../common/data/spcbrgy";
import helper from "../../common/data/helper";
import {
  Analytics,
  AnalyticsOutlined,
  ArticleOutlined,
  List,
  ListAltOutlined,
  ListAltTwoTone,
  Pending,
  PendingActions,
  PendingActionsOutlined,
  PrintOutlined,
  QrCode,
  QrCode2,
  QrCodeOutlined,
  Report,
  ReportGmailerrorred,
} from "@mui/icons-material";
import PrintableReport from "./PrintableReport";
import { useReactToPrint } from "react-to-print";
import ROLES_LIST from "../../common/data/ROLES_LIST";
import useAuth from "../../../hooks/useAuth";
import { MuiTelInput } from "mui-tel-input";
import NewFranchise from "../../Receipt/NewFranchise";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import RenewFranchise from "../../Receipt/RenewFranchise";
import TransferFranchise from "../../Receipt/TransferFranchise";
import FranchiseFormPrintable from "./franchise.form.printable";
import MayorPermitPrintable from "./mayorspermit.printable";

function getRenewalDate(plateNumber, lastRenewalDate = new Date()) {
  if (!plateNumber || !lastRenewalDate) {
    return null;
  }
  // Extract the last digit from the plate number
  const lastDigit = plateNumber.match(/\d(?=\D*$)/);
  if (!lastDigit) {
    return null;
  }

  // Map last digit to corresponding month (1-based index)
  const monthMap = {
    0: 10, // October
    1: 1, // January
    2: 2, // February
    3: 3, // March
    4: 4, // April
    5: 5, // May
    6: 6, // June
    7: 7, // July
    8: 8, // August
    9: 9, // September
  };

  const month = monthMap[lastDigit[0]];
  const renewalBaseDate = new Date(lastRenewalDate);
  const nextYear = renewalBaseDate.getFullYear() + 1;

  return new Date(nextYear, month - 1); // months are 0-based in JavaScript Date
}
const ClientInfo = ({
  open,
  onClose,
  franchiseDetails,
  setFranchiseDetails,
  archiveMode,
  printable,
  initialFormInfo,
  setinitialFormInfo,
  paidViolations,
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
  const [formTitle, setFormTitle] = useState("Franchise Details");
  const { setFranchises, setDummyVariable } = useData();
  const [alertShown, setAlertShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [transferConfirmation, setTransferConfirmation] = useState(false);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);
  const { auth } = useAuth();
  const [receiptModal, setReceiptModal] = useState(false);
  const [transferReceiptModal, setTransferReceiptModal] = useState(false);
  const [permitModal, setPermitModal] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [model, setModel] = useState("");

  const admin = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.Admin));
  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));
  const ctmo2 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO2));

  const componentRef = useRef(null);
  const transferRecieptRef = useRef(null);
  const reportComp = useRef(null);
  const franchiseFormRef = useRef(null);
  const permitRef = useRef(null);
  // console.log(franchiseDetails?.LTO_RENEWAL_DATE);
  const handlePrintFranchiseForm = useReactToPrint({
    content: () => franchiseFormRef.current,
  });

  const handlePrintPermit = useReactToPrint({
    content: () => permitRef.current,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintTransferReceipt = useReactToPrint({
    content: () => transferRecieptRef.current,
  });

  const handlePrintReport = useReactToPrint({
    content: () => reportComp.current,
  });

  const handleFranchiseRevoke = async () => {
    setDisable(true);
    const id = franchiseDetails?.id;
    try {
      await axiosPrivate.patch("/franchise", { id });
      setFranchises((prev) => prev.filter((franchise) => franchise.id != id));
      onClose(false);
      setDropConfirm(false);
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise successfully archived. The MTOP is now available for reassignment."
      );
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Failed to archive franchise. Please try again later.");
      console.log(error);
    }
    setAlertShown(true);
    setDisable(false);
  };

  const handleTransferSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post(
        "/franchise/transfer",
        franchiseDetails
      );
      setFranchiseDetails((prev) => ({
        ...prev,
        refNo: response.data?.refNo,
        pending: true,
        receiptData: response.data?.receiptData,
        transaction: "Transfer Franchise"

      }));

      setinitialFormInfo((prev) => ({
        ...prev,
        refNo: response.data?.refNo,
        pending: true,
        receiptData: response.data?.receiptData,
        transaction: "Transfer Franchise"
      }));

      setReceiptData(response.data?.receiptData);
      setFranchises((prev) => {
        return prev.map((v) => {
          if (v.id == franchiseDetails.id) {
            return { ...v, pending: true, receiptData: response.data?.receiptData, transaction: "Transfer Franchise" };
          } else {
            return v;
          }
        });
      });

      // const newFranchise = helper.formatFranchise(response.data.newFranchise);
      // setFranchises((prev) => {
      //   const newFranchises = prev.map((franchise) => {
      //     if (franchise.mtop == response.data?.newFranchise.MTOP) {
      //       return newFranchise;
      //     } else {
      //       return franchise;
      //     }
      //   });
      //   return helper.sortData(newFranchises, "mtop");
      // });
      // setFranchiseDetails(newFranchise);
      setTransferForm(false);
      setReadOnly(true);
      helper.handleScrollToTop();
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise successfully transferred to the new owner, franchise information has been added to the system after payment."
      );
      setTransferReceiptModal(true);
    } catch (error) {
      console.log(error);
      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg(
          "Failed to transfer Franchise. " + error.response.data.message
        );
      } else {
        setAlertMsg("Failed to transfer Franchise. Please try again later.");
      }
    }
    setTransferConfirmation(false);
    setAlertShown(true);
    setDisable(false);
  };

  const handleUpdateSubmit = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post(
        "/franchise/update",
        franchiseDetails
      );

      // setFranchiseDetails({
      //   ...initialFormInfo,
      //   refNo: response.data?.refNo,
      // });
      setFranchiseDetails((prev) => ({
        ...prev,
        refNo: response.data?.refNo,
        pending: true,
        receiptData:  response.data?.receiptData,
        transaction: "Franchise Renewal",
      }));

      setinitialFormInfo((prev) => ({
        ...prev,
        refNo: response.data?.refNo,
        pending: true,
        receiptData:  response.data?.receiptData,
        transaction: "Franchise Renewal",
      }));

      setReceiptData(response.data?.receiptData);
      console.log(response.data?.receiptData);
      // setDummyVariable((prev) => !prev);
      setFranchises((prev) => {
        return prev.map((v) => {
          if (v.id == franchiseDetails.id) {
            return { ...v, pending: true, receiptData:  response.data?.receiptData, transaction: "Franchise Renewal",};
          } else {
            return v;
          }
        });
      });

      // const newFranchise = helper.formatFranchise(response.data);
      // setFranchises((prev) => {
      //   const newFranchises = prev.map((franchise) => {
      //     if (franchise.mtop == response.data.MTOP) {
      //       return newFranchise;
      //     } else {
      //       return franchise;
      //     }
      //   });
      //   return helper.sortData(newFranchises, "mtop");
      // });
      // setFranchiseDetails(newFranchise);
      setUpdateForm(false);
      setReadOnly(true);
      helper.handleScrollToTop();
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise information updated successfully. It will be added to the system after payment"
      );
      setReceiptModal(true);
    } catch (error) {
      console.log(error);
      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg(
          "Updating franchise failed. " + error.response.data.message
        );
      } else {
        setAlertMsg("Updating franchise failed. Please try again later.");
      }
    }
    setUpdateConfirmation(false);
    setAlertShown(true);
    setDisable(false);
  };

  const goBack = () => {
    if (transferForm || updateForm) {
      setFranchiseDetails(initialFormInfo);
    } else {
      onClose(false);
      setTimeout(() => {
        setFranchiseDetails(helper.initialFranchiseDetails);
      }, 500);
    }

    setFormTitle("Franchise Details");
    setClosingAlert(false);
    setUpdateForm(false);
    setTransferForm(false);
    setReadOnly(true);
  };

  const clearForm = () => {
    setFranchiseDetails({
      ...helper.initialFranchiseDetails,
      mtop: franchiseDetails.mtop,
      date: franchiseDetails.date,
      id: franchiseDetails.id,
    });
  };

  const handleCloseOnclick = () => {
    if (transferForm || updateForm) {
      let formIsModified;

      // if (transferForm) {
      //   formIsModified = helper.checkedFormModified(
      //     {
      //       ...helper.initialFranchiseDetails,
      //       mtop: franchiseDetails.mtop,
      //       date: franchiseDetails.date,
      //       id: franchiseDetails.id,
      //     },
      //     franchiseDetails
      //   );
      // }

      if (updateForm || transferForm) {
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

  const handleTransferClick = () => {
    setFormTitle("Transfer Franchise");
    setReadOnly(false);
    setTransferForm(true);
    setTransferAlertShown(true);
    helper.handleScrollToTop();
    // clearForm();
  };

  const handleUpdateClick = () => {
    setFormTitle("Franchise Renewal");
    setReadOnly(false);
    setUpdateForm(true);
    setUpdateAlertShown(true);
    helper.handleScrollToTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transferForm ? setTransferConfirmation(true) : setUpdateConfirmation(true);
  };

  return (
    <>
      <DialogForm
        onSubmit={handleSubmit}
        title={formTitle}
        open={open}
        onClose={handleCloseOnclick}
        actions={
          !archiveMode &&
          (franchiseDetails?.pending ? (
            <Box display={'flex'} gap={1}>
                     <Button
                        variant="outlined"
                        size="small"
                        onClick={()=>{

                          setReceiptData(franchiseDetails?.receiptData);
                          if(franchiseDetails?.transaction == "Transfer Franchise"){
                            setTransferReceiptModal(true)
                          }else{
                            setReceiptModal(true)
                          }
                        }}
                      >
                        View Receipt
                      </Button>
              <Box
                display="flex"
                bgcolor="warning.main"
                gap={1}
                px={2}
                py={1}
                borderRadius={1}
                boxSizing="border-box"
              >
                <PendingActionsOutlined
                  sx={{ color: "#FFF" }}
                  fontSize="small"
                />
                <Typography color="#FFF">Pending</Typography>
              </Box>
            </Box>
          ) : (
            <>
              {admin || ctmo1 ? (
                <>
                  <Collapse
                    in={transferForm}
                    mountOnEnter
                    unmountOnExit
                    timeout={transferForm ? 300 : 0}
                  >
                    <Box display="flex" gap={1}>
                      <Button
                        disabled={disable}
                        variant="outlined"
                        size="small"
                        onClick={handleCloseOnclick}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={
                          disable ||
                          !helper.checkedFormModified(
                            initialFormInfo,
                            franchiseDetails
                          )
                        }
                        variant="contained"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Collapse>
                  <Collapse
                    in={updateForm}
                    mountOnEnter
                    unmountOnExit
                    timeout={updateForm ? 300 : 0}
                  >
                    <Box display="flex" gap={1}>
                      <Button
                        disabled={disable}
                        variant="outlined"
                        size="small"
                        onClick={handleCloseOnclick}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={
                          disable ||
                          !helper.checkedFormModified(
                            initialFormInfo,
                            franchiseDetails
                          )
                        }
                        variant="contained"
                        size="small"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Collapse>

                  <Collapse
                    in={!transferForm && !updateForm}
                    mountOnEnter
                    unmountOnExit
                    timeout={!transferForm && !updateForm ? 300 : 0}
                  >
                    <Box display="flex" gap={1}>
                      <Button
                        disabled={disable}
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => setDropConfirm(true)}
                      >
                        REVOKE
                      </Button>
                      <Button
                        disabled={disable}
                        variant="contained"
                        size="small"
                        onClick={handleTransferClick}
                      >
                        Transfer
                      </Button>
                      <Button
                        disabled={disable}
                        variant="contained"
                        size="small"
                        onClick={handleUpdateClick}
                      >
                        RENEW
                      </Button>
                    </Box>
                  </Collapse>
                </>
              ) : null}
            </>
          ))
        }
      >
        <Box display="flex" gap={1}>
          {admin || ctmo2 ? (
            <Collapse in={printable && !updateForm && !transferForm}>
              <Button
                variant="outlined"
                sx={{ mb: 2, py: 1 }}
                startIcon={<ArticleOutlined />}
                size="small"
                onClick={handlePrintReport}
              >
                generate report
              </Button>
            </Collapse>
          ) : null}

          {admin || ctmo1 ? (
            <Collapse in={printable && !updateForm && !transferForm}>
              <Button
                variant="outlined"
                sx={{ mb: 2, py: 1 }}
                startIcon={<ListAltOutlined />}
                size="small"
                onClick={handlePrintFranchiseForm}
              >
                franchise form
              </Button>
            </Collapse>
          ) : null}
          {admin || ctmo1 ? (
            <Collapse in={printable && !updateForm && !transferForm}>
              <Button
                variant="outlined"
                sx={{ mb: 2, py: 1 }}
                startIcon={<ListAltOutlined />}
                size="small"
                onClick={handlePrintPermit}
              >
                Mayor's permit
              </Button>
            </Collapse>
          ) : null}
        </Box>

        <FlexRow>
          <OutlinedTextField
            required={true}
            label="MTOP"
            value={franchiseDetails?.mtop}
            sx={{ maxWidth: 250 }}
            readOnly={true}
          />
          <Stack direction="row" gap={1}>
            {!transferForm && !updateForm ? (
              <FormControl margin="dense" focused>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="LTO Renewal Date"
                    value={franchiseDetails?.LTO_RENEWAL_DATE}
                    readOnly={true}
                    views={["year", "month"]}
                    format="MMMM yyyy" // This will display the date in the format "Month Year"
                    slotProps={{ textField: { required: true } }}
                  />
                </LocalizationProvider>
              </FormControl>
            ) : null}

            <FormControl margin="dense" focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Renewal"
                  value={franchiseDetails.date}
                  readOnly={readOnly}
                  onChange={(date) =>
                    setFranchiseDetails((prev) => ({ ...prev, date: date }))
                  }
                  slotProps={{ textField: { required: true } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Stack>
        </FlexRow>
        {transferForm && (
          <FormControlLabel
            control={<Checkbox />}
            label="Change Owner"
            sx={{ mt: 1, mb: -1 }}
            value={franchiseDetails.changeOwner}
            onChange={(e) =>
              setFranchiseDetails((prev) => ({
                ...prev,
                changeOwner: e.target.checked,
              }))
            }
          />
        )}
        <Fieldset legend="Owner's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Firstname"
              readOnly={readOnly}
              value={franchiseDetails?.fname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="MI"
              value={franchiseDetails?.mi}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mi: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Lastname"
              value={franchiseDetails?.lname}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                readOnly={readOnly}
                disabled={disable}
                label="Sex"
                fullWidth
                value={
                  franchiseDetails.ownerSex ? franchiseDetails.ownerSex : ""
                }
                onChange={(e) =>
                  setFranchiseDetails((prev) => ({
                    ...prev,
                    ownerSex: e.target.value,
                  }))
                }
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
              disabled={readOnly || disable}
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
              readOnly={readOnly}
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.address}
              onInputChange={(_, value) => {
                setFranchiseDetails((prev) => ({
                  ...prev,
                  address: value || "",
                }));
              }}
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

        {transferForm && (
          <FormControlLabel
            control={<Checkbox />}
            label="Change Driver"
            sx={{ mt: 1, mb: -1 }}
            value={franchiseDetails.changeDriver}
            onChange={(e) =>
              setFranchiseDetails((prev) => ({
                ...prev,
                changeDriver: e.target.checked,
              }))
            }
          />
        )}

        <Fieldset legend="Driver's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Fullname"
              value={franchiseDetails?.drivername}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  drivername: e.target.value,
                }))
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                disabled={disable}
                readOnly={readOnly}
                label="Sex"
                fullWidth
                value={
                  franchiseDetails.driverSex ? franchiseDetails.driverSex : ""
                }
                onChange={(e) =>
                  setFranchiseDetails((prev) => ({
                    ...prev,
                    driverSex: e.target.value,
                  }))
                }
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
              disabled={readOnly || disable}
              label="Contact No."
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
              readOnly={readOnly}
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.driveraddress}
              onInputChange={(_, value) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driveraddress: value || "",
                }))
              }
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
              label="Driver's License no."
              value={franchiseDetails?.driverlicenseno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driverlicenseno: e.target.value,
                }))
              }
            />
          </FlexRow>
        </Fieldset>

        {transferForm && (
          <FormControlLabel
            control={<Checkbox />}
            label="Change Motor"
            sx={{ mt: 1, mb: -1 }}
            value={franchiseDetails.changeMotor}
            onChange={(e) =>
              setFranchiseDetails((prev) => ({
                ...prev,
                changeMotor: e.target.checked,
              }))
            }
          />
        )}

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Make"
              value={franchiseDetails?.make}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  make: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Model"
              value={franchiseDetails?.model}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  model: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              readOnly={readOnly}
              label="Plate no."
              value={franchiseDetails?.plateno}
              onChange={(v) => {
                setFranchiseDetails((prev) => ({
                  ...prev,
                  plateno: v.target.value,
                }));
              }}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Motor No."
              value={franchiseDetails?.motorno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  motorno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Stroke"
              value={franchiseDetails?.stroke}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  stroke: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Chassis No."
              value={franchiseDetails?.chassisno}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  chassisno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Fuel DISP.(cc)"
              value={franchiseDetails?.fuelDisp}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fuelDisp: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="OR no."
              value={franchiseDetails?.or}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  or: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="CR no."
              value={franchiseDetails?.cr}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  cr: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails?.tplProvider}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  tplProvider: e.target.value,
                }))
              }
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
                    readOnly={readOnly}
                    value={franchiseDetails?.tplDate1 || null}
                    onChange={(date) =>
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        tplDate1: date,
                      }))
                    }
                  />
                </LocalizationProvider>
                <Typography variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    readOnly={readOnly}
                    value={franchiseDetails?.tplDate2 || null}
                    onChange={(date) =>
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        tplDate2: date,
                      }))
                    }
                  />
                </LocalizationProvider>
              </Box>
            </FormControl>
          </FlexRow>
        </Fieldset>

        {transferForm && (
          <FormControlLabel
            control={<Checkbox />}
            label="Change TODA"
            sx={{ mt: 1, mb: -1 }}
            value={franchiseDetails.changeTODA}
            onChange={(e) =>
              setFranchiseDetails((prev) => ({
                ...prev,
                changeTODA: e.target.checked,
              }))
            }
          />
        )}

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={franchiseDetails?.typeofFranchise}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  typeofFranchise: e.target.value,
                }))
              }
            />

            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails?.kindofBusiness}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  kindofBusiness: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="TODA"
              value={franchiseDetails?.toda}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  toda: e.target.value,
                }))
              }
            />

            <OutlinedTextField
              label="Route"
              value={franchiseDetails?.route}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  route: e.target.value,
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <FormControl margin="dense" fullWidth focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Release of ST/TP"
                  value={franchiseDetails?.daterelease || null}
                  readOnly={readOnly}
                  onChange={(date) =>
                    setFranchiseDetails((prev) => ({
                      ...prev,
                      daterelease: date,
                    }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
            <OutlinedTextField
              label="Remarks"
              value={franchiseDetails?.remarks}
              readOnly={readOnly}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </FlexRow>

          {!transferForm && !updateForm && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Complaints</InputLabel>
              <Select
                readOnly
                multiple
                IconComponent={() => null}
                value={franchiseDetails.complaint}
                input={<OutlinedInput label="Complaints" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {franchiseDetails.complaint.map((v, i) => {
                      if (v != "")
                        return (
                          <Chip
                            sx={{ maxWidth: 750 }}
                            key={i}
                            label={v}
                            color={paidViolations[i] == v ? "primary" : "error"}
                          />
                        );
                    })}
                  </Box>
                )}
              ></Select>
            </FormControl>
          )}
        </Fieldset>
      </DialogForm>

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        msg={alertMsg}
        severity={alertSeverity}
      />

      <SnackBar
        open={transferAlertShown}
        onClose={setTransferAlertShown}
        msg="Please fill in the following details to transfer the franchise to another client. Make sure all information is accurate before submitting, as data is pending and will be saved after payment."
        severity={"info"}
        position={{ horizontal: "center", vertical: "top" }}
      />
      <SnackBar
        open={updateAlertShown}
        onClose={setUpdateAlertShown}
        msg="This form is for updating franchise information and renewal. Please ensure that the data you enter is accurate before submitting."
        severity={"info"}
        position={{ horizontal: "center", vertical: "top" }}
      />

      <ConfirmationDialog
        open={dropConfirm}
        setOpen={setDropConfirm}
        confirm={handleFranchiseRevoke}
        title="Confirm Revocation"
        content="Are you sure you want to revoke this franchise? This action cannot be undone. Revoking this franchise will make its MTOP available for another client."
        disabled={disable}
        serverity={"error"}
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
        open={transferConfirmation}
        setOpen={setTransferConfirmation}
        confirm={handleTransferSubmit}
        title="Transfer Franchise Confirmation"
        content="Please confirm the transfer of the franchise. Once confirmed, the new franchise will be added to the system, and the current franchise data will be moved to the archive."
        disabled={disable}
      />

      <ConfirmationDialog
        open={updateConfirmation}
        setOpen={setUpdateConfirmation}
        confirm={handleUpdateSubmit}
        title="Renewal Confirmation"
        content="Before proceeding, kindly confirm the update of franchise information. Your changes will go to pending status and saved after payment."
        disabled={disable}
      />

      {!archiveMode && (
        <DialogForm
          open={receiptModal}
          onClose={() => {
            setReceiptModal(false);
            setFranchiseDetails(initialFormInfo);
          }}
          title="Franchise Renewal Receipt"
          actions={
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setReceiptModal(false);
                  setFranchiseDetails(initialFormInfo);
                }}
              >
                close
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<PrintOutlined />}
                onClick={handlePrint}
              >
                Print
              </Button>
            </>
          }
        >
          <Box display="flex" justifyContent="center" minWidth={450}>
            <RenewFranchise
              ref={componentRef}
              franchiseDetails={franchiseDetails}
              fullname={auth?.fullname}
              receiptData={receiptData}
            />
          </Box>
        </DialogForm>
      )}

      {!archiveMode && (
        <DialogForm
          open={transferReceiptModal}
          onClose={() => {
            setTransferReceiptModal(false);
            setFranchiseDetails(initialFormInfo);
          }}
          title="Transfer Franchise Receipt"
          actions={
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setTransferReceiptModal(false);
                  setFranchiseDetails(initialFormInfo);
                }}
              >
                close
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<PrintOutlined />}
                onClick={handlePrintTransferReceipt}
              >
                Print
              </Button>
            </>
          }
        >
          <Box display="flex" justifyContent="center">
            <TransferFranchise
              ref={transferRecieptRef}
              franchiseDetails={franchiseDetails}
              fullname={auth?.fullname}
              receiptData={receiptData}
              initialFormInfo={initialFormInfo}
            />
          </Box>
        </DialogForm>
      )}

      {!archiveMode && (
        <DialogForm
          open={permitModal}
          onClose={() => {
            setPermitModal(false);
            setFranchiseDetails(initialFormInfo);
          }}
          title="Mayor's Permit"
          actions={
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setFranchiseDetails(initialFormInfo);
                  setPermitModal(false);
                }}
              >
                close
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<PrintOutlined />}
                onClick={handlePrintPermit}
              >
                Print
              </Button>
            </>
          }
        >
          {/* <MayorPermitPrintable
            ref={permitRef}
            franchiseDetails={franchiseDetails}
            model={model}
          /> */}
          <FlexRow>
            <OutlinedTextField
              label="Firstname"
              value={franchiseDetails?.fname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Firstname"
              value={franchiseDetails?.mi}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mi: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Firstname"
              value={franchiseDetails?.lname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="TODA"
              value={franchiseDetails?.toda}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  toda: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Address"
              value={franchiseDetails?.address}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Make"
              value={franchiseDetails?.make}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  make: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Chassis no"
              value={franchiseDetails?.chassisno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  chassisno: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <OutlinedTextField
              label="Plate no"
              value={franchiseDetails?.plateno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  plateno: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Motor no"
              value={franchiseDetails?.motorno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  motorno: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              label="Kind Business/Occupation"
              value={franchiseDetails?.kindofBusiness}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  kindofBusiness: e.target.value,
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              label="Remarks"
              value={franchiseDetails?.remarks}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
            />
          </FlexRow>
        </DialogForm>
      )}

      <Box display="none">
        <PrintableReport
          ref={reportComp}
          franchiseDetails={franchiseDetails}
          paidViolations={paidViolations}
        />
        <FranchiseFormPrintable
          ref={franchiseFormRef}
          franchiseDetails={franchiseDetails}
        />
        <MayorPermitPrintable
          ref={permitRef}
          franchiseDetails={franchiseDetails}
          model={model}
        />
      </Box>
    </>
  );
};

export default ClientInfo;
