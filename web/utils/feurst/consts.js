const lodash=require('lodash')

const EXCAVATRICE='EXCAVATRICE'
const CHARGEUSE='CHARGEUSE'
const PELLE_BUTTE='PELLE-BUTTE'
const UNKNOWN='UNKNOWN'

const MACHINE_TYPES={
  [EXCAVATRICE]: 'MACHINE_TYPE.excavator',
  [CHARGEUSE]: 'MACHINE_TYPE.loader',
  [PELLE_BUTTE]: 'MACHINE_TYPE.shovel',
}

const PIN='PIN'
const SOLD='SOLD'
const NONE='NONE'

const FIX_TYPES={
  [PIN]: 'FIX_TYPE.pin',
  [SOLD]: 'FIX_TYPE.sold',
  [NONE]: 'FIX_TYPE.none',
}

const DROITE='DROITE'
const DELTA='DELTA'
const SEMI_DELTA='SEMI-DELTA'

const BLADE_SHAPES={
  [DROITE]: 'BLADE_SHAPE.straight',
  [DELTA]: 'BLADE_SHAPE.delta',
  [SEMI_DELTA]: 'BLADE_SHAPE.semi_delta',
  [UNKNOWN]: 'BLADE_SHAPE.unknoStringwn',
}

/**
Quotation & book status :
- Quotation: CREATED, HANDLED, EXPIRED,
- Booking: CREATED, PARTIALLY_HANDLED, HANDLED
*/


const CREATED='CREATED'
const COMPLETE='COMPLETE'
const VALID='VALID'
const PARTIALLY_HANDLED='PARTIALLY_HANDLED'
const HANDLED='HANDLED'
const EXPIRED='EXPIRED'
const CONVERTED='CONVERTED' // Converted to order

const QUOTATION_STATUS={
  [CREATED]: 'QUOTATION_STATUS.created',
  [COMPLETE]: 'QUOTATION_STATUS.complete',
  [VALID]: 'QUOTATION_STATUS.valid',
  [HANDLED]: 'QUOTATION_STATUS.partially_handled',
  [EXPIRED]: 'QUOTATION_STATUS.expired',
  [CONVERTED]: 'QUOTATION_STATUS.converted', // Converted to order
}

const ORDER_STATUS={
  [CREATED]: 'ORDER_STATUS.created',
  [COMPLETE]: 'ORDER_STATUS.complete',
  [VALID]: 'ORDER_STATUS.valid',
  [PARTIALLY_HANDLED]: 'ORDER_STATUS.partially_handled',
  [HANDLED]: 'ORDER_STATUS.partially_handled',
}

const FEURST_ADMIN='FEURST_ADMIN'
const FEURST_ADV='FEURST_ADV'
const FEURST_SALES='FEURST_SALES'
const CUSTOMER_ADMIN='CUSTOMER_ADMIN'
const CUSTOMER_BUYER='CUSTOMER_BUYER'
const CUSTOMER_TCI='CUSTOMER_TCI'


const ROLES = {
  [FEURST_ADMIN]: 'Administrateur Feurst',
  [FEURST_ADV]: 'ADV',
  [FEURST_SALES]: 'Commercial Feurst',
  [CUSTOMER_ADMIN]: 'Administrateur client',
  [CUSTOMER_BUYER]: 'Client acheteur',
  [CUSTOMER_TCI]: 'Client consultatif',
}
// Auto associated roles
const [ORDER, QUOTATION, ACCOUNT, SHIPRATE, PRODUCT, PRICELIST]=['ORDER', 'QUOTATION', 'ACCOUNT', 'SHIPRATE', 'PRODUCT', 'PRICELIST']
const [VIEW, CREATE, UPDATE, UPDATE_ALL, DELETE, VALIDATE, CONVERT, LINK, HANDLE, CREATE_FOR]=['VIEW', 'CREATE', 'UPDATE', 'UPDATE_ALL', 'DELETE', 'VALIDATE', 'CONVERT', 'LINK', 'HANDLE', 'CREATE_FOR']
const [ALL, COMPANY, RELATED]=['ALL', 'COMPANY', 'RELATED']
const MODELS=[ORDER, QUOTATION, ACCOUNT, SHIPRATE, PRODUCT, PRICELIST]
const ACTIONS=[VIEW, CREATE, UPDATE, DELETE, VALIDATE, CONVERT]
const VISIBILITY=[ALL, COMPANY, RELATED]

const REWRITE='REWRITE'
const PARTIALLY_HANDLE='PARTIALLY_HANDLE'
const TOTALLY_HANDLE='TOTALLY_HANDLE'

const BUTTONS=[VALIDATE, REWRITE, PARTIALLY_HANDLE, TOTALLY_HANDLE, CONVERT, DELETE]

const ENDPOINTS = {
  [ORDER]: 'orders',
  [QUOTATION]: 'quotations',
}

const createUserAction= (model, action, extra={}) => {
  return {model: model, action: action, ...extra}
}

