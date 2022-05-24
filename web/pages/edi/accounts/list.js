import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {BASEPATH_EDI, ACCOUNT, VIEW} from '../../../utils/consts'
import AccountsList from '../../../components/Feurst/AccountsList'

const Accounts = ({accessRights}) => {

  return (<>
    <AccountsList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Accounts, {model: ACCOUNT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
