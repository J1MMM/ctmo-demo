import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DialogForm from "../common/ui/DialogForm";
import FlexRow from "../common/ui/FlexRow";
import OutlinedTextField from "../common/ui/OutlinedTextField";
import ConfirmationDialog from "../common/ui/ConfirmationDialog";

const initialAccountDetails = {
  fname: "",
  lname: "",
  mname: "",
  email: "",
  role: "",
  pwd: "",
  gender: "",
  address: "",
  contactNo: "",
};

const AddUserDialog = ({
  open,
  onClose,
  setUsers,
  setResMsg,
  setSnack,
  setSeverity,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails);
  const [pwdVisible, setPwdVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationShown(true);
  };

  const handleAddUser = async () => {
    setDisabled(true);
    try {
      const response = await axiosPrivate.post("users", accountDetails);

      setUsers((prev) => [...prev, response?.data?.result]);
      setResMsg(response?.data?.success);
      setSeverity("success");
      setSnack(true);
      onClose(false);
      setAccountDetails(initialAccountDetails);
    } catch (error) {
      if (!error?.response) {
        setResMsg("No Server Response");
      } else if (error?.response?.status == 409) {
        setResMsg("Email address is already use");
      } else {
        setResMsg("Request Failed");
      }
      setSeverity("error");
    }
    setDisabled(false);
    setConfirmationShown(false);
    setSnack(true);
    return;
  };

  return (
    <>
      <DialogForm
        title="Create Account"
        onSubmit={handleSubmit}
        open={open}
        onClose={() => onClose(false)}
        actions={
          <>
            <Button
              disabled={disabled}
              variant="outlined"
              size="small"
              onClick={() => onClose(false)}
            >
              cancel
            </Button>
            <Button
              disabled={disabled}
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
            disabled={disabled}
            label="First name"
            required
            value={accountDetails.fname}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, fname: e.target.value }))
            }
          />
          <OutlinedTextField
            disabled={disabled}
            required
            label="Last name"
            value={accountDetails.lname}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, lname: e.target.value }))
            }
          />
          <OutlinedTextField
            disabled={disabled}
            label="Middle name"
            value={accountDetails.mname}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, mname: e.target.value }))
            }
          />
        </FlexRow>

        <FlexRow>
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender">Sex</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              label="Gender"
              required
              disabled={disabled}
              value={accountDetails.gender}
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>

          <OutlinedTextField
            disabled={disabled}
            required
            label="Contact number"
            value={accountDetails.contactNo}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                contactNo: e.target.value,
              }))
            }
          />
        </FlexRow>
        <OutlinedTextField
          disabled={disabled}
          required
          label="Address"
          value={accountDetails.address}
          onChange={(e) =>
            setAccountDetails((prev) => ({ ...prev, address: e.target.value }))
          }
        />
        <FlexRow>
          <OutlinedTextField
            disabled={disabled}
            required
            type="email"
            label="Email Address"
            value={accountDetails.email}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              disabled={disabled}
              id="pwd"
              type={pwdVisible ? "text" : "password"}
              value={accountDetails.pwd}
              onChange={(e) =>
                setAccountDetails((prev) => ({ ...prev, pwd: e.target.value }))
              }
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    edge="end"
                    onClick={() => setPwdVisible(!pwdVisible)}
                  >
                    {pwdVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </FlexRow>
        <FormControl margin="dense" sx={{ minWidth: 340 }}>
          <InputLabel id="demo-simple-select-label">Station</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Station"
            value={accountDetails.role}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, role: e.target.value }))
            }
            disabled={disabled}
            required
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Cashier"}>Cashier</MenuItem>
            <MenuItem value={"CTMO1"}>CTMO1</MenuItem>
            <MenuItem value={"CTMO2"}>CTMO2</MenuItem>
            <MenuItem value={"CTMO3"}>CTMO3</MenuItem>
          </Select>
        </FormControl>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddUser}
        title="Create Account Confirmation"
        content="Please review the information you've provided. This account can be used after submission."
        disabled={disabled}
      />
    </>
  );
};

export default AddUserDialog;
