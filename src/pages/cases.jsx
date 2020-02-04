import React, { Component } from 'react';
import "../styles/cases.sass"
import { TextField, Fab, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Axios from 'axios';
import { ClipLoader } from "react-spinners"
import { staffDetailsAction } from '../redux/actions/details';
import { connect } from 'react-redux';
import Case from '../components/case';


class Cases extends Component {
    constructor(props){
        super(props)
        this.state = {
            cases: []
        }
        this.fetcher = this.fetcher.bind(this)
    }
    async fetcher(){
        await Axios({
             url: "https://ppl-server.herokuapp.com/api/cases",
             method: "GET"
         }).then(data=>{
             this.setState({cases: data.data.cases})
         })
         .catch(err=>{
             console.log(err)
         })
        }
    componentDidMount(){
        this.fetcher()
    }
    render() {
        return (
            <section className="Cases">
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
                        this.state.cases === [] ? 
                        <ClipLoader size="300"/>:
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
                                                <Button className="viewBtn" onClick={()=>this.props.details.level === 3 ? this.props.history.push(`/cases/${caser._id}`) : this.fetcher() }>{this.props.details.level === 3 ? "view": "can't view"}</Button>
                                            </div>
                                        </div>
                                    )
                                })
                                : <Case/>
                            }
                    </React.Fragment>
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
