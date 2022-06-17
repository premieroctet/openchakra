import React, {useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'
import Link from 'next/link'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  CREATE,
  UPDATE,
  DELETE,
  BASEPATH_EDI,
} from '../../utils/feurst/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {PleasantLink} from './Button'


const BaseListTable = ({
  t,
  accessRights,
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
  deleteUser,
  sellers,
  wordingSection = null,
  ...props
}) => {

  const [language, setLanguage] = useState('fr')

  const canUpdateSeller = accessRights.isActionAllowed(accessRights.getModel(), UPDATE)
  const canCreate = accessRights.isActionAllowed(accessRights.getModel(), CREATE) && wordingSection !== null
  const canDelete = accessRights.isActionAllowed(accessRights.getModel(), DELETE)

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter, refresh])

  const cols= columns({language, endpoint, deleteOrder: canDelete? deleteOrder:null, deleteUser, updateSeller: canUpdateSeller ? updateSeller : null, sellers})
  

  return (<>
    {canCreate &&
    <div className='container-md mb-8'>
      <Link href={`${BASEPATH_EDI}/${endpoint}/create`}>
        <PleasantLink rounded={'full'} href={`${BASEPATH_EDI}/${endpoint}/create`}>
          <span>⊕</span> {t(`${wordingSection}.create`)}
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
      pagination={true}
      {...props}
    />
  </>
  )
}

export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseListTable))
