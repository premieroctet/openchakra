import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'
import {client} from '../utils/client'

export const UserContext = createContext()

export function UserWrapper({children}) {
  const [user, setUser] = useState(false)
  
  const updateUser = useCallback(userdata => {
    setUser({...user, ...userdata})
  }, [user])

  const getCurrentUser = () => {
    client(`/myAlfred/api/users/current`)
      .then(data => {
        updateUser(data)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
