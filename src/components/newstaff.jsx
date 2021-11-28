import React, { useState } from "react";
import "../styles/newstaff.sass";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Fab,
} from "@material-ui/core";
import { newstaffAction } from "../redux/actions/controls";
import { connect } from "react-redux";
import Axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Fingerprint, PhotoCamera } from "@material-ui/icons";
import { apiUrl } from "../config";

const NewStaff = (props) => {
  const [full_name, setFull_name] = useState("");
  const [phone_num, setPhone_num] = useState("");
  const [bin, setBin] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const { newstaff, staffOpen } = props;
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    Axios({
      url: `${apiUrl}/add`,
      method: "POST",
      data: {
        full_name: full_name,
        email: email,
        rank: rank,
        phone_num: phone_num,
        avatar: bin,
      },
    })
      .then(() => {
        setLoading(false);
        toast.success("staff created");
      })
      .catch(() => {
        setLoading(false);
        toast.error("unable to create");
      });
  };
  const createBinary = (file, callback) => {
    var reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsBinaryString(file);
  };
  const upload = (e) => {
    var accept = {
      binary: ["image/png", "image/jpeg", "image/jpg"],
    };
    let callback = (result) => {
      if (result.length < 7000) {
        setBin(result);
      } else {
        toast.error("image is too large.");
      }
    };
    var file = e.currentTarget.files[0];
    if (accept.binary.indexOf(file.type) > -1) {
      createBinary(file, callback);
    } else {
      console.log("not accepted");
      toast.error("picture must be either png, jpg or jpeg");
    }
    console.log(bin);
  };
  return (
    <div className={newstaff ? "Newstaff open" : "Newstaff"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ToastContainer position="top-center" />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          value=""
          onChange={(e) => {
            upload(e);
          }}
        />
        <label htmlFor="contained-button-file" className="inputBox">
          <Button
            variant="contained"
            style={
              bin.length > 0
                ? { backgroundColor: "#4CAF50" }
                : { backgroundColor: "rgb(63, 82, 180)" }
            }
            fullWidth
            color="primary"
            component="span"
          >
            <PhotoCamera />
            {bin.length > 0 ? "image added" : "upload an image"}
          </Button>
        </label>
        <TextField
          className="inputBox"
          variant="outlined"
          label="full name"
          id="full_name"
          required
          value={full_name}
          onChange={(e) => {
            setFull_name(e.target.value);
          }}
        />
        <TextField
          required
          className="inputBox"
          variant="outlined"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          className="inputBox"
          variant="outlined"
          label="phone number"
          id="phone_num"
          value={phone_num}
          onChange={(e) => {
            setPhone_num(e.target.value);
          }}
        />
        <FormControl required variant="outlined" className="inputBox">
          <InputLabel htmlFor="rank">rank</InputLabel>
          <Select
            labelId="rank"
            id="rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="inspector general">Inspector General</MenuItem>
            <MenuItem value="deputy inspector-general of police">
              Deputy Inspector-General of Police
            </MenuItem>
            <MenuItem value="assistant inspector-general of police">
              Assistant Inspector-General of Police
            </MenuItem>
            <MenuItem value="commissioner of police">
              Commissioner of Police
            </MenuItem>
            <MenuItem value="deputy commissioner of police">
              Deputy Commissioner of Police
            </MenuItem>
            <MenuItem value="assistant commissioner of police">
              Assistant Commissioner of Police
            </MenuItem>
            <MenuItem value="chief superintendent of police">
              Chief Superintendent of Police
            </MenuItem>
            <MenuItem value="superintendent of police">
              Superintendent of Police
            </MenuItem>
            <MenuItem value="deputy superintendent of police">
              Deputy Superintendent of Police
            </MenuItem>
            <MenuItem value="assistant superintendent of police">
              Assistant Superintendent of Police
            </MenuItem>
            <MenuItem value="inspector of police">Inspector of Police</MenuItem>
            <MenuItem value="sergeant major">Sergeant Major</MenuItem>
            <MenuItem value="sergeant">Sergeant</MenuItem>
            <MenuItem value="corporal">Corporal</MenuItem>
            <MenuItem value="constable">Constable</MenuItem>
          </Select>
        </FormControl>
        <Fab
          variant="extended"
          className="inputBox"
          onClick={() => {
            toast.error(
              "application can't access the scanner. please check connection"
            );
          }}
        >
          <Fingerprint />
          add biometrics (optional)
        </Fab>
        <Button type="button" className="submitBtn" onClick={() => staffOpen()}>
          cancel
        </Button>
        <Button type="submit" className="submitBtn">
          {loading ? <ClipLoader color="white" /> : "add"}
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    newstaff: state.controls.newstaff_panel_open,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    staffopen: () => {
      dispatch(newstaffAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewStaff);
