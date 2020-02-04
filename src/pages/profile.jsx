import React, { Component } from "react"
import "../styles/profile.sass"
import { Button } from "@material-ui/core"
import { newstaffAction } from "../redux/actions/controls"
import { connect } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import { staffDetailsAction } from "../redux/actions/details"


class Profile extends Component {
    // componentDidMount(){
    //     let data =  localStorage.getItem("staff_data")
    //     console.log(data)
    //     this.props.setDetails(data)
    // }
    render() {
        const { newstaff, details } = this.props
        return (
            <section className="Profile">
                <ToastContainer position="bottom-center"/>
                <div className="info">
                    <span className="pic" role="img" style={{backgroundImage: `url(/images/pic1.jpeg)`}} />
                    <div className="content">
                        { details ? 
                            <React.Fragment>
                                <span className="cc"><span>Name:</span>{details.full_name}</span>
                                <span className="cc"><span>email:</span>{details.email}</span>
                                <span className="cc"><span>phone number:</span>{details.phone_num}</span>
                                <span className="cc"><span>level:</span>{details.level}</span>
                                <span className="cc"><span>rank:</span>{details.rank}</span>
                            </React.Fragment>:
                            <span className="cc"><span>no record</span></span>
                        }
                        <Button className="Btn add" onClick={()=>{
                            if(details.level !== 1){
                                newstaff()
                            } else {
                                toast.error(`only level 1 officers can add users and you'er a level ${details.level}`)
                            }
                        }}> add staff </Button>
                        <Button className="Btn"> edit account </Button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        newstaffopen: state.controls.newstaff_panel_open,
        details: state.details.staffDetails,
        staffDetails: state.details.staffDetails
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        newstaff: () => {
            dispatch(newstaffAction())
        },
        setDetails: (payload) => {
            dispatch(staffDetailsAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)