const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const axios = require('axios')
const {setAxiosAuthentication} = require('../../utils/authentication')
import React, {useState, useEffect} from 'react'
const lodash=require('lodash')

const OrdersTest = props => {

  const [products, setProducts]=useState([])
  const [addresses, setAddresses]=useState([])
  const [orders, setOrders]=useState([])
  const [quotations, setQuotations]=useState([])
  // Address
  const [address, setAddress]=useState([])
  const [city, setCity]=useState([])
  const [zip_code, setZipCode]=useState([])
  const [country, setCountry]=useState([])

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
  }, [])

  const createOrder = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/orders')
      .then(order => {
        return axios.put(`/myAlfred/api/orders/${order._id}/items`, {product_id: '6241d1af4114df91590fa72b', quantity: 2})
      })
      .then(() => {
        setOrders([]); snackBarSuccess('ok')
      })
      .catch(err => snackBarError(err.response.data))
  }

  const createQuotation = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/quotations')
      .then(() => { setQuotations([]); snackBarSuccess('ok') })
      .catch(err => snackBarError(err.response.data))
  }

  const createAddress = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/addresses', {address, city, zip_code, country})
      .then(() => { setAddresses([]); snackBarSuccess('ok') })
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
      <ul>
        { products.map(p => (
          <li>{JSON.stringify(p)}</li>
        ))}
      </ul>
      <h2>Devis <button onClick={createQuotation}>Créer</button></h2>
      <ul>
        { quotations.map(o => (
          <li>{JSON.stringify(o)}</li>
        ))}
      </ul>
      <h2>Commandes <button onClick={createOrder}>Créer</button></h2>
      <ul>
        { orders.map(q => (
          <li>{JSON.stringify(q)}</li>
        ))}
      </ul>
    </>
  )
}

module.exports=OrdersTest
