const {valueBetween} = require('../../utils/functions')
import {withTranslation} from 'react-i18next'
import {REVIEW_STATUS} from '../../utils/consts'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import {Link} from '@material-ui/core'
const moment = require('moment')
const { inspect } = require('util');


moment.locale('fr')
import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
const {insensitiveComparator, normalize} = require('../../utils/text')

class _StatusRenderer extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      value: props.value,
      data: props.data,
    }
  }

  render = () => {
    const {t}=this.props
    return (
      <>
        <div>
          {this.state.value.alfred ? <img src="/static/assets/img/alfred.svg" style={{width: '40px'}} alt={t('DASHBOARD.alfred')} title={t('DASHBOARD.alfred')} /> : null }
          {this.state.value.admin ? <img src="/static/assets/img/admin.svg" style={{width: '40px'}} alt='Admin' title='Admin' /> : null }
        </div>
      </>
    )
  }
}

const StatusRenderer=withTranslation('custom', {withRef: true})(_StatusRenderer)

class LocationRenderer extends React.Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    const location = this.props.value
    const strValue = Object.keys(location).filter(k => location[k]).map(k => k.slice(0, 1).toUpperCase()).join('/')
    return (
      <div>{strValue}</div>
    )
  }
}

class _StatusFilter extends React.Component {

  constructor(props) {
    super(props)
    this.params=props
    this.state={
      alfred: false,
      admin: false,
    }
  }

  doesFilterPass = p => {
    const {admin, alfred}=this.state
    const user=p.data
    return user && (admin==user.is_admin) && (alfred==user.is_alfred)
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.checked}, () => {
      this.params.filterChangedCallback()
    })
  }

  getModel = () => {
    return this.state
  }

  isFilterActive = () => {
    return this.state.alfred || this.state.admin
  }

  render = () => {
    const {t}=this.props
    return (
      <div>
        <Checkbox name={'alfred'} checked={this.state.alfred} onChange={this.onChange} />
        <img src="/static/assets/img/alfred.svg" style={{width: '40px'}} alt={t('DASHBOARD.alfred')} title={t('DASHBOARD.alfred')} />
        <br/>
        <Checkbox name={'admin'} checked={this.state.admin} onChange={this.onChange} />
        <img src="/static/assets/img/admin.svg" style={{width: '40px'}} alt='Admin' title='Admin' />
      </div>
    )
  }
}

const StatusFilter=withTranslation('custom', {withRef: true})(_StatusFilter)

class ReviewStatusFilter extends React.Component {

  constructor(props) {
    super(props)
    this.params=props
    this.state=Object.values(REVIEW_STATUS).reduce((acc, v) => { return {...acc, [v]: false} }, {})
  }

  doesFilterPass = p => {
    const review=p.data
    return review && !!this.state[review.status]
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.checked}, () => {
      this.params.filterChangedCallback()
    })
  }

  getModel = () => {
    return this.state
  }

  isFilterActive = () => {
    return Object.values(this.state).some(v => v)
  }

  render = () => {
    return (
      <div>
        {Object.values(REVIEW_STATUS).map(k => (
          <div>
            <Checkbox name={k} checked={this.state[k]} onChange={this.onChange} />
            {k}
          </div>
        ))
        }
      </div>
    )
  }
}

class DateRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ''
    }
    const m=moment(this.props.value)
    return (
      <>{m.isValid() ? m.format('L') : 'date invalide'}</>
    )
  }
}

class DateTimeRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ''
    }
    const m=moment(this.props.value)
    return (
      <>{m.isValid() ? m.format('L LT') : `date invalide:${this.props.value}`}</>
    )
  }
}

class PictureRenderer extends React.Component {

  render = () => {
    const rowHeight = this.props.node.rowHeight
    let pictureUrl = this.props.value
    if (pictureUrl) {
      if (!pictureUrl.startsWith('/')) {
        pictureUrl = `/${pictureUrl}`
      }
      return (
        <div>
          <img style={{width: 'auto', height: rowHeight}} src={pictureUrl}/>
        </div>
      )
    }
    return null
  }
}

class PrivateRenderer extends React.Component {

  render = () => {
    if (this.props.value) {
      return null
    }
    return (
      <div><LockIcon/>{this.props.value}</div>
    )
  }

}

class BooleanRenderer extends React.Component {

  constructor(props) {
    super(props)
    this.checkedHandler = this.checkedHandler.bind(this)
  }

  checkedHandler() {
    let checked = event.target.checked
    let colId = this.props.column.colId
    this.props.node.setDataValue(colId, checked)
  }

