import React, { Component } from 'react';
import "../styles/account.sass"
import { Button, TextField, FormControlLabel, Checkbox } from "@material-ui/core"
import { ArrowForward } from "@material-ui/icons"
import { withStyles } from "@material-ui/styles"
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { ClipLoader } from 'react-spinners';
import { staffDetailsAction } from '../redux/actions/details';
import { connect } from 'react-redux';

const styles = {
    textfield: {
        width: "100%",
        margin: "20px 0",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "rgb(245, 0, 87)",
            fontSize: "15px"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a8a8a8"
        }
    },
    btn: {
        width: "50%",
        minWidth: "200px",
        height: "50px",
        backgroundColor: "#101010",
        color: "white",
        "&:hover": {
            backgroundColor: "#333"
        }
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            emaild: "",
            loading: false,
            policy: false
        }
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleCheckChange(){
        this.setState({policy: !this.state.policy})
    }
    handleChange(e){
        this.setState({[e.target.id]: e.target.value})
        document.querySelector("form .error").classList.remove("active")
    }
    async handleSubmit(e){
        e.preventDefault()
        this.setState({loading: true})
        if (this.state.email === "") {
            this.setState({loading: false})
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please provide your first name"
        } else if(this.state.password === ""){
            this.setState({loading: false})
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please provide your password"
        } else if(this.state.policy === false){
            this.setState({loading: false})
            document.querySelector(".account form .error").classList.add("active")
            document.querySelector(".account form .error").innerHTML ="please you need to agree on this"
        } else {
            document.querySelector(".account form .error").classList.remove("active")
            console.log("passed")
            await Axios({
                url: `https://sam-school.herokuapp.com/api/login?id=${this.state.emaild}&password=${this.state.password}`,
                method: "GET",
            }).then(data=>{
                console.log(data.data.info)
                localStorage.setItem("staff", {
                    full_name: data.data.info.full_name,
                    email: data.data.info.email,
                    rank: data.data.info.rank,
                    phone_num: data.data.info.phone_num,
                    level: data.data.info.staff_level,
                    avatar: data.data.info.avatar
                })
                this.props.setDetails({
                    full_name: data.data.info.full_name,
                    email: data.data.info.email,
                    rank: data.data.info.rank,
                    phone_num: data.data.info.phone_num,
                    level: data.data.info.staff_level,
                    avatar: data.data.info.avatar
                })
                this.setState({loading: false}, ()=>{
                    this.props.history.push("/profile") 
                    document.querySelector("nav").style.display = "flex"
                })
            }).catch(err=>{
                toast.error("communition with school server broken")
                setTimeout(() => {
                    this.setState({loading: false})
                }, 500);
                console.log(err)
            
            })
        }
    }
    async componentDidMount(){
        // let token = await localStorage.getItem("token")
        // if (token) {
        //     this.props.history.push("/profile")
        // }
        document.querySelector("nav").style.display = "none"
    }
    componentWillUnmount(){
        document.querySelector("nav").style.display = "flex"
    }
    render() {
        const { classes } = this.props
        return (
            <section className="account">
                <ToastContainer/>
                <div className="wrapper">
                    <h3>welcome back officer</h3>
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="error">
                            error
                        </div>
                        <TextField
                            variant="outlined"
                            label="email"
                            id="emaild"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <TextField
                            variant="outlined"
                            label="password"
                            id="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={classes.textfield}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={this.state.policy} onChange={this.handleCheckChange} value="checkedA" />
                          }
                          label="remember me"
                          style={{display: "block"}}
                        />
                         <Button type="submit" className={classes.btn}>{this.state.loading? <ClipLoader color="white" size="25" sizeUnit="px" />: <span>login<ArrowForward style={{transform: "translate(30%, 23%)"}}/></span>}  </Button>
                   </form>
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
