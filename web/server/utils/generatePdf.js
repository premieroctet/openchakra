const {fs} = require('file-system')
require('@babel/register')
const Quotation = require('../../components/Feurst/Quotation')
const React=require('react')
const ReactPDF=require('@react-pdf/renderer')
const tmp=require('tmp')

const generatePdf = (infos, precos) => {
  return new Promise((resolve, reject) => {
    // TODO: renderToStream péférable mais asynchrone => le PDF généré peut être incomplet
    const tmpObj=tmp.fileSync()
    ReactPDF.renderToFile(React.createElement(Quotation, {infos: infos, precos: precos}), tmpObj.name)
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
