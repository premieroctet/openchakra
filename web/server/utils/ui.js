const fs=require('fs')

createUIConfiguration = configuration => {
  let config={}
  configuration.forEach(parameter => {
    const [clazz, attribute] = parameter.style_path.split('.')
    if (!(clazz in config)) { config[clazz]={} }
    console.log(`Path:${parameter.style_path}, value:${parameter.value}`)
    if (parameter.value !== null) {
      config[clazz][attribute]=parameter.type=='visibility' ? parameter.value ? 'block' : 'none' : parameter.value
    }
  })
  console.log(`Configuration:${JSON.stringify(config)}`)
  //let output=`export default theme => (${JSON.stringify(config, null, 2)}\n)`
  console.log(`Output:${output}`)
  fs.writeFile('static/assets/css/custom.css', output)
    .then(res => {
      console.log(`res ok:${res}`)
    })
    .catch(err => {
      console.error(`Error:${err}`)
    })
}

module.exports = {
  createUIConfiguration,
}
