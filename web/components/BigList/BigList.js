import React from 'react';
import { AgGridReact } from 'ag-grid-react'
import {Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
const moment=require('moment')
const models=require('./models')
const util=require('util')

class BigList extends React.Component {

  constructor(props) {
    super(props)
    this.gridRef=React.createRef()
  }

  fitColumns = () => {
    if (this.gridRef.current) {
      this.gridRef.current.api.sizeColumnsToFit()
    }
  }

  onAddClick = event => {
    if (this.props.onAddClick) {
      this.props.onAddClick()
    }
  }

  onDownloadClick = event => {
    if (this.gridRef.current) {
      this.gridRef.current.api.exportDataAsCsv({columnSeparator: ";", processCellCallback: this.processExportCell})
    }
  }

  processExportCell = params => {
    const {value, node, context, column}=params
    const colId = column.colId
    const DATE_FIELD_RE=/birth|_date/i
    // Moment ?
    if (DATE_FIELD_RE.test(colId) && moment(value).isValid()) {
      return moment(value).format('L LT')
    }

    if (colId=="status") {
      var res=`${value.alfred ? 'ALF' : ''}/${value.admin ? 'ADM' : ''}`
      if (res=="/") { res = ""}
      return res
    }

    if (colId=='private_alfred') {
      return value ? "OUI" : "NON"
    }

    if (colId=="location") {
      const location=value
      const res = Object.keys(location).filter(k => location[k]).map( k => k.slice(0, 1).toUpperCase()).join('/')
      return res
    }

    return value
  }

  render = () => {

    const {data, columnDefs, classes, title} = this.props

    const frameworkComponents={
      'statusCellRenderer': models.StatusCellRenderer,
      'dateCellRenderer': models.DateCellRenderer,
      'mangopayCellRenderer' : models.MangopayCellRenderer,
      'statusCellFilter' : models.StatusCellFilter,
      'pictureCellRenderer' : models.PictureCellRenderer,
      'privateRenderer' : models.PrivateRenderer,
      'dateTimeCellRenderer': models.DateTimeCellRenderer,
      'locationRenderer': models.LocationRenderer,
    }

    const defaultColDef={
      sortable: true,
      filter:true,
      resizable: true,
      filterParams: {
        buttons: ['reset', 'apply'],
      },
    }

    return (
      <>
        <Grid container className={classes.signupContainer}>
            <Grid item style={{display: 'flex', justifyContent: 'center'}}>
              <Typography style={{fontSize: 30}}>{title}</Typography>
              { this.props.onAddClick ?
                <IconButton onClick={this.onAddClick}><AddCircleRoundedIcon/></IconButton>
                :
                null
              }
              <IconButton onClick={this.onDownloadClick}><GetAppIcon/></IconButton>
            </Grid>
            <Paper style={{height: '600px', width: '100%'}} className={"ag-theme-balham"}>
              <AgGridReact rowData={data} columnDefs={columnDefs} enableSorting={true}
              enableFilter={true} pagination={true} defaultColDef={defaultColDef}
              frameworkComponents={frameworkComponents}
              {...this.props}
              localeText= {{noRowsToShow: 'Aucun résultat'}}
              onRowClicked={ this.props.onRowClicked}
              onCellClicked={ this.props.onCellClicked}
              onGridReady={this.fitColumns}
              ref={this.gridRef}
              />
            </Paper>
        </Grid>
      </>
    )
  }
}

module.exports = {BigList}
