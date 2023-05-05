import React, {useState, useEffect} from 'react'
import axios from 'axios';
import lodash from 'lodash'
import { useLocation } from 'react-router-dom'
import { ACTIONS } from '../utils/actions'
import {
  extractFiltersFromProps,
  getConditionalProperties,
} from '../utils/filters'
import {Error} from '../utils/notifications'

const withDynamicButton = Component => {

  const Internal = props => {

    const [errorMessage, setErrorMessage]=useState(null)

    const query = new URLSearchParams(useLocation().search)
    let value = props.dataSource
    if (props.attribute) {
      value=lodash.get(value, props.attribute)
    }
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

    const [actionAllowed, setActionAllowed]=useState(true)

    useEffect(()=> {
      axios.get(`/myAlfred/api/studio/action-allowed/${action}/${value?._id}`)
        .then(res => setActionAllowed(res.data))
        .catch(err => console.error(err))
    }, [action, value])

    if (action) {
      onClick = () => {
        if (!ACTIONS[action]) {
          return setErrorMessage(`Undefined action ${action}`)
        }
        return ACTIONS[action]({
          ...props,
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
            const params = {
              ...props,
              value: res,
              props: nextActionProps,
              backend,
              context,
              dataModel,
              query,
              model: props.dataModel,
              ...res,
            }
            return ACTIONS[nextAction](params)
          })
          .then(() => {
            console.log('ok')
            props.reload()
          })
          .catch(err => {
            console.error(err)
            if (err.response?.status!=502) {
              setErrorMessage(err.response?.data || err)
            }
          })
      }
    }
    const conditionalProperties = getConditionalProperties(
      props,
      props.dataSource,
    )

    // Hide if action unavailable and hideIfForbidden is set
    if (props.hideIfForbidden && !actionAllowed) {
      return null
    }
    return (
      <>
      <Component disabled={!actionAllowed}
        {...props}
        onClick={onClick}
        {...conditionalProperties}
      />
      {errorMessage && <Error message={errorMessage} onClose={()=>setErrorMessage(null)}/>}
      </>
    )
  }

  return Internal
}

export default withDynamicButton
