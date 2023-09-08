import React from 'react'
import { mediaWrapper } from './MediaWrapper'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({
  src,
  htmlWidth,
  htmlHeight,
  isIframe = false,
  visio = false,
  downloadable,
}:{
  src: string,
  htmlWidth: string,
  htmlHeight: string,
  isIframe: boolean,
  visio: boolean,
  downloadable?: boolean
}) => {

  return (
  <>
  {src ? <>
    {mediaWrapper({src, htmlWidth, htmlHeight, isIframe, downloadable, visio})}
    </> : null
  }
  </>
)}

export default Media
