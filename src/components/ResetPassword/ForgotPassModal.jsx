import { Mail } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgotPassModal({
  open,
  onClose,
  onSubmit,
  email,
  setEmail,
  formDisabled,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          minWidth: {
            md: "400px",
          },
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Typography
          component={"span"}
          sx={{ fontSize: { xs: 26, sm: 22, md: 24 } }}
        >
          Forgot Password
        </Typography>
        <Typography
          component={"span"}
          variant="body1"
          mb={2}
          sx={{ fontSize: { xs: 12, sm: 14 } }}
        >
          You will receive link for reseting your password.
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            autoFocus
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            disabled={formDisabled ? true : false}
          />
          <Box display="flex" alignItems="center" gap={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              type="button"
              onClick={() => onClose(false)}
              disabled={formDisabled}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={formDisabled}
            >
              <Mail sx={{ mr: 1 }} />
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}
