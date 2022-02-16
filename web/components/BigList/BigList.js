import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import IconButton from '@material-ui/core/IconButton'
import GetAppIcon from '@material-ui/icons/GetApp'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-enterprise'

import Grid from '@material-ui/core/Grid'
const moment=require('moment')
const models=require('./models')

class BigList extends React.Component {

  constructor(props) {
    super(props)
    this.gridRef=React.createRef()
    this.fitColumns=this.fitColumns.bind(this)
  }

  fitColumns = () => {
    if (this.gridRef.current) {
      this.gridRef.current.api.sizeColumnsToFit()
    }
  }

  onAddClick = () => {
    if (this.props.onAddClick) {
      this.props.onAddClick()
    }
  }

  onDownloadClick = () => {
    if (this.gridRef.current) {
      this.gridRef.current.api.exportDataAsCsv({columnSeparator: ';', processCellCallback: this.processExportCell})
    }
  }

  processExportCell = params => {
    const {value, column}=params
    const colId = column.colId
    const DATE_FIELD_RE=/birth|_date/i
    // Moment ?
    if (DATE_FIELD_RE.test(colId) && moment(value).isValid()) {
      return moment(value).format('L LT')
    }

    if (colId=='status') {
      let res=`${value.alfred ? 'ALF' : ''}/${value.admin ? 'ADM' : ''}`
      if (res=='/') { res = '' }
      return res
    }

    if (colId=='private_alfred') {
      return value ? 'OUI' : 'NON'
    }

    if (colId=='location') {
      const location=value
      const res = Object.keys(location).filter(k => location[k]).map(k => k.slice(0, 1).toUpperCase()).join('/')
      return res
    }

    return value
  }

  render = () => {

    const {data, columnDefs, classes, title, header} = this.props

    const frameworkComponents={
      'statusRenderer': models.StatusRenderer,
      'dateRenderer': models.DateRenderer,
      'mangopayRenderer': models.MangopayRenderer,
      'statusFilter': models.StatusFilter,
      'reviewStatusFilter': models.ReviewStatusFilter,
      'pictureRenderer': models.PictureRenderer,
      'privateRenderer': models.PrivateRenderer,
      'dateTimeRenderer': models.DateTimeRenderer,
      'booleanRenderer': models.BooleanRenderer,
      'enumRenderer': models.EnumRenderer,
      'locationRenderer': models.LocationRenderer,
      'warningRenderer': models.WarningRenderer,
      'urlRenderer': models.LinkRenderer,
      'currencyRenderer': models.CurrencyRenderer,
      'colorRenderer': models.ColorRenderer,
      'fontRenderer': models.FontRenderer,
      'deleteRenderer': models.DeleteRenderer,
      'percentRenderer': models.PercentRenderer,
    }

    const defaultColDef={
      sortable: true,
      filter: true,
      resizable: true,
      filterParams: {
        buttons: ['reset', 'apply'],
        newRowsAction: 'keep',
      },
    }

    const group=!!columnDefs.find(c => !!c.aggFunc)

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
          {header && <Grid>{header}</Grid>}
          <Paper style={{height: '600px', width: '100%'}} className={'ag-theme-balham'}>
            <AgGridReact rowData={data} columnDefs={columnDefs} enableSorting={true}
              enableFilter={true} pagination={true} defaultColDef={defaultColDef}
              groupIncludeTotalFooter={group}
              frameworkComponents={frameworkComponents}
              {...this.props}
              localeText= {{
                noRowsToShow: 'Aucun résultat',
                applyFilter: 'Appliquer',
                resetFilter: 'Annuler',
                equals: 'Egal',
                notEqual: 'Différent',
                lessThan: '<',
                greaterThan: '>',
                lessThanOrEqual: '<=',
                greaterThanOrEqual: '>=',
                inRange: "Dans l'intervalle",
                inRangeStart: 'Entre',
                inRangeEnd: 'et',
                contains: 'Contient',
                notContains: 'Ne contient pas',
                startsWith: 'Comence par',
                endsWith: 'Finit par',
                filterOoo: 'Filtrer...',
                blank: 'Vide',
                notBlank: 'Non vide',
              }}
              onRowClicked={ this.props.onRowClicked}
              onCellClicked={ this.props.onCellClicked}
              onFirstDataRendered={this.fitColumns}
              onCellValueChanged = {this.props.onCellValueChanged}
              ref={this.gridRef}
            />
          </Paper>
        </Grid>
      </>
    )
  }
}

module.exports = {BigList}
