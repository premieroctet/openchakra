import React from 'react'
import { mediaWrapper } from './mediaWrapper'

const Media = ({src, ...props}:{src: string}) => (
  <>
  {src ? mediaWrapper({src, ...props}) : <div>Source needed</div>}
  </>
)

export default Media
