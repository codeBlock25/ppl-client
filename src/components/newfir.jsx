import React, { useState } from "react";
import "../styles/newstaff.sass";
import { TextField, Button } from "@material-ui/core";
import { newfirAction } from "../redux/actions/controls";
import { connect } from "react-redux";
import Axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { withRouter } from "react-router-dom";
import { apiUrl } from "../config";

const NewFir = (props) => {
  const [pertitioner_name, setpertitioner_name] = useState("");
  const [pertitioner_contact, setpertitioner_contact] = useState("");
  const [pertitioner_address, setpertitioner_address] = useState("");
  const [victim_name, setvictim_name] = useState("");
  const [victim_contact, setvictim_contact] = useState("");
  const [victim_address, setvictim_address] = useState("");
  const [accused_name, setaccused_name] = useState("");
  const [accused_contact, setaccused_contact] = useState("");
  const [accused_address, setaccused_address] = useState("");
  const [incident_date, setincident_date] = useState("");
  const [incident_place, setincident_place] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const { newfir, firopen } = props;
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    await Axios({
      url: `${apiUrl}/fir`,
      method: "POST",
      data: {
        officer_name: props.staffDetails.full_name,
        officer_email: props.staffDetails.email,
        pertitioner_name: pertitioner_name,
        pertitioner_contact: pertitioner_contact,
        pertitioner_address: pertitioner_address,
        victim_name: victim_name,
        victim_contact: victim_contact,
        victim_address: victim_address,
        accused_name: accused_name,
        accused_contact: accused_contact,
        accused_address: accused_address,
        incident_date: incident_date,
        incident_place: incident_place,
        description: description,
      },
    })
      .then(() => {
        setloading(false);
        toast.success("fir uploaded");
        setTimeout(() => {
          props.history.push("/cases");
          props.firopen();
        }, 1000);
      })
      .catch(() => {
        setloading(false);
        toast.error("server error please check your connection");
      });
  };
  return (
    <div className={newfir ? "Newstaff open" : "Newstaff"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ToastContainer position="bottom-center" />
        <TextField
          className="inputBox"
          variant="outlined"
          label="victim's name"
          id="victim_name"
          required
          value={victim_name}
          onChange={(e) => {
            setvictim_name(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="victim's contact"
          id="victim_contact"
          required
          value={victim_contact}
          onChange={(e) => {
            setvictim_contact(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="victim's address"
          id="victim_address"
          required
          value={victim_address}
          onChange={(e) => {
            setvictim_address(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="accused's name"
          id="accused_name"
          required
          value={accused_name}
          onChange={(e) => {
            setaccused_name(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="accused's contact"
          id="accused_contact"
          required
          value={accused_contact}
          onChange={(e) => {
            setaccused_contact(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="accused's address"
          id="accused_address"
          required
          value={accused_address}
          onChange={(e) => {
            setaccused_address(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          id="date"
          label="incident date"
          type="datetime-local"
          className="inputBox"
          InputLabelProps={{
            shrink: true,
          }}
          value={incident_date}
          onChange={(e) => {
            setincident_date(e.target.value);
          }}
        />
        <TextField
          className="inputBox"
          variant="outlined"
          label="incident address"
          id="incident_place"
          required
          value={incident_place}
          onChange={(e) => {
            setincident_place(e.target.value);
          }}
        />
        <TextField
          multiline
          className="inputBox"
          variant="outlined"
          label="description"
          id="description"
          required
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <Button type="button" className="submitBtn" onClick={() => firopen()}>
          cancel
        </Button>
        <Button type="submit" className="submitBtn">
          {loading ? <ClipLoader /> : "add"}
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    newfir: state.controls.newfir_panel_open,
    staffDetails: state.details.staffDetails,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firopen: () => {
      dispatch(newfirAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewFir));
