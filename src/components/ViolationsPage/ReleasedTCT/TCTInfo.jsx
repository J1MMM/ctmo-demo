import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import DialogForm from "../../common/ui/DialogForm";
import FlexRow from "../../common/ui/FlexRow";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import ConfirmationDialog from "../../common/ui/ConfirmationDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SnackBar from "../../common/ui/SnackBar";
import useData from "../../../hooks/useData";
import tctHelper from "./tctHelper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TCTInfo = ({ open, onClose, ticketDetails, setTicketDetails }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setTickets } = useData();
  const [disable, setDisable] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleAddTCT = async () => {
    setDisable(true);
    try {
      const response = await axiosPrivate.put("/ticket", ticketDetails);
      setTickets((prev) => {
        return prev.map((v) => {
          if (v._id == response.data._id) {
            return response.data;
          } else {
            return v;
          }
        });
      });
      setAlertSeverity("success");
      setAlertMsg("Released TCT Updated Successfully");
      onClose(false);
      setTicketDetails(tctHelper.initialTicketDetails);
      console.log(response.data);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMsg("Error Updating Data.");
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
        title="Edit Released TCT"
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
              Submit
            </Button>
          </>
        }
      >
        <FlexRow>
          <OutlinedTextField
            disabled={disable}
            label="Ticket No."
            required={true}
            value={ticketDetails.ticketNo}
            onChange={(e) =>
              setTicketDetails((prev) => ({
                ...prev,
                ticketNo: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            label="TCT No. Release"
            required={true}
            value={ticketDetails.tctNo}
            onChange={(e) =>
              setTicketDetails((prev) => ({
                ...prev,
                tctNo: e.target.value,
              }))
            }
          />
          <FormControl margin="dense" fullWidth required>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Release"
                value={new Date(ticketDetails.dateReleased)}
                onChange={(date) =>
                  setTicketDetails((prev) => ({
                    ...prev,
                    dateReleased: date,
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
            label="Firstname"
            required={true}
            value={ticketDetails.firstname}
            onChange={(e) =>
              setTicketDetails((prev) => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            label="Lastname"
            required={true}
            value={ticketDetails.lastname}
            onChange={(e) =>
              setTicketDetails((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            disabled={disable}
            label="Middlename"
            value={ticketDetails.mname}
            onChange={(e) =>
              setTicketDetails((prev) => ({
                ...prev,
                mname: e.target.value,
              }))
            }
          />
        </FlexRow>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddTCT}
        title="Edit Released TCT"
        content="Are you sure you want to update this released TCT info? Once confirmed, the data will be saved to the system."
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

export default TCTInfo;
