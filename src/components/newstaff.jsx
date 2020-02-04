import React, { useState } from "react"
import "../styles/newstaff.sass"
import { TextField, FormControl, Select, MenuItem, InputLabel, Button, Fab } from "@material-ui/core"
import { newstaffAction } from "../redux/actions/controls"
import { connect } from "react-redux"
import Axios from "axios"
import { ClipLoader } from "react-spinners"
import { toast, ToastContainer } from "react-toastify"
import { Fingerprint, Camera, PhotoCamera } from "@material-ui/icons"

const NewStaff = (props) => {
    const [full_name, setFull_name] = useState("")
    const [phone_num, setphone_num] = useState("")
    const [email, setemail] = useState("")
    const [rank, setrank] = useState("")
    const [loading, setloading] = useState(false)
    const {
        newstaff,
        staffopen
    } = props
    const hanleSubmit = async (e) =>{
        setloading(true)
        e.preventDefault()
        Axios({
            url: "https://ppl-server.herokuapp.com/api/add",
            method: "POST",
            data: {
                full_name: full_name,
                email: email,
                rank: rank,
                phone_num: phone_num
            }
        }).then(()=>{
            setloading(false)
            toast.success("staff created")
        }).catch(()=>{
            setloading(false)
            toast.error("unable to create")
        })
    }
    return (
        <div className={newstaff ? "Newstaff open": "Newstaff"}>
            <form onSubmit={(e)=>hanleSubmit(e)}>
                <ToastContainer position="top-center"/>
                    <input
                        accept="image/*"
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        value=""
                    />
                    <label htmlFor="contained-button-file" className="inputBox">
                        <Button variant="contained" fullWidth color="primary" component="span">
                            <PhotoCamera/>
                        Upload officer photo
                        </Button>
                    </label>
                <TextField
                    className="inputBox"
                    variant="outlined"
                    label="full name"
                    id="full_name"
                    required
                    value={full_name}
                    onChange={(e)=>{setFull_name(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="Email"
                    id="email"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="phone number"
                    id="phone_num"
                    value={phone_num}
                    onChange={(e)=>{setphone_num(e.target.value)}}
                />
                <FormControl required variant="outlined" className="inputBox">
                    <InputLabel forHtml="rank">rank</InputLabel>
                    <Select
                    labelId="rank"
                    id="rank"
                    value={rank}
                    onChange={(e)=>setrank(e.target.value)}
                    required
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="inspector general">Inspector General</MenuItem>
                    <MenuItem value="deputy inspector-general of police">Deputy Inspector-General of Police</MenuItem>
                    <MenuItem value="assistant inspector-general of police">Assistant Inspector-General of Police</MenuItem>
                    <MenuItem value="commissioner of police">Commissioner of Police</MenuItem>
                    <MenuItem value="deputy commissioner of police">Deputy Commissioner of Police</MenuItem>
                    <MenuItem value="assistant commissioner of police">Assistant Commissioner of Police</MenuItem>
                    <MenuItem value="chief superintendent of police">Chief Superintendent of Police</MenuItem>
                    <MenuItem value="superintendent of police">Superintendent of Police</MenuItem>
                    <MenuItem value="deputy superintendent of police">Deputy Superintendent of Police</MenuItem>
                    <MenuItem value="assistant superintendent of police">Assistant Superintendent of Police</MenuItem>
                    <MenuItem value="inspector of police">Inspector of Police</MenuItem>
                    <MenuItem value="sergeant major">Sergeant Major</MenuItem>
                    <MenuItem value="sergeant">Sergeant</MenuItem>
                    <MenuItem value="corporal">Corporal</MenuItem>
                    <MenuItem value="constable">Constable</MenuItem>
                    </Select>
                </FormControl>
                <Fab variant="extended" className="inputBox">
                    <Fingerprint/>
                    add biometrics (optional)
                </Fab>
                <Button type="button" className="submitBtn" onClick={()=>staffopen()}>cancel</Button>
                <Button type="submit" className="submitBtn">{loading ? <ClipLoader/>:"add"}</Button>
            </form>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        newstaff: state.controls.newstaff_panel_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        staffopen: () => {
            dispatch(newstaffAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStaff)
