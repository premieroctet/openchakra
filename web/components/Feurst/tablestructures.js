import React, {useMemo} from 'react'
import Link from 'next/link'
import UpdateCell from '../Table/UpdateCell'
import {localeMoneyFormat} from '../../utils/converters'
import OrderStatus from './OrderStatus'
const axios = require('axios')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {
  API_PATH,
  PARTIALLY_HANDLED,
  VALID,
} = require('../../utils/feurst/consts')

const {formatPercent} = require('../../utils/text')
const {ROLES} = require('../../utils/consts')
const {DateRangeColumnFilter} = require('../Table/TableFilter')
const {PleasantButton} = require('./Button')

const datetime = (a, b) => {
  let a1 = new Date(a).getTime()
  let b1 = new Date(b).getTime()
  if(a1<b1) { return 1 }
  else if(a1>b1) { return -1 }
  return 0
}

const FooterTotalWeight = info => {
  const total = useMemo(
    () =>
      info.rows.reduce((sum, row) => row.values.total_weight + sum, 0),
    [info.rows],
  )

  return <>{total} kg</>
}

const FooterTotalPrice = (info, language = null) => {
  const total = useMemo(
    () =>
      info.rows.reduce((sum, row) => row.original.total_amount + sum, 0),
    [info.rows],
  )

  return <>{localeMoneyFormat({lang: language, value: total})}</>
}

const ToTheBin = props => (
  <button {...props}>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)


const orderColumns = ({endpoint, orderid, language, deleteProduct}) => {

  const orderColumnsBase = [
    {
      label: 'Réf. catalogue',
      attribute: 'product.reference',
      disableFilters: true,
      Footer: 'Total',
    },
    {
      label: 'Désignation',
      attribute: item => `${item.product.description} ${item.product.description_2}`,
    },
    {
      label: 'Quantité',
      attribute: 'quantity',
      Cell: UpdateCell,
    },
    {
      label: 'Poids',
      attribute: 'total_weight',
      Footer: FooterTotalWeight,

    },
    {
      label: 'Prix catalogue',
      attribute: v => localeMoneyFormat({lang: language, value: v.catalog_price}),
      sortType: 'number',
    },
    {
      label: 'Remise',
      attribute: v => formatPercent(v.discount),
      sortType: 'number',
    },
    {
      label: 'Votre prix',
      attribute: v => localeMoneyFormat({lang: language, value: v.net_price}),
      sortType: 'number',
    },
    {
      label: 'Total',
      attribute: v => localeMoneyFormat({lang: language, value: v.total_amount}),
      sortType: 'number',
      Footer: FooterTotalPrice,
    },

  ]

  const deleteItem = {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {row}}) => (
      <ToTheBin onClick={() => {
        deleteProduct({endpoint, orderid, idItem: row.original._id})
      }}/>
    ),
  }

  return deleteProduct ? [...orderColumnsBase, deleteItem] : orderColumnsBase
}

const ordersColumns = ({endpoint, language, deleteOrder}) => [
  {
    label: 'Date commande',
    attribute: 'creation_date',
    Cell: ({cell: {value}}) => new Date(value).toLocaleString(),
    sortType: datetime,
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {
    label: 'Client',
    attribute: 'company.name',
  },
  {
    label: 'Référence',
    attribute: 'reference',
  },
  {
    label: 'Quantité',
    attribute: 'total_quantity',
  },
  {
    label: 'Poids total',
    attribute: 'total_weight',
    Cell: ({value}) => `${value} kg`,
  },
  {
    label: 'Détails',
    attribute: '_id',
    Cell: ({value}) => (<Link href={`/edi/orders/view/${value}`}>voir</Link>),
  },
  {
    label: 'Prix total',
    attribute: 'total_amount',
    Cell: ({value}) => localeMoneyFormat({lang: language, value}),
  },
  {
    label: 'Statut',
    attribute: 'status',
    Cell: ({value}) => <OrderStatus status={value} />,
  },
  {
    label: 'Recommander',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {row}}) => (
      <ToTheBin onClick={() => {
        deleteOrder({endpoint, orderid: row.original._id})
      }}/>
    ),
  },
]

const quotationColumns = ({language, deleteProduct}) => [
  {
    label: 'Réf. catalogue',
    attribute: 'product.reference',
    Footer: 'Total',
  },
  {
    label: 'Désignation',
    attribute: item => `${item.product.description} ${item.product.description_2}`,
  },
  {
    label: 'Quantité',
    attribute: 'quantity',
    Cell: UpdateCell,
  },
  {
    label: 'Poids',
    attribute: 'total_weight',
    Footer: FooterTotalWeight,
  },
  {
    label: 'Prix catalogue',
    attribute: 'catalog_price',
    Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
    sortType: 'number',
  },
  {
    label: 'Remise',
    attribute: v => formatPercent(v.discount),
    sortType: 'number',
  },
  {
    label: 'Votre prix',
    attribute: v => localeMoneyFormat({lang: language, value: v.net_price}),
    sortType: 'number',
  },
  {
    label: 'Total',
    attribute: v => localeMoneyFormat({lang: language, value: v.total_amount}),
    sortType: 'number',
    Footer: data => FooterTotalPrice(data, language),
  },
  {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {value}}) => (
      <ToTheBin onClick={() => {
        deleteProduct({idItem: value})
      }}/>
    ),
  },
]

