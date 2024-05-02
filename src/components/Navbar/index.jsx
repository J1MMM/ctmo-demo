import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../common/data/ROLES_LIST";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { List, Typography } from "@mui/material";
import { BsArchive, BsGraphUpArrow } from "react-icons/bs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./style.scss";
import { PiUserList } from "react-icons/pi";
import { RiFolderWarningLine } from "react-icons/ri";
import { ListAlt, ListAltOutlined } from "@mui/icons-material";

const Navbar = ({ navOpen }) => {
  const { auth } = useAuth();
  const isSuperAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.SuperAdmin)
  );

  const isAdmin = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.Admin)
  );

  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));
  const ctmo2 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO2));
  const ctmo3 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO3));
  const cashier = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.Cashier)
  );

  return (
    <div className="navbar">
      <nav className="navbar-nav">
        <NavLink to="/" className={navOpen ? "open" : ""}>
          {isSuperAdmin ? (
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

        {isSuperAdmin && (
          <NavLink to={"user-archive"} className={navOpen ? "open" : ""}>
            <BsArchive size={24} style={{ minWidth: 26 }} />
            <Typography component={"span"} className={navOpen ? "active" : ""}>
              Archived
            </Typography>
          </NavLink>
        )}

        {!isSuperAdmin && (
          <>
            {!ctmo3 && !cashier && (
              <NavLink to="clients" className={navOpen ? "open" : ""}>
                <PiUserList size={26} style={{ minWidth: 26 }} />
                <Typography
                  component={"span"}
                  className={navOpen ? "active" : ""}
                >
                  Clients
                </Typography>
              </NavLink>
            )}
            {!ctmo1 && !ctmo2 && !ctmo3 && (
              <NavLink to="franchise" className={navOpen ? "open" : ""}>
                <ListAltOutlined size={26} style={{ minWidth: 26 }} />
                <Typography
                  component={"span"}
                  className={navOpen ? "active" : ""}
                >
                  Franchise
                </Typography>
              </NavLink>
            )}

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
