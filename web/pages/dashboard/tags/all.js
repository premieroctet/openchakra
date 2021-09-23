import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import HomeIcon from '@material-ui/icons/Home'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'

import Layout from '../../../hoc/Layout/Layout'

const moment = require('moment-timezone')

const {BigList}=require('../../../components/BigList/BigList')
const {setAxiosAuthentication} = require('../../../utils/authentication')

moment.locale('fr')

const styles = () => ({
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
})

class all extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
    }

    this.columnDefs=[
      {headerName: '_id', field: '_id', width: 0},
      {headerName: 'Label', field: 'label'},
      {headerName: 'Titre', field: 'title'},
      {headerName: 'Description', field: 'description'},
    ]
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/tags/all')
      .then(response => {
        let tags = response.data
        this.setState({tags: tags})
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 401 || error.response.status === 403) {
          Router.push({pathname: '/login'})
        }
      })
  }

  onRowClick = data => {
    if (data) {
      window.open(`/dashboard/tags/view?id=${data._id}`, '_blank')
    }
  }


  render() {
    const {classes} = this.props
    const {tags} = this.state

    return (
      <Layout>
        <Grid container style={{marginTop: 70}}>
        </Grid>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
	        <Link href={'/dashboard/home'}>
            <Typography className='retour'><HomeIcon className='retour2'/> <span>Retour dashboard</span></Typography>
	        </Link>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList data={tags} columnDefs={this.columnDefs} classes={classes}
                title={'Tags'} onRowClick={this.onRowClick} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withStyles(styles)(all)
