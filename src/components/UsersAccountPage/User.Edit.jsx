import { Male, Visibility, VisibilityOff } from "@mui/icons-material";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";

import {
  Autocomplete,
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DialogForm from "../common/ui/DialogForm";
import FlexRow from "../common/ui/FlexRow";
import OutlinedTextField from "../common/ui/OutlinedTextField";
import ConfirmationDialog from "../common/ui/ConfirmationDialog";
import { MuiTelInput } from "mui-tel-input";
import spcbrgy from "../common/data/spcbrgy";
import SnackBar from "../common/ui/SnackBar";
import helper from "../common/data/helper";
import useData from "../../hooks/useData";

function validatePassword(password) {
  // Check if password length is at least 8 characters
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check if password contains at least one digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  // Check if password contains at least one special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // Password is valid
  return "Password is valid.";
}

const UserEditModal = ({
  open,
  onClose,
  accountDetails,
  setAccountDetails,
  prevDetails,
  setPrevDetails,
}) => {
  const { setUsers } = useData();
  const axiosPrivate = useAxiosPrivate();
  const [pwdVisible, setPwdVisible] = useState(false);
  const [pwdVisible2, setPwdVisible2] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [confirmationShown, setConfirmationShown] = useState(false);
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [snack, setSnack] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      accountDetails.firstname.trim() == "" ||
      accountDetails.lastname.trim() == ""
    ) {
      setResMsg("firstname and lastname cannot be empty.");
      setSeverity("error");
      setSnack(true);
      setConfirmationShown(false);
      setError(true);
      return;
    }

    const msg = validatePassword(accountDetails.pwd);
    if (prevDetails.email != accountDetails.email) {
      try {
        const result = await axiosPrivate.post("users/email", {
          email: accountDetails.email,
        });

        console.log(result.data);
        if (result.data?.length > 0) {
          setResMsg("Email address is already use");
          setSeverity("error");
          setSnack(true);
          setConfirmationShown(false);
          setError(true);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (msg != "Password is valid." && accountDetails.pwd != "") {
      setResMsg(msg);
      setSeverity("error");
      setSnack(true);
      setConfirmationShown(false);
      setError(true);
      return;
    }

    if (accountDetails.pwd != accountDetails.pwd2) {
      setResMsg("Passwords do not match.");
      setSeverity("error");
      setSnack(true);
      setConfirmationShown(false);
      setError(true);
      return;
    }

    setConfirmationShown(true);
  };

  const handleAddUser = async () => {
    setDisabled(true);

    try {
      const response = await axiosPrivate.put("users", {
        id: accountDetails.id,
        firstname: accountDetails.firstname.trimStart().trimEnd(),
        lastname: accountDetails.lastname.trimStart().trimEnd(),
        middlename: accountDetails.middlename.trimStart()?.trimEnd(),
        email: accountDetails.email.trimStart().trimEnd(),
        password: accountDetails.pwd,
        contactNo: accountDetails.contactNo.trimStart()?.trimEnd(),
        address: accountDetails.address.trimStart()?.trimEnd(),
        gender: accountDetails.gender,
        role: accountDetails.role,
      });

      setUsers((prev) => {
        return prev.map((data) => {
          if (data._id == accountDetails.id) {
            return response.data?.result;
          }
          return data;
        });
      });
      setResMsg(response?.data?.success);
      setSeverity("success");
      setSnack(true);
      setPrevDetails(accountDetails);
    } catch (error) {
      console.log(error);
      setSeverity("error");
      if (!error?.response) {
        setResMsg("No Server Response");
      } else if (error?.response?.status == 304) {
        setSeverity("warning");
        setResMsg(`No changes for user with email: ${accountDetails?.email}`);
      } else if (error?.response?.status == 409) {
        setResMsg("Email address is already use");
      } else {
        setResMsg("Request Failed");
      }
      setSnack(true);
    }
    setDisabled(false);
    setConfirmationShown(false);
    setSnack(true);
    return;
  };

  useEffect(() => {
    setError(false);
  }, [accountDetails]);

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
              disabled={
                disabled ||
                !helper.checkedFormModified(prevDetails, accountDetails)
              }
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
            error={error}
            disabled={disabled}
            label="First name"
            required
            value={accountDetails.firstname}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            error={error}
            disabled={disabled}
            required
            label="Last name"
            value={accountDetails.lastname}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
          <OutlinedTextField
            error={error}
            disabled={disabled}
            label="M.I. (optional)"
            value={accountDetails.middlename}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                middlename: e.target.value,
              }))
            }
          />
        </FlexRow>

        <FlexRow>
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender">Sex</InputLabel>
            <Select
              error={error}
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
              <MenuItem value={"male"}>
                <Stack direction="row">
                  Male
                  <PiGenderMaleBold size={14} color="rgb(2,170,232)" />
                </Stack>
              </MenuItem>
              <MenuItem value={"female"}>
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
            error={error}
            fullWidth
            margin="dense"
            defaultCountry="PH"
            disableDropdown
            forceCallingCode
            value={accountDetails.contactNo}
            onChange={(newNum) =>
              setAccountDetails((prev) => ({
                ...prev,
                contactNo: newNum,
              }))
            }
          />
          <Autocomplete
            freeSolo
            options={spcbrgy}
            fullWidth
            value={accountDetails?.address}
            onInputChange={(_, value) =>
              setAccountDetails((prev) => ({
                ...prev,
                address: value || "",
              }))
            }
            renderInput={(params) => (
              <TextField
                error={error}
                {...params}
                margin="dense"
                required
                label="Address"
              />
            )}
          />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField
            error={error}
            disabled={disabled}
            required
            type="email"
            label="Email Address"
            value={accountDetails.email}
            onChange={(e) =>
              setAccountDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <FormControl margin="dense" fullWidth disabled>
            <InputLabel id="demo-simple-select-label">Station</InputLabel>
            <Select
              error={error}
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
        </FlexRow>

        <FlexRow>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              error={error}
              disabled={disabled}
              id="pwd"
              type={pwdVisible ? "text" : "password"}
              value={accountDetails.pwd}
              onChange={(e) =>
                setAccountDetails((prev) => ({ ...prev, pwd: e.target.value }))
              }
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
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <OutlinedInput
              error={error}
              disabled={disabled}
              id="pwd2"
              type={pwdVisible2 ? "text" : "password"}
              value={accountDetails.pwd2}
              onChange={(e) =>
                setAccountDetails((prev) => ({ ...prev, pwd2: e.target.value }))
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    edge="end"
                    onClick={() => setPwdVisible2((v) => !v)}
                  >
                    {pwdVisible2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
        </FlexRow>
      </DialogForm>

      <ConfirmationDialog
        open={confirmationShown}
        setOpen={setConfirmationShown}
        confirm={handleAddUser}
        title="Confirm Submission"
        content="Are you sure you want to submit the changes?"
        disabled={disabled}
      />

      <SnackBar
        open={snack}
        onClose={setSnack}
        msg={resMsg}
        severity={severity}
      />
    </>
  );
};

export default UserEditModal;
