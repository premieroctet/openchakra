const https = require('https')
const axios = require('axios')
const lodash=require('lodash')

// At request level
const agent = new https.Agent({
  rejectUnauthorized: false
});

const generateGraph = () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  return axios.get('https://localhost/myAlfred/api/studio/models', {httpsAgent: agent})
   .then(res => {
     const models=res.data
     const values=Object.values(models).map(model => {
       const attrs=lodash.pickBy(model.attributes, (att, name) => att.ref && !name.includes('.'))
       return Object.entries(attrs).map(([att_name, att]) => `  ${model.name} -- ${att.type} [label="${att_name} ${att.multiple ? '*': ''}"]`)
     })
     const models_decl=Object.keys(models).map(model => `${model} [ shape=box ]`).join('\n')
     return `strict graph {${models_decl} ${lodash.flatten(values).join('\n')}}`
   })
}

module.exports={generateGraph}