const USER_ACTIONS={
  [FEURST_ADMIN]: lodash.flattenDeep([
    [VIEW, CREATE, UPDATE, DELETE, LINK].map(action => [FEURST_ADMIN, FEURST_ADV, FEURST_SALES, CUSTOMER_ADMIN].map(tp => createUserAction(ACCOUNT, action, {type: tp, visibility: ALL}))),
    [VIEW, HANDLE].map(action => createUserAction(ORDER, action, {visibility: ALL})),
    [VIEW, CREATE].map(action => createUserAction(SHIPRATE, action, {visibility: ALL})),
    [VIEW, CREATE, UPDATE, DELETE].map(action => createUserAction(PRODUCT, action, {visibility: ALL})),
    [VIEW, CREATE, UPDATE, DELETE].map(action => createUserAction(PRICELIST, action, {visibility: ALL})),
    [CREATE, VIEW, UPDATE].map(action => createUserAction(COMPANY, action, {visibility: ALL})),
  ]),
  [FEURST_ADV]: lodash.flattenDeep([
    [VIEW, HANDLE].map(action => createUserAction(ORDER, action, {visibility: ALL})),
    [VIEW].map(action => createUserAction(ACCOUNT, action, {visibility: ALL})),
  ]),
  [FEURST_SALES]: lodash.flattenDeep([
    createUserAction(ACCOUNT, VIEW, {type: CUSTOMER_ADMIN, visibility: RELATED}),
    [CREATE, VIEW, UPDATE, HANDLE, UPDATE_ALL, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: RELATED})),
    [VIEW].map(action => createUserAction(ORDER, action, {visibility: RELATED})),
    createUserAction(COMPANY, VIEW, {visibility: RELATED}),
  ]),
  [CUSTOMER_ADMIN]: lodash.flattenDeep([
    [VIEW, CREATE, UPDATE, DELETE].map(action => [CUSTOMER_ADMIN, CUSTOMER_BUYER, CUSTOMER_TCI].map(type => createUserAction(ACCOUNT, action, {type: type, visibility: COMPANY}))),
    [CREATE, VIEW, UPDATE, CONVERT, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: COMPANY})),
    [CREATE, VIEW, UPDATE, VALIDATE].map(action => createUserAction(ORDER, action, {visibility: COMPANY})),
  ]),
  [CUSTOMER_BUYER]: lodash.flattenDeep([
    [CREATE, VIEW, UPDATE, CONVERT, DELETE, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: COMPANY})),
    [CREATE, VIEW, UPDATE, DELETE, VALIDATE].map(action => createUserAction(ORDER, action, {visibility: COMPANY})),
  ]),
  [CUSTOMER_TCI]: lodash.flattenDeep([
    [CREATE, VIEW, UPDATE, DELETE, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: COMPANY})),
    [VIEW].map(action => createUserAction(ORDER, action, {visibility: COMPANY})),
  ]),
}

// Max weight limit for ship fee (i.e. no max limit)
const MAX_WEIGHT=Number.MAX_SAFE_INTEGER

const STANDARD_SHIPPING = 'STANDARD'
const EXPRESS_SHIPPING = 'EXPRESS'

const SHIPPING_MODES={
  [STANDARD_SHIPPING]: 'SHIPPING.standard',
  [EXPRESS_SHIPPING]: 'SHIPPING.express',
}

const BASEPATH_EDI = '/edi'
const FEURST_IMG_PATH = '/static/assets/img/feurst'
const API_PATH = '/myAlfred/api'
const FEURST_PHONE_NUMBER = '+33 4 77 27 40 63'

const XL_TYPE='XL'
const TEXT_TYPE='TEXT'

// Quotation validity in days
const QUOTATION_VALIDITY=30

// Company main address
const MAIN_ADDRESS_LABEL='Principale'

module.exports={
  PIN, SOLD, NONE, FIX_TYPES,
  DROITE, DELTA, SEMI_DELTA, UNKNOWN, BLADE_SHAPES,
  EXCAVATRICE, CHARGEUSE, PELLE_BUTTE, MACHINE_TYPES,
  ENDPOINTS,
  ORDER_STATUS, QUOTATION_STATUS, FEURST_ADMIN, FEURST_ADV, CUSTOMER_ADMIN, CUSTOMER_BUYER, CUSTOMER_TCI,
  ROLES, USER_ACTIONS, ORDER, QUOTATION, ACCOUNT, VIEW, CREATE, UPDATE, DELETE, VALIDATE,
  SHIPRATE, MAX_WEIGHT, PRODUCT, STANDARD_SHIPPING, EXPRESS_SHIPPING, BASEPATH_EDI, ALL, FEURST_PHONE_NUMBER, FEURST_IMG_PATH, API_PATH,
  COMPANY, RELATED,
  CREATED, VALID, PARTIALLY_HANDLED, HANDLED, SHIPPING_MODES,
  COMPLETE, LINK, FEURST_SALES, HANDLE, XL_TYPE, TEXT_TYPE, PRICELIST, CREATE_FOR,
  CONVERT, QUOTATION_VALIDITY, EXPIRED, UPDATE_ALL, MAIN_ADDRESS_LABEL, CONVERTED,
  BUTTONS, REWRITE, TOTALLY_HANDLE, PARTIALLY_HANDLE,
}
