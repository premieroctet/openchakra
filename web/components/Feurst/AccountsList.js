import React, {useState} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {ACCOUNT, CREATE} from '../../utils/feurst/consts'
import FeurstRegister from './Register'
import {accountsColumns} from './tablestructures'
import BaseListTable from './BaseListTable'
import {NormalButton} from './Button'

const PureDialog = dynamic(() => import('../Dialog/PureDialog'))

const AccountsList = ({accessRights}) => {

  const [refresh, setRefresh]=useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const toggleRefresh= () => setRefresh(!refresh)

  const canAddAccount = accessRights.isActionAllowed(ACCOUNT, CREATE)

  return (
    <>
      {canAddAccount &&
      <div className='container-md mb-8'>
        <NormalButton onClick={() => setIsOpenDialog(true)} rounded={'full'} size={'full-width'}><span>⊕</span> Ajouter un compte</NormalButton>
      </div>
      }

      <BaseListTable caption='Liste des comptes' endpoint='users' columns={accountsColumns} refresh={refresh} accessRights={accessRights}/>

      <AddAccountDialog title={'Ajouter un compte'} open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)} >
        <FeurstRegister onSuccess={toggleRefresh} onClose={() => setIsOpenDialog(false)}/>
      </AddAccountDialog>
    </>
  )
}


const AddAccountDialog = styled(PureDialog)`

  h2 {
    text-align: center;
    color: var(--black);
    margin-bottom: var(--spc-8);
  }

  .dialogcontent {
    aspect-ratio: 1 / 1;
    max-width: 30rem;
  }
`

export default AccountsList
