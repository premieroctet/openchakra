import React, {useState} from 'react'
const moment = require('moment')
const {ACCOUNT, API_PATH, LINK} = require('../../utils/feurst/consts')
const ImportExcelFile = require('./ImportExcelFile')
const AccountLink = require('./AccountLink')
const FeurstRegister = require('./Register')
const {accountsColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const AccountsList = ({accessRights}) => {

  const [refresh, setRefresh]=useState(false)

  const toggleRefresh= () => setRefresh(!refresh)

  const IMPORTS=[{title: 'Import clients/compagnies/tarification', url: `${API_PATH}/users/import`}]
  return (
    <>
      <div display='flex' flexDirection='row'>
        {IMPORTS.map(imp => (<ImportExcelFile caption={imp.title} importURL={imp.url} templateURL={null} onImport={toggleRefresh}/>))}
      </div>
      <FeurstRegister onSuccess={toggleRefresh}/>
      {accessRights.isActionAllowed(ACCOUNT, LINK) && <AccountLink />}
      <BaseListTable caption='Liste des comptes' key={moment()} endpoint='users' columns={accountsColumns} refresh={refresh}/>
    </>
  )
}

module.exports=AccountsList
