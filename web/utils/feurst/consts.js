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

const QUOTATION_STATUS={
  CREATED: 'QUOTATION_STATUS.created',
  HANDLED: 'QUOTATION_STATUS.handled',
  EXPIRED: 'QUOTATION_STATUS.expired',
}

const ORDER_CREATED='CREATED'
const ORDER_FULFILLED='FULFILLED'
const ORDER_COMPLETE='COMPLETE'
const ORDER_VALID='VALID'
const ORDER_PARTIALLY_HANDLED='PARTIALLY_HANDLED'
const ORDER_HANDLED='HANDLED'

const ORDER_STATUS={
  [ORDER_CREATED]: 'ORDER_STATUS.created',
  [ORDER_FULFILLED]: 'ORDER_STATUS.fulfilled',
  [ORDER_COMPLETE]: 'ORDER_STATUS.complete',
  [ORDER_VALID]: 'ORDER_STATUS.valid',
  [ORDER_PARTIALLY_HANDLED]: 'ORDER_STATUS.partially_handled',
  [ORDER_HANDLED]: 'ORDER_STATUS.partially_handled',
}

const FEURST_ADMIN='FEURST_ADMIN'
const FEURST_ADV='FEURST_ADV'
const FEURST_SALES='FEURST_SALES'
const CUSTOMER_ADMIN='CUSTOMER_ADMIN'
const CUSTOMER_SLAVE='CUSTOMER_SLAVE'


const ROLES = {
  [FEURST_ADMIN]: 'Administrateur Feurst',
  [FEURST_ADV]: 'ADV',
  [FEURST_SALES]: 'Commercial Feurst',
  [CUSTOMER_ADMIN]: 'Administrateur client',
  [CUSTOMER_SLAVE]: 'Client',
}

const [ORDER, QUOTATION, ACCOUNT, SHIPRATE, PRODUCT]=['ORDER', 'QUOTATION', 'ACCOUNT', 'SHIPRATE', 'PRODUCT']
const [VIEW, CREATE, UPDATE, DELETE, VALIDATE, CONVERT]=['VIEW', 'CREATE', 'UPDATE', 'DELETE', 'VALIDATE', 'CONVERT']
const [ALL, MINE, COMPANY]=['ALL', 'MINE', 'COMPANY']
const MODELS=[ORDER, QUOTATION, ACCOUNT, SHIPRATE, PRODUCT]
const ACTIONS=[VIEW, CREATE, UPDATE, DELETE, VALIDATE, CONVERT]
const VISIBILITY=[ALL, MINE, COMPANY]

const createUserAction= (model, action, extra={}) => {
  return {model: model, action: action, ...extra}
}

const USER_ACTIONS={
  [FEURST_ADMIN]: lodash.flattenDeep([
    [VIEW, CREATE, UPDATE, DELETE].map(action => [FEURST_ADMIN, FEURST_ADV, CUSTOMER_ADMIN].map(tp => createUserAction(ACCOUNT, action, {type: tp, visibility: ALL}))),
    [VIEW, VALIDATE].map(action => createUserAction(ORDER, action, {visibility: ALL})),
    [VIEW, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: ALL})),
    [VIEW, CREATE].map(action => createUserAction(SHIPRATE, action, {visibility: ALL})),
    [VIEW, CREATE, UPDATE, DELETE].map(action => createUserAction(PRODUCT, action, {visibility: ALL})),
  ]),
  [FEURST_ADV]: lodash.flattenDeep([
    [CREATE, VIEW, VALIDATE].map(action => createUserAction(ORDER, action, {visibility: ALL})),
  ]),
  [FEURST_SALES]: lodash.flattenDeep([
    [CREATE, VIEW, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: MINE})),
    [CREATE, VIEW].map(action => createUserAction(ORDER, action, {visibility: MINE})),
  ]),
  [CUSTOMER_ADMIN]: lodash.flattenDeep([
    [VIEW, CREATE, UPDATE, DELETE].map(action => [CUSTOMER_ADMIN, CUSTOMER_SLAVE].map(type => createUserAction(ACCOUNT, action, {type: type, visibility: COMPANY}))),
    [CREATE, VIEW, UPDATE, CONVERT, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: COMPANY})),
    [CREATE, VIEW, UPDATE].map(action => createUserAction(ORDER, action, {visibility: COMPANY})),
    [VIEW].map(action => createUserAction(PRODUCT, action, {visibility: ALL})),
  ]),
  [CUSTOMER_SLAVE]: lodash.flattenDeep([
    [CREATE, VIEW, UPDATE, CONVERT, DELETE, VALIDATE].map(action => createUserAction(QUOTATION, action, {visibility: MINE})),
    [CREATE, VIEW, UPDATE, DELETE, VALIDATE].map(action => createUserAction(ORDER, action, {visibility: MINE})),
    [VIEW].map(action => createUserAction(PRODUCT, action, {visibility: ALL})),
  ]),
}

// Max weight limit for ship fee (i.e. no max limit)
const MAX_WEIGHT=1000000

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

module.exports={
  PIN, SOLD, NONE, FIX_TYPES,
  DROITE, DELTA, SEMI_DELTA, UNKNOWN, BLADE_SHAPES,
  EXCAVATRICE, CHARGEUSE, PELLE_BUTTE, MACHINE_TYPES,
  ORDER_STATUS, QUOTATION_STATUS, FEURST_ADMIN, FEURST_ADV, CUSTOMER_ADMIN, CUSTOMER_SLAVE,
  ROLES, USER_ACTIONS, ORDER, QUOTATION, ACCOUNT, VIEW, CREATE, UPDATE, DELETE,
  SHIPRATE, MAX_WEIGHT, PRODUCT, STANDARD_SHIPPING, EXPRESS_SHIPPING, BASEPATH_EDI, ALL, FEURST_PHONE_NUMBER, FEURST_IMG_PATH, API_PATH,
  COMPANY, MINE,
  ORDER_CREATED, ORDER_FULFILLED, ORDER_VALID, ORDER_PARTIALLY_HANDLED, ORDER_HANDLED, SHIPPING_MODES,
  ORDER_COMPLETE,
}
