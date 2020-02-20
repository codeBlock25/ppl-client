import React, { Component } from "react";
import "../styles/profile.sass";
import { Button, Avatar } from "@material-ui/core";
import { newstaffAction } from "../redux/actions/controls";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { staffDetailsAction } from "../redux/actions/details";


class Profile extends Component {

    constructor(props){
        super(props)
        this.state ={
            bin: ""
        }
        this.loader = this.loader.bind(this)
        this.hexConverter = this.hexConverter.bind(this)
        this.callback = this.callback.bind(this)
        this.setImage = this.setImage.bind(this)
    }
    loader(file, callback){
        var reader = new FileReader()
        reader.onload = ()=>{
            this.callback(reader.result)
        }
        console.log(file)
        reader.readAsArrayBuffer(file.data)
    }
    callback(result){
        this.setState({bin: result})
    }
    hexConverter = (str) =>{
        console.log(this.props.details)
        this.loader(this.props.details.avatar,this.callback)
    }
    setImage(imageArray){
        let imageDebuffered = new Uint8Array(imageArray.data)
        const STRING_CHAR = String.fromCharCode.apply(null, imageDebuffered)
        this.setState({bin:  btoa(STRING_CHAR)})
    }
    componentDidMount(){
        if (this.props.details.avatar) {
            console.log('loading')
            this.setImage(this.props.details.avatar)
        } else {
            console.log('not')
        }
    }
    render() {
        const { newstaff, details } = this.props 
        return (
            <section className="Profile">
                <ToastContainer position="bottom-center"/>
                <div className="info">
                    {this.state.bin.length > 10? 
                    <img className="pic" src={`data:image/jpeg;base64, ${this.state.bin}`} />: 
                    <img className="pic" />}
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
                            if(details.level === 1){
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
