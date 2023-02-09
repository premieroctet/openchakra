import Cookies from 'universal-cookie'
import store from "store"

const ensureCookie = () => {
  console.log('calling ensureCookie')
  const cookies=new Cookies()
  const cookie=cookies.get('token')
  const stored=store.get('token')
  console.log(`cookie:${cookie}`)
  console.log(`stored:${stored}`)
  if (cookie && !stored) {
    console.log(`Storing token in storage`)
    store.set('token', cookie)
  }
  if (!cookie && stored) {
    console.log(`Setting cookie from storage`)
    cookies.set('token', stored)
  }
}

export {ensureCookie}
