import axios from 'axios';
const {setAxiosAuthentication, clearAuthenticationToken}=require('../../utils/authentication')

import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import Link from 'next/link';
import Router from 'next/router';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const {BigList}=require('../../components/BigList/BigList')

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    marginTop: '10px',
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
      fields: [],
      mandatory: [],
      // Le bon coin
      category: '',
      url: '',
      lbc_message: [],
      lbc_error: [],
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.load = this.load.bind(this);
    this.fileRef = React.createRef()

    this.columnDefs=[
      {headerName: "_id", field: "_id", width: 0},
      {headerName: "Catégorie", field: "category"},
      {headerName: "#prospects", field: "count"},
      {headerName: "#contactés", field: "contacted"},
      {headerName: "#non contactés", field: "not_contacted"},
      {headerName: "A contacter", field: "download", cellRenderer: 'linkRenderer'},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/prospect/fields')
      .then( response => {
        const fields=response.data
        this.setState(fields)
      })
      .catch (err => {
        console.error(err)
      })
    this.load();
  }

  load() {
    axios.get('/myAlfred/api/admin/prospect/all')
      .then((response) => {
        const prospects=response.data
        prospects.forEach(p => {
          p.download={
            link: `/myAlfred/api/admin/prospect/tocontact/${p.category}`,
            text: `Liste ${p.category}`
          }
        })
        this.setState({prospects: prospects});
      })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        clearAuthenticationToken()
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

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
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

  startSearch = () => {
    const {url, category} = this.state
    this.setState({lbc_message: ['Scan en cours...'], lbc_error:[]})
    setAxiosAuthentication()
    axios.post('/myAlfred/api/admin/prospect/search', {url, category})
      .then(res => {
        const msg=res.data
        this.setState({lbc_message: msg, lbc_error:[]})
      })
      .catch(err => {
        console.error(err)
        this.setState({lbc_message: [], lbc_error: err.response.data})
      })
  }

  render() {
    const {classes} = this.props;
    const {prospects, export_data, comments, errors, category, url, lbc_message, lbc_error} = this.state;

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width:'100%'}}>
          <Link href={'/dashboard/home'}>
            <Typography className="retour"><HomeIcon className="retour2"/> <span>Retour</span></Typography>
          </Link>
        </Grid>
          <Grid style={{width: '100%'}}>
          <Card className={classes.card}>
            <Grid>
              <Card className={classes.card}>
              <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Typography style={{fontSize: 30}}>Scan le bon coin</Typography>
                <Typography>Catégorie:</Typography>
                <TextField
                  name='category'
                  value={category}
                  onChange={this.onChange}
                />
                <Typography>URL le bon coin:</Typography>
                <TextField
                  style={{width:'100%'}}
                  name='url'
                  value={url}
                  onChange={this.onChange}
                />
                { (lbc_message||[]).map( part => {
                    return (
                      <div>{part}</div>
                    )
                  })
                }
                { (lbc_error||[]).map( part => {
                    return (
                      <em style={{color:'red'}}>{part}</em>
                    )
                  })
                }
                <Button disabled={!category || !url} onClick={this.startSearch}>
                  Lancer la recherche
                </Button>
              </Grid>
              </Card>
              <Card className={classes.card}>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Import Excel</Typography>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              Sélectionnez un fichier .csv ou .txt, séparateur point-virgule
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <ul>
                <li>Colonnes possibles : {this.state.fields.join(',')}</li>
                <li>Colonnes obligatoires : {this.state.mandatory.join(',')}</li>
              </ul>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <input ref={this.fileRef} type="file" name="file" id="file" onChange={this.onChangeHandler}/>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                {comments}
                <em style={{color: 'red'}}>{errors}</em>
              </Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <Button disabled={!this.state.selectedFile} onClick={this.onClickHandler}>Importer</Button>
              </Grid>
              </Card>
              <Card className={classes.card}>
              <Paper style={{width: '100%'}}>
            		<BigList
            			data={prospects}
            			columnDefs={this.columnDefs}
            			classes={classes}
            			title={'Prospection'}
				          paginationPageSize='300'
            		/>
              </Paper>
              </Card>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(all);
