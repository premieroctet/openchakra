import { useState, useRef, useEffect } from 'react'
import copyToClipboard from 'copy-to-clipboard'

const useClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = (value: string) => {
    copyToClipboard(value)
    setHasCopied(true)
    timeoutRef.current = setTimeout(() => setHasCopied(false), 1500)
  }

  return {
    onCopy: copy,
    hasCopied,
  }
}

export default useClipboard
