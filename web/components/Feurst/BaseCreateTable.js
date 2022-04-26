import React, {useMemo, useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {
  API_PATH,
  ORDER_COMPLETE,
  ORDER_CREATED,
  ORDER_FULFILLED,
  ORDER_VALID,
} from '../../utils/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {client} from '../../utils/client'
import {H2confirm} from './components.styles'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {PleasantButton} from './Button'
import Delivery from './Delivery'
const axios = require('axios')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const {
  getAuthToken,
  setAxiosAuthentication,
} = require('../../utils/authentication')

const DialogAddress = dynamic(() => import('./DialogAddress'))

const BaseCreateTable = ({storage, endpoint, columns, accessRights}) => {

  const [state, setState] = useState({
    items: useMemo(() => [], []),
    deliveryAddress: null,
    orderref: null,
    address: {},
    shippingOption: null,
    status: ORDER_CREATED,
    errors: null,
  })

  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const router = useRouter()

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
    const creation = await client(`${API_PATH}/${endpoint}`, {data: {user: dataToken.id}})
      .catch(e => console.error(e, `Can't create ${endpoint}`))

    creation && setOrderId(creation?._id) && setState({...state, status: ORDER_CREATED})

  }, [dataToken, endpoint, setOrderId, state])

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
    const bindAddressAndShipping = await client(`${API_PATH}/${endpoint}/${orderID}`, {data: {address: state.address, reference: state.orderref, shipping_mode: state.shippingOption}, method: 'PUT'})
      .catch(e => {
        console.error(e, `Can't bind address to order/quotation ${e}`)
        setState({...state, errors: e})
      })
    setState({...state, status: bindAddressAndShipping.status, deliveryAddress: bindAddressAndShipping.address})
    bindAddressAndShipping && setIsOpenDialog(false) && getContentFrom(orderID)
  }

  const resetAddress = async() => {

    const shotAddress = await client(`${API_PATH}/${endpoint}/${orderID}/rewrite`, {method: 'PUT'})
      .catch(e => {
        console.error(e, `Can't unbind address to order/quotation ${e}`)
        setState({...state, errors: e})
      })
    shotAddress && setState({...state, status: shotAddress.status})

  }

  const submitOrder = () => {
    setAxiosAuthentication()
    axios.post(`${API_PATH}/${endpoint}/${orderID}/validate`)
      .then(() => {
        removeItem()
        snackBarSuccess('Validation OK')
        router.push(`/edi/${endpoint}`)
      })
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

  const importURL=`${API_PATH}/${endpoint}/${orderID}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`

  return (<>

    {[ORDER_CREATED, ORDER_FULFILLED].includes(state.status) &&
      <>
        <ImportExcelFile importURL={importURL} templateURL={templateURL}/>
        <AddArticle addProduct={addProduct} />
      </>}

    {[ORDER_COMPLETE].includes(state?.status) && <H2confirm>Récapitulatif de votre commande</H2confirm>}


    <FeurstTable
      caption="Détails de la commande en cours :"
      data={state.items}
      columns={cols}
      updateMyData={updateMyData}
    />

    {[ORDER_VALID, ORDER_COMPLETE].includes(state?.status) ?
      <Delivery address={state.deliveryAddress} /> : null
    }

    <div className='flex flex-wrap justify-between gap-y-4 mb-6'>
      {state.status === ORDER_COMPLETE
        ?
        <PleasantButton
          rounded={'full'}
          bgColor={'#fff'}
          textColor={'#141953'}
          borderColor={'1px solid #141953'}
          onClick={resetAddress}
        >
        Revenir à la saisie
        </PleasantButton>
        :
        <PleasantButton
          rounded={'full'}
          disabled={[ORDER_CREATED].includes(state.status)}
          bgColor={'#fff'}
          textColor={'#141953'}
          borderColor={'1px solid #141953'}
          onClick={() => true}
        >
        Demande de devis
        </PleasantButton>
      }


      <PleasantButton
        rounded={'full'}
        disabled={![ORDER_FULFILLED, ORDER_COMPLETE].includes(state.status)}
        onClick={() => (state.status === ORDER_FULFILLED ? setIsOpenDialog(true) : submitOrder())}
      >
        Valider ma commande
      </PleasantButton>
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
