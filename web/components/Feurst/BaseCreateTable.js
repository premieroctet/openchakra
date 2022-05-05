import React, {useState, useEffect, useCallback} from 'react'
import useLocalStorageState from 'use-local-storage-state'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import Autocomplete from '../Autocomplete/Autocomplete'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'
import {
  BASEPATH_EDI,
  API_PATH,
  COMPLETE,
  CREATED,
  FULFILLED,
  VALID,
  PARTIALLY_HANDLED,
  HANDLED,
  CREATE_FOR,
  CONVERT,
  ORDER,
  QUOTATION,
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
const axios = require('axios')
const {withTranslation} = require('react-i18next')
const {
  getAuthToken,
  setAxiosAuthentication,
} = require('../../utils/authentication')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')


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
  
  // TODO filtrer sur model
  const isFeurstSales = accessRights.actions.map(acc => acc.action).includes(CREATE_FOR)

  const [language, setLanguage] = useState('fr')
  const dataToken = getAuthToken()
  const [orderuser, setOrderuser] = useState(!isFeurstSales ? {...dataToken, _id: dataToken.id} : null)
  const [orderIDLocal, setOrderIDLocal, {removeItem}] = useLocalStorageState(storage, {defaultValue: id})
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  

  const router = useRouter()

  /* States according to status order   */
  const justCreated = [CREATED].includes(state.status)
  const canAdd = [CREATED, FULFILLED].includes(state.status)
  const canValidate = [COMPLETE].includes(state.status)
  const isView = [VALID, PARTIALLY_HANDLED, HANDLED, VALID, PARTIALLY_HANDLED, HANDLED].includes(state.status)
  
  /*  */
  const convertToQuotation = !isView && accessRights.model == ORDER && accessRights.actions.map(acc => acc.action).includes(CONVERT)
  const convertToOrder = !isView && accessRights.model == QUOTATION && accessRights.actions.map(acc => acc.action).includes(CONVERT)
  const onlyValidButton = !canValidate && !convertToOrder && !convertToQuotation

  /* Update product quantities  */
  const updateMyOrderContent = data => {
    addProduct({endpoint, orderid: orderIDLocal, ...data})
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
          const finalDestination = endpoint === 'orders' ? 'quotations' : 'orders'
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
      getContentFrom({endpoint, orderid: orderIDLocal})
        .then(data => {
          if (data) {
            // const isMyOrder = data.user._id === orderuser._id
            // if (isMyOrder)
            setOrderuser(data.user)
          }
          else {
            removeItem()
          }
        })
    }
  }, [endpoint, getContentFrom, orderIDLocal, removeItem])


  useEffect(() => {
    // console.log('createOrder', orderID, orderuser)
    if (isEmpty(orderIDLocal)) {
      if (orderuser !== null && !canValidate) {
        createOrderId({endpoint, user: orderuser})
          .then(data => setOrderIDLocal(data._id))
          .catch(() => console.error('cant create order'))
      }
    }
  }, [canValidate, createOrderId, endpoint, orderIDLocal, orderuser, setOrderIDLocal])


  /**
  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )
  */
  const cols=columns({language, endpoint, orderid: orderIDLocal, deleteProduct: canAdd ? deleteProduct : null})

  const importURL=`${API_PATH}/${endpoint}/${orderIDLocal}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`

  const paramsComboboxUser = {
    itemToString: item => (item ? `${item.full_name}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      selectedItem && setOrderuser(selectedItem._id)
    },
  }


  return (<>


    {isFeurstSales && !orderuser ?
      <div className='container-sm mb-8'>
        <StyledAutocomplete>
          <Autocomplete
            urlToFetch={`${API_PATH}/users`}
            item={orderuser}
            setItem={setOrderuser}
            paramsCombobox={paramsComboboxUser}
            errorMsg= 'Aucun utilisateur trouvé'
            placeholder='Nom du client'
            formattingResult={item => `${item.full_name} / ${item.company.name}`}
          />
        </StyledAutocomplete>
      </div> :
      null
    }

    { orderIDLocal ? <div>

      {isFeurstSales && <H2confirm>{state?.user?.full_name}</H2confirm>}

      {canAdd &&
      <div className='container-base'>
        <ImportExcelFile importURL={importURL} templateURL={templateURL}/>
        <AddArticle endpoint={endpoint} orderid={orderIDLocal} addProduct={addProduct} wordingSection={wordingSection} />
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
        <div className='flex flex-wrap gap-x-4 justify-between items-end mb-8'>
          <Delivery address={state.address} shipping={{shipping_mode: state.shipping_mode, shipping_fee: state.shipping_fee}} />
          {!isView ? <h4 className='text-2xl mb-0 text-black'>{t(`${wordingSection}.total`)} : {localeMoneyFormat({value: state.total_amount})}</h4> : null}
        </div>: null
      }

      {!isView ?
        <div className={`flex flex-wrap ${onlyValidButton ? 'justify-end' : 'justify-between'} gap-y-4 mb-6`}>
          {canValidate
            ?
            <PleasantButton
              rounded={'full'}
              bgColor={'#fff'}
              textColor={'#141953'}
              borderColor={'1px solid #141953'}
              onClick={() => resetAddress({endpoint, orderid: orderIDLocal})}
            >
        Revenir à la saisie
            </PleasantButton>
            : (<>
              {convertToQuotation && <PleasantButton
                rounded={'full'}
                disabled={justCreated}
                bgColor={'#fff'}
                textColor={'#141953'}
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
                borderColor={'1px solid #141953'}
                onClick={() => convert({endpoint, orderid: orderIDLocal})}
              >
        Convertir en commande
              </PleasantButton>}
            </>
            )
          
            
          }


          <PleasantButton
            rounded={'full'}
            disabled={justCreated}
            onClick={() => ([COMPLETE].includes(state.status) ? submitOrder({endpoint, orderid: orderIDLocal}): setIsOpenDialog(true))}
          >
            {t(`${wordingSection}.valid`)} {/* Valid order/quotation */}
          </PleasantButton>
        </div>
        : null }


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
    </div> : null}
  </>
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
