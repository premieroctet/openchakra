import React, {useMemo, useState, useEffect} from 'react'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {DateRangeColumnFilter} from '../../components/Table/TableFilter'
import Table from '../Table/Table'
import EditableCell from '../Table/EditableCell'
import {
  getRole,
  getRoles,
} from '../../utils/context'
import {client} from '../../utils/client'
import axios from 'axios'
import {getPureAuthToken, getAuthToken} from '../../utils/authentication'
import useLocalStorageState from 'use-local-storage-state'


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
  const [orderID, setOrderId, {removeItem}] = useLocalStorageState('orderid', {defaultValue: null})
  const dataToken = getAuthToken()

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

  async function createOrderId() {
    const postData = new FormData()
    postData.append('user', dataToken)

    try {
      const {_id} = await client('myAlfred/api/orders', {'data': dataToken, token: getPureAuthToken()})
      setOrderId(_id)
    }
    catch(e) { console.error(e, 'Cant create an order') }
  }

  async function getOrderId() {
    try {
      const All = await client(`myAlfred/api/orders/${orderID}`, {token: getPureAuthToken()}) // TODO: Il me manque le user
      // Passage des infos de la commande
    }
    catch(e) { console.error(e, 'Cant create an order') }
  }
  
  useEffect(() => {
    setLanguage(Navigator.language)


  }, [language])

  useEffect(() => {

    if (!orderID) {
      createOrderId()
    }
    else {
      getOrderId(orderID)
    }
    

  }, [createOrderId, getOrderId, orderID])

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

  function checkProduct({item, qty}) {
    const {
      reference,
      description,
      description_2,
      weight,
    } = item

    const articleToAdd = {
      product_ref: reference,
      product_name: `${description}, ${description_2}`,
      product_quantity: qty,
      product_weight: weight,
      product_price: 2000,
      product_discount: 40,
      product_totalprice: 38.93,
      product_delete: '',
    }

    setData([...data, articleToAdd])
  }


  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} />
    <Table data={data} columns={columns} updateMyData={updateMyData} />
  </>
  )
}

export default OrderCreate
