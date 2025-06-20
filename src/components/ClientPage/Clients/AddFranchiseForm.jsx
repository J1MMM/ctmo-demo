import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DialogForm from "../../common/ui/DialogForm";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import FlexRow from "../../common/ui/FlexRow";
import Fieldset from "../../common/ui/Fieldset";
import SnackBar from "../../common/ui/SnackBar";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import spcbrgy from "../../common/data/spcbrgy";
import helper from "../../common/data/helper";
import { MuiTelInput } from "mui-tel-input";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import NewFranchise from "../../Receipt/NewFranchise";
import { useReactToPrint } from "react-to-print";
import useAuth from "../../../hooks/useAuth";
import { Print, PrintOutlined } from "@mui/icons-material";

const AddFranchiseForm = ({ open, onClose }) => {
  document.title =
    "Clients Management | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
  const axiosPrivate = useAxiosPrivate();
  const { setDummyVariable, setFranchises, availableMTOP } = useData();
  const { auth } = useAuth();

  const [franchiseDetails, setFranchiseDetails] = useState(
    helper.initialFranchiseDetails
  );
  const [disable, setDisable] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [confirmationShown, setConfirmaionShown] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [receiptModal, setReceiptModal] = useState(false);

  const receiptCompRef = useRef(null);
  const handlePrintReceipt = useReactToPrint({
    content: () => receiptCompRef.current,
  });

  const handleAddFranchise = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("/franchise", franchiseDetails);
      setFranchiseDetails((prev) => ({ ...prev, refNo: response.data }));
      setDummyVariable((prev) => !prev);
      // setFranchises((prev) => {
      //   const newFranchises = [...prev, helper.formatFranchise(response.data)];
      //   return helper.sortData(newFranchises, "mtop");
      // });
      setAlertSeverity("success");
      setAlertMsg(
        "Success! The new franchise is in pending status. It will be added to the system after payment."
      );
      onClose(false);
      setReceiptModal(true);
    } catch (error) {
      console.log(error);
      setAlertSeverity("error");
      if (error.response?.status == 400) {
        setAlertMsg("Failed to add Franchise. " + error.response.data.message);
      } else {
        setAlertMsg("Failed to add Franchise. Please try again later.");
      }
    }
    setConfirmaionShown(false);
    setAlertShown(true);
    setDisable(false);
  };

  const availableMtopEl = availableMTOP.map((mtop, index) => {
    return (
      <MenuItem key={index} value={mtop}>
        {mtop}
      </MenuItem>
    );
  });

  return (
    <>
      <DialogForm
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmaionShown(true);
        }}
        printable={false}
        title="Add New Client"
        open={open}
        onClose={() => onClose(false)}
        actions={
          <>
            <Button
              variant="outlined"
              size="small"
              disabled={disable}
              onClick={() => onClose(false)}
            >
              cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              disabled={
                disable ||
                availableMTOP.length == 0 ||
                franchiseDetails.mtop == ""
              }
            >
              Submit
            </Button>
          </>
        }
      >
        <FlexRow>
          {/* <FormControl fullWidth margin="dense" sx={{ maxWidth: 250 }}>
            <InputLabel required>
              {availableMTOP.length == 0 ? "no available MTOP" : "MTOP"}
            </InputLabel>


            <Select
              disabled={availableMTOP.length == 0 || disable}
              label="MTOP"
              required
              fullWidth
              value={franchiseDetails.mtop}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mtop: e.target.value,
                }))
              }
            >
              {availableMtopEl}
            </Select>
          </FormControl> */}

          <Autocomplete
            sx={{ maxWidth: 250 }}
            freeSolo={false}
            clearIcon={false}
            options={availableMTOP}
            fullWidth
            value={franchiseDetails?.mtop}
            onChange={(_, value) =>
              setFranchiseDetails((prev) => ({
                ...prev,
                mtop: value || "",
              }))
            }
            renderInput={(params) => (
              <TextField {...params} margin="dense" required label="MTOP" />
            )}
          />
          <Box display={"flex"} gap={1}>
            <Button
              disableFocusRipple
              variant="outlined"
              size="small"
              sx={{
                px: 2,
                py: 1,
                height: "2.5rem",
                my: "auto",
              }}
              onClick={() => {
                const date = new Date();
                setFranchiseDetails((prev) => ({ ...prev, date: date }));
              }}
            >
              today
            </Button>

            <FormControl margin="dense" required>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Renewal"
                  value={franchiseDetails.date}
                  onChange={(date) =>
                    setFranchiseDetails((prev) => ({ ...prev, date: date }))
                  }
                  slotProps={{ textField: { required: true } }}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </FlexRow>
        <Fieldset legend="Owner's Information">
          <Box
            display="flex"
            gap={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <OutlinedTextField
              required={true}
              label="Firstname"
              value={franchiseDetails.fname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fname: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              label="Middlename"
              value={franchiseDetails.mi}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  mi: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Lastname"
              value={franchiseDetails.lname}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  lname: e.target.value.toUpperCase(),
                }))
              }
            />
          </Box>

          <FlexRow>
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                disabled={disable}
                label="Sex"
                fullWidth
                value={franchiseDetails.ownerSex}
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
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.address}
              onInputChange={(_, value) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  address: value.toUpperCase() || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  required
                  label="Address"
                  inputProps={{
                    ...params.inputProps,
                    style: { textTransform: "uppercase" }, // This will force the text to be uppercase
                  }}
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
              value={franchiseDetails.drivername}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  drivername: e.target.value.toUpperCase(),
                }))
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Sex</InputLabel>
              <Select
                disabled={disable}
                label="Sex"
                fullWidth
                value={franchiseDetails.driverSex}
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
              freeSolo
              clearIcon={false}
              options={spcbrgy}
              fullWidth
              value={franchiseDetails?.driveraddress}
              onInputChange={(_, value) => {
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driveraddress: value.toUpperCase() || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  required
                  label="Address"
                  inputProps={{
                    ...params.inputProps,
                    style: { textTransform: "uppercase" }, // This will force the text to be uppercase
                  }}
                />
              )}
            />
            <OutlinedTextField
              label="Driver's License no."
              value={franchiseDetails.driverlicenseno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  driverlicenseno: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>
        </Fieldset>

        <Fieldset legend="Vehicle's Information">
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Make"
              value={franchiseDetails?.make}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  make: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Model"
              value={franchiseDetails.model}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  model: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              required={true}
              label="Plate no."
              value={franchiseDetails.plateno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  plateno: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Motor No."
              value={franchiseDetails.motorno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  motorno: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              label="Stroke"
              value={franchiseDetails.stroke}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  stroke: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="Chassis No."
              value={franchiseDetails.chassisno}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  chassisno: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              required={false}
              label="Fuel DISP.(cc)"
              value={franchiseDetails.fuelDisp}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  fuelDisp: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              required={true}
              label="OR no."
              value={franchiseDetails.or}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  or: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              label="CR no."
              required={true}
              value={franchiseDetails.cr}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  cr: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <OutlinedTextField
              label="TPL Provider"
              value={franchiseDetails.tplProvider}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  tplProvider: e.target.value.toUpperCase(),
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
                    value={franchiseDetails.tplDate1}
                    onChange={(date) =>
                      setFranchiseDetails((prev) => ({
                        ...prev,
                        tplDate1: date,
                      }))
                    }
                  />
                </LocalizationProvider>
                <Typography component={"span"} variant="subtitle1" color="grey">
                  to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    value={franchiseDetails.tplDate2}
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
          </Box>
        </Fieldset>

        <Fieldset legend="Franchise Details">
          <FlexRow>
            <OutlinedTextField
              label="Type of Franchise"
              value={franchiseDetails.typeofFranchise}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  typeofFranchise: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              label="Kind of Business"
              value={franchiseDetails.kindofBusiness}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  kindofBusiness: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              required={true}
              label="TODA"
              value={franchiseDetails.toda}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  toda: e.target.value.toUpperCase(),
                }))
              }
            />
            <OutlinedTextField
              label="Route"
              value={franchiseDetails.route}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  route: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>
          <FlexRow>
            <FormControl margin="dense" fullWidth focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Release of ST/TP"
                  value={franchiseDetails.daterelease}
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
              value={franchiseDetails.remarks}
              onChange={(e) =>
                setFranchiseDetails((prev) => ({
                  ...prev,
                  remarks: e.target.value.toUpperCase(),
                }))
              }
            />
          </FlexRow>
        </Fieldset>
      </DialogForm>

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmaionShown}
        confirm={handleAddFranchise}
        title="New Franchise Confirmation"
        content="Are you sure you want to add this franchise? Once confirmed, it will be added to pending franchises and integrated into the system upon payment. "
        disabled={disable}
      />

      <DialogForm
        open={receiptModal}
        onClose={() => {
          setReceiptModal(false);
          setFranchiseDetails(helper.initialFranchiseDetails);
        }}
        title="New Franchise Receipt"
        actions={
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setReceiptModal(false);
                setFranchiseDetails(helper.initialFranchiseDetails);
              }}
            >
              close
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<PrintOutlined />}
              onClick={handlePrintReceipt}
            >
              Print
            </Button>
          </>
        }
      >
        <Box display="flex" justifyContent="center">
          <NewFranchise
            ref={receiptCompRef}
            franchiseDetails={franchiseDetails}
            fullname={auth?.fullname}
          />
        </Box>
      </DialogForm>
    </>
  );
};

export default AddFranchiseForm;
