import React, {useState, useEffect} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import axios from 'axios'
import {withTranslation} from 'react-i18next'
import {
  BASEPATH_EDI,
  API_PATH,
  COMPLETE,
  CREATED,
  FULFILLED,
  VALID,
  PARTIALLY_HANDLED,
  HANDLED,
  CONVERT,
  VALIDATE,
  HANDLE,
  ORDER,
  QUOTATION,
  RELATED,
  UPDATE,
  UPDATE_ALL,
  ENDPOINTS,
} from '../../utils/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {client} from '../../utils/client'
import {localeMoneyFormat} from '../../utils/converters'
import isEmpty from '../../server/validation/is-empty'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  getAuthToken,
  setAxiosAuthentication,
} from '../../utils/authentication'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {H2confirm} from './components.styles'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {PleasantButton} from './Button'
import Delivery from './Delivery'


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
  requestUpdate,
  validateAddress,
  updateShippingFees,
  resetAddress,
  sendQuotationToCustomer,
  state,
}) => {

  const dataToken = getAuthToken()

  const [language, setLanguage] = useState('fr')
  const [orderCompany, setOrderCompany] = useState(null)
  const [orderIDLocal, setOrderIDLocal, {removeItem}] = useLocalStorageState(`${storage}-${dataToken?.id}`, {ssr: true, defaultValue: id})
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [companies, setCompanies] = useState([])

  const router = useRouter()

  // Possibles actions
  const justCreated = !(state?.items?.length && true)
  const canAdd = [CREATED, FULFILLED].includes(state.status)
  const canValidate = [COMPLETE].includes(state.status)
  const canModify = [CREATED, COMPLETE].includes(state.status)
  const isValid = [VALID].includes(state.status)
  const isView = [VALID, PARTIALLY_HANDLED, HANDLED].includes(state.status)
  const isHandled = [HANDLED].includes(state.status)

  const canValidQuotation = accessRights.isActionAllowed(accessRights.getModel(), VALIDATE) && isValid

  const isFeurstSales = accessRights.getFullAction()?.visibility==RELATED
  const canUpdatePrice = accessRights.isActionAllowed(accessRights.getModel(), UPDATE_ALL) && !isView
  const canUpdateQuantity = (
    ((accessRights.isActionAllowed(QUOTATION, UPDATE) && accessRights.getModel() === QUOTATION)
    || (accessRights.isActionAllowed(ORDER, UPDATE) && accessRights.getModel() === ORDER))
    && !isView
  )
    
  const canUpdateShipping = canUpdatePrice

  const convertToQuotation = accessRights.getModel() === ORDER && accessRights.isActionAllowed(accessRights.getModel(), CONVERT)
  const convertToOrder = (accessRights.getModel() === QUOTATION && accessRights.isActionAllowed(accessRights.getModel(), CONVERT)) && isHandled


  /* Update product quantities or price */
  const updateMyOrderContent = data => {
    addProduct({endpoint, orderid: orderIDLocal, ...data})
  }

  const changeCompany = e => {
    setOrderCompany(null)
    removeItem()
  }

  const submitOrder = async({endpoint, orderid}) => {

    await client(`${API_PATH}/${endpoint}/${orderid}/validate`, {method: 'POST'})
      .then(() => {
        snackBarSuccess('Enregistré')
        router.push(`${BASEPATH_EDI}/${endpoint}`)
        removeItem()
      })
      .catch(() => {
        console.error(`Didn't submit order`)
        snackBarError(`Problème d'enregistrement`)
        return
      })
  }

  const convert = ({endpoint, orderid}) => {
    setAxiosAuthentication()
    axios.post(`${API_PATH}/${endpoint}/${orderid}/convert`)
      .then(res => {
        if(res.data) {
          const finalDestination = ENDPOINTS[accessRights.model==ORDER ? QUOTATION : ORDER]
          router.push(`${BASEPATH_EDI}/${finalDestination}`)
          removeItem()
          snackBarSuccess('Conversion réussie')
        }
        else {
          console.error('Convert error', res)
        }
      })
      .catch(err => {
        console.error(err)
        snackBarError('Conversion non effectuée')
      })
  }


  // Init language
  useEffect(() => {
    // console.log('language')
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    // console.log('getContent', orderID)
    if (!isEmpty(orderIDLocal)) {
      // Prevents loading inadequate order in LocalStorage
      if (id && id !== orderIDLocal) {
        setOrderIDLocal(id)
      }
      else {
        getContentFrom({endpoint, orderid: orderIDLocal})
          .then(data => {
            if (data) {
              setOrderCompany(data.company)
            }
            else {
              removeItem()
            }
          })
      }
    }
  }, [endpoint, getContentFrom, id, orderIDLocal, removeItem, setOrderIDLocal])


  useEffect(() => {
    // console.log('createOrder', orderID, orderCompany)
    if (isEmpty(orderIDLocal)) {
      if ((orderCompany !== null || !isFeurstSales) && !canValidate) {
        createOrderId({endpoint, company: orderCompany})
          .then(data => setOrderIDLocal(data._id))
          .catch(e => console.error('cant create order', e))
      }
    }
  }, [canValidate, createOrderId, endpoint, orderIDLocal, orderCompany, setOrderIDLocal, isFeurstSales])

  /* Feurst ? => Fetch companies */
  useEffect(() => {
    if (isFeurstSales) {
      const fetchCompanies = async() => {
        const companies = await client(`${API_PATH}/companies`)
        setCompanies(companies)
      }
      fetchCompanies()
    }
  }, [isFeurstSales])


  /**
  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )
  */
  const cols=columns({
    language,
    endpoint,
    orderid: orderIDLocal,
    canUpdatePrice,
    canUpdateQuantity,
    deleteProduct: canAdd ? deleteProduct : null})

  const importURL=`${API_PATH}/${endpoint}/${orderIDLocal}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`

  
  return (<>


    {isFeurstSales && !orderCompany ?
      <div className='container-sm mb-8'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={companies}
          value={orderCompany}
          onChange={(ev, value) => setOrderCompany(value)}
          getOptionLabel={option => option.name}
          sx={{width: 300}}
          renderInput={params => <TextField {...params} label="Nom de la société" />}
        />
      </div> :
      null
    }

    { orderIDLocal ? <>
      
      {isFeurstSales && !isView && <div className='flex'><H2confirm><button onClick={changeCompany}><span>⊕</span> Nouveau devis</button><span>{state?.company?.name}</span></H2confirm></div>}
      

      {canModify &&
      <div className='container-base'>
        <ImportExcelFile importURL={importURL} templateURL={templateURL}/>
        <AddArticle endpoint={endpoint} orderid={orderIDLocal} addProduct={addProduct} wordingSection={wordingSection} />
      </div>}

      {isView && <H2confirm>{t(`${wordingSection}.recap`)}</H2confirm>}

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
        updateMyData={updateMyOrderContent}
      />
        
      <Delivery
        endpoint={endpoint}
        orderid={orderIDLocal}
        address={state.address}
        setIsOpenDialog={setIsOpenDialog}
        isView={isView}
        requestUpdate={requestUpdate}
        shipping={{shipping_mode: state.shipping_mode, shipping_fee: state.shipping_fee, update: canUpdateShipping ? updateShippingFees : null}}
      />

      {!justCreated &&
      <div className='flex items-center bg-brand text-xl text-white font-semibold justify-between p-2 pl-6 pr-6 mb-8'>
        <span>Total</span>
        <span>{state?.total_amount && localeMoneyFormat({value: state.total_amount})}</span>
      </div>}
      
      
      <div className={`grid grid-cols-2 justify-between gap-y-4 mb-8`}>
       
        {isView ? <PleasantButton
          rounded={'full'}
          bgColor={'#fff'}
          textColor={'#141953'}
          borderColor={'1px solid #141953'}
          className={'col-start-1'}
          onClick={() => resetAddress({endpoint, orderid: orderIDLocal})}
        >
        Revenir à la saisie
        </PleasantButton> : null}
       
        {convertToQuotation && <PleasantButton
          rounded={'full'}
          disabled={justCreated}
          bgColor={'#fff'}
          textColor={'#141953'}
          className={'col-start-1'}
          borderColor={'1px solid #141953'}
          onClick={() => convert({endpoint, orderid: orderIDLocal})}
        >
        Demande de devis
        </PleasantButton>}
        {convertToOrder && <PleasantButton
          rounded={'full'}
          disabled={justCreated}
          bgColor={'#fff'}
          textColor={'#141953'}
          className={'justify-self-end col-start-2'}
          borderColor={'1px solid #141953'}
          onClick={() => convert({endpoint, orderid: orderIDLocal})}
        >
        Convertir en commande
        </PleasantButton>}
          

        {(canModify || canValidQuotation) && <PleasantButton
          rounded={'full'}
          disabled={justCreated}
          className={'justify-self-end col-start-2'}
          onClick={() => (justCreated ? setIsOpenDialog(true) : submitOrder({endpoint, orderid: orderIDLocal}))}
        >
          {t(`${wordingSection}.valid`)} {/* Valid order/quotation */}
        </PleasantButton>}
      </div>


      <DialogAddress
        orderid={orderIDLocal}
        endpoint={endpoint}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        accessRights={accessRights}
        state={state}
        requestUpdate={requestUpdate}
        validateAddress={validateAddress}
        wordingSection={wordingSection}
      />
    </> : null}
  </>
  )
}

export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
