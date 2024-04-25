import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../common/ui/PageContainer";
import PageNav from "../common/ui/PageNav";
import useAuth from "../../hooks/useAuth";
import ROLES_LIST from "../common/data/ROLES_LIST";

const ViolationsPageLayout = () => {
  const { auth } = useAuth();

  const ctmo1 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO1));
  const ctmo2 = Boolean(auth?.roles?.find((role) => role === ROLES_LIST.CTMO2));
  const cashier = Boolean(
    auth?.roles?.find((role) => role === ROLES_LIST.Cashier)
  );

  let navlinks = [];

  if (ctmo1 || cashier) {
    navlinks = [
      {
        title: "Violations",
        path: "",
      },
      {
        title: "Paid List",
        path: "paid",
      },
    ];
  } else if (ctmo2) {
    navlinks = [
      {
        title: "Violations",
        path: "",
      },
      {
        title: "Paid List",
        path: "paid",
      },
      {
        title: "Officers List",
        path: "officers",
      },
    ];
  } else {
    navlinks = [
      {
        title: "Violations",
        path: "",
      },
      {
        title: "Paid List",
        path: "paid",
      },
      {
        title: "Released TCT",
        path: "released-tct",
      },
      {
        title: "Officers List",
        path: "officers",
      },
    ];
  }

  return (
    <PageContainer>
      <PageNav navlinks={navlinks} />
      <Outlet />
    </PageContainer>
  );
};

export default ViolationsPageLayout;
