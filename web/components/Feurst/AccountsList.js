import React, {useState} from 'react'
const moment = require('moment')
const {ACCOUNT, LINK} = require('../../utils/feurst/consts')
const AccountLink = require('./AccountLink')
const FeurstRegister = require('./Register')
const {accountsColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const AccountsList = ({accessRights}) => {

  const [refresh, setRefresh]=useState(false)

  const toggleRefresh= () => setRefresh(!refresh)

  return (
    <>
      <FeurstRegister onSuccess={toggleRefresh}/>
      <BaseListTable caption='Liste des comptes' key={moment()} endpoint='users' columns={accountsColumns} refresh={refresh}/>
      {accessRights.isActionAllowed(ACCOUNT, LINK) && <AccountLink />}
    </>
  )
}

module.exports=AccountsList
