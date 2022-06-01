import React, {useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'
import Link from 'next/link'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  CREATE,
  UPDATE,
  BASEPATH_EDI,
} from '../../utils/feurst/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {PleasantLink} from './Button'


const BaseListTable = ({
  t,
  accessRights,
  createOrderId,
  endpoint,
  columns,
  refresh,
  caption,
  getList,
  deleteOrder,
  state,
  filter,
  filtered,
  updateSeller,
  sellers,
  wordingSection = null,
}) => {

  const [language, setLanguage] = useState('fr')

  const canUpdateSeller = accessRights.isActionAllowed(accessRights.getModel(), UPDATE)
  const canCreate = accessRights.isActionAllowed(accessRights.getModel(), CREATE) && wordingSection !== null

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter, refresh])

  const cols= columns({language, endpoint, deleteOrder, updateSeller: canUpdateSeller ? updateSeller : null, sellers})
  

  return (<>
    {canCreate &&
    <div className='mb-8'>
      <Link href={`${BASEPATH_EDI}/${endpoint}/create`}>
        <PleasantLink rounded={'full'} href={`${BASEPATH_EDI}/${endpoint}/create`}>
          {t(`${wordingSection}.create`)}
        </PleasantLink>
      </Link>
    </div>
    }
    
    <FeurstTable
      caption={caption}
      data={state.orders}
      columns={cols}
      filter={filter}
      filtered={filtered}
    />
  </>
  )
}

export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseListTable))
