
import React, {useMemo} from 'react'
import Link from 'next/link'
import lodash from 'lodash'
import {isFeurstUser} from '../../server/utils/userAccess'
import {API_PATH} from '../../utils/consts'
import {
  BASEPATH_EDI,
  FEURST_IMG_PATH,
  ROLES,
} from '../../utils/feurst/consts'
import {formatAddress, formatPercent} from '../../utils/text'
import {localeMoneyFormat} from '../../utils/converters'
import {DateRangeColumnFilter} from '../Table/TableFilter'
import {simulateDownload} from '../utils/simulateDownload'
import EMail from './Email'
import UpdateCellQuantity from './UpdateCellQuantity'
import UpdateSeller from './updateSeller'
import UpdateCellPrice from './UpdateCellPrice'
import {ToTheBin, ToTheBinWithAlert} from './ToTheBin'
import OrderStatus from './OrderStatus'


const downloadAction = ({endpoint, orderid, filename}) => <button className='flex justify-center items-center' onClick={() => simulateDownload({url: `${API_PATH}/${endpoint}/${orderid}/export`, filename: `${filename}`})} >
  <img width={20} height={20} src={`${FEURST_IMG_PATH}/xls-icon.png`} /> Télécharger
</button>

// to order by datetime
const datetime = (a, b) => {
  let a1 = new Date(a).getTime()
  let b1 = new Date(b).getTime()
  if(a1<b1) { return 1 }
  else if(a1>b1) { return -1 }
  return 0
}

const formatDate = (date, lang) => {
  let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  return date.toLocaleString(lang, options)
}

const formatWeight = (val, lang='fr-FR') => {
  return `${val.toLocaleString(lang, {style: 'decimal', maximumFractionDigits: 2})} kg`
}

const FooterTotalWeight = info => {
  const total = useMemo(
    () =>
      info.rows.reduce((sum, row) => row.values.total_weight + sum, 0),
    [info.rows],
  )

  return <>{formatWeight(total)}</>
}

const FooterTotalPrice = ({data, language = null}) => {
  const total = useMemo(
    () =>
      data.rows.reduce((sum, row) => row.original.total_amount + sum, 0),
    [data.rows],
  )

  return <>{localeMoneyFormat({lang: language, value: total})}</>
}


const articleRef = {
  label: 'Réf. article',
  attribute: 'product.reference',
  Footer: 'Total',
}

const articleName = {
  label: 'Désignation',
  attribute: item => `${item.product.description} ${item.product.description_2}`,
}

const companyName = {
  label: 'Client',
  attribute: 'company.name',
}


const orderColumns = ({endpoint, orderid, language, canUpdateQuantity, deleteProduct}) => {

  const orderColumnsBase = [
    {...articleRef},
    {...articleName},
    {
      label: 'Quantité',
      attribute: 'quantity',
      Cell: canUpdateQuantity ? UpdateCellQuantity : ({value}) => value,
      disableFilters: true,
    },
    {
      label: 'Poids',
      attribute: 'total_weight',
      Cell: ({value}) => formatWeight(value, language),
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
      Footer: data => <FooterTotalPrice data={data} language={language} />,
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

const ordersColumns = ({endpoint, language, deleteOrder, exportFile}) => {


  const ordersColumnsBase = [
    {
      label: 'Date commande',
      attribute: 'creation_date',
      Cell: ({cell: {value}}) => formatDate(new Date(value), language),
      sortType: datetime,
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween', /* Custom Filter Type */
    },
    {...companyName},
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
      Cell: ({value}) => formatWeight(value, language),
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
      attribute: v => { return v },
      Cell: ({value}) => <OrderStatus status={value.status} label={value.status_label} />,
    },
  ]


  const deleteItem = deleteOrder ? {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {row}}) => (
      <ToTheBinWithAlert row={row} deleteIt={() => {
        deleteOrder({endpoint, orderid: row.original._id})
      }} />
    ),
  }: null

  const exportCol = exportFile ? {
    label: 'Exporter',
    attribute: v => { return v },
    Cell: ({value}) => downloadAction({endpoint, orderid: value._id, filename: value.filename}),
  } : null

  const ordersColumnsFinal = [...ordersColumnsBase, exportCol, deleteItem].filter(elem => elem !== null)

  return ordersColumnsFinal
}