  render() {
    if (this.props.value===undefined) {
      return null
    }
    return (
      <input
        type="checkbox"
        onClick={this.checkedHandler}
        checked={this.props.value}
      />
    )
  }

}

class EnumRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ''
    }
    return (
      <>{this.props.enum[this.props.value]}</>
    )
  }
}

class WarningRenderer extends React.Component {
  render = () => {
    return (
      <em style={{color: 'red'}}>{this.props.value}</em>
    )
  }
}

class LinkRenderer extends React.Component {
  render = () => {
    const {text, link}=this.props.value
    return (
      <Link href={link}>{text}</Link>
    )
  }
}

class CurrencyRenderer extends React.Component {
  render = () => {
    return (
      <div style={{textAlign: 'right'}}>{Number(this.props.value).toFixed(2)}€</div>
    )
  }
}

class PercentRenderer extends React.Component {
  render = () => {
    return (
      <div style={{textAlign: 'right'}}>{Number(this.props.value).toFixed(2)}%</div>
    )
  }
}

class ColorRenderer extends React.Component {
  render = () => {
    console.log(`Color:${this.props.value}`)
    return (
      <div style={{backgroundColor: this.props.value}}>{this.props.value}</div>
    )
  }
}

class FontRenderer extends React.Component {
  render = () => {
    console.log(`Font:${this.props.value}`)
    return (
      <div style={{fontFamily: this.props.value}}>{this.props.value}</div>
    )
  }
}

class DeleteRenderer extends React.Component {
  render = () => {
    return (
      <DeleteForeverIcon />
    )
  }
}

const textColumn = obj => {
  let base={
    comparator: insensitiveComparator,
    filterParams: {
      textFormatter: normalize,
    },
  }
  return Object.assign(base, obj)
}

const warningColumn = obj => {
  let base={
    cellRenderer: 'warningRenderer',
  }
  return Object.assign(base, obj)
}

const booleanColumn = obj => {
  let base={
    cellRenderer: 'booleanRenderer',
  }
  return Object.assign(base, obj)
}

const dateColumn = obj => {
  let base={
    cellRenderer: 'dateRenderer',
    filter: 'agDateColumnFilter',
  }
  return Object.assign(base, obj)
}

const dateTimeColumn = obj => {
  let base={
    cellRenderer: 'dateTimeRenderer',
    filter: 'agDateColumnFilter',
  }
  return Object.assign(base, obj)
}

const currencyColumn = obj => {
  let base={
    cellRenderer: 'currencyRenderer',
    filter: 'agNumberColumnFilter',
  }
  return Object.assign(base, obj)
}

const pictureColumn = obj => {
  let base={
    cellRenderer: 'pictureRenderer',
  }
  return Object.assign(base, obj)
}

const colorColumn = obj => {
  let base={
    cellRenderer: 'colorRenderer',
  }
  return Object.assign(base, obj)
}

const fontColumn = obj => {
  let base={
    cellRenderer: 'fontRenderer',
  }
  return Object.assign(base, obj)
}

const percentColumn = obj => {
  let base={
    cellRenderer: 'percentRenderer',
    valueSetter: p => {
      const value=parseFloat(p.newValue)
      if (!valueBetween(value, 0, 100)) {
        return false
      }
      console.log(`Setting value ${value/100.0}`)
      p.data[p.colDef.field]=value/100.0
      return true
    },
    valueGetter: p => {
      return p.data[p.colDef.field]*100
    },
  }
  return Object.assign(base, obj)
}

const deleteColumn = () => {
  let base={
    headerName: 'Supprimer',
    cellRenderer: 'deleteRenderer',
  }
  return base
}

const refColumn = obj => {
  let base={
    cellEditor: 'agSelectCellEditor',
    refData: obj.data,
    cellEditorParams: {
      values: Object.keys(obj.data),
    },
  }
  return Object.assign(base, obj)
}

module.exports= {
  // Renderers
  StatusRenderer, DateRenderer, DateTimeRenderer, CurrencyRenderer,
  StatusFilter, PictureRenderer, PrivateRenderer, BooleanRenderer, LocationRenderer, WarningRenderer,
  EnumRenderer, LinkRenderer, ColorRenderer, FontRenderer, DeleteRenderer,
  PercentRenderer,
  // Columns
  textColumn, booleanColumn, dateColumn, dateTimeColumn, currencyColumn, pictureColumn,
  colorColumn, fontColumn, deleteColumn, warningColumn, ReviewStatusFilter,
  refColumn, percentColumn,
}
