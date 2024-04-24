import {
  Close,
  CloseRounded,
  Print,
  PrintOutlined,
  PrintRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogForm({ open, onClose, title, actions, children, onSubmit }) {
  return (
    <Dialog
      component={"form"}
      scroll="paper"
      id="client-info"
      open={open}
      disableAutoFocus
      maxWidth="md"
      TransitionComponent={Transition}
      onSubmit={onSubmit}
      sx={{ overflow: "hidden" }}
    >
      <DialogTitle
        bgcolor="primary.main"
        color="#FFF"
        fontWeight={500}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {title}
        <IconButton onClick={onClose}>
          <CloseRounded color="secondary" fontSize="medium" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent dividers id="client-info-content">
        {children}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

export default DialogForm;