const quotationsColumns = ({language, deleteProduct}) => [
  {
    label: 'Date commande',
    attribute: 'creation_date',
    Cell: ({cell: {value}}) => <div>{new Date(value).toLocaleString()}</div>,
    sortType: 'datetime',
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {
    label: 'Client',
    attribute: 'company.name',
  },
  {
    label: 'Référence',
    attribute: 'reference',
  },
  {
    label: 'Poids total',
    attribute: 'total_weight',
  },
  {
    label: 'Frais de livraison',
    attribute: 'shipping_fee',
  },
  {
    label: 'Montant total',
    attribute: 'total_amount',
  },
  {
    label: 'Statut',
    attribute: 'status',
  },
  {
    label: 'Détails',
    attribute: '_id',
    Cell: ({value}) => (<Link href={`/edi/quotations/view/${value}`}>voir</Link>),
  },
  {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: tableProps => (
      <ToTheBin onClick={() => {
        const dataCopy = [...data]
        dataCopy.splice(tableProps.row.index, 1)
        setData(dataCopy)
      }}/>
    ),
  },
]

const accountsColumns = ({language}) => [
  {
    label: 'Prénom',
    attribute: 'firstname',
  },
  {
    label: 'Nom',
    attribute: 'name',
  },
  {
    label: 'Email',
    attribute: 'email',
  },
  {
    label: 'Société',
    attribute: 'company.name',
  },
  {
    label: 'Client(s)',
    attribute: u => u.companies.map(u => u.name).join(','),
  },
  {
    label: 'Roles',
    attribute: u => u.roles.map(r => ROLES[r]).join(','),
  },
]

const productsColumns = ({language}) => [
  {label: 'Code article', attribute: 'reference'},
  {label: 'Description', attribute: 'description'},
  {label: 'Description 2', attribute: 'description_2'},
  {label: 'Groupe', attribute: 'group'},
  {label: 'Famille', attribute: 'family'},
  {label: 'Stock', attribute: 'stock'},
  {label: 'Poids', attribute: 'weight'},
]

const shipratesColumns = ({language}) => [
  {label: 'Code postal', attribute: 'zipcode'},
  {label: 'Département', attribute: 'province'},
  {label: 'Express', attribute: 'express', Cell: ({cell: {value}}) => (value ? 'Oui' : 'Non')},
  {label: 'Poids minimum', attribute: 'min_weight'},
  {label: 'Poids maximum', attribute: 'max_weight'},
  {label: 'Forfait', attribute: 'fixed_price'},
  {label: 'Par kg', attribute: 'per_kg_price'},
]

const pricesColumns = ({language}) => [
  {label: 'Liste', attribute: 'name'},
  {label: 'Réference', attribute: 'reference'},
  {label: 'Tarif', attribute: 'price'},
]

const HandledOrderDescription = order => {
  return (
    <div alignItems='left'>
      <h1>{order?.address?.label} par {order.user.full_name}</h1>
      <div>Numéro de commande: {order.reference}</div>
      <div>Date de commande: {order.creation_date}</div>
    </div>
  )
}

const HandledOrderStatus = order => {
  return (
    <div alignItems='left'>
      <h1>Status de la commande</h1>
      <div>{order.status}</div>
      <PleasantButton>Voir la commande</PleasantButton>
    </div>
  )
}

const ConfirmHandledValidation = ({onClick, children}) => (
  <PleasantButton
    rounded={'full'}
    bgColor={'#80b150'}
    textColor={'#fff'}
    borderColor={'1px solid #80b150'}
    onClick={onClick}
  >{children}</PleasantButton>
)

const ConfirmPartialHandledValidation = ({onClick, children}) => {
  
  return (<PleasantButton
    rounded={'full'}
    bgColor={'#fff'}
    textColor={'var(--black)'}
    borderColor={'1px solid #80b150'}
    onClick={onClick}
  >
    {children}
  </PleasantButton>
  )
}

const HandleValidationStatusCell = ({status, endpoint, id, handleValidation, filter}) => {
  
  const displayPartialButton = status==VALID
  const displayFullButton = status==VALID || status == PARTIALLY_HANDLED
  return <div className='flex items-center flex-col gap-y-3'>
    {displayFullButton && <ConfirmHandledValidation onClick={() => {
      if (window.confirm('Êtes-vous sûr(e) ?')) {
        handleValidation({endpoint, orderid: id, filter, status: true})
      }
    }
    }>Commande traitée</ConfirmHandledValidation>}
    {displayPartialButton && <ConfirmPartialHandledValidation onClick={() => handleValidation({endpoint, orderid: id, filter, status: false})}>Partiellement traitée</ConfirmPartialHandledValidation>}
  </div>
}

const handledOrdersColumns = ({endpoint, handleValidation = null, filter = null}) => [
  {
    label: 'Date commande',
    attribute: 'creation_date',
    Cell: ({cell: {value}}) => new Date(value).toLocaleString(),
    sortType: datetime,
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {
    label: 'Client',
    attribute: v => v.company.full_name,
  },
  {
    label: 'Ref. commande',
    attribute: 'reference',
  },
  {
    label: 'Détails',
    attribute: '_id',
    Cell: ({value}) => (<Link href={`/edi/orders/view/${value}`}>voir</Link>),
  },
  {
    label: 'Statut',
    attribute: 'status',
    Cell: ({value}) => <OrderStatus status={value} />,
  },
  {
    label: 'Validation',
    attribute: v => v,
    Cell: ({value}) => (<HandleValidationStatusCell status={value.status} handleValidation={handleValidation} endpoint={endpoint} id={value._id} filter={filter} />),
  },
]
module.exports={orderColumns, ordersColumns, quotationColumns, quotationsColumns,
  accountsColumns, productsColumns, shipratesColumns, handledOrdersColumns, pricesColumns}
