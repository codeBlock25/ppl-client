import React, { Component } from 'react';
import "../styles/messages.sass";
import { TextField, Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import Axios from "axios";
import { staffDetailsAction } from '../redux/actions/details';
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify"
import moment from "moment"

class Messages extends Component {
    constructor(props){
        super(props)
        this.state = {
            msgs: [],
            staffs: [],
            messagee: "",
            message: ""
        }
        this.getMsgs = this.getMsgs.bind(this)
        this.getStaffs = this.getStaffs.bind(this)
        this.sendMsg = this.sendMsg.bind(this)
    }
    async getMsgs(){
        await Axios({
            method: "GET",
            url: `https://sam-school.herokuapp.com/api/message?from=${"amosdaniel252@gmail.com"}`
        }).then(result=> {
            this.setState({msgs: result.data})
        })
    }
    async getStaffs(){
        await Axios({
            method: "GET",
            url: `https://sam-school.herokuapp.com/api/message/staffs`
        }).then(result=> {
            this.setState({staffs: result.data})
        })
    }
    async sendMsg(e){
        e.preventDefault()
        if(this.state.staffs.indexOf(this.state.messagee) > -1){
            await Axios({
                method: "POST",
                url: "https://sam-school.herokuapp.com/api/message",
                data: {
                    from: "amosdaniel252@gmail.com" || this.props.staffDetails.email,
                    to: this.state.messagee,
                    message: this.state.message
                }
            })
            .then(result=>{
                this.setState({msgs: [{
                    from: "amosdaniel252@gmail.com" || this.props.staffDetails.email,
                    to: this.state.messagee,
                    message: this.state.message,
                    date: Date()
                },...this.state.msgs]})
                console.log(result.data)})
            .catch(err=>console.log(err))
        } else {
            toast.error("invalid mail!. please provide a registered mail")
        }
    }
    componentDidMount(){
        this.getMsgs()
        this.getStaffs()
        setTimeout(() => {
            this.getMsgs()
        }, 1000 * 60);

    }
    render() {
        return (
            <div className="Messages">
                <ToastContainer position="center-left"/>
                    {
                        this.state.msgs.length >= 1? this.state.msgs.map(msg=>{
                            return (
                                <div className={msg.from === "amosdaniel252@gmail.com"? "message own": "message"}>
                                    <span>{msg.from === "amosdaniel252@gmail.com"? "To": "From"}: {msg.from === "amosdaniel252@gmail.com"? msg.to: msg.from}</span>
                                    {msg.message}
                                    <span>DATE: {moment(msg.date).format("DD-MMMM-YYYY")}</span>
                                </div>
                            )
                        }): 
                        <span className="msgLoader">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                        </span>
                    }
                <form action="" onSubmit={this.sendMsg}>
                    <div className="mssg">
                        <input
                            id="messagee"
                            variant="outlined"
                            label="officer"
                            className="messageInput true"
                            list="staffs"
                            placeholder="please pick from the avaliable drop down"
                            value={this.state.messagee}
                            onChange={(e)=>{
                                this.setState({messagee: e.target.value})
                            }}
                        />
                        <label htmlFor="messagee">officer's mail</label>
                    </div>
                    <datalist id="staffs">
                        {
                            this.state.staffs.length >=1 ? this.state.staffs.map(staff=>{
                                return (
                                    <option value={staff}/>
                                )
                            }): ""
                        }
                    </datalist>
                    <TextField
                        multiline
                        id="message"
                        variant="outlined"
                        placeholder="message"
                        className="messageInput"
                        list="staffs"
                        value={this.state.message}
                        autoCorrect
                        spellCheck
                        onChange={(e)=>{
                            this.setState({message: e.target.value})
                        }}
                    />
                    <Fab type="submit" className="messageBtn"><Send/></Fab>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setDetails: (payload) => {
            dispatch(staffDetailsAction(payload))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        staffDetails: state.details.staffDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)