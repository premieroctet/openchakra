import React, {useState} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {ACCOUNT, API_PATH, LINK} from '../../utils/feurst/consts'
import ImportExcelFile from './ImportExcelFile'
import AccountLink from './AccountLink'
import FeurstRegister from './Register'
import {accountsColumns} from './tablestructures'
import BaseListTable from './BaseListTable'
import {PleasantButton} from './Button'

const PureDialog = dynamic(() => import('../Dialog//PureDialog'))

const AccountsList = ({accessRights}) => {

  const [refresh, setRefresh]=useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const toggleRefresh= () => setRefresh(!refresh)

  // TODO: Import action for FEURST_AD%MIN only
  // const IMPORTS=[{title: 'Import clients/compagnies/tarification', url: `${API_PATH}/users/import`}]
  const IMPORTS=[]
  return (
    <>
      <div display='flex' flexDirection='row'>
        {IMPORTS.map((imp, i) => (<ImportExcelFile key={`imp${i}`} caption={imp.title} importURL={imp.url} templateURL={null} onImport={toggleRefresh}/>))}
      </div>
      
      <div className='container-md'>
        <PleasantButton onClick={() => setIsOpenDialog(true)} rounded={'full'} size={'full-width'}><span>⊕</span> Ajouter un compte</PleasantButton>
      </div>
      
      {accessRights.isActionAllowed(ACCOUNT, LINK) && <AccountLink />}
      <BaseListTable caption='Liste des comptes' key={moment()} endpoint='users' columns={accountsColumns} refresh={refresh}/>

      <AddAccountDialog title={'Ajouter un compte'} open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}>
        <FeurstRegister onSuccess={toggleRefresh} />
      </AddAccountDialog>
    </>
  )
}


const AddAccountDialog = styled(PureDialog)`
  
  h2 {
    text-align: center;
    color: var(--black);
  }
  
  .dialogcontent {
    aspect-ratio: 1 / 1;
    max-width: 30rem;
  }
`

export default AccountsList
