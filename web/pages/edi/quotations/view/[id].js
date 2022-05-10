import React from 'react'
import {useRouter} from 'next/router'
import {ENDPOINTS, BASEPATH_EDI, QUOTATION, VIEW} from '../../../../utils/consts'
import withEdiAuth from '../../../../hoc/withEdiAuth'
import BaseCreateTable from'../../../../components/Feurst/BaseCreateTable'
import {
  quotationColumns,
} from '../../../../components/Feurst/tablestructures'


const View = ({accessRights}) => {

  const router = useRouter()
  const quotationid = router.query.id

  return (<>
    <BaseCreateTable
      id={quotationid}
      storage={'quotationview'}
      endpoint={ENDPOINTS[QUOTATION]}
      columns={quotationColumns}
      wordingSection={'EDI.QUOTATION'}
      accessRights={accessRights}
    />
  </>)
}

export default withEdiAuth(View, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
