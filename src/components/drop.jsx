import React, { Component } from "react";
import "../styles/nav.sass";
import { NavLink, withRouter } from "react-router-dom";
import { AccountCircle, Chat, Work, Note, ExitToApp } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { connect } from "react-redux";
import { newfirAction } from "../redux/actions/controls";

class Nav extends Component {
  render() {
    const { details } = this.props;
    return (
      <nav>
        <span
          className="logo"
          role="img"
          style={{ backgroundImage: `url("/images/logo.png")` }}
        />
        <span className="name">
          Officer. {details ? details.full_name.split(" ")[0] : "J"}{" "}
        </span>
        <div className="links">
          <>
            <NavLink
              className="link"
              to="/profile"
              onClick={() => {
                if (this.props.newfir) {
                  this.props.firopen();
                }
              }}
            >
              <AccountCircle /> Profile
            </NavLink>
            <NavLink
              className="link"
              to="/criminals"
              onClick={() => {
                if (this.props.newfir) {
                  this.props.firopen();
                }
              }}
            >
              <AccountCircle /> Criminals
            </NavLink>
            <NavLink
              className="link"
              to="/cases"
              onClick={() => {
                if (this.props.newfir) {
                  this.props.firopen();
                }
              }}
            >
              <Work /> cases
            </NavLink>
            <NavLink
              className="link"
              to="/firs"
              onClick={() => this.props.firopen()}
            >
              <Note /> FIR
            </NavLink>
          </>
        </div>
        <Fab
          className="chatBtn"
          onClick={() => {
            this.props.history.push("/message");
          }}
        >
          <Chat />
        </Fab>
        <Fab
          className="chatBtn"
          onClick={() => {
            this.props.history.push("/login");
          }}
          variant="extended"
        >
          <ExitToApp /> logout
        </Fab>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    details: state.details.staffDetails,
    newfir: state.controls.newfir_panel_open,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firopen: () => {
      dispatch(newfirAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
