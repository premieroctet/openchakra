import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import cookie from 'react-cookies';

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
      prospects: [],
      page: 0,
      rowsPerPage: 10,
      selectedFile: null,
      comments: null,
      errors: null,
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.load = this.load.bind(this);
    this.fileRef = React.createRef()
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');

    this.load();
  }

  load() {
    axios.get('/myAlfred/api/admin/prospect/all')
      .then((response) => {
        this.setState({prospects: response.data});
      }).catch((error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        cookie.remove('token', {path: '/'});
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

  onChangeHandler = event => {
    this.setState({selectedFile: event.target.files[0]})
  }

  onClickHandler = () => {
    this.setState({comments: null, errors:null})
    const data = new FormData()
    data.append('prospects', this.state.selectedFile)
    axios.post('/myAlfred/api/admin/prospect/add', data)
      .then( response => {
        this.setState({comments: response.data})
        this.load()
      })
      .catch( err => {
        this.setState({errors: err.response.data.errors})
        this.load()
      })
    // Clear input file to avoid ERR_UPLOAD_FILE_CHANGED
    this.fileRef.current.value=''
    this.setState({selectedFile:null})
  }

  render() {
    const {classes} = this.props;
    const {prospects, export_data, comments, errors} = this.state;

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
                <Typography style={{fontSize: 30}}>Import listing</Typography>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <input ref={this.fileRef} type="file" name="file" id="file" onChange={this.onChangeHandler}/>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                {comments}
                <em style={{color: 'red'}}>{errors}</em>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <button disabled={!this.state.selectedFile} type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Importer</button>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Prospection</Typography>
              </Grid>
              <Paper style={{width: '100%'}}>
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Catégorie</TableCell>
                        <TableCell># prospects</TableCell>
                        <TableCell># contactés</TableCell>
                        <TableCell># non contactés</TableCell>
                        <TableCell>A contacter</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {prospects.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                        .map((p, index) =>
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {p.category.replace(/_/g, ' ')}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {p.count}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {p.contacted}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {p.not_contacted}
                            </TableCell>
                            <TableCell>
                              {p.not_contacted ?
                                <a href={`/myAlfred/api/admin/prospect/tocontact/${p.category}`}
                                   onClick={
                                     () => setTimeout(this.load, 2000)
                                   }
                                >
                                  {`Liste ${p.category.replace(/_/g, ' ')}`}
                                </a>
                                :
                                <div>Aucun nouveau contact</div>
                              }
                            </TableCell>
                          </TableRow>,
                        )}

                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  component="div"
                  count={prospects.length}
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
