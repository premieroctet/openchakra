import React from 'react'
import { mediaWrapper } from './MediaWrapper'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({
  src,
  htmlWidth,
  htmlHeight,
  isIframe = false,
  visio = false,
}:{
  src: string,
  htmlWidth: string,
  htmlHeight: string,
  isIframe: boolean,
  visio: boolean,
}) => {

  return (
  <>
  {src ? <>
    {mediaWrapper({src, htmlWidth, htmlHeight, isIframe, visio})}
    </> : null
  }
  </>
)}

export default Media
