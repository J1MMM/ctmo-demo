import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Link,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import { Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import SnackBar from "../common/ui/SnackBar";
import spc_seal_logo from "../../assets/images/logo1.png";
import ctmo_logo from "../../assets/images/logo2.png";
import axios from "../../api/axios";
import "./style.scss";
import ForgotPassModal from "../ResetPassword/ForgotPassModal";
import ROLES_LIST from "../common/data/ROLES_LIST";

const LoginComponenet = () => {
  document.title = "LOGIN | TRICYCLE FRANCHISING AND RENEWAL SYSTEM";
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pwdVisible, setPwdVisible] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("error");

  const [fgpModal, setfgpModal] = useState(false);

  useEffect(() => {
    setSnackOpen(false);
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const fullname = response?.data?.fullname;
      const roleCode = roles.find((v) => v != 0);

      setAuth({ email, roles, accessToken, fullname, roleCode });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      setSnackOpen(true);
      setSnackSev("error");
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status == 400) {
        setErrMsg("All Field required");
      } else if (error.response?.status == 401) {
        setErrMsg("Incorrect Email or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
    setFormDisabled(false);
  };

  const fgpSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    try {
      const response = await axios.post(`/reset-password`, {
        data: {
          email: email,
        },
      });
      console.log(response.data);
      setErrMsg(response.data?.message);
      setSnackOpen(true);
      setSnackSev("success");
    } catch (err) {
      setErrMsg(err.response.data.message);
      setSnackOpen(true);
      setSnackSev("error");
      console.error(err);
      setFormDisabled(false);
    }

    setfgpModal(false);
    setFormDisabled(false);
  };

  if (auth?.accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      bgcolor="#000"
      sx={{
        minHeight: {
          xs: "95vh",
          sm: "none",
        },
      }}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      width="100%"
      height="100vh"
      boxSizing="border-box"
      overflow="hidden"
      p={3}
    >
      <Box className="bg-img-container" />
      <Box className="tint" />
      <Container
        className="login-form"
        maxWidth="xs"
        sx={{
          boxSizing: "border-box",
          bgcolor: "secondary.main",
          height: "100%",
          minHeight: {
            xs: "500px",
            sm: "none",
          },
          maxHeight: {
            xs: "500px",
            sm: "530px",
          },
          p: {
            xs: 1,
            sm: 3,
          },
          mt: {
            xs: -20,
            sm: 0,
          },
          borderRadius: 2,

          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          boxSizing="border-box"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="baseline"
          borderRadius={1}
          p={3}
          pt={0}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap={2}
            mb={2}
          >
            <img
              src={spc_seal_logo}
              alt="spc_seal_logo"
              draggable={false}
              style={{
                height: "85px",
                width: "85px",
              }}
            />
            <img
              src={ctmo_logo}
              alt="ctmo_logo"
              draggable={false}
              style={{
                height: "85px",
                width: "85px",
              }}
            />
          </Box>

          <Typography
            align="center"
            variant="h5"
            fontWeight="500"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "29px",
              },
              mb: {
                xs: 2,
                sm: 5,
              },
            }}
          >
            TRICYCLE FRANCHISING AND RENEWAL SYSTEM
          </Typography>

          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
              error={errMsg ? true : false}
              disabled={formDisabled ? true : false}
            />

            <FormControl fullWidth variant="outlined" sx={{ mt: 3, mb: 1 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="password"
                type={pwdVisible ? "text" : "password"}
                name="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                error={errMsg ? true : false}
                disabled={formDisabled ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled={formDisabled}
                      edge="end"
                      onClick={() => setPwdVisible(!pwdVisible)}
                      aria-label="eye-btn"
                      aria-labelledby="eye-btn"
                      className="eye-btn"
                    >
                      {pwdVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Link
              variant="subtitle2"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: formDisabled ? "lightgray" : "primary",
                pointerEvents: formDisabled && "none",
              }}
              onClick={() => setfgpModal(true)}
            >
              Forgot password?
            </Link>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: 1 }}
              size="large"
              type="submit"
              disabled={formDisabled}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
      <SnackBar
        msg={errMsg}
        open={snackOpen}
        onClose={setSnackOpen}
        severity={snackSev}
        position={{ horizontal: "right", vertical: "top" }}
      />
      <ForgotPassModal
        open={fgpModal}
        onClose={setfgpModal}
        onSubmit={fgpSubmit}
        email={email}
        setEmail={setEmail}
        formDisabled={formDisabled}
      />
    </Box>
  );
};

export default LoginComponenet;
