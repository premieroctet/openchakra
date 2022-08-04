import React from 'react'
import styled from 'styled-components'

const Notice = ({type, children, ...props}) => {
  
  return (
    <BeautifulNotice type={type} {...props}>
      {children}
    </BeautifulNotice>
  )

}

export default Notice

const BeautifulNotice = styled.div`
  display: inline-block;
  border-radius: var(--rounded-xl);
  ${props => {
  switch (props.type) {
    case 'success':
      return `background-color: var(--success-bgcolor);
              color: var(--success-color);
              `
    case 'danger':
      return `background-color: var(--danger-bgcolor);
              color: var(--danger-color);
              `
    case 'warning':
      return `background-color: var(--warning-bgcolor);
              color: var(--warning-color);
              `
    case 'info':
      return `background-color: none;`
    default:
      return `background-color: none;`
  }
}};
  border: 1px solid var(--black);
  padding: var(--spc-4);
  margin-bottom: var(--spc-4);
  box-shadow: 0 2px 3px lightgray;

`
