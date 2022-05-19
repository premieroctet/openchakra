import React from 'react'
import styled from 'styled-components'
import {
  CREATED,
  FULFILLED,
  COMPLETE,
  VALID,
  PARTIALLY_HANDLED,
  HANDLED,
  EXPIRED,
} from '../../utils/consts'
const {CONVERTED} = require('../../utils/feurst/consts')


const statusColors = {
  '#bbd5a2': [HANDLED], // Green
  '#e0a469': [VALID], // Orange
  'gray': [CREATED, FULFILLED, COMPLETE, PARTIALLY_HANDLED],
}

const Spot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: var(--rounded-full);
  background-color: ${props => Object.entries(statusColors).filter(([, arrayVal]) => arrayVal.includes(props.status)).map(([key]) => key)}

`
const StyledOrderStatus = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--spc-2);

  span {
    flex-shrink: 20;
  }
`

const labelStatus = {
  [CREATED]: {
    'SALES': {

    },
    'CUSTOMER': {

    },

  },
}

const OrderStatus = ({endpoint, sales, status}) => {


  const statusLabel = status => {
    switch(status) {
      case CREATED:
        return 'en création'
      case FULFILLED:
        return 'en création'
      case COMPLETE:
        return 'en attente de validation'
      case VALID:
        return 'validé'
      case PARTIALLY_HANDLED:
        return 'partiellement traité'
      case HANDLED:
        return 'traité'
      case CONVERTED:
        return 'converti en commande'
      case EXPIRED:
        return 'expirée'
      default:
        return ''
    }
  }

  return (
    <StyledOrderStatus>
      <Spot status={status}/>
      <span>{statusLabel(status)}</span>
    </StyledOrderStatus>
  )
}

export default OrderStatus
