import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Grow,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../common/ui/UserAvatar";
import {
  Add,
  Close,
  Delete,
  DeleteOutline,
  EditOutlined,
  Print,
  PrintOutlined,
} from "@mui/icons-material";
import NoServerResponse from "../common/ui/NoServerResponse";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";

const UsersTable = ({
  users,
  setDeleteModal,
  setUpateUserModal,
  getUser,
  setAddUserModal,
  noResponse,
  selectedRows,
  setSelectedRows,
  sorted,
  setSorted,
}) => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleRowClick = (rowId) => {
    const adminId = users.filter((user) =>
      Object.values(user.roles).includes(1234)
    )[0]._id;
    if (rowId === adminId) return;
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  console.log(users);

  return (
    <>
      {noResponse ? (
        <NoServerResponse show={noResponse} />
      ) : (
        <Box p={2}>
          <Grow in={true}>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                position: "relative",
                boxSizing: "border-box",
                borderRadius: 3,
                zIndex: 10,
                height: "100vh",
                maxHeight: "80vh",
              }}
            >
              <Box
                bgcolor="#FFF"
                display="flex"
                justifyContent="space-between"
                p={3}
                pb={1}
                boxSizing="border-box"
                position="sticky"
                top="0"
                left="0"
                zIndex="99"
                sx={{
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                  <Box display="flex" alignItems="center" gap={1} mb={-0.5}>
                    <Typography component={"span"} variant="h5">
                      Users Management
                    </Typography>
                    <Chip
                      label={`${users?.length} ${
                        users.length <= 1 ? "User" : "Users"
                      }`}
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "primary.main",
                      }}
                      size="small"
                    />
                  </Box>
                  <Typography
                    component={"span"}
                    variant="caption"
                    color="InactiveCaptionText"
                  >
                    Overview of users and their roles for administrative
                    purposes.
                  </Typography>
                </Box>

                <Box display={"flex"} gap={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setAddUserModal(true)}
                    sx={{ mb: 2, py: 1, px: 2 }}
                    startIcon={<Add />}
                  >
                    create account
                  </Button>
                </Box>
              </Box>

              <Table
                sx={{ minWidth: 650, position: "relative" }}
                aria-label="simple table"
              >
                <TableHead sx={{ bgcolor: "#FCFCFD" }}>
                  <TableRow>
                    <TableCell colSpan={6} padding="none">
                      <Collapse in={selectedRows.length > 0}>
                        <Box
                          width="100%"
                          bgcolor="primary.main"
                          boxSizing="border-box"
                          display="flex"
                          alignItems="center"
                          gap={3}
                          position="relative"
                          p={1}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: "rgb(225, 225, 225)" }}
                            onClick={() => setSelectedRows([])}
                          >
                            <Close />
                          </IconButton>
                          <Typography
                            component={"span"}
                            variant="body1"
                            color="#FFF"
                            sx={{
                              fontSize: {
                                xs: "x-small",
                                sm: "x-small",
                                md: "small",
                              },
                            }}
                            ml={-2}
                          >
                            {selectedRows.length} selected
                          </Typography>

                          <Box
                            width="1px"
                            height="32px"
                            bgcolor="rgba(225, 225, 225, .3)"
                            display="block"
                          />

                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              color: "#FFF",
                              borderColor: "rgba(225, 225, 225, .8)",
                              "&:hover": {
                                borderColor: "#FFF",
                                bgcolor: "rgba(255, 255, 255, 0.10)",
                              },
                              p: "5px 14px",
                              fontSize: "x-small",
                            }}
                            onClick={() => {
                              setDeleteModal(true);
                            }}
                          >
                            Archive
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "10rem",
                      }}
                    >
                      <Checkbox
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < users?.length - 1
                        }
                        checked={
                          users.length - 1 == selectedRows.length &&
                          selectedRows.length != 0
                        }
                        onChange={() =>
                          setSelectedRows(
                            selectedRows.length === users.length - 1
                              ? []
                              : users
                                  .map((user) =>
                                    Boolean(user.roles.SuperAdmin)
                                      ? null
                                      : user._id
                                  )
                                  .filter((user) => user)
                          )
                        }
                        size={mobileView ? "small" : "medium"}
                        color="primary"
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
                      <TableSortLabel
                        active={sorted}
                        direction={sorted ? "asc" : "desc"}
                        onClick={() => setSorted((v) => !v)}
                      >
                        Full name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "5rem",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "5rem",
                      }}
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "5rem",
                      }}
                    >
                      Contact no.
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "5rem",
                      }}
                    >
                      Station
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "grey",
                        fontSize: { xs: "x-small", sm: "x-small", md: "small" },
                        minWidth: "5rem",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, index) => {
                    let isAdmin = Boolean(user.roles.SuperAdmin);
                    const avatar = `${user.firstname} ${user.lastname}`;
                    const fullname = `${user.firstname} ${user.middlename} ${user.lastname}`;

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": { bgcolor: "#f1f0fa" },
                          bgcolor: selectedRows.includes(user._id)
                            ? "#f1f0fa"
                            : "#FFF",
                        }}
                        onClick={() => handleRowClick(user._id)}
                      >
                        <TableCell
                          padding="checkbox"
                          sx={{
                            fontSize: {
                              xs: "x-small",
                              sm: "x-small",
                              md: "small",
                            },
                            minWidth: { xs: "12rem", sm: "12rem", md: "15rem" },
                          }}
                        >
                          <Checkbox
                            size={mobileView ? "small" : "medium"}
                            color="primary"
                            inputProps={{
                              "aria-label": "select row",
                            }}
                            checked={selectedRows.includes(user._id)}
                            onClick={() => handleRowClick(user._id)}
                            disabled={isAdmin ? true : false}
                            indeterminate={isAdmin ? true : false}
                          />
                          <Typography
                            component={"span"}
                            variant="inherit"
                            mr={1}
                          >
                            {`${fullname} `}
                          </Typography>
                          {user.gender == "male" ? (
                            <PiGenderMaleBold color="rgb(2,170,232)" />
                          ) : (
                            <PiGenderFemaleBold color="#EF5890" />
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: {
                              xs: "x-small",
                              sm: "x-small",
                              md: "small",
                            },
                            minWidth: "5rem",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <UserAvatar
                              fullname={avatar}
                              height={"35px"}
                              width={"35px"}
                              fontSize="70%"
                            />
                            {user.email}
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: {
                              xs: "x-small",
                              sm: "x-small",
                              md: "small",
                            },
                            minWidth: "5rem",
                          }}
                        >
                          {user.address}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: {
                              xs: "x-small",
                              sm: "x-small",
                              md: "small",
                            },
                            minWidth: "5rem",
                          }}
                        >
                          {user.contactNo}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: {
                              xs: "x-small",
                              sm: "x-small",
                              md: "small",
                            },
                            minWidth: "5rem",
                          }}
                        >
                          <Chip
                            label={Object.keys(user.roles).filter(
                              (key) => user.roles[key] !== 0
                            )}
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              color: isAdmin ? "#000" : "primary.main",
                              bgcolor: "#EFF4FF",
                              fontSize: "x-small",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setUpateUserModal(true);
                                getUser(user?._id);
                              }}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {users.length < 1 && (
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  boxSizing="border-box"
                  height="50vh"
                >
                  <CircularProgress />
                </Box>
              )}
            </TableContainer>
          </Grow>
        </Box>
      )}
    </>
  );
};

export default UsersTable;
