import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {BASEPATH_EDI} from '../../../utils/consts'
const AccountsList = require('../../../components/Feurst/AccountsList')

const Accounts = ({accessRights}) => {

  return (<>
    <AccountsList accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Accounts, {pathAfterFailure: `${BASEPATH_EDI}/login`})
