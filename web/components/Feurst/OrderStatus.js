import React from 'react'
import styled from 'styled-components'
import {
  CREATED,
  CONVERTED,
  FULFILLED,
  COMPLETE,
  VALID,
  PARTIALLY_HANDLED,
  HANDLED,
} from '../../utils/feurst/consts'

const statusColors = {
  '#bbd5a2': [HANDLED], // Green
  '#e0a469': [VALID, CONVERTED], // Orange
  'gray': [CREATED, FULFILLED, COMPLETE, PARTIALLY_HANDLED], // Gray
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

const OrderStatus = ({endpoint, sales, status, label}) => {


  return (
    <StyledOrderStatus>
      <Spot status={status}/>
      <span>{label}</span>
    </StyledOrderStatus>
  )
}

export default OrderStatus