const quotationColumns = ({endpoint, orderid, language, deleteProduct, canUpdateQuantity, canUpdatePrice}) => {

  const quotationColumnsBase = [
    {...articleRef},
    {...articleName},
    {
      label: 'Quantité',
      attribute: 'quantity',
      Cell: canUpdateQuantity ? UpdateCellQuantity : ({value}) => value,
    },
    {
      label: 'Poids',
      attribute: 'total_weight',
      Cell: ({value}) => formatWeight(value, language),
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
      attribute: 'net_price',
      sortType: 'number',
      Cell: canUpdatePrice ? UpdateCellPrice : ({value}) => <div>{localeMoneyFormat({lang: language, value})}</div>,
    },
    {
      label: 'Total',
      attribute: v => localeMoneyFormat({lang: language, value: v.total_amount}),
      sortType: 'number',
      Footer: data => <FooterTotalPrice data={data} language={language} />,
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

  return deleteProduct ? [...quotationColumnsBase, deleteItem] : quotationColumnsBase
}

const quotationsColumns = ({endpoint, language, deleteOrder}) => {

  const quotationsColumnsBase = [
    {
      label: 'Date commande',
      attribute: 'creation_date',
      Cell: ({cell: {value}}) => formatDate(new Date(value), language),
      sortType: 'datetime',
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween', /* Custom Filter Type */
    },
    {...companyName},
    {
      label: 'Référence',
      attribute: 'reference',
    },
    {
      label: 'Poids total',
      attribute: 'total_weight',
      Cell: ({value}) => formatWeight(value, language),
    },
    {
      label: 'Frais de livraison',
      attribute: 'shipping_fee',
      Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
    },
    {
      label: 'Montant total',
      attribute: 'total_amount',
      Cell: ({cell: {value}}) => localeMoneyFormat({lang: language, value}),
    },
    {
      label: 'Statut',
      attribute: v => { return v },
      Cell: ({value}) => <OrderStatus status={value.status} label={value.status_label} />,
    },
    {
      label: 'Détails',
      attribute: '_id',
      Cell: ({value}) => (<Link href={`/edi/quotations/view/${value}`}>voir</Link>),
    },

  ]

  const deleteItem = {
    label: '',
    id: 'product_delete',
    attribute: 'product_delete',
    Cell: ({cell: {row}}) => (
      <ToTheBinWithAlert row={row} deleteIt={() => {
        deleteOrder({endpoint, orderid: row.original._id})
      }} />
    ),
  }


  return deleteOrder ? [...quotationsColumnsBase, deleteItem] : quotationsColumnsBase

}

const accountsColumns = ({language, endpoint, deleteUser, updateEmail}) => {

  return [
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
      attribute: user => user,
      Cell: ({value}) => (isFeurstUser(value) ?
        <EMail value={value.email} onChange={email => updateEmail({endpoint, userId: value._id, email})} />
        :
        <>{value.email}</>),
    },
    {
      label: 'Société',
      attribute: 'company.name',
    },
    {
      label: 'Délégué commercial',
      attribute: u => u.company?.sales_representative?.full_name,
    },
    {
      label: 'Rôle',
      attribute: u => u.roles.map(r => ROLES[r]).join(','),
    },
    {
      label: 'Date de création',
      attribute: 'creation_date',
      Cell: ({cell: {value}}) => formatDate(new Date(value), language),
      sortType: datetime,
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween', /* Custom Filter Type */
    },
    {
      label: 'Supprimer',
      attribute: 'active',
      Cell: ({cell: {row}}) => {
        return (
          <ToTheBinWithAlert row={row} deleteIt={() => {
            deleteUser({endpoint, userid: row.original._id})
          }} />
        )
      },
    },
  ]
}

const companiesColumns = ({/** language,*/ updateSeller, sellers}) => {

  const baseCompaniesCols = [
    {
      label: 'Nom',
      attribute: 'name',
    },
    {
      label: 'Administrateur',
      attribute: company => [company.administrator?.full_name, company.addresses[0]?.phone],
      Cell: ({value}) => <>{value.map(v => (<div>{v}</div>))}</>,
    },
    {
      label: 'Adresse',
      attribute: company => formatAddress(company?.addresses[0]), // formatAddress(company?.addresses[0]) || '',
    },
    {
      label: 'Tarifs',
      attribute: company => Object.values(lodash.pick(company, ['catalog_prices', 'net_prices'])).join('/'), // formatAddress(company?.addresses[0]) || '',
    },
    {
      label: 'Franco',
      attribute: 'carriage_paid',
    },
  ]

  const columnSeller = [{
    label: 'Commercial',
    attribute: 'sales_representative',
    Cell: ({value}) => value?.full_name || '',
  }]

  const columnUpdateSeller = [{
    label: 'Commercial',
    attribute: seller => seller.sales_representative,
    Cell: props => <UpdateSeller updateSeller={updateSeller} sellers={sellers} {...props}/>,
  }]

  return updateSeller ? [...baseCompaniesCols, ...columnUpdateSeller] : [...baseCompaniesCols, ...columnSeller]

}

const productsColumns = ({/** language*/}) => [
  {label: 'Code article', attribute: 'reference'},
  {label: 'Description', attribute: 'description'},
  {label: 'Description 2', attribute: 'description_2'},
  {label: 'Groupe', attribute: 'group'},
  {label: 'Famille', attribute: 'family'},
  {label: 'Stock', attribute: 'stock'},
  {label: 'Art. liés', attribute: v => v.components.length && v.components.map(c => c.reference).join(',') || ''},
  {label: 'Poids', attribute: 'weight'},
]

const shipratesColumns = ({/** language */}) => [
  {label: 'Code postal', attribute: 'zipcode'},
  {label: 'Département', attribute: 'province'},
  {label: 'Express', attribute: 'express', Cell: ({cell: {value}}) => (value ? 'Oui' : 'Non')},
  {label: 'Poids minimum', attribute: 'min_weight'},
  {label: 'Poids maximum', attribute: 'max_weight'},
  {label: 'Forfait', attribute: 'fixed_price'},
  {label: 'Par kg', attribute: 'per_kg_price'},
]

const pricesColumns = ({/** language */}) => [
  {label: 'Liste', attribute: 'name'},
  {label: 'Réference', attribute: 'reference'},
  {label: 'Tarif', attribute: 'price'},
]


const handledOrdersColumns = ({endpoint, language, exportFile /** , filter = null */}) => {

  const handledOrdersColumnsBase = [
    {
      label: 'Date commande',
      attribute: 'creation_date',
      Cell: ({cell: {value}}) => formatDate(new Date(value), language),
      sortType: datetime,
      Filter: DateRangeColumnFilter,
      filter: 'dateBetween', /* Custom Filter Type */
    },
    {...companyName},
    {
      label: 'Ref. commande',
      attribute: 'reference',
    },
    {
      label: 'Détails',
      attribute: '_id',
      Cell: ({value}) => (<Link href={`${BASEPATH_EDI}/${endpoint}/view/${value}`}>voir</Link>),
    },
    {
      label: 'Statut',
      attribute: v => { return v },
      Cell: ({value}) => <OrderStatus status={value.status} label={value.status_label} />,
    },
  ]


  const exportCol = {
    label: 'Exporter',
    attribute: v => { return v },
    Cell: ({value}) => downloadAction({endpoint, orderid: value._id, filename: value.filename}),
  }

  return exportFile ? [...handledOrdersColumnsBase, exportCol] : handledOrdersColumnsBase
}
const handledQuotationsColumns = ({language /** , endpoint, handleValidation = null, filter = null*/}) => [
  {
    label: 'Date',
    attribute: 'creation_date',
    Cell: ({cell: {value}}) => formatDate(new Date(value), language),
    sortType: datetime,
    Filter: DateRangeColumnFilter,
    filter: 'dateBetween', /* Custom Filter Type */
  },
  {...companyName},
  {
    label: 'Ref. devis',
    attribute: 'reference',
  },
  {
    label: 'Détails',
    attribute: '_id',
    Cell: ({value}) => (<Link href={`/edi/quotations/view/${value}`}>voir</Link>),
  },
  {
    label: 'Statut',
    attribute: v => { return v },
    Cell: ({value}) => <OrderStatus status={value.status} label={value.status_label} />,
  },
]
module.exports={orderColumns, ordersColumns, quotationColumns, quotationsColumns,
  accountsColumns, companiesColumns, productsColumns, shipratesColumns,
  handledOrdersColumns, handledQuotationsColumns, pricesColumns}
