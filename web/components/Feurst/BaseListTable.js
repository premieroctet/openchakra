import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {getAuthToken} from '../../utils/authentication'
import Table from '../Table/Table'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
const {API_PATH} = require('../../utils/feurst/consts')


const BaseListTable = ({endpoint, columns, refresh}) => {

  const [data, setData] = useState(useMemo(() => [], []))
  const [language, setLanguage] = useState('fr')
  const dataToken = getAuthToken()

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

  const getContentFrom = useCallback(async() => {

    const data = await client(`${API_PATH}/${endpoint}`)
      .catch(err => snackBarError(err?.msg))

    data && setData(data)

  }, [endpoint, refresh])


  const deleteProduct = useCallback(async({idItem}) => {
    console.log(idItem)
    if (!idItem) { return }

    const afterDeleteProduct = await client(`${API_PATH}/${endpoint}/${idItem}`, {method: 'DELETE'})
      .catch(e => console.error(`Can't delete product ${e}`))

    // TODO verif delete
    getContentFrom()
  }, [endpoint, getContentFrom])

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getContentFrom()
  }, [getContentFrom])

  const cols= columns({language, data, setData, deleteProduct: deleteProduct})

  return (<>
    <Table data={data} columns={cols} updateMyData={updateMyData} />
  </>
  )
}

module.exports=BaseListTable
