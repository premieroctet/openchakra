import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import cookie from 'react-cookies';

const KycDocumentStatus = require('mangopay2-nodejs-sdk/lib/models/KycDocumentStatus')
moment.locale('fr');

const {config} = require('../../../config/config');
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
        marginTop: '100px',
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
        lineHeight: 4.15,
    },
});

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5)
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

class all extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alfred: [],
            page: 0,
            rowsPerPage: 100,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }

    componentDidMount() {
        localStorage.setItem('path', Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')

        axios.get("/myAlfred/api/admin/shop/all")
          .then((response) => {
            let alfred = response.data;
            this.setState({alfred: alfred})

          })
          .catch((error) => {
            console.log(error);
            if(error.response.status === 401 || error.response.status === 403) {
                cookie.remove('token', { path: '/' })
                Router.push({pathname: '/login'})
            }
        });
    }

    handleChangePage(event, page) {
        this.setState({page});
    }

    handleChangeRowsPerPage(event) {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    }

    kyc_validation = alfred_id => {
      axios.post(`/myAlfred/api/admin/kyc_validate/${alfred_id}`)
        .then( res => console.log(res))
    }

    render() {
        const { classes } = this.props;
        const {alfred} = this.state;

        return (
            <Layout>
                <Grid container style={{marginTop: 70}}>
                    <Link href={'/dashboard/home'}>
                        <Typography  className="retour"><HomeIcon className="retour2"/> <span>Retour</span></Typography>
                    </Link>
                </Grid>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Paper style={{width: '100%'}}>
                            <div>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Prénom</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Boutique créée le</TableCell>
                                            <TableCell>Action</TableCell>
                                            <TableCell>Boutique</TableCell>
                                            <TableCell>Mangopay client/Alfred</TableCell>
                                            <TableCell>Carte d'identité</TableCell>
                                            <TableCell>Statut KYC</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {alfred.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                            .map((e,index) =>
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {e.alfred.name}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {e.alfred.firstname}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {e.alfred.email}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {moment(e.creation_date).format('L LT')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/dashboard/alfred/view?id=${e.alfred._id}`}><a>Modifier</a></Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/shop?id_alfred=${e.alfred._id}`}><a>Consulter</a></Link>
                                                    </TableCell>
                                                    <TableCell>
                                                      <a target="_blank" href={`https://dashboard.mangopay.com/User/${e.alfred.id_mangopay}/Details`}>{e.alfred.id_mangopay}</a>
                                                        &nbsp;-&nbsp;
                                                      <a target="_blank" href={`https://dashboard.mangopay.com/User/${e.alfred.mangopay_provider_id}/Details`}>{e.alfred.mangopay_provider_id}</a>
                                                    </TableCell>
                                                    <TableCell>
                                                      { e.alfred.id_card ?
                                                      <Link href={`/dashboard/alfred/idCard?id=${e.alfred._id}`} target={`_blank`}><a>Détails</a></Link>
                                                      :
                                                      `Aucune`
                                                      }
                                                    </TableCell>
                                                    <TableCell>
                                                        { e.alfred.id_card_status_text }<br/>{ e.alfred.id_card_error }
                                                    </TableCell>
                                                    <TableCell>
                                                    { e.alfred.id_card && e.alfred.id_card_status!=KycDocumentStatus.Validated ?
                                                          <Button color="primary" onClick={ () => this.kyc_validation(e.alfred._id)}>Validation Mangopay</Button>
                                                      :
                                                      null
                                                    }
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                    </TableBody>
                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                component="div"
                                count={alfred.length}
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
                        </Paper>
                    </Card>
                </Grid>
            </Layout>
        );



    };
}

export default withStyles(styles)(all);
