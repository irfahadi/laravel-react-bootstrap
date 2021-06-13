import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Archive from "../pages/Archive";
import NoMatch from "../pages/NoMatch";
import Siswa from "../pages/Siswa";
import Peserta from "../pages/Peserta";
import Profile from "../pages/Profile";
import Jadwal from "../pages/Jadwal";
import Nilai from "../pages/Nilai";
import NilaiDetail from "../pages/NilaiDetail";
import Update from "../pages/Update";

const routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    component: Dashboard,
    fallback: Home
  },
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login
  },
  {
    path: "/register",
    exact: true,
    auth: false,
    component: Register
  },
  {
    path: "/forgot-password",
    exact: true,
    auth: false,
    component: ForgotPassword
  },
  {
    path: "/reset-password",
    exact: true,
    auth: false,
    component: ResetPassword
  },
  {
    path: "/archive",
    exact: true,
    auth: true,
    component: Archive
  },
  {
    path: "/siswa",
    exact: true,
    auth: true,
    component: Siswa
  },
  {
    path: "/peserta",
    exact: true,
    auth: true,
    component: Peserta
  },
  {
    path: "/jadwal",
    exact: true,
    auth: true,
    component: Jadwal
  },
  {
    path: "/nilaiall",
    exact: true,
    auth: true,
    component: Nilai
  },
  {
    path: "/nilai/:id",
    exact: true,
    auth: true,
    component: NilaiDetail
  },
  {
    path: "/update/:id",
    exact: true,
    auth: true,
    component: Update
  },
  {
    path: "/:id",
    exact: true,
    auth: true,
    component: Profile
  },
  {
    path: "",
    exact: false,
    auth: false,
    component: NoMatch
  }
];

export default routes;
