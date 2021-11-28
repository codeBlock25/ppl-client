import React, { Component } from "react";
import { TextField, Fab } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { apiUrl } from "../config";

class Case extends Component {
  constructor(props) {
    super(props);
    this.state = {
      case: [],
      officers: [],
      assignedStaff: "",
    };
    this.fetchP = this.fetchP.bind(this);
    this.assign = this.assign.bind(this);
  }
  async fetchP() {
    let id = this.props.location.pathname.split("/")[2];
    console.log(id);
    await Axios({
      method: "GET",
      url: `${apiUrl}/cases/case?id=${id}`,
    })
      .then((data) => {
        this.setState({ case: data.data.case, officers: data.data.officers });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async assign() {
    let idr = this.props.location.pathname.split("/")[2];
    await Axios({
      method: "PUT",
      url: `${apiUrl}/api/cases/`,
      data: {
        id: idr,
        assignedStaff: this.state.assignedStaff,
      },
    })
      .then((data) => {
        this.setState({ case: data.data.case, officers: data.data.officers });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.fetchP();
  }
  render() {
    return (
      <div className="caseP">
        {this.state.case === [] ? (
          ""
        ) : (
          <>
            <span className="dd">
              <span>pertitioner name: </span> {this.state.case.pertitioner_name}{" "}
            </span>
            <span className="dd">
              <span> pertitioner contact: </span>{" "}
              {this.state.case.pertitioner_contact}
            </span>
            <span className="dd">
              <span>assigned officer: </span>
              {this.state.case.assigned_officer}
            </span>
            <span className="dd">
              <span>victim name: </span> {this.state.case.victim_name}
            </span>
            <span className="dd">
              <span>victim contact: </span>
              {this.state.case.victim_contact}
            </span>
            <span className="dd">
              <span>victim address: </span>
              {this.state.case.victim_address}
            </span>
            <span className="dd">
              <span>accused name: </span>
              {this.state.case.accused_name}
            </span>
            <span className="dd">
              <span>accused contact: </span>
              {this.state.case.accused_contact}
            </span>
            <span className="dd">
              <span>accused address: </span>
              {this.state.case.accused_address}
            </span>
            <span className="dd">
              <span>incident date: </span>
              {this.state.case.incident_date}
            </span>
            <span className="dd">
              <span>incident place: </span>
              {this.state.case.incident_place}
            </span>
            <span className="dd">
              <span>description: </span>
              {this.state.case.description}
            </span>
            <form className="minForm" action="">
              <Autocomplete
                options={this.state.officers}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="assign officer"
                    variant="outlined"
                    className="searchInput"
                    value={this.state.assignedStaff}
                    onChange={(e) =>
                      this.setState({ assignedStaff: e.target.value })
                    }
                  />
                )}
              />
              <Fab
                className="searchBtn"
                onClick={() => this.assign}
                variant="extended"
              >
                <Search /> assign{" "}
              </Fab>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Case);
