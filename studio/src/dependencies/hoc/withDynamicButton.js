import React, {useState, useEffect} from 'react'
import axios from 'axios';
import lodash from 'lodash'
import { useRouter } from 'next/router'
import { ACTIONS } from '../utils/actions'
import { MESSAGES } from '../utils/messages'
import {
  extractFiltersFromProps,
  getConditionalProperties,
} from '../utils/filters'
import {Error, Information} from '../utils/notifications'

const withDynamicButton = Component => {

  const Internal = props => {

    const [errorMessage, setErrorMessage]=useState(null)
    const [infoMessage, setInfoMessage]=useState(null)
    const [insideAction, setInsideAction]=useState(false)

    const router = useRouter()
    const query = new URLSearchParams(router?.asPath)
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
    let onClick = props.onClick

    const [actionAllowed, setActionAllowed]=useState(true)

    useEffect(()=> {
      axios.get(`/myAlfred/api/studio/action-allowed/${action}?dataId=${value?._id}&actionProps=${JSON.stringify(actionProps)}`)
        .then(res => setActionAllowed(res.data))
        .catch(err => console.error(err))
    }, [action, value])

    if (action) {
      onClick = () => {
        if (!ACTIONS[action]) {
          return setErrorMessage(`Undefined action ${action}`)
        }
        setInsideAction(true)
        return ACTIONS[action]({
          ...props,
          value: value,
          props: actionProps,
          context,
          dataModel,
          query,
          model: props.dataModel,
          fireClear: props.fireClear,
        })
          .then(res => {
            if (MESSAGES[action]) {
              setInfoMessage(MESSAGES[action])
            }
            if (!nextAction) {
              return true
            }
            const params = {
              ...props,
              value: res,
              props: nextActionProps,
              context,
              dataModel,
              query,
              model: props.dataModel,
              fireClear: props.fireClear,
              ...res,
            }
            // UGLY!! Shoud block ain thread until dialog closed
            return setTimeout(() => ACTIONS[nextAction](params), 1000)
          })
          .then(() => {
            if (action!='openPage') {
              console.log(`Action ${action} fires reload`)
              props.reload()
            }
            else {
              console.log(`Action ${action} does not fire reload`)
            }
          })
          .catch(err => {
            console.error(err)
            if (err.response?.status!=502) {
              setErrorMessage(err.response?.data || err)
            }
          })
          .finally(() => {
            setInsideAction(false)
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
        isLoading={insideAction}
      />
      {errorMessage && <Error message={errorMessage} onClose={()=>setErrorMessage(null)}/>}
      {infoMessage && <Information message={infoMessage} onClose={()=>setInfoMessage(null)}/>}
      </>
    )
  }

  return Internal
}

export default withDynamicButton
