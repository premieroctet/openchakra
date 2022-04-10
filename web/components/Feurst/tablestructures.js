import React from 'react'
import EditableCell from '../Table/EditableCell'
const moment = require('moment')
const {DateRangeColumnFilter} = require('../Table/TableFilter')

function moneyFormatter({lang, value}) {
  return new Intl.NumberFormat(lang, {style: 'currency', currency: 'EUR'}).format(value) || ''
}

const ToTheBin = props => (
  <button {...props}>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)

const orderColumns = ({language, deleteProduct}) => [
  {
    label: 'Réf. catalogue',
    attribute: 'product.reference',
  },
  {
    label: 'Désignation',
    attribute: item => `${item.product.description} ${item.product.description_2}`,
  },
  {
    label: 'Quantité',
    attribute: 'quantity',
    Cell: EditableCell,
  },
  {
    label: 'Poids',
    attribute: 'product.weight',
  },
  {
    label: 'Prix catalogue',
    attribute: 'catalog_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
  },
  {
    label: 'Remise',
    attribute: 'discount',
    Cell: ({cell: {value}}) => `${value}%`,
    sortType: 'number',
  },
  {
    label: 'Votre prix',
    attribute: 'target_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
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

const ordersColumns = ({language, deleteProduct}) => [
  {
    label: 'Date commande',
    attribute: 'creation_date',
    Cell: ({cell: {value}}) => <div>{new Date(value).toLocaleString()}</div>,
    sortType: 'datetime',
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
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

const quotationColumns = ({language, deleteProduct}) => [
  {
    label: 'Réf. catalogue',
    attribute: 'product.reference',
  },
  {
    label: 'Désignation',
    attribute: item => `${item.product.description} ${item.product.description_2}`,
  },
  {
    label: 'Quantité',
    attribute: 'quantity',
    Cell: EditableCell,
  },
  {
    label: 'Poids',
    attribute: 'product.weight',
  },
  {
    label: 'Prix catalogue',
    attribute: 'catalog_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
  },
  {
    label: 'Remise',
    attribute: 'discount',
    sortType: 'number',
  },
  {
    label: 'Votre prix',
    attribute: 'target_price',
    sortType: 'number',
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

export {orderColumns, ordersColumns, quotationColumns, quotationsColumns}
