import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../common/data/ROLES_LIST";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { Typography } from "@mui/material";
import { BsArchive, BsGraphUpArrow } from "react-icons/bs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./style.scss";
import { PiUserList } from "react-icons/pi";
import { RiFolderWarningLine } from "react-icons/ri";

const Navbar = ({ navOpen }) => {
  const { auth } = useAuth();
  const isAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.SuperAdmin)
  );

  return (
    <div className="navbar">
      <nav className="navbar-nav">
        <NavLink to="/" className={navOpen ? "open" : ""}>
          {isAdmin ? (
            <>
              <FiUsers size={24} style={{ minWidth: 26 }} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Users
              </Typography>
            </>
          ) : (
            <>
              <BsGraphUpArrow size={20} style={{ minWidth: 26 }} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Dashboard
              </Typography>
            </>
          )}
        </NavLink>

        {isAdmin && (
          <NavLink to={"user-archive"} className={navOpen ? "open" : ""}>
            <BsArchive size={24} style={{ minWidth: 26 }} />
            <Typography component={"span"} className={navOpen ? "active" : ""}>
              Archived
            </Typography>
          </NavLink>
        )}
        {!isAdmin && (
          <>
            <NavLink to="clients" className={navOpen ? "open" : ""}>
              <PiUserList size={26} style={{ minWidth: 26 }} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Clients
              </Typography>
            </NavLink>
            <NavLink to="violations" className={navOpen ? "open" : ""}>
              <RiFolderWarningLine size={26} style={{ minWidth: 26 }} />
              <Typography
                component={"span"}
                className={navOpen ? "active" : ""}
              >
                Violations
              </Typography>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
