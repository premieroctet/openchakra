import React, {useMemo, useCallback} from 'react'
import {client} from '../utils/client'
import {
  BASEPATH_EDI,
  API_PATH,
  ORDER_COMPLETE,
  ORDER_CREATED,
  ORDER_FULFILLED,
  ORDER_VALID,
  ORDER_PARTIALLY_HANDLED,
  ORDER_HANDLED,
  QUOTATION_CREATED,
  QUOTATION_FULFILLED,
  QUOTATION_COMPLETE,
  QUOTATION_VALID,
  QUOTATION_PARTIALLY_HANDLED,
  QUOTATION_HANDLED,
} from '../utils/consts'
const lodash=require('lodash')
const {snackBarError, snackBarSuccess} = require('../utils/notifications')


const withEdiRequest = (Component = null) => {
  
  class withEdiRequest extends React.Component {
  
    constructor(props) {
      super(props)
    }

    createOrderId = async({endpoint, status, user_id}) => {
      if (status !== ORDER_COMPLETE) { // Prevent order creation juste after submitting an order
        return await client(`${API_PATH}/${endpoint}`, {data: {user: user_id}})
          .then(data => data)
          .catch(e => console.error(e, `Can't create ${endpoint}`))
      }
      return false
    }
    
    getContentFrom = async({endpoint, orderid}) => {
      if (orderid) {
        return await client(`${API_PATH}/${endpoint}/${orderid}`)
          .then(data => data)
          .catch(err => {
            snackBarError(err)
            return []
          })
      }
    }
  
  
    addProduct = async({endpoint, orderid, item, qty, replace = false}) => {
      if (!item) { return }
      
      const {
        _id,
      } = item
      
      await client(`${API_PATH}/${endpoint}/${orderid}/items`, {data: {product: _id, quantity: qty, replace}, method: 'PUT'})
        .then(() => this.getContentFrom(orderid))
        .catch(() => {
          console.error(`Can't add product`)
          return false
        })
    }
    
    deleteProduct = async({endpoint, orderid, idItem}) => {
      if (!idItem) { return }
  
      await client(`${API_PATH}/${endpoint}/${orderid}/items/${idItem}`, {method: 'DELETE'})
        .then(() => this.getContentFrom(orderID))
        .catch(e => console.error(`Can't delete product ${e}`))
    }
  
    // bind address, shipping info and ref to the current order/quotation
    validateAddress = async({endpoint, orderid, state}) => {
      e.preventDefault()
  
      await client(`${API_PATH}/${endpoint}/${orderid}`, {data: {address: state.address, reference: state.reference, shipping_mode: state.shippingOption}, method: 'PUT'})
        .then(() => {
          this.getContentFrom(orderID)
        })
        .catch(e => {
          console.error(`Can't bind address to order/quotation`, e)
          return {errors: e}
        })
    }
  
    resetAddress = async({endpoint, orderid}) => {
      
      await client(`${API_PATH}/${endpoint}/${orderid}/rewrite`, {method: 'PUT'})
        .then(res => res)
        .catch(e => {
          console.error(`Can't unbind address to order/quotation`, e)
          return {errors: e}
        })
  
    }
  
    submitOrder = async({endpoint, orderid}) => {
  
      await client(`${API_PATH}/${endpoint}/${orderid}/validate`, {method: 'POST'})
        .then(() => {
          return true
        })
        .catch(() => {
          console.error(`Didn't submit order`)
          snackBarError(`Problème d'enregistrement`)
        })

      return false
    }

    render() {
      
      return (
        <Component
          createOrderId={this.createOrderId}
          getContentFrom={this.getContentFrom}
          addProduct={this.addProduct}
          deleteProduct={this.deleteProduct}
          validateAddress={this.validateAddress}
          resetAddress={this.resetAddress}
          submitOrder={this.submitOrder}
          {...this.props}
        />
      )
    }
  }

  return withEdiRequest
}

module.exports=withEdiRequest
