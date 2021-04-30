import React, { useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import Link from 'next/link';
const moment = require('moment-timezone');
moment.locale('fr');
const util = require('util');
import LockIcon from '@material-ui/icons/Lock';

class StatusCellRenderer extends React.Component {

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
        <img src="/static/assets/img/userServicePreview/alfred.svg" style={{width: '40px'}} title='Alfred' />
       : null }
      {this.state.value.admin ? <img src="/static/assets/img/userServicePreview/admin.svg" style={{width: '40px'}} title='Admin' /> : null }
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

class StatusCellFilter extends React.Component {

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

class DateCellRenderer extends React.Component {

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

class DateTimeCellRenderer extends React.Component {

  render = () => {
    if (!this.props.value) {
      return ""
    }
    const m=moment(this.props.value)
    return (
      <>{m.isValid() ? m.format('L LT') : 'date invalide'}</>
    )
  }
}

class PictureCellRenderer extends React.Component {

  render = () => {
    const rowHeight = this.props.node.rowHeight
    return (
      <div>
      <img style={{ width:'auto', height:rowHeight}} src={`${this.props.value}`}/>
      </div>
    )
  }
}

class PrivateRenderer extends React.Component {

  render = () => {
    return (
      <>
      { this.props.value ?
        <div><LockIcon/>{this.props.value.full_name}</div>
        :
        null
      }
      </>
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

module.exports= {
  StatusCellRenderer, DateCellRenderer, DateTimeCellRenderer,
  StatusCellFilter, PictureCellRenderer, PrivateRenderer, LocationRenderer, WarningRenderer }
