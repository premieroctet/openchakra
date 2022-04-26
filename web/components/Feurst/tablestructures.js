import React from 'react'
import EditableCell from '../Table/EditableCell'
import {localeMoneyFormat} from '../../utils/converters'
const {ROLES} = require('../../utils/consts')
const {DateRangeColumnFilter} = require('../Table/TableFilter')
const {PleasantButton} = require('./Button')

const ToTheBin = props => (
  <button {...props}>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)

const orderColumns = ({language, deleteProduct}) => [
  {
    label: 'Réf. catalogue',
    attribute: 'product.reference',
    disableFilters: true,
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
    attribute: 'total_weight',
  },
  {
    label: 'Prix catalogue',
    attribute: 'catalog_price',
    Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
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
    Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
    sortType: 'number',
  },
  {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {row}}) => (
      <ToTheBin onClick={() => {
        deleteProduct({idItem: row.original._id})
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
    label: 'Créateur',
    attribute: 'user.full_name',
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
  },
  {
    label: 'Prix total',
    attribute: 'shipping_fee',
  },
  {
    label: 'Détails',
    attribute: 'details',
  },
  {
    label: 'Statut',
    attribute: 'status',
  },
  {
    label: 'Recommander',
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
    Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
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
    attribute: u => u.companies.map(u => (<div>{u.name}</div>)),
  },
  {
    label: 'Roles',
    attribute: 'roles',
    Cell: ({cell: {value}}) => value.map(r => ROLES[r]).join(','),
  },
]

const productsColumns = ({language}) => [
  {label: 'Code article', attribute: 'reference'},
  {label: 'Description', attribute: 'description'},
  {label: 'Description 2', attribute: 'description_2'},
  {label: 'Groupe', attribute: 'group'},
  {label: 'Ligne de production', attribute: 'production_line'},
  {label: 'Famille', attribute: 'family'},
  {label: 'Tarif', attribute: 'price'},
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

const HandledOrderDescription = order => {
  return (
    <div alignItems='left'>
      <h1>{order.address.label} par {order.user.full_name}</h1>
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

const handledOrdersColumns = ({language}) => [
  {label: 'Description', attribute: o => o, Cell: ({cell: {value}}) => HandledOrderDescription(value)},
  {label: 'Etat', attribute: o => o, Cell: ({cell: {value}}) => HandledOrderStatus(value)},

]
module.exports={orderColumns, ordersColumns, quotationColumns, quotationsColumns,
  accountsColumns, productsColumns, shipratesColumns, handledOrdersColumns}
