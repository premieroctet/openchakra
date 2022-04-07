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

const orderColumns = ({language, data, setData}) => [
  {
    Header: 'Réf. catalogue',
    accessor: 'product_ref',
  },
  {
    Header: 'Désignation',
    accessor: 'product_name',
  },
  {
    Header: 'Quantité',
    accessor: 'product_quantity',
    Cell: EditableCell,
  },
  {
    Header: 'Poids',
    accessor: 'product_weight',
  },
  {
    Header: 'Prix catalogue',
    accessor: 'product_price',
    Cell: ({cell: {value}}) => moneyFormatter({lang: language, value}),
    sortType: 'number',
  },
  {
    Header: 'Remise',
    accessor: 'product_discount',
  },
  {
    Header: 'Votre prix',
    accessor: 'product_totalprice',
    sortType: 'number',
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
 
export {orderColumns}
