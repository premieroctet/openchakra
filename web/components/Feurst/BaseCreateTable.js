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
  const [orderuser, setOrderuser] = useState(null)
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState(storage, {defaultValue: null})
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [refresh, setRefresh]=useState(false)

  const toggleRefresh= () => setRefresh(!refresh)

  const router = useRouter()

  // TODO filtrer sur model
  const isFeurstSales = accessRights.actions.map(acc => acc.action).includes(CREATE_FOR)

  const justCreated = [CREATED].includes(state.status)
  const canAdd = [CREATED, FULFILLED].includes(state.status)
  const canValidate = [COMPLETE].includes(state.status)
  const isView = [VALID, PARTIALLY_HANDLED, HANDLED, VALID, PARTIALLY_HANDLED, HANDLED].includes(state.status)

  const updateMyOrderContent = data => {
    addProduct({endpoint, orderid: orderID, ...data})
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


  // Init language
  useEffect(() => {
    // console.log('language')
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    // console.log('getContent', orderID)
    !isEmpty(orderID) && getContentFrom({endpoint, orderid: orderID})
  }, [endpoint, getContentFrom, orderID, refresh])


  useEffect(() => {
    // console.log('createOrder', orderID, orderuser)
    if (isEmpty(orderID)) {
      if (orderuser !== null && !canValidate) {
        createOrderId({endpoint, user: orderuser})
          .then(data => setOrderId(data._id))
          .catch(e => console.error('cant create order'))
      }
    }
  }, [createOrderId, endpoint, orderID, orderuser, setOrderId])

  useEffect(() => {
    // console.log('setOrderUser', dataToken.id)
    !isFeurstSales && setOrderuser(dataToken.id)
  }, [dataToken.id, isFeurstSales, setOrderuser])


  /* supplied id for a view ? */
  useEffect(() => {
    console.log('isView', id)
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
    itemToString: item => (item ? `${item.full_name}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      selectedItem && setOrderuser(selectedItem._id)
    },
  }

  return (<>


    {justCreated && isFeurstSales && !orderuser ?
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

    { orderID ? <div>

      {isFeurstSales && <H2confirm>{state?.user?.full_name}</H2confirm>}

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
              disabled={justCreated}
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
            disabled={justCreated}
            onClick={() => ([COMPLETE].includes(state.status) ? submitOrder({endpoint, orderid: orderID}): setIsOpenDialog(true))}
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
    </div> : null}
  </>
  )
}

module.exports=withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
