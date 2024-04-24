import { Box, Button } from "@mui/material";
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
  apprehended: "",
};

const OfficerInfo = ({ open, onClose, officerInfo, setOfficerInfo }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setOfficers } = useData();
  const [disable, setDisable] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [confirmationDeleteShown, setConfirmationDeleteShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleClose = () => {
    setEditMode(false);
    setReadOnly(true);
    onClose(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleDelete = async () => {
    setDisable(true);
    try {
      await axiosPrivate.delete("/officers", { data: { id: officerInfo._id } });
      setOfficers((prev) => prev.filter((v) => v._id != officerInfo._id));
      setAlertSeverity("success");
      setAlertMsg("Officer Deleted Successfully");
      onClose(false);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error deleting officer. Please try again later.");
      console.log(error);
    }
    setConfirmationDeleteShown(false);
    setAlertShown(true);
    setDisable(false);
  };

  const handleUpdateOfficer = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.put("/officers", officerInfo);
      console.log(response.data);
      setOfficers((prev) => {
        const updatedOfficers = prev.map((data) => {
          if (data._id == response.data?._id) {
            return response.data;
          } else {
            return data;
          }
        });

        return helper.sortDesc(updatedOfficers, "apprehended");
      });
      setAlertSeverity("success");
      setAlertMsg("Officer Updated Successfully");
      onClose(false);
      setOfficerInfo(initialDetails);
      setEditMode(false);
      setReadOnly(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error Updating Officer.");
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
        onClose={handleClose}
        title="Add Officer"
        onSubmit={handleSubmit}
        actions={
          <>
            {editMode ? (
              <>
                <Button
                  disabled={disable}
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
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
            ) : (
              <>
                <Button
                  disabled={disable}
                  variant="outlined"
                  size="small"
                  onClick={handleClose}
                >
                  cancel
                </Button>
                <Button
                  disabled={disable}
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => setConfirmationDeleteShown(true)}
                >
                  delete
                </Button>
                <Button
                  disabled={disable}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setEditMode(true);
                    setReadOnly(false);
                  }}
                >
                  edit
                </Button>
              </>
            )}
          </>
        }
      >
        <Box maxWidth={500}>
          <FlexRow>
            <OutlinedTextField
              readOnly={readOnly}
              disabled={disable}
              label="Call Sign"
              required={true}
              value={officerInfo.callsign}
              onChange={(e) =>
                setOfficerInfo((prev) => ({
                  ...prev,
                  callsign: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              readOnly={true}
              disabled={disable}
              label="No. of Apprehended"
              required={true}
              value={officerInfo.apprehended}
            />
          </FlexRow>
          <FlexRow>
            <OutlinedTextField
              readOnly={readOnly}
              disabled={disable}
              required={true}
              label="Firstname"
              value={officerInfo.firstname}
              onChange={(e) =>
                setOfficerInfo((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              readOnly={readOnly}
              disabled={disable}
              required={true}
              label="Lastname"
              value={officerInfo.lastname}
              onChange={(e) =>
                setOfficerInfo((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
            />
            <OutlinedTextField
              readOnly={readOnly}
              disabled={disable}
              label="MI"
              sx={{ maxWidth: 80 }}
              value={officerInfo.mi}
              onChange={(e) =>
                setOfficerInfo((prev) => ({
                  ...prev,
                  mi: e.target.value,
                }))
              }
            />
          </FlexRow>
        </Box>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        title="Update Confirmation"
        content="Before proceeding, kindly confirm the update of officer's information. Your changes will be saved upon submission."
        confirm={handleUpdateOfficer}
        disabled={disable}
      />
      <SnackBar
        open={alertShown}
        onClose={setAlertShown}
        severity={alertSeverity}
        msg={alertMsg}
      />
      <ConfirmationDialog
        open={confirmationDeleteShown}
        setOpen={setConfirmationDeleteShown}
        confirm={handleDelete}
        title="Confirm Delete"
        content="Are you sure you want to permanently delete this officer? This action cannot be undone."
        disabled={disable}
        serverity={"error"}
      />
    </>
  );
};

export default OfficerInfo;
