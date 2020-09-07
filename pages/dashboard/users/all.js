import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';

const moment = require('moment-timezone');
moment.locale('fr');

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
    marginLeft: theme.spacing(2.5),
  },
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
    const {classes, count, page, rowsPerPage, theme} = this.props;

    return <div className={classes.root}>
      <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
        {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
      </IconButton>
      <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton onClick={this.handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="Next Page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton onClick={this.handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="Last Page">
        {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
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
const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(TablePaginationActions);

class all extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      page: 0,
      rowsPerPage: 10,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    axios.get('/myAlfred/api/admin/users/all')
      .then((response) => {
        let user = response.data;
        this.setState({user: user});
      }).catch((error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
        Router.push({pathname: '/login'});
      }
    });
  }

  handleChangePage(event, page) {
    this.setState({page});
  }

  handleChangeRowsPerPage(event) {
    this.setState({page: 0, rowsPerPage: event.target.value});
  }


  render() {
    const {classes} = this.props;
    const {user} = this.state;

    return (
      <Layout>
        <Grid container style={{marginTop: 70}}>
          <Link href={'/dashboard/home'}>
            <Typography className="retour"><HomeIcon className="retour2"/> <span>Retour</span></Typography>
          </Link>
        </Grid>
        <Grid container className={classes.signupContainer}>

          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Utilisateurs</Typography>
              </Grid>
              <Paper style={{width: '100%'}}>
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Statut</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Inscrit(e) le</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Carte d'identité</TableCell>
                        <TableCell>Mangopay client</TableCell>
                        <TableCell>Mangopay Alfred</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                        .map((e, index) =>
                          <TableRow key={index}>
                            <TableCell>
                              {e.is_alfred ?
                                <img src="/static/assets/img/userServicePreview/alfred.svg" style={{width: '40px'}}/>
                                :
                                null
                              }
                              {e.is_admin ?
                                <img src="/static/assets/img/userServicePreview/admin.svg" style={{width: '40px'}}/>
                                :
                                null
                              }
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {e.name}
                            </TableCell>
                            <TableCell>
                              {e.firstname}
                            </TableCell>
                            <TableCell>
                              {e.email}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {moment(e.creation_date).format('L LT')}
                            </TableCell>
                            <TableCell>
                              <Link href={`/dashboard/users/view?id=${e._id}`}><a>Modifier</a></Link>
                            </TableCell>
                            <TableCell>
                              {e.id_card ?
                                <Link href={`/dashboard/users/idCard?id=${e._id}`}><a>Détails</a></Link>
                                :
                                `Aucune`
                              }
                            </TableCell>
                            <TableCell>
                              <a target="_blank"
                                 href={`https://dashboard.mangopay.com/User/${e.id_mangopay}/Details`}>{e.id_mangopay}</a>
                            </TableCell>
                            <TableCell>
                              <a target="_blank"
                                 href={`https://dashboard.mangopay.com/User/${e.mangopay_provider_id}/Details`}>{e.mangopay_provider_id}</a>
                            </TableCell>
                          </TableRow>,
                        )}

                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  component="div"
                  count={user.length}
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
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </Paper>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );


  };
}

export default withStyles(styles)(all);
