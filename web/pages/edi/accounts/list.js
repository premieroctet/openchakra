import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const AccountsList = require('../../../components/Feurst/AccountsList')

const List = ({accessRights}) => {

  return (<>
    <AccountsList accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(List, {pathAfterFailure: '/edi/login'})
