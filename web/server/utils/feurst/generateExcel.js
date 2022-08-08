const xlsx=require('node-xlsx')
const {formatPercent} = require('../../../utils/text')
const {STANDARD_SHIPPING} = require('../../../utils/consts')

// Generates Quotation or order
const generateExcel = model => {
  let data=[[]]
  data.push(['Référence', model.reference || 'N/A'])
  data.push(['Date commande', model.creation_date || 'N/A'])
  data.push(['Client', model.company?.name])
  const address=model.address
  data.push(['Addresse', address ? `${address.address}, ${address.zip_code} ${address.city} (${address.country})`: 'Non renseignée'])
  data.push(['Délégué', model.sales_representative?.full_name])
  data.push([])
  data.push('Réf. article,Désignation,Quantité,Poids,Prix catalogue,Remise,Votre prix,Total'.split(','))
  data.push([])
  model.items.forEach(item => {
    const product=item.product
    data.push([product.reference, `${product.description} ${product.description_2}`, item.quantity, item.total_weight,
      item.catalog_price, formatPercent(item.discount), item.net_price, item.total_amount])
  })
  const ship_fee=model.shipping_fee ? model.shipping_fee : model.address? 'Franco' : null
  if (ship_fee) {
    data.push(['Livraison', model.shipping_mode==STANDARD_SHIPPING ? 'standard': 'express', '', '', '', '', '', ship_fee])
  }
  data.push([])
  data.push(['Total', '', '', model.total_weight, '', '', '', model.total_amount])
  data.push([])

  // Insert empty first column
  data = data.map(d => ['', ...d])

  const sheetOptions = {'!cols': [{wch: 4}, {wch: 15}, {wch: 30}, ...Array(8).fill({wch: 12})]}
  let buffer = xlsx.build([{data: data}], {sheetOptions})
  return buffer
}

module.exports={generateExcel}
