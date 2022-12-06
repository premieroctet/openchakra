import React from 'react'

import { useLocation } from 'react-router-dom'

import { ACTIONS } from '../utils/actions'
import {
  extractFiltersFromProps,
  getConditionalProperties,
} from '../utils/filters'

const withDynamicButton = Component => {
  const Internal = props => {
    const query = new URLSearchParams(useLocation().search)
    const value = props.dataSource
    const action = props.action
    const nextAction = props.nextAction
    const context = props.context
    const dataModel = props.dataModel
    const actionProps = props.actionProps ? JSON.parse(props.actionProps) : {}
    const nextActionProps = props.nextActionProps
      ? JSON.parse(props.nextActionProps)
      : {}
    const backend = props.backend
    let onClick = props.onClick
    if (action) {
      onClick = () => {
        if (!ACTIONS[action]) {
          return alert(`Undefined action ${action}`)
        }
        return ACTIONS[action]({
          value: value,
          props: actionProps,
          backend,
          context,
          dataModel,
          query,
          model: props.dataModel,
        })
          .then(res => {
            if (!nextAction) {
              return true
            }
            return ACTIONS[nextAction]({
              value: res,
              props: nextActionProps,
              backend,
              context,
              dataModel,
              query,
              model: props.dataModel,
            })
          })
          .then(() => {
            console.log('ok')
            props.reload()
          })
          .catch(alert)
      }
    }
    const conditionalProperties = getConditionalProperties(
      props,
      props.dataSource,
    )
    return (
      <Component
        {...props}
        onClick={onClick}
        {...conditionalProperties}
      ></Component>
    )
  }

  return Internal
}

export default withDynamicButton
