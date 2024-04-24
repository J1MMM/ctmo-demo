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
import React, { useState } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Vhelper from "./Vhelper";
import { Clear } from "@mui/icons-material";

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

const AddViolators = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { officersNames, violationsList, setViolations } = useData();

  const [disable, setDisable] = useState(false);
  const [violationDetails, setViolationDetails] = useState(
    Vhelper.initialDetails
  );
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setViolationDetails((prev) => ({ ...prev, violation: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleAddViolator = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("violation", violationDetails);
      console.log(response.data);

      setViolations((prev) => {
        const oldArr = [...prev];
        const newObj = response.data;
        oldArr.unshift(newObj); // Modify the original array
        return oldArr; // Return the modified array
      });

      setAlertSeverity("success");
      setAlertMsg("Violations Added Successfully");
      onClose(false);
      setViolationDetails(Vhelper.initialDetails);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error Adding Violations.");
      console.log(error);
    }
    setConfirmationShown(false);
    setAlertShown(true);
    setDisable(false);
  };

  const optionOthersSelected = Boolean(
    violationDetails.violation.find((v) => v.violation == "OTHERS")
  );

  return (
    <>
      <DialogForm
        onSubmit={handleSubmit}
        open={open}
        title="Add Violator"
        onClose={() => onClose(false)}
        actions={
          <>
            <Button
              disabled={disable}
              variant="outlined"
              size="small"
              onClick={() => onClose(false)}
            >
              cancel
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              size="small"
              type="submit"
            >
              Submit
            </Button>
          </>
        }
      >
        <Box width={600}>
          <FlexRow>
            <OutlinedTextField
              required
              disabled={disable}
              label="Ticket No."
              value={violationDetails.ticketNo}
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
                  label="Date of Apprehension"
                  value={violationDetails.dateApprehension}
                  onChange={(date) =>
                    setViolationDetails((prev) => ({
                      ...prev,
                      dateApprehension: date,
                    }))
                  }
                  slotProps={{ textField: { required: true } }}
                />
              </LocalizationProvider>
            </FormControl>
          </FlexRow>

          <FlexRow>
            <OutlinedTextField
              disabled={disable}
              label="Name of Violator"
              required
              value={violationDetails.name}
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
              required
              value={violationDetails.address}
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
                label="Type of Vehicle"
                IconComponent={
                  violationDetails.typeVehicle.length > 1
                    ? () => (
                        <IconButton
                          disabled={disable}
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
                value={violationDetails.typeVehicle}
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
              value={violationDetails.franchiseNo}
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
              required
              value={violationDetails.plateNo}
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
                IconComponent={
                  violationDetails.confiscatedDL.length > 1
                    ? () => (
                        <IconButton
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
                label="Type of Vehicle"
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
                  label="Time of Violation"
                  value={violationDetails.timeViolation}
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
              required
              value={violationDetails.placeViolation}
              onChange={(e) =>
                setViolationDetails((prev) => ({
                  ...prev,
                  placeViolation: e.target.value,
                }))
              }
            />
          </FlexRow>

          <Autocomplete
            options={officersNames}
            fullWidth
            value={violationDetails.officer}
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
                required
                label="Apprehending Officer"
              />
            )}
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="violations-committed">
              Violations Committed
            </InputLabel>
            <Select
              labelId="violations-committed"
              multiple
              value={violationDetails.violation}
              onChange={handleChange}
              input={<OutlinedInput label="Violations Committed" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((data) => (
                    <Chip key={data._id} label={data.violation} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {violationsList.map((data) => (
                <MenuItem key={data._id} value={data}>
                  <Checkbox
                    checked={violationDetails.violation.indexOf(data) > -1}
                  />
                  {data.violation}
                </MenuItem>
              ))}
            </Select>
            <Collapse in={optionOthersSelected} unmountOnExit mountOnEnter>
              <OutlinedTextField
                required
                disabled={disable}
                label="Specify the violation committed"
                value={violationDetails?.others}
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
              {`Total Amount: ${violationDetails.violation?.reduce(
                (total, obj) => total + obj["price"],
                0
              )}.00`}
            </FormHelperText>
          </FormControl>

          <OutlinedTextField
            disabled={disable}
            label="Remarks"
            value={violationDetails.remarks}
            onChange={(e) =>
              setViolationDetails((prev) => ({
                ...prev,
                remarks: e.target.value,
              }))
            }
          />

          <FlexRow>
            <OutlinedTextField disabled={true} label="OR Number" />
            <FormControl margin="dense" fullWidth required>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled
                  label="OR Date"
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
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddViolator}
        title="Add Violation Confirmation"
        content="Are you sure you want to add this violation? Once confirmed, the data will be added to the system. Please note that if the franchise number already exists, the violation will be shown in the complaints field."
        disabled={disable}
      />

      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />
    </>
  );
};

export default AddViolators;
