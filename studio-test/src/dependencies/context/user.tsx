import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import axios from 'axios'

export type UserCtx = {
  [key:string]: any
} | false | null

const USER_INIT_STATUS = false

export const UserContext = createContext<UserCtx>(USER_INIT_STATUS)

export function UserWrapper({ children } : {children: React.ReactElement}) {
  const [user, setUser] = useState<UserCtx>(USER_INIT_STATUS)

  const getCurrentUser = useCallback(() => {
    axios
      .get(`/myAlfred/api/studio/current-user`)
      .then(res => {
        const userData = res?.data
        setUser({...userData})
      })
      .catch(error => {
        setUser(null)
        console.error('Cant fetch current user', error)
      })
  }, [])

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return (
    <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
