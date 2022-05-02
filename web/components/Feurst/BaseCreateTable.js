import React, {useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import Autocomplete from '../Autocomplete/Autocomplete'

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
  requestUpdate,
  validateAddress,
  resetAddress,
  state,
}) => {

  const [language, setLanguage] = useState('fr')
  const dataToken = getAuthToken()
  const [orderuser, setOrderuser] = useState(dataToken.id)
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [refresh, setRefresh]=useState(false)
  
  const toggleRefresh= () => setRefresh(!refresh)
  
  const router = useRouter()
  
  const canAdd = [ORDER_CREATED, ORDER_FULFILLED, QUOTATION_CREATED, QUOTATION_FULFILLED].includes(state.status)
  const canValidate = [ORDER_COMPLETE, QUOTATION_COMPLETE].includes(state.status)
  const isView = [ORDER_VALID, ORDER_PARTIALLY_HANDLED, ORDER_HANDLED, QUOTATION_VALID, QUOTATION_PARTIALLY_HANDLED, QUOTATION_HANDLED].includes(state.status)
 
  const updateMyOrderContent = data => {
    addProduct({endpoint, orderid: orderID, ...data})
  }

  const submitOrder = async({endpoint, orderid}) => {

    await client(`${API_PATH}/${endpoint}/${orderid}/validate`, {method: 'POST'})
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
    if (isEmpty(orderID)) {
      createOrderId()
    }
    else {
      getContentFrom({endpoint, orderid: orderID})
    }
  }, [createOrderId, endpoint, getContentFrom, orderID, refresh])

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
  const cols=columns({language, endpoint, orderid: orderID, deleteProduct: canAdd ? deleteProduct : null})

  const importURL=`${API_PATH}/${endpoint}/${orderID}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`

  const paramsComboboxUser = {
    itemToString: item => (item ? `${item.reference}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setOrderuser(selectedItem)
    },
  }

  return (<>

    <Autocomplete
      urlToFetch={`${API_PATH}/products?pattern=`}
      item={orderuser}
      setItem={setOrderuser}
      paramsCombobox={paramsComboboxUser}
      errorMsg= 'Aucun article trouvé'
      dbSearchField= 'reference'
      label={'Nom du client'}
      placeholder='Nom du client'
      formattingResult={item => `${item.reference} - ${item.description} ${item.description_2}`}
    />

    {canAdd &&
      <div className='container-base'>
        <ImportExcelFile importURL={importURL} templateURL={templateURL}/>
        <AddArticle endpoint={endpoint} orderid={orderID} addProduct={addProduct} wordingSection={wordingSection} />
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
      updateMyData={updateMyOrderContent}
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
            onClick={() => resetAddress({endpoint, orderid: orderID})}
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
          onClick={() => (state.status === ORDER_FULFILLED ? setIsOpenDialog(true) : submitOrder({endpoint, orderid: orderID}))}
        >
          {t(`${wordingSection}.valid`)} {/* Valid order/quotation */}
        </PleasantButton>
      </div>
      : null }

    <DialogAddress
      orderid={orderID}
      endpoint={endpoint}
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      accessRights={accessRights}
      state={state}
      requestUpdate={requestUpdate}
      validateAddress={validateAddress}
      wordingSection={wordingSection}
    />

  </>
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
