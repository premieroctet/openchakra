import React, {useMemo, useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {getAuthToken} from '../../utils/authentication'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
import {ORDER_FULFILLED, ORDER_VALID, ORDER_COMPLETE} from '../../utils/consts'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {PleasantButton} from './Button'
import {API_PATH} from '../../utils/consts'
import Delivery from './Delivery'

const DialogAddress = dynamic(() => import('./DialogAddress'))

const BaseCreateTable = ({storage, endpoint, columns, accessRights}) => {

  const [state, setState] = useState({
    items: useMemo(() => [], []),
    deliveryAddress: null,
    orderref: null,
    address: {},
    shippingOption: null,
    status: null,
    errors: null
  })

  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const updateMyData = (rowIndex, columnId, value) => {

    setState({
      ...state,
      items: state.items.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...state.items[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    })
  }

  const createOrderId = useCallback(async() => {
    const creation = await client(`${API_PATH}/${endpoint}`, {data: {...dataToken, user: dataToken.id}})
      .catch(e => console.error(e, `Can't create ${endpoint}`))

    creation && setOrderId(creation?._id)

  }, [dataToken, endpoint, setOrderId])

  const getContentFrom = useCallback(async id => {

    const currentOrder = id ?
      await client(`${API_PATH}/${endpoint}/${id}`)
        .catch(err => snackBarError(err.msg))
      : []

    currentOrder && setState({...state, status: currentOrder.status, items: currentOrder.items, deliveryAddress: currentOrder?.address ? currentOrder.address : null})

  }, [endpoint])


  const checkProduct = async({item, qty}) => {

  }

  const addProduct = async({item, qty}) => {
    if (!item) { return }

    const {
      _id,
    } = item

    const afterNewProduct = await client(`${API_PATH}/${endpoint}/${orderID}/items`, {data: {product: _id, quantity: qty}, method: 'PUT'})
      .catch(() => {
        console.error(`Can't add product`)
        return false
      })

    afterNewProduct && getContentFrom(orderID)
    return afterNewProduct
  }

  const deleteProduct = useCallback(async({idItem}) => {
    if (!idItem) { return }

    const afterDeleteProduct = await client(`${API_PATH}/${endpoint}/${orderID}/items/${idItem}`, {method: 'DELETE'})
      .catch(e => console.error(`Can't delete product ${e}`))

    // TODO verif delete
    getContentFrom(orderID)
  }, [endpoint, getContentFrom, orderID])


  const validateAddress = async e => {
    e.preventDefault()
    
    // then bind to the current order/quotation
    const bindAddressAndShipping = await client(`${API_PATH}/${endpoint}/${orderID}`, {data: {address: state.address, reference: state.orderref}, method: 'PUT'})
      .catch(e => {
        console.error(e, `Can't bind address to order/quotation ${e}`)
        setErrors(e)
      })
    bindAddressAndShipping && setIsOpenDialog(false)
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
  const cols=columns({language, ...state.items, setState, deleteProduct: deleteProduct})

  return (<>
    {state.status !== ORDER_COMPLETE ? 
      <>
        <ImportExcelFile />
        <AddArticle addProduct={addProduct} />
      </> : null}

    <FeurstTable
      caption="Détails de la commande en cours :"
      data={state.items}
      columns={cols}
      updateMyData={updateMyData}
    />
    
    {state.status === ORDER_VALID ?
      <Delivery address={state.deliveryAddress} /> : null
    }

    <div className='flex flex-wrap justify-between gap-y-4'>
      <PleasantButton rounded={'full'} disabled={state.status !== ORDER_FULFILLED} bgColor={'#fff'} textColor={'#141953'} borderColor={'1px solid #141953'} onClick={() => true}>Demande de devis</PleasantButton>
      <PleasantButton rounded={'full'} disabled={state.status !== ORDER_FULFILLED} onClick={() => setIsOpenDialog(true)}>Valider ma commande</PleasantButton>
    </div>

    <DialogAddress 
      id={orderID} 
      endpoint={endpoint} 
      isOpenDialog={isOpenDialog} 
      setIsOpenDialog={setIsOpenDialog} 
      accessRights={accessRights}
      state={state}
      setState={setState}
      validateAddress={validateAddress}
      />

  </>
  )
}

module.exports=BaseCreateTable
