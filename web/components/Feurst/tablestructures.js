import React from 'react'
import EditableCell from '../Table/EditableCell'

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

export {orderColumns}
