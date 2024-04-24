import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashboardPage/Dashboard";
import Missing from "./components/Missing";
import RequireAuth from "./components/Auth/RequireAuth";
import Unauthorized from "./components/common/ui/Unauthorized";
import PersistLogin from "./components/Auth/PersistLogin";
import ROLES_LIST from "./components/common/data/ROLES_LIST";
import LoginComponenet from "./components/Login/index";
import ResetPassword from "./components/ResetPassword/resetPassword";
import VerifyResetToken from "./components/ResetPassword/VerifyResetToken";
import ClientsPageLayout from "./components/ClientPage/Layout";
import ClientsTable from "./components/ClientPage/Clients/ClientsTable";
import ClientArchived from "./components/ClientPage/ArchiveClients/ClientsArchived";
import ViolationsTable from "./components/ViolationsPage/Violations/ViolationsTable";
import PaidTable from "./components/ViolationsPage/Paid/PaidList";
import ReleasedtctTable from "./components/ViolationsPage/ReleasedTCT/ReleasedtctTable";
import ViolationsPageLayout from "./components/ViolationsPage/Layout";
import UserArchive from "./components/UsersAccountPage/UserArchive";
import Users from "./components/UsersAccountPage/Users";
import useAuth from "./hooks/useAuth";
import OfficersList from "./components/ViolationsPage/Officers/OfficersList";

function App() {
  const { auth } = useAuth();
  const isSuperAdmin = Boolean(
    auth.roles?.find((v) => v == ROLES_LIST.SuperAdmin)
  );

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<LoginComponenet />} />

        <Route path="/" element={<Layout />}>
          <Route path="" element={isSuperAdmin ? <Users /> : <Dashboard />} />
          <Route
            element={<RequireAuth allowedRoles={[ROLES_LIST.SuperAdmin]} />}
          >
            <Route path="user-archive" element={<UserArchive />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES_LIST.Admin,
                  ROLES_LIST.CTMO1,
                  ROLES_LIST.CTMO2,
                  ROLES_LIST.CTMO3,
                  ROLES_LIST.Cashier,
                ]}
              />
            }
          >
            <Route path="clients" element={<ClientsPageLayout />}>
              <Route path="" element={<ClientsTable />} />
              <Route path="archive" element={<ClientArchived />} />
            </Route>

            <Route path="violations" element={<ViolationsPageLayout />}>
              <Route path="" element={<ViolationsTable />} />
              <Route path="paid" element={<PaidTable />} />
              <Route path="released-tct" element={<ReleasedtctTable />} />
              <Route path="officers" element={<OfficersList />} />
            </Route>
          </Route>
        </Route>

        <Route element={<VerifyResetToken />}>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
