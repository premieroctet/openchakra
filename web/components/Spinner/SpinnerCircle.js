import React from 'react'
import styled, {keyframes} from 'styled-components'


const load8 = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div`
  pointer-events: none;
  display: grid;
  position: absolute;
  background-color: rgba(0,0,0,.2);
  inset: 0;
  z-index:1000;

  & > div {
      grid-row: 1/-1;
      grid-column: 1/-1;
  }
`

const SpinnerCircleAnimation = styled.div`
  display: inline-block;
  align-self: center;
  justify-self: center;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(52,101,164, 0.2);
  border-right: 1.1em solid rgba(52,101,164, 0.2);
  border-bottom: 1.1em solid rgba(52,101,164, 0.2);
  border-left: 1.1em solid #3465a4;
  transform: translateZ(0);
  animation: ${load8} 1.1s infinite linear;

  &::after, && {
    border-radius: 50%;
    width: 20%;
    max-width: 200px;
    aspect-ratio: 1 / 1;
  }
`


const SpinnerCircle = ({loading = false, children}) => {

  return (
    loading ?
      (<SpinnerContainer>
        <SpinnerCircleAnimation />
        <div>{children}</div>
      </SpinnerContainer>)
      : (<>{children}</>)
  )
  
}
  
  
export default SpinnerCircle
  
