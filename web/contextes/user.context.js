import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {client} from '../utils/client'
import {getLoggedUser} from '../utils/context'

export const UserContext = createContext()

const pathnamesToAvoid = (route) => {
  return [
    '/',
    '/edi/login'
  ].includes(route)
}

export function UserWrapper({children}) {
  const [user, setUser] = useState(false)

  const router = useRouter()
  // const loggerUser = getLoggedUser()
  // console.log(loggerUser)
  
  const updateUser = useCallback(userdata => {
    setUser({...user, ...userdata})
  }, [user])

  const getCurrentUser = () => {
    client(`/myAlfred/api/users/current`)
      .then(data => {
        updateUser(data)
      })
      .catch(error => console.error('Cant fetch current user', error))
  }

  useEffect(() => {
    if (!pathnamesToAvoid(router.pathname)) {
      console.log('Hewego', user)
      !user && getCurrentUser()
    } else {
      console.log('userToFalse', user)
      setUser(false)
    }
  }, [user, router.pathname])

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
