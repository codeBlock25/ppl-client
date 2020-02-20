import React, { Component } from 'react';
import "../styles/cases.sass"
import { TextField, Fab, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Axios from 'axios';
import { ClipLoader } from "react-spinners"
import { staffDetailsAction } from '../redux/actions/details';
import { connect } from 'react-redux';
import Case from '../components/case';
import { toast, ToastContainer } from "react-toastify";


class Cases extends Component {
    constructor(props){
        super(props)
        this.state = {
            cases: [],
            loading: true
        }
        this.fetcher = this.fetcher.bind(this)
    }
    async fetcher(){
        this.setState({loading:  true})
        await Axios({
             url: "https://sam-school.herokuapp.com/api/cases",
             method: "GET"
         }).then(result=>{
             this.setState({cases: result.data.cases})
             this.setState({loading:  false})
         })
         .catch(err=>{
             console.log(err)
             this.setState({loading:  false})
         })
        }
    componentDidMount(){
        this.fetcher()
    }
    render() {
        return (
            <section className="Cases">
                <ToastContainer position="bottom-center"/>
                <form className="mainForm" action="">
                    <TextField
                        variant="outlined"
                        placeholder="search for cases"
                        className="searchInput"
                    />
                    <Fab className="searchBtn"><Search/></Fab>
                </form>
                <div className="container">
                    {
                        this.state.loading ? 
                        <ClipLoader size="300px" color="#101010"/>
                        :
                        this.state.cases.length >= 1 ?
                        <React.Fragment>
                            { this.props.match.isExact ?
                                this.state.cases.map((caser)=>{
                                    return (
                                        <div className="case" key={caser.id}>
                                            <span className="img" style={{backgroundImage: `url(/images/logo.png)`}}/>
                                            <div className="by">
                                                <span className="re"><span>record by:</span>{caser.pertitioner_name}</span>
                                                <span className="re"><span>assigned to:</span> {caser.assigned_officer} </span>
                                                <span className="re"><span>record date:</span> {caser.date} </span>
                                                <Button className="viewBtn" onClick={()=>this.props.details.level === 3 ? this.props.history.push(`/cases/${caser._id}`) : toast.error('user not allowed') }>{this.props.details.level === 3 ? "view": "can't view"}</Button>
                                            </div>
                                        </div>
                                    )
                                })
                                : <Case/> 
                            }
                    </React.Fragment>: <span className="errCase">no cases</span>
                    }
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
        details: state.details.staffDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cases)