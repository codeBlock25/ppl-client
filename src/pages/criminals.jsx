import React, { Component } from 'react';
import "../styles/criminals.sass"
import { Button } from '@material-ui/core';
import { newcriminalAction, newcrimerecordAction } from '../redux/actions/controls';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/styles';
import Axios from "axios"

function createData(case_code, crime, count, date, sentence) {
    return { case_code, crime, count, date, sentence };
  }

  const columns = [
    { id: 'case_code', label: 'Case code', minWidth: 170 },
    { id: 'crime', label: 'Crime', minWidth: 100 },
    {
      id: 'count',
      label: 'Count',
      minWidth: 170,
      align: 'center'
    },
    {
      id: 'date',
      label: 'Date of conviction',
      minWidth: 170,
      align: 'center'
    },
    {
      id: 'sentence',
      label: 'sentence duration',
      minWidth: 170,
      align: 'center'
    }
  ];
const style = {
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
}
const rows = [
    createData("CS0190",'chop person meat', 'supreme count wuse', "2020-02-20", "7 years")
  ];

class Criminals extends Component {
    state = {
        page: 0,
        rowsPerPage: 30
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage})
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: +event.target.value})
    };
    fetch = async ()=>{
        let token = "my token should go here"
        await Axios({
            url: `http://localhost:1020/api/crime?token=${token}`,
            method: "GET"
        })
        .then((result)=>{
            console.log(result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.fetch()
    }
    render() {
        const { classes } = this.props
        return (
            <section className="Criminals">
                <div className="criminal">
                    {/* <span className="pic" role="img" style={{backgroundImage: `url(/images/pic1.jpeg)`}} /> */}
                    <div className="content">
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: "#2196f3", color: "white", fontWeight: "600"}}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                            );
                                        })}
                                        </TableRow>
                                    );
                                    })}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
                <div className="crimBtnGroup">
                    <Button className="crimBtn">generate criminal record</Button>
                    <Button className="crimBtn" onClick={this.props.crimerecordopen}>add criminal record</Button>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        newcriminal: state.controls.newcriminal_panel_open,
        newcrimerecording: state.controls.newcrimerecord_panel_open
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        criminalopen: () => {
            dispatch(newcriminalAction())
        },
        crimerecordopen: () => {
            dispatch(newcrimerecordAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Criminals))