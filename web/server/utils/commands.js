const lodash=require('lodash')
const Company = require('../models/Company')
const Product = require('../models/Product')
const PriceList = require('../models/PriceList')
const {EXPRESS_SHIPPING} = require('../../utils/feurst/consts')
const {roundCurrency} = require('../../utils/converters')
const ShipRate = require('../models/ShipRate')


const extractDepartment = zipCode => {
  const dept=parseInt(String(zipCode).slice(0, -3))
  console.log(`FOund dept ${dept} for zip ${zipCode}`)
  return dept
}

const getProductPrices = (product_ref, company) => {
  if (!product_ref) {
    return Promise.reject(`Mandatory product_ref`)
  }
  if (!company) {
    return Promise.reject(`Mandatory company`)
  }
  const result={catalog_price: 0, net_price: 0}
  return PriceList.findOne({reference: product_ref, name: company.catalog_prices})
    .then(price => {
      if (!price) { return Promise.reject(`Prix catalogue introuvable pour ${product_ref}`) }
      result.catalog_price=price.price
      return PriceList.findOne({reference: product_ref, name: company.net_prices})
    })
    .then(price => {
      if (!price) { return Promise.reject(`Prix remisé introuvable pour ${product_ref}`) }
      result.net_price=price.price
      return Promise.resolve(result)
    })
}
/** Adds product to the order :
If product is present, adds quantity if replace is false else sets quantity
If product is not present, adds the item to the order
*/
const addItem = (data, product_id, reference, quantity, net_price, replace=false) => {
  if (isNaN(parseInt(quantity))) {
    return Promise.reject(`Article ${reference}: quantité ${quantity} incorrect`)
  }
  let product=null
  return Product.findOne({$or: [{_id: product_id}, {reference: reference}]})
    .then(result => {
      if (!result) {
        return Promise.reject(`Article ${reference} inconnu`)
      }
      product=result
      return getProductPrices(product.reference, data.company)
    })
    .then(prices => {
      if (!prices) { return Promise.reject(`Tarif inconnu pour ${product.reference}`) }
      let item=data.items.find(item => item.product._id.toString()==product._id.toString())
      if (item) {
        if (quantity) {
          item.quantity = replace ? parseInt(quantity) : item.quantity+parseInt(quantity)
        }
        if (net_price) {
          item.net_price=net_price
        }
      }
      else {
        if (replace) {
          return Promise.reject(`Update d'une ligne de commande inexistante`)
        }
        if (!quantity) {
          return Promise.reject(`Update d'un tarif sans quantité`)
        }
        item = {product: product, quantity: parseInt(quantity), catalog_price: prices.catalog_price, net_price: net_price || prices.net_price}
        data.items.push(item)
      }
      return Promise.resolve(data)
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

/**
Computes Ship rate depending on zipcode, weight and express (true||false)
*/
const computeShipFee = (model, department, express) => {
  return new Promise((resolve, reject) => {
    if (!department) {
      return reject(`Can not compute shipping fee: no department`)
    }
    const orderDepartment=department
    const companyMainDepartment=extractDepartment(model.company?.addresses[0]?.zip_code)
    const weight=model.total_weight

    // Carriage paid for non express ?
    if (!express && !lodash.isNil(model.company.carriage_paid) && !lodash.isNil(orderDepartment) && companyMainDepartment==orderDepartment && model.total_amount >= model.company.carriage_paid) {
      console.log(`Order amount ${model.total_amount}> carriage paid ${model.company.carriage_paid} : no shipping fee`)
      return resolve(0)
    }
    ShipRate.findOne({zipcode: orderDepartment, express: express, min_weight: {$lte: weight}, max_weight: {$gt: weight}})
      .then(rate => {
        if (!rate) {
          return reject(`No rate found for dept:${orderDepartment} weight:${weight} express:${express}`)
        }
        const fee=rate.fixed_price+rate.per_kg_price*parseInt(weight)
        return resolve(roundCurrency(fee))
      })
      .catch(err => {
        return reject(err)
      })
  })
}

/**
Updates shipping fee depending on ShipRate
Data is an Order or a Quotation
*/
const updateShipFee = data => {
  return new Promise((resolve, reject) => {
    if (extractDepartment(data.address?.zip_code) && data.shipping_mode) {
      computeShipFee(data, extractDepartment(data.address?.zip_code), data.shipping_mode==EXPRESS_SHIPPING)
        .then(fee => {
          data.shipping_fee=fee
          return resolve(data)
        })
        .catch(err => reject(err))
    }
    else {
      return resolve(data)
    }
  })
}

/** Update stock using depending on order/quotation items provided
If product is a group (i.e. has sub-products), update stock for each sub-component then set group's stock to the smallest one
Else update stock
*/
const updateStock = orderQuot => {
  return orderQuot.items.map(it => {
    return Product.findById(it.product)
      .populate('components')
      .then(product => {
        let promises
        const components=product.components
        if (components.length>0) {
          components.forEach(p => (p.stock=p.stock-it.quantity))
          product.stock=lodash.min(components.map(v => v.stock))
        }
        else {
          product.stock=product.stock-it.quantity
        }
        promises=[product.save(), ...components.map(p => p.save())]
        Promise.allSettled(promises)
          .then(() => {
            // const grouped=lodash.groupBy(res, 'status')
            return Promise.resolve(orderQuot)
          })
          .catch(err => {
            console.error(err)
            return Promise.reject(orderQuot)
          })
      })
  })
}

// Checks wether quotation or order is in the expected delivery zone
const isInDeliveryZone = (address, company) => {
  const addressDept=extractDepartment(address?.zip_code)
  const inZone=company.delivery_zip_codes?.includes(addressDept)
  console.log(`isInZone for ${addressDept} amongst ${company.delivery_zip_codes}:${inZone}`)
  return inZone
}

const updateCompanyAddresses= model => {
  return Company.findById(model.company)
    .then(company => {
      const modelAddress=lodash.omit(model.address, ['id', '_id'])
      // Update by label ?
      const idx=company.addresses.findIndex(a => a.label==modelAddress.label)
      if (idx!=-1) {
        company.addresses[idx]=modelAddress
      }
      else {
        company.addresses.push(modelAddress)
      }
      return company.save()
    })
    .then(() => {
      return Promise.resolve(model)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

module.exports = {addItem, computeShipFee, updateShipFee, getProductPrices,
  updateStock, isInDeliveryZone, updateCompanyAddresses, extractDepartment}
