import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react'

type UpdateProps = {
  addActiveProps: (propsName: string) => void
  clearActiveProps: () => void
}

type InspectorProviderProps = { children: React.ReactNode }

const InspectorStateContext = createContext<string[]>([])
const InspectorUpdateContext = createContext<UpdateProps>({
  addActiveProps: () => {},
  clearActiveProps: () => {},
})

function InspectorProvider({ children }: InspectorProviderProps) {
  const [activeProps, setActiveProps] = useState<string[]>([])

  const addActiveProps = useCallback((propsName: string) => {
    setActiveProps(prevActiveProps => [...prevActiveProps, propsName])
  }, [])

  const clearActiveProps = useCallback(() => {
    setActiveProps([])
  }, [])

  const values = useMemo(() => {
    return { clearActiveProps, addActiveProps }
  }, [addActiveProps, clearActiveProps])

  return (
    <InspectorStateContext.Provider value={activeProps}>
      <InspectorUpdateContext.Provider value={values}>
        {children}
      </InspectorUpdateContext.Provider>
    </InspectorStateContext.Provider>
  )
}

function useInspectorState() {
  return useContext(InspectorStateContext)
}

function useInspectorUpdate() {
  return useContext(InspectorUpdateContext)
}

export { InspectorProvider, useInspectorState, useInspectorUpdate }
