import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI, ACCOUNT, VIEW} = require('../../../utils/consts')
const AccountsList = require('../../../components/Feurst/AccountsList')

const Accounts = ({accessRights}) => {

  return (<>
    <AccountsList accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Accounts, {model: ACCOUNT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
