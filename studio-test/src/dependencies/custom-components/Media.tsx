import React from 'react'
import { mediaWrapper } from './MediaWrapper'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({
  src,
  htmlWidth,
  htmlHeight,
  isIframe = false,
  canDownload,
}:{
  src: string,
  htmlWidth: string,
  htmlHeight: string,
  isIframe: boolean,
  canDownload?: boolean
}) => {

  return (
  <>
  {src ? <>
    {mediaWrapper({src, htmlWidth, htmlHeight, isIframe, canDownload})}
    </> : null
  }
  </>
)}

export default Media
