import React from 'react'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import {screen} from '../../styles/screenWidths'
import PureDialog from '../Dialog/PureDialog'
import {NormalButton} from './Button'


const DialogConvertQuotation = ({
  isOpenDialog,
  setIsOpenDialog,
  revertToEdition,
  convert,
  orderid,
  endpoint,
}) => {

  return (
    <StyledDialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    >

      <h2>Vous sortez de votre zone de chalandise</h2>
        
      <p><span className='info' role={'img'} alt="info">ℹ</span> Votre adresse de livraison se trouve en dehors de votre zone de chalandise.</p>

      <ul>
        <li>
          Vous pouvez modifier votre adresse de livraison
          <NormalButton
            rounded={'full'}
            bgColor={'#fff'}
            textColor={'#141953'}
            borderColor={'1px solid #141953'}
            onClick={() => {
              revertToEdition({endpoint, orderid})
              setIsOpenDialog(false)
            }}
          >
        Revenir à la saisie
          </NormalButton></li>
        <li>
            Convertir votre commande en devis pour validation auprès de votre commercial
          <NormalButton
            rounded={'full'}
            bgColor={'#fff'}
            textColor={'#141953'}
            borderColor={'1px solid #141953'}
            onClick={() => {
              convert({endpoint, orderid})
              setIsOpenDialog(false)
            }}
          >Convertir en devis
          </NormalButton>
        </li>
      </ul>


    </StyledDialog>
  )
}


const StyledDialog = styled(PureDialog)`
  
  .dialogcontent {
    padding: var(--spc-10);
  }

  h2 {
    color: var(--black);
  }

  p {
    font-size: var(--text-lg);
  }

  ul {
    font-size: var(--text-base);
    list-style-type: none;
    padding: 0;
  }

  li {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr;
    column-gap: var(--spc-4);
    row-gap: var(--spc-4);
    padding-block: var(--spc-4);
    
    button {
        height: min-content;
    }
    
    @media (${screen.lg}) {
        grid-template-columns: 40% 1fr;
    }
  }

  li:first-of-type {
    border-bottom: 1px solid var(--black);
  }

  .info {
    display: inline-flex;
    align-items: center;
    justify-content: center;  
    width: var(--spc-6);
    height: var(--spc-6);
    border-radius: var(--rounded-full);
    background-color: var(--brand-color);
    color: var(--white);
  }

  
 
`

export default withTranslation('feurst', {withRef: true})(DialogConvertQuotation)
