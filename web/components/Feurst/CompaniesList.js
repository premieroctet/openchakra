import React from 'react'
import {ACCOUNT, API_PATH, LINK} from '../../utils/feurst/consts'
import AccountLink from './AccountLink'
import {companiesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'


const CompaniesList = ({accessRights}) => {
  
  return (
    <>
      
      {accessRights.isActionAllowed(ACCOUNT, LINK) && <AccountLink />}
      <BaseListTable caption='Liste des comptes' endpoint='companies' columns={companiesColumns} />
    </>
  )
}


export default CompaniesList
