import React, { useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link';
const moment = require('moment-timezone');
moment.locale('fr');
const util = require('util');
import LockIcon from '@material-ui/icons/Lock';
import CheckIcon from '@material-ui/icons/Check';
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
      {this.state.value.alfred ?
        <img src="/static/assets/img/alfred.svg" style={{width: '40px'}} title='Alfred' />
       : null }
      {this.state.value.admin ? <img src="/static/assets/img/admin.svg" style={{width: '40px'}} title='Admin' /> : null }
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
    const strValue = Object.keys(location).filter(k => location[k]).map( k => k.slice(0, 1).toUpperCase()).join('/')
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

  onChange = event => {
    this.setState({[event.target.name]: event.target.checked}, () => {
      this.params.filterChangedCallback()
    })
  }

  doesFilterPass = params => {
    const data = params.data
    if (this.state.alfred && !data.is_alfred || this.state.admin && !data.is_admin) {
      return false
    }
    return true
  }

  setModel = model => {
    this.setState(model)
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
          <img src="/static/assets/img/userServicePreview/alfred.svg" style={{width: '40px'}} title='Alfred' />
        <br/>
        <Checkbox name={'admin'} checked={this.state.admin} onChange={this.onChange} />
          <img src="/static/assets/img/userServicePreview/admin.svg" style={{width: '40px'}} title='Admin' />
      </div>
    )
  }
}

class DateRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ""
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
      return ""
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
    if (this.props.value) {
      return (
          <div>
          <img style={{ width:'auto', height:rowHeight}} src={`${this.props.value}`}/>
          </div>
      )
    }
    else {
      return null
    }
  }
}

class PrivateRenderer extends React.Component {

  render = () => {
    return (
      <>
      { this.props.value ?
        <div><LockIcon/>{this.props.value}</div>
        :
        null
      }
      </>
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

class BooleanCellEditor extends React.Component {

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
      return ""
    }
    return (
      <>{this.props.enum[this.props.value]}</>
    )
  }
}

class WarningRenderer extends React.Component {
  render = () => {
    return (
      <em style={{color:'red'}}>{this.props.value}</em>
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

const textColumn = obj => {
  var base={
    comparator: insensitiveComparator,
    filterParams: {
      textFormatter: normalize
    }
  }
  return Object.assign(base, obj)
}

const booleanColumn = obj => {
  var base={
    cellRenderer: 'booleanRenderer',
  }
  return Object.assign(base, obj)
}

const dateColumn = obj => {
  var base={
    cellRenderer: 'dateRenderer',
    filter:'agDateColumnFilter',
  }
  return Object.assign(base, obj)
}

const dateTimeColumn = obj => {
  var base={
    cellRenderer: 'dateTimeRenderer',
    filter:'agDateColumnFilter',
  }
  return Object.assign(base, obj)
}

const currencyColumn = obj => {
  var base={
    cellRenderer: 'currencyRenderer',
    filter:'agNumberColumnFilter',
  }
  return Object.assign(base, obj)
}

const pictureColumn = obj => {
  var base={
    cellRenderer:'pictureRenderer',
  }
  return Object.assign(base, obj)
}

module.exports= {
  StatusRenderer, DateRenderer, DateTimeRenderer, CurrencyRenderer,
  StatusFilter, PictureRenderer, PrivateRenderer, BooleanRenderer,LocationRenderer, WarningRenderer,
  EnumRenderer, LocationRenderer, LinkRenderer,
  textColumn, booleanColumn, dateColumn, dateTimeColumn, currencyColumn, pictureColumn
}
