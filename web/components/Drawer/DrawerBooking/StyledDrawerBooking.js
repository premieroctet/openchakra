import styled from 'styled-components'

const StyledDrawerBooking = styled.div`
  

  ${props => {
  if (props.theme == 'aftral') {

    return `

      h3 {
        margin-top: 0;
        color: var(--black);
      }
      
      section label {
        font-weight: var(--font-bold);
        display: block;
        margin-bottom: var(--spc-2);
      }

      input {
        color: gray;
      }

      section {
        padding: var(--spc-4);
        border: 1px solid gray;
        border-radius: var(--rounded-md);
      }

      .date {
        input {
          border:0;
        }

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
