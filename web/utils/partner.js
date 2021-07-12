
const getPartnerFromHostname = hostname => {
  if (['my-alfred.io', 'my-alfred.io', 'alfred-business.com', 'localhost', 'sebhd.freeboxos.fr'].includes(hostname)) {
    return null
  }
  const subdomain=hostname.split('.')[0]
  if (subdomain=='www') {
    return null
  }
  return subdomain
}

module.exports={getPartnerFromHostname}
