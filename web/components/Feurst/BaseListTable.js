import React, {useMemo, useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import styled from 'styled-components'
import {getAuthToken} from '../../utils/authentication'
import Table from '../Table/Table'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {PleasantButton} from './Button'


const BaseListTable = ({endpoint, columns}) => {

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

    const data = await client(`myAlfred/api/${endpoint}`)
      .catch(err => snackBarError(err.msg))

    data && setData(data)

  }, [endpoint])


  const deleteProduct = useCallback(async({idItem}) => {
    console.log(idItem)
    if (!idItem) { return }

    const afterDeleteProduct = await client(`myAlfred/api/${endpoint}/${idItem}`, {method: 'DELETE'})
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

  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )

  return (<>
    <Table data={data} columns={columnsMemo} updateMyData={updateMyData} />
    <div className='flex m-8'>
      <PleasantButton >J'ai fini, indiquer mes options de livraison</PleasantButton>
    </div>
  </>
  )
}

module.exports=BaseListTable
