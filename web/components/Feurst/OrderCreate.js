import React, {useMemo, useState, useEffect} from 'react'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {DateRangeColumnFilter} from '../../components/Table/TableFilter'
import Table from '../Table/Table'
import EditableCell from '../Table/EditableCell'


function moneyFormatter({lang, value}) {
  return new Intl.NumberFormat(lang, {style: 'currency', currency: 'EUR'}).format(value) || ''
}


const ToTheBin = props => (
  <button {...props}>
    <span role='image' alt="supprimer">🗑️</span>
  </button>
)

function makeData() {
  return [
    {
      order_date: new Date(2020, 1, 3),
      product_ref: 'TKNZZZ',
      product_name: 'TKN13 - PE',
      product_quantity: 4,
      product_weight: 1400,
      product_price: 65.87,
      product_discount: 40,
      product_totalprice: 46,
      product_delete: '',
    },
    {
      order_date: new Date(2022, 1),
      product_ref: 'TKNAAA',
      product_name: 'TKN13 - PT',
      product_quantity: 40,
      product_weight: 2700,
      product_price: 64.88,
      product_discount: 40,
      product_totalprice: 38.93,
      product_delete: '',
    },
    {
      order_date: new Date(2021, 1),
      product_ref: 'TKNBBB',
      product_name: 'TKN14 - PT',
      product_quantity: 21,
      product_weight: 21700,
      product_price: 165.57,
      product_discount: 40,
      product_totalprice: 38.93,
      product_delete: '',
    },
  ]
}

const OrderCreate = () => {

  const [data, setData] = useState(useMemo(() => makeData(), []))
  const [language, setLanguage] = useState('fr')

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      }),
    )
  }
  
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  const columns = useMemo(
    () => [
      {
        Header: 'Date commande',
        accessor: 'order_date',
        Cell: ({cell: {value}}) => <div>{value.toLocaleDateString()}</div>,
        sortType: 'datetime',
        Filter: DateRangeColumnFilter,
        filter: 'dateBetween', /* Custom Filter Type */
      },
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
    ],
    [data, language],
  )

  function checkProduct(e) {
    console.log(e)
  }


  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} />
    <Table data={data} columns={columns} updateMyData={updateMyData} />
  </>
  )
}

export default OrderCreate
