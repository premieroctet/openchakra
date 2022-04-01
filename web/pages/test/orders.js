const {TextField} = require('@material-ui/core')

const {MenuItem, Select} = require('@material-ui/core')

const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const axios = require('axios')
const {setAxiosAuthentication} = require('../../utils/authentication')
import React, {useState, useEffect} from 'react'
const lodash=require('lodash')

const OrdersTest = props => {

  const [isToggled, setToggle]=useState(false)

  const [products, setProducts]=useState([])
  const [addresses, setAddresses]=useState([])
  const [orders, setOrders]=useState([])
  const [quotations, setQuotations]=useState([])
  // Address
  const [address, setAddress]=useState([])
  const [city, setCity]=useState([])
  const [zip_code, setZipCode]=useState([])
  const [country, setCountry]=useState([])
  const [order, setOrder]=useState(null)
  const [product, setProduct]=useState(null)
  const [quantity, setQuantity]=useState(0)
  const [item, setItem]=useState(0)

  useEffect(() => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/addresses')
      .then(result => setAddresses(result.data))
      .catch(err => snackBarError(err.response.data))
    axios.get('/myAlfred/api/products')
      .then(result => setProducts(result.data))
      .catch(err => snackBarError(err.response.data))
    axios.get('/myAlfred/api/orders')
      .then(result => setOrders(result.data))
      .catch(err => snackBarError(err.response.data))
    axios.get('/myAlfred/api/quotations')
      .then(result => setQuotations(result.data))
      .catch(err => snackBarError(err.response.data))
  }, [isToggled])

  const toggle = () => setToggle(!isToggled)

  const createOrder = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/orders')
      .then(res => {
        const order=res.data
        return axios.put(`/myAlfred/api/orders/${order._id}/items`, {product_id: '6241d1af4114df91590fa72b', quantity: 2})
      })
      .then(() => {
        toggle()
        snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  const createQuotation = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/quotations')
      .then(() => {
        toggle()
        snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  const createAddress = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/addresses', {address, city, zip_code, country})
      .then(() => {
        toggle()
        snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  const addItemToOrder = () => {
    setAxiosAuthentication()
    axios.put(`/myAlfred/api/orders/${order}/items`, {product: product, quantity: quantity})
      .then(() => {
        toggle()
        snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  const removeItemFromOrder = () => {
    setAxiosAuthentication()
    axios.delete(`/myAlfred/api/orders/${order.replace('6', '7')}/items/${item}`)
      .then(() => {
        toggle()
        snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  return (
    <>
      <h1>Tests d'imports</h1>
      <h2>Adresses <button onClick={createAddress}>Créer</button></h2>
      <h3>
      Adresse: <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} />
      Ville: <input type='text' value={city} onChange={ev => setCity(ev.target.value)} />
      Code postal: <input type='text' value={zip_code} onChange={ev => setZipCode(ev.target.value)} />
      Pays: <input type='text' value={country} onChange={ev => setCountry(ev.target.value)} />
      </h3>
      <ul>
        { addresses.map(a => (
          <li>{JSON.stringify(a)}</li>
        ))}
      </ul>
      <h2>Produits</h2>
      <Select
        name='product'
        value={product}
        onChange={ev => setProduct(ev.target.value)}
      >
        {products.map(o => (<MenuItem id={o._id} value={o._id} key={o._id}>{JSON.stringify(lodash.pick(o, '_id reference'.split(' ')))}</MenuItem>))}
      </Select>
      <h2>Devis <button onClick={createQuotation}>Créer</button><button onClick={createQuotation}>Créer</button></h2>
      <ul>
        { quotations.map(o => (
          <li>{JSON.stringify(o)}</li>
        ))}
      </ul>
      <h2>Commandes <button onClick={createOrder}>Créer</button><button disabled={!(order && product && quantity)} onClick={addItemToOrder}>Ajouter</button>
        Quantité<TextField type='number' value={quantity} onChange={ev => setQuantity(parseInt(ev.target.value))}/>
        {order && orders.find(order => order._id).items.length >0 &&
          <>
            <button onClick={removeItemFromOrder}>Supprimer ligne commande</button>
            <Select
              name='item'
              value={item}
              onChange={ev => setItem(ev.target.value)}
            >
              {orders.find(order => order._id).items.map(o => (<MenuItem id={o._id} value={o._id} key={o._id}>{JSON.stringify(lodash.pick(o, 'product quantity'.split(' ')))}</MenuItem>))}
            </Select>
          </>
        }
      </h2>
      <Select
        name='order'
        value={order}
        onChange={ev => setOrder(ev.target.value)}
      >
        {orders.map(o => (
          <MenuItem id={o._id} value={o._id} key={o._id}>
            {JSON.stringify({_id: o._id, items: o.items.map(it => lodash.pick(it, 'product quantity'.split(' ')))})}
          </MenuItem>))}
      </Select>
    </>
  )
}

module.exports=OrdersTest
