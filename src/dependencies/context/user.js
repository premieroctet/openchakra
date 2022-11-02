import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import useFetch from 'use-http'

export const UserContext = createContext()

export function UserWrapper({ children }) {
  const [user, setUser] = useState(null)
  const { get } = useFetch()

  const getCurrentUser = () => {
    get(`/myAlfred/api/studio/current-user`)
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        setUser(false)
        console.error('Cant fetch current user', error)
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
