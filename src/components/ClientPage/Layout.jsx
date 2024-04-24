import React from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../common/ui/PageContainer";
import PageNav from "../common/ui/PageNav";

const ClientsPageLayout = () => {
  const navlinks = [
    {
      title: "Clients List",
      path: "",
    },
    {
      title: "Archived",
      path: "archive",
    },
  ];

  return (
    <PageContainer>
      <PageNav navlinks={navlinks} />
      <Outlet />
    </PageContainer>
  );
};

export default ClientsPageLayout;
