import React from 'react'
import axios from 'axios'
import {client} from '../utils/client'
import {setAxiosAuthentication} from '../utils/authentication'
import {
  API_PATH,
  ORDER_CREATED,
  DELETE,
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
          .catch(e => {
            console.error('Commande/devis non existant', e)
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

      const deleteIt = async() => {
        return await client(`${API_PATH}/${endpoint}/${orderid}`, {method: 'DELETE'})
          .then(() => this.getList({endpoint}))
          .catch(error => {
            if (error.info) {
              if (error.info.status === 403) {
                snackBarError(error?.message)
              }
            }
            console.error(`Can't delete order`, error)
          })
      }

      return await client(`${API_PATH}/${endpoint}/${orderid}/actions`)
        .then(res => {
          // DELETE ACTION
          if (res.includes(DELETE)) {
            deleteIt()
          }
          else {
            snackBarError('Suppression non autorisée.')
          }
        })
    }

    deleteUser = async({endpoint, userid}) => {
      if (!userid) { return }
      
      return await client(`${API_PATH}/users/${userid}`, {method: 'DELETE'})
        .then(() => this.getList({endpoint}))
        .catch(error => {
          if (error.info) {
            if (error.info.status === 403) {
              snackBarError(error?.info.message)
            }
          }
          console.error(`Can't delete user`, error)
        })
    }

    handleValidation = async({endpoint, orderid, status}) => {

      return await client(`${API_PATH}/${endpoint}/${orderid}/handle`, {data: {total: status}, method: 'PUT'})
        .then(() => this.getContentFrom({endpoint, orderid}))
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

    revertToEdition = async({endpoint, orderid}) => {

      return await client(`${API_PATH}/${endpoint}/${orderid}/rewrite`, {method: 'PUT'})
        .then(() => {
          this.getContentFrom({endpoint, orderid})
        })
        .catch(e => {
          console.error(`Can't unbind address to order/quotation`, e)
          return {errors: e}
        })

    }

    updateSeller = async({company_id, user_id}) => {
      // /:company_id/sales_representative/:user_id'
      return await client(`${API_PATH}/companies/${company_id}/sales_representative/${user_id}`, {method: 'PUT'})
        .catch(e => {
          console.error(`Can't bind user to company`, e)
          snackBarError(`Erreur lors de l'assignation du commercial`)
        })
    }

    importFile = async({endpoint, orderid, importURL, data}) => {
      setAxiosAuthentication()
      return await axios.post(importURL, data)
        .then(res => {
          this.getContentFrom({endpoint, orderid})
          return res?.data
        })
        .catch(err => err)
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
          revertToEdition={this.revertToEdition}
          deleteUser={this.deleteUser}
          updateSeller={this.updateSeller}
          importFile={this.importFile}
          state={this.state}
          {...this.props}
        />
      )
    }
  }

  return withEdiRequest
}

module.exports=withEdiRequest
