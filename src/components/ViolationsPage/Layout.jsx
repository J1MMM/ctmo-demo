import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../common/ui/PageContainer";
import PageNav from "../common/ui/PageNav";

const ViolationsPageLayout = () => {
  const navlinks = [
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

  return (
    <PageContainer>
      <PageNav navlinks={navlinks} />
      <Outlet />
    </PageContainer>
  );
};

export default ViolationsPageLayout;
