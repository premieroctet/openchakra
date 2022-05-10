import React from 'react'
import {useRouter} from 'next/router'
import {BASEPATH_EDI, ORDER, VIEW, ENDPOINTS} from '../../../../utils/consts'
import withEdiAuth from '../../../../hoc/withEdiAuth'
import BaseCreateTable from'../../../../components/Feurst/BaseCreateTable'
import {
  orderColumns,
} from '../../../../components/Feurst/tablestructures'


const View = ({accessRights}) => {

  const router = useRouter()
  const orderid = router.query.id

  return (<>
    <BaseCreateTable
      id={orderid}
      storage={'orderview'}
      endpoint={ENDPOINTS[ORDER]}
      columns={orderColumns}
      wordingSection={'EDI.ORDER'}
      accessRights={accessRights}
    />
  </>)
}

export default withEdiAuth(View, {model: ORDER, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
