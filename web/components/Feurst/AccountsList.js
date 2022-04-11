import React, {useState, useCallback} from 'react'
const {Button} = require('@material-ui/core')
const moment = require('moment')
const FeurstRegister = require('./Register')
const {accountsColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const AccountsList = ({accessRights}) => {

  const [showAdd, setShowAdd]=useState(false)
  const [refresh, setRefresh]=useState(false)

  const toggleRefresh= () => setRefresh(!refresh)
  const displayAdd = useCallback(() => setShowAdd(true), [])

  return (
    <>
      {showAdd &&
        <FeurstRegister onSuccess={toggleRefresh}/>
      }
      <BaseListTable key={moment()} endpoint='users' columns={accountsColumns} displayAdd={displayAdd} refresh={refresh}/>
    </>
  )
}

module.exports=AccountsList
