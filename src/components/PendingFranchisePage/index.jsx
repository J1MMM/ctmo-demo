import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../common/ui/PageContainer";
import PageNav from "../common/ui/PageNav";

const PendingPageLayout = () => {
  let navlinks = [
    {
      title: "Pending",
      path: "",
    },
    {
      title: "Paid List",
      path: "paid",
    },
  ];

  return (
    <PageContainer>
      <PageNav navlinks={navlinks} />
      <Outlet />
    </PageContainer>
  );
};

export default PendingPageLayout;
