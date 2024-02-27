import Cookies from 'universal-cookie'
import store from "store"

const KEY='token'

const cookies=new Cookies()

const ensureToken = () => {
  console.log('calling ensureCookie')
  const cookie=cookies.get(KEY)
  const stored=store.get(KEY)
  console.log(`cookie:${cookie}`)
  console.log(`stored:${stored}`)
  if (cookie && !stored) {
    console.log(`Storing token in storage`)
    store.set(KEY, cookie)
  }
  if (!cookie && stored) {
    console.log(`Setting cookie from storage`)
    cookies.set(KEY, stored)
  }
}

const clearToken = () => {
  cookies.remove(KEY)
  store.remove(KEY)
}

const storeAndRedirect = () => {
  const fullPath=`${window.location.pathname}${window.location.search}`
  const cookies=new Cookies()
  cookies.set('redirect', fullPath)
  window.location='/'
}

export {ensureToken, clearToken, storeAndRedirect}
