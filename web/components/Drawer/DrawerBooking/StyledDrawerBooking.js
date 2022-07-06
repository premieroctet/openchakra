import styled from 'styled-components'

const StyledDrawerBooking = styled.div`
  

  ${props => {
  if (props.theme == 'aftral') {

    return `

      h3 {
        margin-top: 0;
        color: var(--black);
      }

      
    `
  }
  return `
      background: red;
      color: black;
    `
}
  }

`

export default StyledDrawerBooking
