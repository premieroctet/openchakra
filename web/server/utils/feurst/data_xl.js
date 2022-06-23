const xlsx=require('node-xlsx')
const {formatPercent} = require('../../../utils/text')
const {STANDARD_SHIPPING} = require('../../../utils/feurst/consts')

// Generates Quotation or order
const generateData = model => {
  let data=[[]]
  data.push(['Référence', model.reference || 'N/A'])
  data.push(['Date commande', model.creation_date || 'N/A'])
  data.push(['Client', model.company?.name])
  data.push(['Délégué', model.sales_representative?.full_name])
  data.push([])
  data.push('Réf. article,Désignation,Quantité,Poids,Prix catalogue,Remise,Votre prix,Total'.split(','))
  model.items.forEach(item => {
    const product=item.product
    data.push([product.reference, `${product.description} ${product.description_2}`, item.quantity, item.total_weight,
      item.catalog_price, formatPercent(item.discount), item.net_price, item.total_amount])
  })
  data.push(`Total,,,${model.total_weight},,,,${model.total_amount}`.split(','))
  data.push([])
  data.push([`Livraison ${model.shipping_mode==STANDARD_SHIPPING ? 'standard': 'express'}, environ ${model.shipping_fee}€`])
  const address=model.address
  data.push(['Addresse', address ? `${address.address}, ${address.zip_code} ${address.city} (${address.country})`: 'N/A'])

  // Insert empty first column
  data = data.map(d => ['', ...d])

  const sheetOptions = {'!cols': [{wch: 4}, {wch: 15}, {wch: 30}, ...Array(8).fill({wch: 12})]}
  let buffer = xlsx.build([{data: data}], {sheetOptions})
  return buffer
}

module.exports={generateData}
