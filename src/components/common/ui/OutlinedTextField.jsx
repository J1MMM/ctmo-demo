import { TextField } from "@mui/material";
import React from "react";

function OutlinedTextField({
  label,
  value,
  onChange,
  readOnly,
  sx,
  required,
  InputProps,
  error,
  helperText,
  disabled,
  type,
}) {
  return (
    <TextField
      disabled={disabled}
      error={error}
      margin="dense"
      type={type || "text"}
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      inputProps={{ readOnly: readOnly }}
      fullWidth
      required={required}
      sx={sx}
      InputProps={InputProps}
      helperText={error && helperText}
    />
  );
}

export default OutlinedTextField;
