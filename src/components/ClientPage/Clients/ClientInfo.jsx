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
import { QrCode, QrCode2, QrCodeOutlined } from "@mui/icons-material";
import PrintableReport from "./PrintableReport";
import { useReactToPrint } from "react-to-print";

const ClientInfo = ({
  open,
  onClose,
  franchiseDetails,
  setFranchiseDetails,
  archiveMode,
  printable,
  initialFormInfo,
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
  const [formTitle, setFormTitle] = useState("Client's Information");
  const { setFranchises, franchises } = useData();
  const [alertShown, setAlertShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [transferConfirmation, setTransferConfirmation] = useState(false);
  const [updateConfirmation, setUpdateConfirmation] = useState(false);

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
      console.log(response.data);
      const newFranchise = helper.formatFranchise(response.data.newFranchise);
      setFranchises((prev) => {
        const newFranchises = prev.map((franchise) => {
          if (franchise.mtop == response.data?.newFranchise.MTOP) {
            return newFranchise;
          } else {
            return franchise;
          }
        });
        return helper.sortData(newFranchises, "mtop");
      });
      setFranchiseDetails(newFranchise);
      setTransferForm(false);
      setReadOnly(true);
      helper.handleScrollToTop();
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise successfully transferred to the new owner, franchise information has been added to the system."
      );
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
      const newFranchise = helper.formatFranchise(response.data);
      setFranchises((prev) => {
        const newFranchises = prev.map((franchise) => {
          if (franchise.mtop == response.data.MTOP) {
            return newFranchise;
          } else {
            return franchise;
          }
        });
        return helper.sortData(newFranchises, "mtop");
      });
      setFranchiseDetails(newFranchise);
      setUpdateForm(false);
      setReadOnly(true);
      helper.handleScrollToTop();
      setAlertSeverity("success");
      setAlertMsg(
        "Franchise information updated successfully. Your changes have been saved and are now reflected in the system."
      );
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
      setFranchiseDetails(helper.initialFranchiseDetails);
    }
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

      if (transferForm) {
        formIsModified = helper.checkedFormModified(
          {
            ...helper.initialFranchiseDetails,
            mtop: franchiseDetails.mtop,
            date: franchiseDetails.date,
            id: franchiseDetails.id,
          },
          franchiseDetails
        );
      }

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

  const handleTransferClick = () => {
    setFormTitle("Transfer Franchise");
    setReadOnly(false);
    setTransferForm(true);
    setTransferAlertShown(true);
    helper.handleScrollToTop();
    clearForm();
  };

  const handleUpdateClick = () => {
    setFormTitle("Update Franchise");
    setReadOnly(false);
    setUpdateForm(true);
    setUpdateAlertShown(true);
    helper.handleScrollToTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transferForm ? setTransferConfirmation(true) : setUpdateConfirmation(true);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Box display="none">
        <PrintableReport
          ref={componentRef}
          franchiseDetails={franchiseDetails}
        />
      </Box>

      <DialogForm
        onSubmit={handleSubmit}
        title={formTitle}
        open={open}
        onClose={handleCloseOnclick}
        actions={
          !archiveMode && (
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
                    disabled={disable}
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
                    disabled={disable}
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
                    DROP
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
                    Update
                  </Button>
                </Box>
              </Collapse>
            </>
          )
        }
      >
        <Collapse in={printable && !updateForm && !transferForm}>
          <Button
            variant="outlined"
            sx={{ mb: 2, py: 1 }}
            startIcon={<QrCode />}
            size="small"
            onClick={handlePrint}
          >
            generate report
          </Button>
        </Collapse>

        <FlexRow>
          <OutlinedTextField
            required={true}
            label="MTOP"
            value={franchiseDetails?.mtop}
            sx={{ maxWidth: 250 }}
            readOnly={true}
          />

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
        </FlexRow>

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
                required
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              required={true}
              label="Contact number"
              value={franchiseDetails?.contact}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact: e.target.value,
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
                required
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <OutlinedTextField
              required={true}
              label="Contact no."
              value={franchiseDetails?.contact2}
              readOnly={readOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+63</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  contact2: e.target.value,
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
              required={true}
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

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
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
        msg="Please fill out the following details to transfer the franchise to another client. Ensure all information is accurate before submitting"
        severity={"info"}
        position={{ horizontal: "center", vertical: "top" }}
      />
      <SnackBar
        open={updateAlertShown}
        onClose={setUpdateAlertShown}
        msg="This form is for updating franchise information and renewal. Please ensure that the data you enter is accurate before submitting, as changes will be saved to the system."
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
        title="Update Franchise Confirmation"
        content="Before proceeding, kindly confirm the update of franchise information. Your changes will be saved upon submission."
        disabled={disable}
      />
    </>
  );
};

export default ClientInfo;
