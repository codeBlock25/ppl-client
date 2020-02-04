import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Profile from './pages/profile'
import Nav from "./components/drop"
import Criminals from './pages/criminals';
import login from './pages/login';
import NewStaff from './components/newstaff';
import NewCriminal from './components/newcriminal';
import Firs from './pages/fir';
import NewFir from './components/newfir';
import Cases from './pages/cases';
import Messages from './pages/messages';


function App(){
  return (
    <React.Fragment>
      <Nav/>
      <section className="main">
        <NewStaff/>
        <NewCriminal/>
        <NewFir/>
        <Switch>
          <Route
            component={Profile}
            path="/profile"
            exact
          />
          <Route
            component={login}
            path="/login"
            exact
          />
          <Route
            component={Criminals}
            path="/criminals"
            exact
          />
          <Route
            component={Criminals}
            path="/criminals"
            exact
          />
          <Route
            component={Criminals}
            path="/criminals/view"
            exact
          />
          <Route
            component={Messages}
            path="/message"
            exact
          />
          <Route
            component={Cases}
            path="/cases"
          />
          <Redirect from="/" to="/profile" exact={true} />
        </Switch>
      </section>
    </React.Fragment>
  )
}

export default App;
