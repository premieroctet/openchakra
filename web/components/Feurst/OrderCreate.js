import React, {useState, useRef, useMemo, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import {getAuthToken} from '../../utils/authentication'
import Table from '../Table/Table'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
import DialogAddress from './DialogAddress'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {orderColumns} from './tablestructures'
import {PleasantButton} from './Button'


const OrderCreate = ({storage, preorder}) => {

  const [data, setData] = useState(useMemo(() => [], []))
  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  /* Do we order or... */
  const endpoint = preorder ? 'quotations' : 'orders'


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

  const columns = useMemo(
    () => orderColumns({language, data, setData, deleteProduct: deleteProduct}),
    [data, deleteProduct, language],
  )


  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} addProduct={addProduct} />
    
    <Table data={data} columns={columns} updateMyData={updateMyData} />
    <div className='flex m-8'>
      <PleasantButton onClick={() => setIsOpenDialog(true)}>J'ai fini, indiquer mes options de livraison</PleasantButton>
      
    </div>

    <DialogAddress isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
  </>
  )
}

export default OrderCreate
