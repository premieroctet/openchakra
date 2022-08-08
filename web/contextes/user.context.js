import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {client} from '../utils/client'

export const UserContext = createContext()

/* Prevent fetching user on these urls */
const pathnamesToAvoid = route => {
  return [
    '/edi/login',
  ].includes(route)
}

export function UserWrapper({children}) {
  const [user, setUser] = useState(null)

  const router = useRouter()
  
  const updateUser = useCallback(userdata => {
    setUser({...user, ...userdata})
  }, [user])

  const getCurrentUser = () => {
    client(`/myAlfred/api/users/current`)
      .then(data => {
        updateUser(data)
      })
      .catch(error => {
        setUser(false)
        console.error('Cant fetch current user', error)
      },
      )
  }

  useEffect(() => {
    if (!pathnamesToAvoid(router.pathname)) {
      getCurrentUser()
    }
    else {
      setUser(false)
    }
  }, [router.pathname])

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
