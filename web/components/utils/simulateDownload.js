import {client} from '../../utils/client'

const simulateDownload = async({url: urlToTriggerDownload, filename}) => {
  const exampleFile = await client(urlToTriggerDownload)
    .catch(e => {
      console.error(e)
      snackBarError('Téléchargement échoué')
    })

  if (exampleFile) {
    let url = URL.createObjectURL(exampleFile)
    let a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}

export {simulateDownload}
