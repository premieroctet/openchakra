import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {API_PATH} from '../../utils/consts'
import {COMPANY, CREATE} from '../../utils/feurst/consts'
import {client} from '../../utils/client'
import {companiesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'
import {NormalButton} from './Button'
import RegisterCompany from './RegisterCompany'

const PureDialog = dynamic(() => import('../Dialog/PureDialog'))


const CompaniesList = ({accessRights}) => {

  const [refresh, setRefresh]=useState(false)
  const [sellers, setSellers] = useState([])
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const toggleRefresh= () => setRefresh(!refresh)

  const canAddCompany = accessRights.isActionAllowed(COMPANY, CREATE)

  useEffect(() => {
    client(`${API_PATH}/users/sales-representatives`)
      .then(result => {
        setSellers(result)
      })
      .catch(err => console.error(err))
  }, [])


  return (
    <>

      {canAddCompany &&
      <div className='container-md mb-8'>
        <NormalButton onClick={() => setIsOpenDialog(true)} rounded={'full'} size={'full-width'}><span>⊕</span> Ajouter une société</NormalButton>
      </div>
      }
      <BaseListTable
        accessRights={accessRights}
        caption='Liste des comptes'
        endpoint='companies'
        columns={companiesColumns}
        sellers={sellers}
        refresh={refresh}
      />

      <AddCompanyDialog title={'Ajouter une société'} open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)} >
        <RegisterCompany onSuccess={toggleRefresh} onClose={() => setIsOpenDialog(false)} />
      </AddCompanyDialog>
    </>
  )
}

const AddCompanyDialog = styled(PureDialog)`

h2 {
  text-align: center;
  color: var(--black);
  margin-bottom: var(--spc-8);
}

.dialogcontent {
  aspect-ratio: 1 / 1;
  max-width: 30rem;
  background-color: var(--gray-200);
  padding: var(--spc-10);
}
`


export default CompaniesList
