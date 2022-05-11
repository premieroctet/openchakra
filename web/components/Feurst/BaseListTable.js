import React, {useState, useEffect} from 'react'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  ORDER,
  QUOTATION,
  HANDLE,
} from '../../utils/consts'
const {withTranslation} = require('react-i18next')
const FeurstTable = require('../../styles/feurst/FeurstTable')


const BaseListTable = ({
  accessRights,
  endpoint,
  columns,
  refresh,
  caption,
  getList,
  deleteOrder,
  handleValidation,
  state,
  filter,
}) => {

  const [language, setLanguage] = useState('fr')

  const handleOrderValidStatus = accessRights?.isActionAllowed(ORDER, HANDLE)

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter])

  const cols= columns({language, endpoint, deleteOrder, handleValidation: handleOrderValidStatus ? handleValidation : null, filter})

  return (
    <FeurstTable
      caption={caption}
      data={state.orders}
      columns={cols}
      filter={filter}
    />
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseListTable))
