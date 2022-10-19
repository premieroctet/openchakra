import React from 'react'

import { ACTIONS } from '../utils/actions'

const withDynamicButton = Component => {
  const internal = props => {
    const value = props.dataSource
    const action = props.action
    const context = props.context
    const actionProps=props.actionProps ? JSON.parse(props.actionProps): {}
    const backend=props.backend
    let onClick = props.onClick
    if (action) {
      onClick = () => {
        if (!ACTIONS[action]) {
          return alert(`Undefined action ${action}`)
        }
        return ACTIONS[action]({value:value, props:actionProps, backend, context, model:props.dataModel})
          .then(() => {console.log('ok'); props.reload()})
          .catch(err => alert(`Erreur:${err}`))
      }
    }
    return <Component {...props} onClick={onClick}></Component>
  }

  return internal
}

export default withDynamicButton
