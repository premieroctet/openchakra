import React, {useState} from 'react'
import styled from 'styled-components'
import PureDialog from '../Dialog/PureDialog'

const ToTheBin = props => (
  <button {...props}>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)
  

const ToTheBinWithAlert = ({row, deleteIt}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpenDialog(true)}>
        <span role='image' >🗑️</span><span class="sr-only">Supprimer la ligne numéro {row.index}</span>
      </button>
      <DialogBinAlert open={isOpenDialog} onClose={() => setIsOpenDialog(false)} >
        <div>
          <h2>Voulez-vous supprimer la ligne ?</h2>
          <div className='actions'>
            <button className='confirm' onClick={deleteIt}>Oui</button>
            <button className='abort' onClick={() => setIsOpenDialog(false)}>Non</button>
          </div>
        </div>
      </DialogBinAlert>
    </>
  )
}
  
const DialogBinAlert = styled(PureDialog)`
    
    div {
      padding: var(--spc-4);
    }
  
    h2 {
      color: var(--black);
      font-size: var(--text-lg);
      font-weight: var(--font-normal);
    }
  
    .actions {
      display: flex;
      justify-content: space-evenly;
      column-gap: var(--spc-4);
    }
  
    .abort, .confirm {
      padding-block: var(--spc-4);
      padding-inline: var(--spc-8);
      margin-bottom: var(--spc-4);
      border-radius: var(--rounded-md);
      border: 0;
      cursor: pointer;
    }
  
    .abort {
      background-color: var(--brand-color);
      color: var(--white);
    }
    .confirm {
      color: var(--brand-color);
      border: 1px solid var(--brand-color);
      background-color: var(--white);
    }
  `

export {ToTheBin, ToTheBinWithAlert}
