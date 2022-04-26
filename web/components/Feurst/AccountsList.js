import React, {useState, useCallback} from 'react'
const {Button} = require('@material-ui/core')
const moment = require('moment')
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
    </>
  )
}

module.exports=AccountsList
