import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import axios from 'axios'
import {withTranslation} from 'react-i18next'
import styled from 'styled-components'
import {
  BASEPATH_EDI,
  API_PATH,
  CONVERT,
  VALIDATE,
  ORDER,
  QUOTATION,
  RELATED,
  UPDATE,
  UPDATE_ALL,
  ENDPOINTS,
  REWRITE,
  PARTIALLY_HANDLE,
  TOTALLY_HANDLE,
} from '../../utils/consts'
import FeurstTable from '../../styles/feurst/FeurstTable'
import {client} from '../../utils/client'
import {localeMoneyFormat} from '../../utils/converters'
import isEmpty from '../../server/validation/is-empty'
import withEdiRequest from '../../hoc/withEdiRequest'
import {
  setAxiosAuthentication,
} from '../../utils/authentication'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import DevLog from '../DevLog'
import {H2confirm} from './components.styles'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {NormalButton} from './Button'
import Delivery from './Delivery'


const DialogAddress = dynamic(() => import('./DialogAddress'))
const DialogConvertQuotation = dynamic(() => import('./DialogConvertQuotation'))

const ConfirmHandledValidation = ({onClick, className, children}) => (
  <NormalButton
    rounded={'full'}
    textColor={'#fff'}
    className={className}
    onClick={onClick}
  >{children}</NormalButton>
)

const ConfirmPartialHandledValidation = ({onClick, className, children}) => {

  return (<NormalButton
    rounded={'full'}
    bgColor={'#fff'}
    textColor={'var(--black)'}
    borderColor={'1px solid #141953'}
    onClick={onClick}
    className={className}
  >
    {children}
  </NormalButton>
  )
}

