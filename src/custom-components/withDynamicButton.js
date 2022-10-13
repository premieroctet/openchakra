import React from 'react'

import { ACTIONS } from '../utils/actions';

const withDynamicButton = Component => {
  const internal = props => {
    const value = props.dataSource
    const action = props.action
    const actionProps=props.actionProps ? JSON.parse(props.actionProps): {}
    const backend=props.backend
    let onClick = props.onClick
    if (action) {
      onClick = () => {
        console.log(`Value is ${JSON.stringify(value)}`)
        console.log(`Action is ${JSON.stringify(action)}`)
        console.log(`actionProps are ${JSON.stringify(actionProps)}`)
        if (!ACTIONS[action]) {
          return alert(`Undefined action ${action}`)
        }
        return ACTIONS[action]({value:value, props:actionProps, backend})
          .then(() => alert.log('ok'))
          .catch(err => alert(`Erreur:${err}`))
      }
    }
    console.log(`onClick:${onClick}`)
    return <Component {...props} onClick={onClick}></Component>
  }

  return internal
}

export default withDynamicButton
