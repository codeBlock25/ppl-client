import React, { useState } from "react"
import "../styles/newstaff.sass"
import { TextField, FormControl, Select, MenuItem, InputLabel, Button, Fab } from "@material-ui/core"
import { newcrimerecordAction } from "../redux/actions/controls"
import { connect } from "react-redux"
import Axios from "axios"
import { ClipLoader } from "react-spinners"
import { toast, ToastContainer } from "react-toastify"
import { Fingerprint, PhotoCamera } from "@material-ui/icons"

const NewCrimeRecord = (props) => {
    const [crime, setcrime] = useState("")
    const [date, setdate] = useState("")
    const [bin, setbin]= useState("")
    const [court, setcourt] = useState("")
    const [loading, setloading] = useState(false)
    const  [sentenced, setsentenced]= useState("")
    const {
        newcrimerecording,
        crimerecordopen
    } = props
    const hanleSubmit = async (e) =>{
        setloading(true)
        e.preventDefault()
        Axios({
            url: "https://sam-school.herokuapp.com/api/crime",
            method: "POST",
            data: {
                crime: crime,
                date: date,
                court: court,
                sentenced: sentenced,
                pic: bin
            }
        }).then(()=>{
            setloading(false)
            toast.success("record added")
        }).catch(()=>{
            setloading(false)
            toast.error("unable to set record")
        })
    }
    const createBinary = (file, callback)=>{
        var reader = new FileReader()
        reader.onload = ()=>{
            callback(reader.result)
        }
        reader.readAsBinaryString(file)
    }
    const upload =(e)=>{
        var accept = {
            binary : ["image/png", "image/jpeg", "image/jpg"]
          };
          let callback = (result) =>{
            if(result.length < 7000) {
              setbin(result)
            } else {
                toast.error('image is too large.')
            }
          }
        var file = e.currentTarget.files[0]
        if(accept.binary.indexOf(file.type) > -1){
            // setfileType(file.type)
            createBinary(file,callback)
        } else {
            console.log("not accepted")
            toast.error("picture must be either png, jpg or jpeg")
        }
        console.log(bin)
    }

// var file;

// for (var i = 0; i < files.length; i++) {
//   file = files[i];

//   // if file type could be detected
//   if (file !== null) {
//     if (accept.binary.indexOf(file.type) > -1) {
//       // file is a binary, which we accept
//       var data = file.getAsBinary();
//     } else if (accept.text.indexOf(file.type) > -1) {
//       // file is of type text, which we accept
//       var data = file.getAsText();
//       // modify data with string methods
//     }
//   }
// }
    return (
        <div className={newcrimerecording ? "Newstaff open": "Newstaff"}>
            <form onSubmit={(e)=>hanleSubmit(e)}>
                <ToastContainer position="top-center"/>
                    <input
                        accept="image/*"
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        value=""
                        onChange={(e)=>{
                            upload(e)
                        }} 
                    />
                    <label htmlFor="contained-button-file" className="inputBox">
                        <Button variant="contained" style={bin.length > 0 ? {backgroundColor: '#4CAF50'}: {backgroundColor: 'rgb(63, 82, 180)'}} fullWidth color="primary" component="span">
                            <PhotoCamera/>
                        {bin.length > 0 ? "image added" : "upload an image  (optional)"}
                        </Button>
                    </label>
                <TextField
                    className="inputBox"
                    variant="outlined"
                    label="crime"
                    id="crime"
                    required
                    value={crime}
                    onChange={(e)=>{setcrime(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="court"
                    id="court"
                    value={court}
                    onChange={(e)=>{setcourt(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="date"
                    id="date"
                    value={date}
                    type="date"
                    onChange={(e)=>{setdate(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="sentenced period"
                    id="sentence"
                    value={sentenced}
                    onChange={(e)=>{setsentenced(e.target.value)}}
                />
                <Fab variant="extended" className="inputBox" onClick={()=>{
                    toast.error("application can't access the scanner. please check connection")
                }}>
                    <Fingerprint/>
                    add biometrics (optional)
                </Fab>
                <Button type="button" className="submitBtn" onClick={()=>crimerecordopen()}>cancel</Button>
                <Button type="submit" className="submitBtn">{loading ? <ClipLoader color="white"/>:"add"}</Button>
            </form>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        newcrimerecording: state.controls.newcrimerecord_panel_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        crimerecordopen: () => {
            dispatch(newcrimerecordAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCrimeRecord)