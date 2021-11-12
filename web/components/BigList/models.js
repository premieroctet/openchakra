import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import {Link} from '@material-ui/core'
const moment = require('moment')

moment.locale('fr')
import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
const {insensitiveComparator, normalize} = require('../../utils/text')

class StatusRenderer extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      value: props.value,
      data: props.data,
    }
  }

  render = () => {
    return (
      <>
        <div>
          {this.state.value.alfred ? <img src="/static/assets/img/alfred.svg" style={{width: '40px'}} alt={' Alfred '} title='Alfred' /> : null }
          {this.state.value.admin ? <img src="/static/assets/img/admin.svg" style={{width: '40px'}} alt='Admin' title='Admin' /> : null }
        </div>
      </>
    )
  }
}

class LocationRenderer extends React.Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    const location = this.props.value
    const strValue = Object.keys(location).filter(k => location[ k ]).map(k => k.slice(0, 1).toUpperCase()).join('/')
    return (
      <div>{strValue}</div>
    )
  }
}

class StatusFilter extends React.Component {

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
    this.setState({[ event.target.name ]: event.target.checked}, () => {
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
    return (
      <div>
        <Checkbox name={'alfred'} checked={this.state.alfred} onChange={this.onChange} />
        <img src="/static/assets/img/alfred.svg" style={{width: '40px'}} alt='Alfred' title='Alfred' />
        <br/>
        <Checkbox name={'admin'} checked={this.state.admin} onChange={this.onChange} />
        <img src="/static/assets/img/admin.svg" style={{width: '40px'}} alt='Admin' title='Admin' />
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

  render = () => {
    if (!this.props.value) {
      return null
    }
    return (
      <CheckIcon/>
    )
  }
}

class EnumRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ''
    }
    return (
      <>{this.props.enum[ this.props.value ]}</>
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

const deleteColumn = () => {
  let base={
    headerName: 'Supprimer',
    cellRenderer: 'deleteRenderer',
  }
  return base
}

module.exports= {
  StatusRenderer, DateRenderer, DateTimeRenderer, CurrencyRenderer,
  StatusFilter, PictureRenderer, PrivateRenderer, BooleanRenderer, LocationRenderer, WarningRenderer,
  EnumRenderer, LinkRenderer, ColorRenderer, FontRenderer, DeleteRenderer,
  textColumn, booleanColumn, dateColumn, dateTimeColumn, currencyColumn, pictureColumn,
  colorColumn, fontColumn, deleteColumn, warningColumn,
}
