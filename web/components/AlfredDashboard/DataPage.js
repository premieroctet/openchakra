import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Layout from '../../hoc/Layout/Layout'
import Router from 'next/router'
import Paper from '@material-ui/core/Paper'
const {BigList}=require('../../components/BigList/BigList')
const moment = require('moment-timezone')
moment.locale('fr')
const {setAxiosAuthentication} = require('../../utils/authentication')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

class DataPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    // TODO Gérer un retour 401 => login
    this.loadData()
  }

  _onCellClicked = event => {
    const {colDef, data, value}=event
    if (data && this.onCellClicked) {
      this.onCellClicked(data, colDef.field, value)
    }
  }

  render() {
    const {classes} = this.props
    const {data} = this.state

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList
                data={data}
                columnDefs={this.getColumnDefs()}
                classes={classes}
                title={this.getTitle()}
                onCellClicked={this._onCellClicked}
                onAddClick={this.onAddClicked}
              />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

module.exports={DataPage, styles}
