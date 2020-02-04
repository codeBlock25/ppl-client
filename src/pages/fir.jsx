import React, { Component } from 'react';
import "../styles/criminals.sass"
import { Button } from '@material-ui/core';
import { newcriminalAction, newfirAction } from '../redux/actions/controls';
import { connect } from 'react-redux';

class Firs extends Component {
    render() {
        return (
            <section className="Criminals">
                <div className="criminal">
                <span className="pic" role="img" style={{backgroundImage: `url(/images/pic1.jpeg)`}} />
                <div className="content">
                    <span className="cc"><span>Name:</span> Daniel Amos</span>
                    {/* <Button className="Btn"> edit record </Button> */}
                </div>
                </div>
                <Button className="crimBtn" onClick={()=>this.props.firopen()}>add criminal</Button>
            </section>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        newfir: state.controls.newfir_panel_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        firopen: () => {
            dispatch(newfirAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Firs)