import React from 'react'
import {client} from '../utils/client'
import {
  API_PATH,
  ENDPOINTS,
  QUOTATION,
  ORDER_CREATED,
  HANDLED,
} from '../utils/feurst/consts'
import {snackBarError} from '../utils/notifications'


const withEdiRequest = (Component = null) => {

  class withEdiRequest extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        orders: [],
        items: [],
        reference: null,
        address: {},
        shippingOption: null,
        status: ORDER_CREATED,
        errors: null,
      }
    }

    createOrderId = async({endpoint, company}) => {
      return await client(`${API_PATH}/${endpoint}`, {data: {company}})
        .then(data => {
          this.setState({...this.state, data})
          return data
        })
        .catch(e => console.error(e, `Can't create ${endpoint}`))
    }

    getContentFrom = async({endpoint, orderid}) => {
      if (orderid) {
        return await client(`${API_PATH}/${endpoint}/${orderid}`)
          .then(data => {
            this.setState(data)
            return data
          })
          .catch(() => {
            snackBarError('Commande/devis non existant')
          })
      }
    }

    getList = async({endpoint, filter = null}) => {
      return await client(`${API_PATH}/${endpoint}`)
        .then(data => {
          if (filter) { data=data.filter(filter) }
          this.setState({...this.state, orders: data})
        })
        .catch(err => snackBarError(err?.msg))
    }

    deleteOrder = async({endpoint, orderid}) => {
      if (!orderid) { return }

      return await client(`${API_PATH}/${endpoint}/${orderid}`, {method: 'DELETE'})
        .then(() => this.getList({endpoint}))
        .catch(e => console.error(`Can't delete order`, e))
    }

    handleValidation = async({endpoint, orderid, status, filter = null}) => {
      
      return await client(`${API_PATH}/${endpoint}/${orderid}/handle`, {data: {total: status}, method: 'PUT'})
        .then(() => this.getList({endpoint, filter}))
        .catch(e => console.error(`Can't update status validation`, e))
    }


    addProduct = async({endpoint, orderid, item, quantity, replace = false, ...rest}) => {
      if (!item) { return }

      const {
        _id,
      } = item

      await client(`${API_PATH}/${endpoint}/${orderid}/items`, {data: {product: _id, quantity, replace, ...rest}, method: 'PUT'})
        .then(() => this.getContentFrom({endpoint, orderid}))
        .catch(errorMsg => {
          console.error(`Can't add product`)
          snackBarError(errorMsg?.message)
          return false
        })
    }

    deleteProduct = async({endpoint, orderid, idItem}) => {
      if (!idItem) { return }

      return await client(`${API_PATH}/${endpoint}/${orderid}/items/${idItem}`, {method: 'DELETE'})
        .then(() => this.getContentFrom({endpoint, orderid}))
        .catch(e => console.error(`Can't delete product`, e))
    }

    requestUpdate = items => {
      this.setState({...this.state, ...items})
    }

    // bind address, shipping info and ref to the current order/quotation
    validateAddress = async({endpoint, orderid, shipping}) => {

      return await client(`${API_PATH}/${endpoint}/${orderid}`, {data: {address: shipping.address, reference: shipping.reference, shipping_mode: shipping.shipping_mode}, method: 'PUT'})
        .then(() => {
          this.getContentFrom({endpoint, orderid})
        })
        .catch(e => {
          console.error(`Can't bind address to order/quotation`, e)
          return {errors: e}
        })
    }

    updateShippingFees = async({endpoint, orderid, shipping_fee}) => {

      return await client(`${API_PATH}/${endpoint}/${orderid}/shipping-fee`, {data: {shipping_fee}, method: 'PUT'})
        .then(() => {
          this.getContentFrom({endpoint, orderid})
        })
        .catch(e => {
          console.error(`Can't bind address to order/quotation`, e)
          return {errors: e}
        })
    }

    resetAddress = async({endpoint, orderid}) => {

      return await client(`${API_PATH}/${endpoint}/${orderid}/rewrite`, {method: 'PUT'})
        .then(() => {
          this.getContentFrom({endpoint, orderid})
        })
        .catch(e => {
          console.error(`Can't unbind address to order/quotation`, e)
          return {errors: e}
        })

    }

    sendQuotationToCustomer = async({endpoint, orderid}) => {
      // HANDLED ?
    }


    render() {

      return (
        <Component
          createOrderId={this.createOrderId}
          getContentFrom={this.getContentFrom}
          getList={this.getList}
          deleteOrder={this.deleteOrder}
          addProduct={this.addProduct}
          deleteProduct={this.deleteProduct}
          requestUpdate={this.requestUpdate}
          handleValidation={this.handleValidation}
          updateShippingFees={this.updateShippingFees}
          validateAddress={this.validateAddress}
          resetAddress={this.resetAddress}
          sendQuotationToCustomer={this.sendQuotationToCustomer}
          state={this.state}
          {...this.props}
        />
      )
    }
  }

  return withEdiRequest
}

module.exports=withEdiRequest
