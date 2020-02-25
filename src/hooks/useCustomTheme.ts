import { useSelector } from 'react-redux'
import { useTheme } from '@chakra-ui/core'
import { getThemeData } from '../core/selectors/app'

const useCustomTheme = () => {
  const customTheme = useSelector(getThemeData)
  const theme = useTheme()
  return customTheme ? customTheme : theme
}

export default useCustomTheme
