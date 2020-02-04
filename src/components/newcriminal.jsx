import React, { useState } from "react"
import "../styles/newstaff.sass"
import { TextField, FormControl, Select, MenuItem, InputLabel, Button } from "@material-ui/core"
import { newstaffAction, newcriminalAction } from "../redux/actions/controls"
import { connect } from "react-redux"
import Axios from "axios"
import { ClipLoader } from "react-spinners"
import { toast, ToastContainer } from "react-toastify"

const NewCriminal = (props) => {
    const [title, settitle] = useState("")
    const [full_name_c, setfull_name_c] = useState("")
    const [sex, setsex] = useState("")
    const [nationality, setnationality] = useState("")
    const [state, setstate] = useState("")
    const [occupation, setoccupation] = useState("")
    const [marital_status, setmarital_status] = useState("")
    const [height, setheight] = useState("")
    const [weapon_used, setweapon_used] = useState("")
    const [complexion, setcomplexion] = useState("")
    const [crime_commited, setcrime_commited] = useState("")
    const [loading, setloading] = useState(false)
    const {
        newcriminal,
        criminalopen
    } = props
    const hanleSubmit = async (e) =>{
        setloading(true)
        e.preventDefault()
        Axios({
            url: "http://localhost:1020/api/add",
            method: "POST",
            data: {
                // full_name: full_name,
                // email: email,
                // rank: rank,
                // phone_num: phone_num
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
        <div className={newcriminal ? "Newstaff open": "Newstaff"}>
            <form onSubmit={(e)=>hanleSubmit(e)}>
                <ToastContainer position="top-center"/>
                <TextField
                    className="inputBox"
                    variant="outlined"
                    label="title"
                    id="title"
                    required
                    value={title}
                    onChange={(e)=>{settitle(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="full name"
                    id="full_name_c"
                    value={full_name_c}
                    onChange={(e)=>{setfull_name_c(e.target.value)}}
                />
                <FormControl required variant="outlined" className="inputBox">
                    <InputLabel id="sex_label">sex</InputLabel>
                    <Select
                    labelId="sex_label"
                    id="sex"
                    value={sex}
                    onChange={(e)=>setsex(e.target.value)}
                    required
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="inspector general">male</MenuItem>
                    <MenuItem value="inspector general">female</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="nationality"
                    id="nationality"
                    value={nationality}
                    onChange={(e)=>{setnationality(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="state"
                    id="state"
                    value={state}
                    onChange={(e)=>{setstate(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="occupation"
                    id="occupation"
                    value={occupation}
                    onChange={(e)=>{setoccupation(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="crime commited"
                    id="crime_commited"
                    value={crime_commited}
                    onChange={(e)=>{setcrime_commited(e.target.value)}}
                />
                <FormControl required variant="outlined" className="inputBox">
                    <InputLabel id="select-filled-label">marital status</InputLabel>
                    <Select
                    labelId="select-filled-label"
                    id="marital_status"
                    value={marital_status}
                    onChange={(e)=>setmarital_status(e.target.value)}
                    required
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="inspector general">single</MenuItem>
                    <MenuItem value="inspector general">married</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="complexion"
                    id="complexion"
                    value={complexion}
                    onChange={(e)=>{setcomplexion(e.target.value)}}
                />
                <TextField
                    required
                    className="inputBox"
                    variant="outlined"
                    label="height"
                    id="height"
                    value={height}
                    onChange={(e)=>{setheight(e.target.value)}}
                />
                <TextField
                    className="inputBox"
                    variant="outlined"
                    label="weapon used"
                    id="weapon_used"
                    value={weapon_used}
                    onChange={(e)=>{setweapon_used(e.target.value)}}
                />
                <Button type="button" className="submitBtn" onClick={()=>criminalopen()}>cancel</Button>
                <Button type="submit" className="submitBtn">{loading ? <ClipLoader/>:"add"}</Button>
            </form>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        newcriminal: state.controls.newcriminal_panel_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        criminalopen: () => {
            dispatch(newcriminalAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCriminal)