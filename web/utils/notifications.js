import SnackBar from '../components/SnackBar/SnackBar'
import React from 'react'
import ReactDOM from 'react-dom'
const lodash=require('lodash')

const createBar = (severity, message) => {
  const body = document.getElementById('__next')
  const mysnackbar = <SnackBar severity={severity} message={message} id={message}/>
  let div = document.createElement('div')
  div.id = 'id_snackbar'
  ReactDOM.render(mysnackbar, body.appendChild(div))
}

const snackBar = (severity, message) => {

  if(lodash.isObject(message)) {
    return createBar(severity, JSON.stringify(message))
  }
  if (lodash.isArray(message)) {
    return message.forEach(m => createBar(severity, m))
  }
  return createBar(severity, message)
}

const snackBarSuccess = message => {
  snackBar('success', message)
}

const snackBarError= error => {
  snackBar('error', error)
}

const snackBarWarning= warning => {
  snackBar('warning', warning)
}

module.exports = {
  snackBarSuccess,
  snackBarWarning,
  snackBarError,
}
