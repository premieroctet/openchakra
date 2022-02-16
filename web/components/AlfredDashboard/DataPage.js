import DashboardLayout from '../../hoc/Layout/DashboardLayout'
import {deleteColumn} from '../BigList/models'
import axios from 'axios'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import React from 'react'
import Grid from '@material-ui/core/Grid'
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

  getHeader() {
    return null
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    // TODO Gérer un retour 401 => login
    this.loadData()
  }

  getDataType = () => {
    return null
  }

  _onCellClicked = event => {
    const {colDef, data, value}=event
    if (colDef.headerName=='Supprimer' && this.getDataType()) {
      setAxiosAuthentication()
      axios.delete(`/myAlfred/api/admin/${this.getDataType()}/${data._id}`)
        .then(() => {
          snackBarSuccess('Donnée supprimée')
          this.componentDidMount()
        })
        .catch(err => snackBarError(err.response.data))
    }
    else if (data && this.onCellClicked) {
      this.onCellClicked(data, colDef.field, value)
    }
  }

  _onCellValueChanged = event => {
    const {colDef, data, oldValue, newValue} = event
    this.onCellValueChanged && this.onCellValueChanged(colDef, data, oldValue, newValue, event)
  }

  render() {
    const {classes} = this.props
    const {data} = this.state

    const columnDefs=this.getDataType() ? [...this.getColumnDefs(), deleteColumn()] : this.getColumnDefs()

    return (
      <DashboardLayout title={this.getTitle()}>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid style={{width: '90%'}}>
            <Paper style={{width: '100%'}}>
              <BigList
                data={data}
                columnDefs={columnDefs}
                classes={classes}
                title={this.getTitle()}
                header={this.getHeader()}
                onCellClicked={this._onCellClicked}
                onAddClick={this.onAddClicked}
                onCellValueChanged ={this._onCellValueChanged}
              />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
    )
  }
}

module.exports={DataPage, styles}
