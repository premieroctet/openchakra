import React, {useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  UPDATE,
} from '../../utils/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'


const BaseListTable = ({
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
  sellers,
}) => {

  const [language, setLanguage] = useState('fr')

  const canUpdateSeller = accessRights?.isActionAllowed(accessRights.getModel(), UPDATE)

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter, refresh])

  const cols= columns({language, endpoint, deleteOrder, updateSeller: canUpdateSeller ? updateSeller : null, sellers})

  return (
    <FeurstTable
      caption={caption}
      data={state.orders}
      columns={cols}
      filter={filter}
      filtered={filtered}
    />
  )
}

export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseListTable))
