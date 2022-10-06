import React from 'react'
import { getExtension, mediaAccordingToExt } from '~utils/mediaAccordingToExt'

const Media = ({src, ...props}) => (
  <>
  {src ? mediaAccordingToExt(getExtension(src), src, props) : <div>Source needed</div>}
  </>
)

export default Media
