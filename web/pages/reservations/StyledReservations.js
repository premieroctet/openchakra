import styled from 'styled-components'

const StyledReservations = styled.div`
  
  ${props => {
  switch (props.theme) {
    case 'aftral':
      return `
        /* background: red !important;*/
      `
    default:
      return `
        
      `
  }
}
  }
  
  `

export default StyledReservations
