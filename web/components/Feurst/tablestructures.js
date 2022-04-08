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
    Header: 'Réf. catalogue',
    accessor: 'product.reference',
  },
  {
    Header: 'Désignation',
    accessor: item => `${item.product.description} ${item.product.description_2}`,
  },
  {
    Header: 'Quantité',
    accessor: 'quantity',
    Cell: EditableCell,
  },
  {
    Header: 'Poids',
    accessor: 'product.weight',
  },
  {
    Header: 'Prix catalogue',
    accessor: 'catalog_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
  },
  {
    Header: 'Remise',
    accessor: 'discount',
    sortType: 'number',
  },
  {
    Header: 'Votre prix',
    accessor: 'target_price',
    sortType: 'number',
  },
  {
    Header: '',
    id: 'product_delete',
    accessor: 'product_delete',
    Cell: ({cell: {value}}) => (
      <ToTheBin onClick={() => {
        deleteProduct({idItem: value})
      }}/>
    ),
  },
]

const ordersColumns = ({language, deleteProduct}) => [
  {
    Header: 'Date commande',
    accessor: 'creation_date',
    Cell: ({cell: {value}}) => <div>{new Date(value).toLocaleString()}</div>,
    sortType: 'datetime',
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {
    Header: 'Référence',
    accessor: 'reference',
  },
  {
    Header: 'Poids total',
    accessor: 'total_weight',
  },
  {
    Header: 'Frais de livraison',
    accessor: 'shipping_fee',
  },
  {
    Header: 'Montant total',
    accessor: 'total_amount',
  },
  {
    Header: '',
    id: 'product_delete',
    accessor: 'product_delete',
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
    Header: 'Réf. catalogue',
    accessor: 'product.reference',
  },
  {
    Header: 'Désignation',
    accessor: item => `${item.product.description} ${item.product.description_2}`,
  },
  {
    Header: 'Quantité',
    accessor: 'quantity',
    Cell: EditableCell,
  },
  {
    Header: 'Poids',
    accessor: 'product.weight',
  },
  {
    Header: 'Prix catalogue',
    accessor: 'catalog_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
  },
  {
    Header: 'Remise',
    accessor: 'discount',
    sortType: 'number',
  },
  {
    Header: 'Votre prix',
    accessor: 'target_price',
    sortType: 'number',
  },
  {
    Header: '',
    id: 'product_delete',
    accessor: 'product_delete',
    Cell: ({cell: {value}}) => (
      <ToTheBin onClick={() => {
        deleteProduct({idItem: value})
      }}/>
    ),
  },
]

const quotationsColumns = ({language, deleteProduct}) => [
  {
    Header: 'Date commande',
    accessor: 'creation_date',
    Cell: ({cell: {value}}) => <div>{new Date(value).toLocaleString()}</div>,
    sortType: 'datetime',
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {
    Header: 'Référence',
    accessor: 'reference',
  },
  {
    Header: 'Poids total',
    accessor: 'total_weight',
  },
  {
    Header: 'Frais de livraison',
    accessor: 'shipping_fee',
  },
  {
    Header: 'Montant total',
    accessor: 'total_amount',
  },
  {
    Header: '',
    id: 'product_delete',
    accessor: 'product_delete',
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
