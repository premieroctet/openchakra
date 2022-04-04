import React, {useMemo, useState, useEffect, useCallback} from 'react'
import AddArticle from './AddArticle'
import ImportExcelFile from './ImportExcelFile'
import {DateRangeColumnFilter} from '../../components/Table/TableFilter'
import Table from '../Table/Table'
import EditableCell from '../Table/EditableCell'
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

  const drawTable = ({items}) => {
    const newSet = items.map(item => {

      const {
        _id,
        product,
        discount,
        quantity,
        catalog_price,
      } = item
      
      const {
        reference,
        description,
        description_2,
        family,
        weight,
      } = product
  
      const articleToAdd = {
        product_ref: reference,
        product_name: `${description}, ${description_2}`,
        product_quantity: quantity,
        product_weight: weight,
        product_price: catalog_price,
        product_discount: discount,
        product_totalprice: 38.93,
        product_delete: _id,
      }
      
      return articleToAdd
    })
    setData(newSet)
  }

  const createOrderId = useCallback(async() => {
    const postData = new FormData()
    postData.append('user', dataToken)

    
    const {_id} = await client('myAlfred/api/orders', {'data': dataToken, token: getPureAuthToken()})
      .catch(e => console.error(e, `Can't create an order`))
    
    setOrderId(_id)
    
  }, [dataToken, setOrderId])

  const getOrderId = useCallback(async() => {
    
    const currentOrder = await client(`myAlfred/api/orders/${orderID}`, {token: getPureAuthToken()})
      .catch(e => console.error(e, `Can't get an order`))

    // drawTable(currentOrder)
    
  }, [orderID])
  

  // useEffect(() => {
  //   console.log('lang')
  //   setLanguage(Navigator.language)
  // }, [language])
  
  useEffect(() => {
    if (!orderID) {
      createOrderId()
    }
    else {
      getOrderId(orderID)
    }
  }, [orderID, createOrderId, getOrderId])

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

  const checkProduct = async({item, qty}) => {

  }

  const AddProduct = async({item, qty}) => {
    const {
      _id,
    } = item
    
    
    const afterNewProduct = await client(`myAlfred/api/orders/${orderID}/items`, {data: {product: _id, quantity: qty}, token: getPureAuthToken(), method: 'PUT'})
      .catch(e => console.error(`Can't add product ${e}`))
      
    getOrderId(orderID)
    
  }


  return (<>
    <ImportExcelFile />
    <AddArticle checkProduct={checkProduct} addProduct={AddProduct} />
    <Table data={data} columns={columns} updateMyData={updateMyData} />
  </>
  )
}

export default OrderCreate
