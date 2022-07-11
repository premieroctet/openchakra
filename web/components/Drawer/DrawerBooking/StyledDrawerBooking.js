import styled from 'styled-components'

const StyledDrawerBooking = styled.div`
  

  ${props => {
  if (props.theme == 'aftral') {

    return `

      .container-sm {
        width: min(100% - 2rem, 25rem) !important;
        margin-inline: auto;
      }

      /* Accordions */
      .MuiAccordion-root {
        box-shadow: none;
      }

      h3 {
        margin-block: 0 var(--spc-8);
        color: var(--black);
      }
      
      section label, h4 {
        color: var(--black);
        font-weight: var(--font-bold);
        display: block;
        margin-block: 0 var(--spc-2);
      }
      
      input {
        color: gray;
      }

      section {
        padding: var(--spc-4);
        border: 1px solid gray;
        border-radius: var(--rounded-md);
        margin-bottom: var(--spc-4);
      }   

      dl {
        margin: 0;
        display: grid;
        grid-template-columns: auto auto;
        align-content: center;
        column-gap: var(--spc-2);
        row-gap: var(--spc-2);
      }

      dt, dd {
        color: gray;
      }

      dd {
        justify-self: end;
        margin-left: 0;
        width: fit-content;
      }

      

      .date {
        input {
          border:0;
        }

      }

      .tip {
        background-color: #EEE;
        padding: var(--spc-2);
        display: grid;
        grid-template-columns: 3rem 1fr;
        align-items: center;
        column-gap: var(--spc-4);
        .img {
          font-size: 2rem;
          justify-self: center;

        }
      }

      button[type="submit"] {
        color: var(--white);
        font-size: var(--text-lg);
        font-weight: var(--font-bold);
        background-color: var(--brand-color);
        width: 100%;
        padding-block: var(--spc-4);
        border-radius: var(--rounded-md);
        cursor: pointer;
        border: 0;
        margin-bottom: var(--spc-2);
        
      }
      
      button[type="submit"]:disabled {
        background-color: lightgray;
        cursor: not-allowed;
      }
      
      .button_info {
        color: gray;
        font-size: var(--text-base);
        border: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--spc-2);
        width: 100%;
        background: none;
        text-decoration: underline;
        cursor: pointer;
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
