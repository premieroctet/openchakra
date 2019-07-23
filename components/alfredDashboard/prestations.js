import React, {Fragment} from 'react';
import Link from 'next/link';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },

});
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5
    }
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return <div className={classes.root}>
            <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Next Page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Last Page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>;
    }
}
TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,

};
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);
class booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prestations: [],
            page: 0,
            rowsPerPage: 5,

        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(url+'myAlfred/api/booking/currentAlfred')
            .then(res=> {
                let data = res.data;
                this.setState({prestations: data})
            })
            .catch(err => console.log(err));
    }

    handleChangePage(event, page) {
        this.setState({page});
    }

    handleChangeRowsPerPage(event) {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    }




    render() {
        const {classes} = this.props;
        const {prestations} = this.state;

        return (
            <Fragment>

                <div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Référence</TableCell>
                                <TableCell>Prix</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Prestation</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prestations.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                .map((e,index) =>
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {e.reference}
                                        </TableCell>
                                        <TableCell>
                                            {e.amount}
                                        </TableCell>
                                        <TableCell>
                                            {e.date}
                                        </TableCell>
                                        <TableCell>
                                            {e.prestation.label}
                                        </TableCell>
                                        <TableCell>
                                            {e.status}
                                        </TableCell>


                                    </TableRow>
                                )}

                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={prestations.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped }
                />



            </Fragment>
        );
    };
}

export default withStyles(styles)(booking);
