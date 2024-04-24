import React, { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userArchived, setUserArchived] = useState([]);

  const [availableMTOP, setAvailableMTOP] = useState([]);
  const [availableMTOPLoading, setAvailableMTOPLoading] = useState(true);

  const [franchises, setFranchises] = useState([]);
  const [franchisesLoading, setFranchisesLoading] = useState(true);

  const [archivedFranchises, setArchivedFranchises] = useState([]);
  const [archivedFranchisesLoading, setArchivedFranchisesLoading] =
    useState(true);

  const [officersNames, setOfficersNames] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [officersLoading, setOfficersLoading] = useState(true);

  const [violationsList, setViolationsList] = useState([]);
  const [violationsListLoading, setViolationsListLoading] = useState(true);
  const [violations, setViolations] = useState([]);
  const [violationsLoading, setViolationsLoading] = useState(true);

  const [paidList, setPaidList] = useState([]);
  const [paidListLoading, setPaidListLoading] = useState(true);

  const [tickets, setTickets] = useState([]);
  const [ticketLoading, setTicketLoading] = useState(true);

  const [franchiseAnalytics, setfranchiseAnalytics] = useState();
  const [violationAnalytics, setviolationAnalytics] = useState();

  const [headerShadow, setHeaderShadow] = useState(false);

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        userArchived,
        setUserArchived,
        franchises,
        setFranchises,
        archivedFranchises,
        setArchivedFranchises,
        availableMTOP,
        setAvailableMTOP,
        availableMTOPLoading,
        setAvailableMTOPLoading,
        franchisesLoading,
        setFranchisesLoading,
        archivedFranchisesLoading,
        setArchivedFranchisesLoading,
        officers,
        setOfficers,
        officersLoading,
        setOfficersLoading,
        officersNames,
        setOfficersNames,
        headerShadow,
        setHeaderShadow,
        violationsListLoading,
        setViolationsListLoading,
        violationsList,
        setViolationsList,
        violationsLoading,
        setViolationsLoading,
        violations,
        setViolations,
        paidListLoading,
        setPaidListLoading,
        paidList,
        setPaidList,
        ticketLoading,
        setTicketLoading,
        tickets,
        setTickets,
        franchiseAnalytics,
        setfranchiseAnalytics,

        violationAnalytics,
        setviolationAnalytics,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
