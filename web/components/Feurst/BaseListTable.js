import React, {useState, useEffect} from 'react'
import withEdiRequest from '../../hoc/withEdiRequest'
const {withTranslation} = require('react-i18next')
const FeurstTable = require('../../styles/feurst/FeurstTable')


const BaseListTable = ({
  endpoint,
  columns,
  refresh,
  caption,
  getList,
  deleteOrder,
  state,
  filter,
}) => {

  const [language, setLanguage] = useState('fr')

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    )
  }


  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter])

  const cols= columns({language, endpoint, deleteOrder})

  return (
    <FeurstTable
      caption={caption}
      data={state.orders}
      columns={cols}
      updateMyData={updateMyData}
    />
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseListTable))
