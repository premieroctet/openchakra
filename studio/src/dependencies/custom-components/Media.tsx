import React from 'react'
import { mediaWrapper } from './MediaWrapper'
import { 
  Box,
} from '@chakra-ui/react'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({src, ...props}:{src: string }) => (
  <>
  {src ? <Box {...props}>{mediaWrapper({src, ...props})}</Box> : null}
  </>
)

export default Media
