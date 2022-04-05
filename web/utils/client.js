import {getPureAuthToken, clearAuthenticationToken} from './authentication'

async function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  // override supplied token , otherwise use the cookie token
  const currentToken = token ? token : getPureAuthToken()
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: currentToken ? `${currentToken}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      clearAuthenticationToken()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    }
    return Promise.reject(data)
    
  })
}

export {client}
