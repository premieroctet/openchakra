import styled from 'styled-components'

const StyledDrawerBooking = styled.div`
  

  ${props => {
  if (props.theme == 'aftral') {

    return `

      .container-sm {
        width: min(100% - 2rem, 25rem) !important;
        margin-inline: auto;
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
