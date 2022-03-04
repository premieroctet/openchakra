const {fs} = require('file-system')
require('@babel/register')
const Quotation = require('../../components/Feurst/Quotation')
const React=require('react')
const ReactPDF=require('@react-pdf/renderer')
const tmp=require('tmp')
const i18n=require('./i18n_init')

const generatePdf = data => {
  return new Promise((resolve, reject) => {
    // TODO: renderToStream péférable mais asynchrone => le PDF généré peut être incomplet
    const tmpObj=tmp.fileSync()
    const t=i18n.default.getFixedT(null, 'feurst')
    ReactPDF.renderToFile(React.createElement(Quotation, {data: data, t: t}), tmpObj.name)
      .then(() => {
        let data = fs.readFileSync(tmpObj.name)
        resolve(Buffer.from(data))
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        tmpObj.removeCallback()
      })
  })
}

module.exports=generatePdf
