import React from 'react'
import {useRouter} from 'next/router'
import withEdiAuth from '../../../../hoc/withEdiAuth'
import BaseCreateTable from'../../../../components/Feurst/BaseCreateTable'
const {BASEPATH_EDI, ORDER, VIEW} = require('../../../../utils/consts')
const {orderViewColumns} = require('../../../../components/Feurst/tablestructures')


const View = ({accessRights}) => {

  const router = useRouter()
  const orderid = router.query.id

  return (<>
    <BaseCreateTable
      id={orderid}
      storage={'orderview'}
      endpoint='orders'
      columns={orderViewColumns}
      wordingSection={'EDI.ORDER'}
      accessRights={accessRights}
    />
  </>)
}

module.exports=withEdiAuth(View, {model: ORDER, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
