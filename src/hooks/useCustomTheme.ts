import { useSelector } from 'react-redux'
import { useTheme } from '@chakra-ui/core'
import { getCustomTheme } from '../core/selectors/app'

const useCustomTheme = () => {
  const customTheme = useSelector(getCustomTheme)
  const theme = useTheme()
  return customTheme ? customTheme : theme
}

export default useCustomTheme
