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
import DialogAddress from './DialogAddress'


const BaseCreateTable = ({storage, endpoint, columns, accessRights}) => {

  const [data, setData] = useState(useMemo(() => [], []))
  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

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

  const createOrderId = useCallback(async() => {
    const creation = await client(`myAlfred/api/${endpoint}`, {data: {...dataToken, user: dataToken.id}})
      .catch(e => console.error(e, `Can't create ${endpoint}`))

    creation && setOrderId(creation?._id)

  }, [dataToken, endpoint, setOrderId])

  const getContentFrom = useCallback(async id => {

    const currentOrder = id ?
      await client(`myAlfred/api/${endpoint}/${id}`)
        .catch(err => snackBarError(err.msg))
      : []

    currentOrder && setData(currentOrder.items)

  }, [endpoint])


  const checkProduct = async({item, qty}) => {

  }

  const addProduct = async({item, qty}) => {
    if (!item) { return }

    const {
      _id,
    } = item

    const afterNewProduct = await client(`myAlfred/api/${endpoint}/${orderID}/items`, {data: {product: _id, quantity: qty}, method: 'PUT'})
      .catch(e => console.error(`Can't add product ${e}`))

    afterNewProduct && getContentFrom(orderID)
  }

  const deleteProduct = useCallback(async({idItem}) => {
    console.log(idItem)
    if (!idItem) { return }

    const afterDeleteProduct = await client(`myAlfred/api/${endpoint}/${orderID}/items/${idItem}`, {method: 'DELETE'})
      .catch(e => console.error(`Can't delete product ${e}`))

    // TODO verif delete
    getContentFrom(orderID)
  }, [endpoint, getContentFrom, orderID])


  const setOrderFormAdress = () => {

  }

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
    if (!orderID) {
      createOrderId()
    }
  }, [orderID, createOrderId, language])

  // Init table
  useEffect(() => {
    if (orderID) { getContentFrom(orderID) }
  }, [getContentFrom, orderID])

  /**
  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )
  */
  const cols=columns({language, data, setData, deleteProduct: deleteProduct})

  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} addProduct={addProduct} />

    <Table data={data} columns={cols} updateMyData={updateMyData} />
    <div className='flex m-8'>
      <PleasantButton onClick={() => setIsOpenDialog(true)}>J'ai fini, indiquer mes options de livraison</PleasantButton>
    </div>

    <DialogAddress isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} accessRights={accessRights}/>
  </>
  )
}

module.exports=BaseCreateTable
