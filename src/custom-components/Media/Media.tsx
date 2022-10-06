import React from 'react'
import { getExtension, mediaAccordingToExt } from '~utils/mediaAccordingToExt'

const Media = ({src, ...props}:{src: string}) => (
  <>
  {src ? mediaAccordingToExt({ext: getExtension(src), src, props}) : <div>Source needed</div>}
  </>
)

export default Media
