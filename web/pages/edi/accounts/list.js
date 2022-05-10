import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI, ACCOUNT, VIEW} = require('../../../utils/consts')
const AccountsList = require('../../../components/Feurst/AccountsList')

const Accounts = ({accessRights}) => {

  return (<>
    <AccountsList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Accounts, {model: ACCOUNT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
