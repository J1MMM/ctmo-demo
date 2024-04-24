import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DialogForm from "../../common/ui/DialogForm";
import FlexRow from "../../common/ui/FlexRow";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SnackBar from "../../common/ui/SnackBar";
import useData from "../../../hooks/useData";
import helper from "../../common/data/helper";

const initialDetails = {
  callsign: "",
  firstname: "",
  lastname: "",
  mi: "",
};

const AddOfficer = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setOfficers } = useData();
  const [disable, setDisable] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [officerDetails, setOfficerDetails] = useState(initialDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleAddOfficer = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.post("/officers", officerDetails);
      setOfficers((prev) => {
        const newOfficers = [...prev, response.data];
        const sorted = helper.sortDesc(newOfficers, "apprehended");
        return sorted;
      });
      setAlertSeverity("success");
      setAlertMsg("Officer Added Successfully");
      onClose(false);
      setOfficerDetails(initialDetails);

      console.log(response.data);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error Adding Officer.");
      console.log(error);
    }

    setConfirmationShown(false);
    setAlertShown(true);
    setDisable(false);
  };

  return (
    <>
      <DialogForm
        open={open}
        onClose={() => onClose(false)}
        title="Add Officer"
        onSubmit={handleSubmit}
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
              submit
            </Button>
          </>
        }
      >
        <Box maxWidth={400}>
          <OutlinedTextField
            disabled={disable}
            label="Call Sign"
            required={true}
            sx={{ maxWidth: 200 }}
            value={officerDetails.callsign}
            onChange={(e) =>
              setOfficerDetails((prev) => ({
                ...prev,
                callsign: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            required={true}
            label="Firstname"
            value={officerDetails.firstname}
            onChange={(e) =>
              setOfficerDetails((prev) => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            required={true}
            label="Lastname"
            value={officerDetails.lastname}
            onChange={(e) =>
              setOfficerDetails((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            label="MI"
            sx={{ maxWidth: 80 }}
            value={officerDetails.mi}
            onChange={(e) =>
              setOfficerDetails((prev) => ({
                ...prev,
                mi: e.target.value,
              }))
            }
          />
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddOfficer}
        title="Add Officer Confirmation"
        content="Are you sure you want to add this Officer? Once confirmed, the data will be added to the system."
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

export default AddOfficer;
