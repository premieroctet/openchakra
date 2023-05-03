import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import axios from 'axios'

export const UserContext = createContext()

export function UserWrapper({ children }) {
  const [user, setUser] = useState(false)

  const getCurrentUser = useCallback(() => {
    axios
      .get(`/myAlfred/api/studio/current-user`)
      .then(res => {
        setUser(res.data)
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
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
