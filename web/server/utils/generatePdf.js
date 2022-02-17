require('@babel/register')
const Quotation = require('../../components/Feurst/Quotation')
const React=require('react')
const ReactPDF=require('@react-pdf/renderer')

const generatePdf = (infos, precos) => {
  return ReactPDF.render(React.createElement(Quotation, {infos: infos, precos: precos}), '/tmp/test.pdf')
}

module.exports=generatePdf
