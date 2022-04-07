import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {getAuthToken} from '../../utils/authentication'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import Table from '../Table/Table'
import {client} from '../../utils/client'
import useLocalStorageState from 'use-local-storage-state'
import {orderColumns} from './tablestructures'
import {snackBarError} from '../../utils/notifications'


const OrderCreate = ({storage, preorder}) => {

  const [data, setData] = useState(useMemo(() => [], []))
  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()

  /* Do we order or... */
  const endpoint = preorder ? 'quotations' : 'orders'

  const columns = useMemo(
    () => orderColumns({language, data, setData: setData}),
    [data, language],
  )

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

  const drawTable = ({items}) => {
    const newSet = items.map(item => {

      const {
        _id,
        product,
        discount,
        quantity,
        catalog_price,
      } = item
      
      const {
        reference,
        description,
        description_2,
        weight,
      } = product
  
      const articleToAdd = {
        product_ref: reference,
        product_name: `${description}, ${description_2}`,
        product_quantity: quantity,
        product_weight: weight,
        product_price: catalog_price,
        product_discount: discount,
        product_totalprice: 38.93,
        product_delete: _id,
      }
      
      return articleToAdd
    })
    setData(newSet)
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

    currentOrder && drawTable(currentOrder)
    
  }, [endpoint])


  const checkProduct = async({item, qty}) => {

  }

  const AddProduct = async({item, qty = 1}) => {
    if (!item) { return }
    
    const {
      _id,
    } = item
    
    const afterNewProduct = await client(`myAlfred/api/${endpoint}/${orderID}/items`, {data: {product: _id, quantity: qty}, method: 'PUT'})
      .catch(e => console.error(`Can't add product ${e}`))
    
    afterNewProduct && getContentFrom(orderID)
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


  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} addProduct={AddProduct} />
    <Table data={data} columns={columns} updateMyData={updateMyData} />
  </>
  )
}

export default OrderCreate
