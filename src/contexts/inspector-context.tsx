import React, { useContext, useRef, MutableRefObject } from 'react'

interface InspectorContextInterface {
  activePropsRef: MutableRefObject<string[] | null>
}

const InspectorContext = React.createContext<InspectorContextInterface>({
  activePropsRef: React.createRef(),
})

interface InspectorProviderProps {
  children: React.ReactNode
}

function InspectorProvider(props: InspectorProviderProps) {
  const activePropsRef = useRef<string[] | null>(null)

  return (
    <InspectorContext.Provider
      value={{
        activePropsRef,
      }}
      {...props}
    />
  )
}

function useInspectorContext() {
  return useContext(InspectorContext)
}

export { InspectorProvider, useInspectorContext }
