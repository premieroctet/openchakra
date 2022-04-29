import React, {useMemo, useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {
  BASEPATH_EDI,
  API_PATH,
  ORDER_COMPLETE,
  ORDER_CREATED,
  ORDER_FULFILLED,
  ORDER_VALID,
  ORDER_PARTIALLY_HANDLED,
  ORDER_HANDLED,
  QUOTATION_CREATED,
  QUOTATION_FULFILLED,
  QUOTATION_COMPLETE,
  QUOTATION_VALID,
  QUOTATION_PARTIALLY_HANDLED,
  QUOTATION_HANDLED,
} from '../../utils/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {client} from '../../utils/client'
import {localeMoneyFormat} from '../../utils/converters'
import isEmpty from '../../server/validation/is-empty'
import withEdiRequest from '../../hoc/withEdiRequest'
import {H2confirm} from './components.styles'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {PleasantButton} from './Button'
import Delivery from './Delivery'
const {withTranslation} = require('react-i18next')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const {
  getAuthToken,
} = require('../../utils/authentication')


const DialogAddress = dynamic(() => import('./DialogAddress'))

const BaseCreateTable = ({
  id,
  storage,
  endpoint,
  columns,
  accessRights,
  wordingSection,
  t,
  createOrderId,
  getContentFrom,
  addProduct,
  deleteProduct,
}) => {
  
  const [state, setState] = useState({
    items: useMemo(() => [], []),
    reference: null,
    address: {},
    shippingOption: null,
    status: ORDER_CREATED,
    errors: null,
  })

  const [language, setLanguage] = useState('fr')
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const dataToken = getAuthToken()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [refresh, setRefresh]=useState(false)
  
  const toggleRefresh= () => setRefresh(!refresh)
  
  const router = useRouter()
  
  const canAdd = [ORDER_CREATED, ORDER_FULFILLED, QUOTATION_CREATED, QUOTATION_FULFILLED].includes(state.status)
  const canValidate = [ORDER_COMPLETE, QUOTATION_COMPLETE].includes(state.status)
  const isView = [ORDER_VALID, ORDER_PARTIALLY_HANDLED, ORDER_HANDLED, QUOTATION_VALID, QUOTATION_PARTIALLY_HANDLED, QUOTATION_HANDLED].includes(state.status)

  
  const createOrderIdOld = useCallback(async() => {
    
    if (state.status !== ORDER_COMPLETE) { // Prevent order creation juste after submitting an order
      const creation = await client(`${API_PATH}/${endpoint}`, {data: {user: dataToken.id}})
        .catch(e => console.error(e, `Can't create ${endpoint}`))
      
      creation && setOrderId(creation?._id)
    }
    
  }, [dataToken.id, endpoint, setOrderId, state.status])


  const getContentFromOld = useCallback(async id => {
    
    const currentOrder = id ?
      await client(`${API_PATH}/${endpoint}/${id}`)
        .catch(err => snackBarError(err))
      : []
    
    currentOrder && setState({...state, ...currentOrder})
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  const updateTable = useCallback(async() => {
    await getContentFrom({endpoint, orderid: orderID})
      .then(data => setState({...state, ...data}))
  }, [endpoint, getContentFrom, orderID, state])

  const addProductOld = async({item, qty, replace = false}) => {
    if (!item) { return }
    
    const {
      _id,
    } = item
    
    await client(`${API_PATH}/${endpoint}/${orderID}/items`, {data: {product: _id, quantity: qty, replace}, method: 'PUT'})
      .then(() => updateTable)
      .catch(() => {
        console.error(`Can't add product`)
        return false
      })
  }
 
  const updateMyData = data => {
    addProduct(data)
  }
  
  const deleteProductOld = useCallback(async({idItem}) => {
    if (!idItem) { return }

    await client(`${API_PATH}/${endpoint}/${orderID}/items/${idItem}`, {method: 'DELETE'})
      .then(() => updateTable)
      .catch(e => console.error(`Can't delete product ${e}`))

  }, [endpoint, updateTable, orderID])

  // bind address, shipping info and ref to the current order/quotation
  const validateAddress = async e => {
    e.preventDefault()

    await client(`${API_PATH}/${endpoint}/${orderID}`, {data: {address: state.address, reference: state.reference, shipping_mode: state.shippingOption}, method: 'PUT'})
      .then(() => {
        updateTable()
        setIsOpenDialog(false)
      })
      .catch(e => {
        console.error(`Can't bind address to order/quotation`, e)
        setState({...state, errors: e})
      })
  }

  const resetAddress = async() => {

    await client(`${API_PATH}/${endpoint}/${orderID}/rewrite`, {method: 'PUT'})
      .then(res => setState({...state, status: res.status}))
      .catch(e => {
        console.error(`Can't unbind address to order/quotation`, e)
        setState({...state, errors: e})
      })

  }

  const submitOrder = async() => {

    await client(`${API_PATH}/${endpoint}/${orderID}/validate`, {method: 'POST'})
      .then(() => {
        removeItem()
        snackBarSuccess('Enregistré')
        router.push(`${BASEPATH_EDI}/${endpoint}`)
      })
      .catch(() => {
        console.error(`Didn't submit order`)
        snackBarError(`Problème d'enregistrement`)
        return
      })
  }


  // Init language
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    updateTable()
  }, [])

  useEffect(() => {
    if (isEmpty(orderID)) {
      createOrderId({endpoint, status: state.status, userid: dataToken.id}).then(res => {
        res && setOrderId(res?._id)
      })
    }
  }, [createOrderId, dataToken.id, endpoint, orderID, setOrderId, state.status])

  /* supplied id for a view ? */
  useEffect(() => {
    if (!isEmpty(id)) { setOrderId(id) }
  }, [id, setOrderId])


  /**
  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )
  */
  const cols=columns({language, setState, deleteProduct: canAdd ? deleteProduct : null})

  const importURL=`${API_PATH}/${endpoint}/${orderID}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`

  return (<>

    {canAdd &&
      <div className='container-base'>
        <ImportExcelFile importURL={importURL} templateURL={templateURL}/>
        <AddArticle endpoint={endpoint} orderid={orderID} updateTable={updateTable} addProduct={addProduct} wordingSection={wordingSection} />
      </div>}

    {canValidate && <H2confirm>Récapitulatif de votre commande</H2confirm>}

    {isView && <div>
      <dl className='dl-inline text-xl font-semibold'>
        <dt>{t(`${wordingSection}.name`)}</dt>
        <dd>{state.reference}</dd>
        <dt>{t(`${wordingSection}.date`)}</dt>
        <dd>{new Date(state.creation_date).toLocaleDateString()}</dd>
      </dl>
    </div>}

    <FeurstTable
      caption={t(`${wordingSection}.details`)}
      data={state.items}
      columns={cols}
      footer={canValidate || isView}
      updateMyData={updateMyData}
    />

    {canValidate || isView ?
      <div className='flex justify-between items-end mb-8'>
        <Delivery address={state.address} shipping={{shipping_mode: state.shipping_mode, shipping_fee: state.shipping_fee}} />
        {!isView ? <h4 className='text-2xl mb-0 text-black'>{t(`${wordingSection}.total`)} : {localeMoneyFormat({value: state.total_amount})}</h4> : null}
      </div>: null
    }

    {!isView ?
      <div className='flex flex-wrap justify-between gap-y-4 mb-6'>
        {canValidate
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
          disabled={[ORDER_CREATED].includes(state.status)}
          onClick={() => (state.status === ORDER_FULFILLED ? setIsOpenDialog(true) : submitOrder())}
        >
          {t(`${wordingSection}.valid`)} {/* Valid order/quotation */}
        </PleasantButton>
      </div>
      : null }

    <DialogAddress
      id={orderID}
      endpoint={endpoint}
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      accessRights={accessRights}
      state={state}
      setState={setState}
      validateAddress={validateAddress}
      wordingSection={wordingSection}
    />

  </>
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
