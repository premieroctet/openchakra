import Router from 'next/router'

const simulateDownload = ({url}) => {
  Router.push(url)
}

export {simulateDownload}
