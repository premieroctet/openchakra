import React from 'react'
import { mediaWrapper } from './MediaWrapper'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({src, ...props}:{src: string}) => (
  <>
  {src ? mediaWrapper({src, ...props}) : null}
  </>
)

export default Media
