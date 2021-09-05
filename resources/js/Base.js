import React from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { AiFillSchedule } from "@react-icons/all-files/ai/AiFillSchedule";
import { BsFillPersonLinesFill } from "@react-icons/all-files/bs/BsFillPersonLinesFill";
import { BsFillPeopleFill } from "@react-icons/all-files/bs/BsFillPeopleFill";
import { HiDocumentReport } from "@react-icons/all-files/hi/HiDocumentReport";

const Base = props => (
  <div>
    <Header />
    {props.user && props.user.id === "VolejRejNm" && (
      <SideNav
        onSelect={selected => (window.location = selected)}
        style={{ minHeight: "150vh" }}
      >
        <SideNav.Toggle />
        <SideNav.Nav>
          <NavItem eventKey="/">
            <NavIcon>
              <AiFillHome style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home Dashboard</NavText>
          </NavItem>
          <NavItem
            eventKey="siswa"
            onCLick={() => (window.location = "/siswa")}
          >
            <NavIcon>
              <BsFillPeopleFill style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Daftar Siswa</NavText>
          </NavItem>
          <NavItem eventKey="peserta">
            <NavIcon>
              <BsFillPersonLinesFill style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Peserta UKT</NavText>
          </NavItem>
          <NavItem eventKey="jadwal">
            <NavIcon>
              <AiFillSchedule style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Jadwal UKT</NavText>
          </NavItem>
          <NavItem eventKey="nilaiall">
            <NavIcon>
              <HiDocumentReport style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Nilai UKT</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    )}
    <main>{props.children}</main>
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(Base);
