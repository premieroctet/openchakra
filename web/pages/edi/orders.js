import React, {useMemo} from 'react'
import Table from '../../components/Table/Table'

import '../../static/feurst.css'

const ToTheBin = () => (
  <button>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)

const Orders = ({}) => {

  const data = useMemo(
    () => [
      {
        product_ref: 'TKNZZZ',
        product_name: 'TKN13 - PE',
        product_quantity: 4,
        product_weight: 1400,
        product_price: 65.87,
        product_discount: 40,
        product_totalprice: 38.93,
        product_delete: <ToTheBin />,
      },
      {
        product_ref: 'TKNAAA',
        product_name: 'TKN13 - PT',
        product_quantity: 40,
        product_weight: 2700,
        product_price: 64.88,
        product_discount: 40,
        product_totalprice: 38.93,
        product_delete: <ToTheBin />,
      },
    ],
    [],
  )
  
  const columns = useMemo(
    () => [
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
      },
      {
        Header: 'Poids',
        accessor: 'product_weight',
      },
      {
        Header: 'Prix catalogue',
        accessor: 'product_price',
        Cell: ({cell: {value}}) => new Intl.NumberFormat({style: 'currency', currency: 'EUR'}).format(value) || '',
      },
      {
        Header: 'Remise',
        accessor: 'product_discount',
      },
      {
        Header: 'Votre prix',
        accessor: 'product_totalprice',
      },
      {
        Header: '',
        accessor: 'product_delete',
      },
    ],
    [],
  )
  
  return (<>
    <h2>Ici, on commande</h2>
    <Table data={data} columns={columns} />
  </>)
}

export default Orders
