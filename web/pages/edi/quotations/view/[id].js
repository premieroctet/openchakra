import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {ENDPOINTS, BASEPATH_EDI, QUOTATION, VIEW} from '../../../../utils/feurst/consts'
import withEdiAuth from '../../../../hoc/withEdiAuth'
import BaseViewTable from'../../../../components/Feurst/BaseViewTable'
import {
  quotationColumns,
} from '../../../../components/Feurst/tablestructures'


const View = ({accessRights}) => {

  const router = useRouter()
  const [quotationid, setQuotationid] = useState(router.query.id)

  useEffect(() => {
    /* Ugly, but it works */
    const currentUrl = new URL(window.location)
    const splittedUrl = currentUrl.pathname.split('/')
    const indexView = splittedUrl.findIndex(e => e === 'view')
    const askedId = splittedUrl[indexView + 1]
    quotationid !== askedId && setQuotationid(askedId)
  }, [quotationid, setQuotationid])

  return (
    <BaseViewTable
      key={quotationid}
      id={quotationid}
      endpoint={ENDPOINTS[QUOTATION]}
      columns={quotationColumns}
      wordingSection={'EDI.QUOTATION'}
      accessRights={accessRights}
    />
  )
}

export default withEdiAuth(View, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
