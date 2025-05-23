import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ConfirmationDialog from "../common/ui/ConfirmationDialog";
import SnackBar from "../common/ui/SnackBar";
import UsersTable from "./Users.Table";
import AddUserDialog from "./AddUserDialog";
import useData from "../../hooks/useData";
import NoServerResponse from "../common/ui/NoServerResponse";

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const { users, setUsers } = useData();

  const [addUserModal, setAddUserModal] = useState(false);
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [resMsg, setResMsg] = useState("");
  const [noResponse, setNoResponse] = useState(false);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        setNoResponse(false);
        isMounted &&
          setUsers(response.data?.filter((user) => user.archive == false));
      } catch (err) {
        setNoResponse(true);
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const handleDeleteUser = async () => {
    try {
      await axiosPrivate.patch("users", {
        idsToDelete: selectedRows,
        toAchive: true,
      });

      setUsers((prev) =>
        prev.filter((user) => !selectedRows.includes(user._id))
      );
      setResMsg(
        `${
          selectedRows.length > 1
            ? "Users Archived successfully."
            : "User Archived successfully."
        }`
      );
      setSeverity("success");
      setSnack(true);
    } catch (error) {
      console.error(error.message);
      setResMsg("Failed to Archived");
      setSeverity("error");
      setSnack(true);
    }
    setDeleteModal(false);
    setSelectedRows([]);
  };

  useEffect(() => {
    const sortBy = sorted ? "lastname" : "_id";

    const sortedData = [...users].sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    });

    setUsers(sortedData);
  }, [sorted]);

  if (noResponse) return <NoServerResponse show={noResponse} />;

  return (
    <>
      <UsersTable
        users={users}
        setDeleteModal={setDeleteModal}
        setAddUserModal={setAddUserModal}
        noResponse={noResponse}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setSorted={setSorted}
        sorted={sorted}
      />

      <AddUserDialog
        open={addUserModal}
        onClose={setAddUserModal}
        setResMsg={setResMsg}
        setSnack={setSnack}
        setUsers={setUsers}
        setSeverity={setSeverity}
      />

      <SnackBar
        open={snack}
        onClose={setSnack}
        msg={resMsg}
        severity={severity}
      />
      <ConfirmationDialog
        title={`Archive User${selectedRows.length > 1 ? "s" : ""}`}
        content={`Are you sure you want to archive this User${
          selectedRows.length > 1 ? "s" : ""
        } data?`}
        open={deleteModal}
        setOpen={setDeleteModal}
        confirm={handleDeleteUser}
      />
    </>
  );
};

export default Users;