const BaseCreateTable = ({
  filtered,
  id,
  endpoint,
  columns,
  accessRights,
  wordingSection,
  t,
  getContentFrom,
  addProduct,
  deleteProduct,
  requestUpdate,
  validateAddress,
  updateShippingFees,
  revertToEdition,
  handleValidation,
  importFile,
  state,
}) => {

  const [language, setLanguage] = useState('fr')
  const [orderid, setOrderid] = useState(id)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [isOpenDialogConvert, setIsOpenDialogConvert] = useState(false)
  const [actionButtons, setActionButtons]=useState([])
  const [addAddress, setAddAddress] = useState(false)
  const [alertText, setAlertText] = useState(false)
  
  const importURL=`${API_PATH}/${endpoint}/${orderid}/import`
  const templateURL=`${API_PATH}/${endpoint}/template`
  const router = useRouter()

  // Possibles actions
  const justCreated = !(state?.items?.length && true)
  
  const isValidButton = actionButtons.includes(VALIDATE)
  const isRevertToEdition = actionButtons.includes(REWRITE)
  const isConvertToOrder = actionButtons.includes(CONVERT)
  const isPartiallyHandled = actionButtons.includes(PARTIALLY_HANDLE)
  const isTotallyHandled = actionButtons.includes(TOTALLY_HANDLE)
  const canModify = actionButtons.includes(UPDATE)
  
  const isFeurstSales = accessRights.getFullAction()?.visibility==RELATED
  const canUpdatePrice = accessRights.isActionAllowed(accessRights.getModel(), UPDATE_ALL) && canModify
  const canUpdateQuantity = accessRights.isActionAllowed(accessRights.getModel(), UPDATE) && canModify

  const canUpdateShipping = canUpdatePrice

  const isAddressRequired = isEmpty(state.address)


  /* Update product quantities or price */
  const updateMyOrderContent = data => {
    addProduct({endpoint, orderid, ...data})
  }

  const submitOrder = async({endpoint, orderid}) => {

    await client(`${API_PATH}/${endpoint}/${orderid}/validate`, {method: 'POST'})
      .then(() => {
        snackBarSuccess('Enregistré')
        router.push(`${BASEPATH_EDI}/${endpoint}`)
      })
      .catch(error => {
        if (error.info) {
          // Address is outside delivery zone
          if (error.info.status === 422) {

            /* Display choices */
            setIsOpenDialogConvert(true)
          }
        }
      })
  }

  const convert = ({endpoint, orderid}) => {
    setAxiosAuthentication()
    axios.post(`${API_PATH}/${endpoint}/${orderid}/convert`)
      .then(res => {
        if(res.data) {
          const finalDestination = ENDPOINTS[accessRights.model==ORDER ? QUOTATION : ORDER]
          router.push(`${BASEPATH_EDI}/${finalDestination}`)
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
    if (!isEmpty(orderid)) {
      getContentFrom({endpoint, orderid})
    }
  }, [endpoint, getContentFrom, orderid])

  // Update actions
  useEffect(() => {
    if (!isEmpty(orderid)) {
      client(`${API_PATH}/${endpoint}/${orderid}/actions`)
        .then(res => { setActionButtons(res) })
        .catch(err => console.error(JSON.stringify(err)))
    }
  }, [endpoint, orderid, state.status])


  /**
  const columnsMemo = useMemo(
    () => columns({language, data, setData, deleteProduct: deleteProduct}).map(c => ({...c, Header: c.label, accessor: c.attribute})),
    [data, deleteProduct, language],
  )
  */
  const cols=columns({
    language,
    endpoint,
    orderid,
    canUpdatePrice,
    canUpdateQuantity,
    deleteProduct: canModify ? deleteProduct : null})


  return (<>

    <DevLog>
      <span>Order:{orderid}, status: {state?.status}</span>
      <span>Boutons actions:{JSON.stringify(actionButtons)}</span>
    </DevLog>

    { orderid ? <>

      {isFeurstSales && canModify && <div className='flex'>
        <H2confirm>
          <span>{state?.company?.name}</span>
        </H2confirm></div>}

      {canModify &&
      <div className='container-base'>
        <ImportExcelFile endpoint={endpoint} orderid={orderid} importURL={importURL} templateURL={templateURL} importFile={importFile}/>
        <LineDivider>Ou</LineDivider>
        <AddArticle endpoint={endpoint} orderid={orderid} addProduct={addProduct} wordingSection={wordingSection} />
      </div>}

      {!canModify && <H2confirm>{t(`${wordingSection}.recap`)}</H2confirm>}

      {!canModify && <div>
        <dl className='dl-inline text-xl font-semibold'>
          <dt>{t(`${wordingSection}.name`)}</dt>
          <dd>{state.reference}</dd>
          <dt>{t(`${wordingSection}.date`)}</dt>
          <dd>{new Date(state.creation_date).toLocaleDateString()}</dd>
          {state.sales_representative?.firstname && (<>
            <dt>Suivi par</dt>
            <dd>{state.company.sales_representative.firstname}</dd>
          </>)}
        </dl>
      </div>}

      <FeurstTable
        caption={t(`${wordingSection}.details`)}
        data={state.items}
        columns={cols}
        footer={isValidButton || !canModify}
        filtered={filtered}
        updateMyData={updateMyOrderContent}
      />


      <Delivery
        endpoint={endpoint}
        orderid={orderid}
        address={state.address}
        setIsOpenDialog={setIsOpenDialog}
        editable={!canModify}
        requestUpdate={requestUpdate}
        shipping={{shipping_mode: state.shipping_mode, shipping_fee: state.shipping_fee, update: canUpdateShipping ? updateShippingFees : null}}
      />

      {!justCreated &&
      <div className='flex items-center bg-brand text-xl text-white font-semibold justify-between p-2 pl-6 pr-6 mb-8'>
        <span>Total</span>
        <span>{state?.total_amount && localeMoneyFormat({value: state.total_amount})}</span>
      </div>}


      <div className={`grid grid-cols-2 justify-between gap-y-4 mb-8`}>

        {isRevertToEdition ? <div>
          <NormalButton
            rounded={'full'}
            bgColor={'#fff'}
            textColor={'#141953'}
            borderColor={'1px solid #141953'}
            className={'col-start-1'}
            onMouseEnter={() => setAlertText(true)}
            onFocus={() => setAlertText(true)}
            onMouseLeave={() => setAlertText(false)}
            onBlur={() => setAlertText(false)}
            onClick={() => revertToEdition({endpoint, orderid})}
          >
            {t(`${wordingSection}.change`)}
          </NormalButton>
          {isConvertToOrder ? <AlertCondition className={alertText ? 'visible' : null} aria-live="polite"><span role={'img'} aria-label="attention">⚠️</span> Une modification entrainera une nouvelle demande de validation commerciale.</AlertCondition> : null}
        </div> : null
        }

     
        {isConvertToOrder && <NormalButton
          rounded={'full'}
          disabled={justCreated}
          bgColor={'#fff'}
          textColor={'#141953'}
          className={'justify-self-end col-start-2'}
          borderColor={'1px solid #141953'}
          onClick={() => convert({endpoint, orderid})}
        >
        Convertir en commande
        </NormalButton>}


        {isValidButton && <NormalButton
          rounded={'full'}
          className={'justify-self-end col-start-2'}
          onClick={() => (isAddressRequired ? setIsOpenDialog(true) : submitOrder({endpoint, orderid}))}
        >
          {t(`${wordingSection}.valid`)} {/* Valid order/quotation */}
        </NormalButton>}

      </div>

      {/* Partially handled buttons  */}
      <div className='flex gap-x-4 justify-end mb-8'>
        {isPartiallyHandled && <ConfirmPartialHandledValidation
          className={'justify-self-end col-start-2'}
          onClick={() => handleValidation({endpoint, orderid, status: false})}
        >
        Partiellement traitée
        </ConfirmPartialHandledValidation>}

        {isTotallyHandled && <ConfirmHandledValidation
          className={'justify-self-end col-start-2'}
          onClick={() => handleValidation({endpoint, orderid, status: true})}
        >
        Commande traitée
        </ConfirmHandledValidation>}
      </div>


      {isOpenDialog && <DialogAddress
        orderid={orderid}
        endpoint={endpoint}
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        accessRights={accessRights}
        state={state}
        requestUpdate={requestUpdate}
        addAddress={addAddress}
        setAddAddress={setAddAddress}
        validateAddress={validateAddress}
        wordingSection={wordingSection}
      />}

      <DialogConvertQuotation
        orderid={orderid}
        endpoint={endpoint}
        isOpenDialog={isOpenDialogConvert}
        setIsOpenDialog={setIsOpenDialogConvert}
        accessRights={accessRights}
        convert={convert}
        revertToEdition={revertToEdition}
      />

    </> : <div>Devis/Commande non trouvée</div>}
  </>
  )
}

const LineDivider = styled.p`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: 100%;
  margin-bottom: var(--spc-6);
  font-weight: var(--font-bold);

  &::after, &::before {
    content: '';
    height: 1px;
    width: 100%;
    background-color: var(--black);
  }

`

const AlertCondition = styled.p`
  
  span {
    font-size: 1.5rem;
    align-self: center;
  }

  visibility: hidden;
  display: flex;
  column-gap: var(--spc-2);
  padding: var(--spc-2);
  width: min(calc(100% - 2rem), 40%);
  border: 1px dashed var(--black);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0.1s ease-out;
  transform: translateY(100%);
  opacity: 0;
  
  &.visible {
    visibility: visible;
    transform: translateY(0);
    opacity: 1;
  }
`


export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
