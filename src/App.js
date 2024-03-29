import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Nav from "./components/drop";
import Criminals from "./pages/criminals";
import login from "./pages/login";
import NewStaff from "./components/newstaff";
import NewCriminal from "./components/newcriminal";
import NewFir from "./components/newfir";
import Cases from "./pages/cases";
import Messages from "./pages/messages";
import NewCrimeRecord from "./components/newcrimerecord";
import CriminalView from "./components/criminalView";

function App() {
  return (
    <>
      <Nav />
      <section className="main">
        <NewStaff />
        <NewCriminal />
        <NewFir />
        <NewCrimeRecord />
        <Switch>
          <Route component={Profile} path="/profile" exact />
          <Route component={login} path="/login" exact />
          <Route component={Criminals} path="/criminals" exact />
          <Route
            component={CriminalView}
            path="/criminals/view"
            exact={false}
          />
          <Route component={Messages} path="/message" exact />
          <Route component={Cases} path="/cases" />
          <Redirect from="/" to="/login" exact={true} />
        </Switch>
      </section>
    </>
  );
}

export default App;
