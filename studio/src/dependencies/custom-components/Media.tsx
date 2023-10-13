import React from 'react'
import { mediaWrapper } from './MediaWrapper'

// TODO: DIsplay "Source needed" in Studio only
const Media = ({
  src,
  htmlWidth,
  htmlHeight,
  downloadable,
  isIframe = false,
  visio = false,
}:{
  src: string,
  htmlWidth: string,
  htmlHeight: string,
  isIframe: boolean,
  visio: boolean,
  downloadable: boolean,
}) => {

  return (
  <>
  {src ? <>
    {mediaWrapper({src, htmlWidth, htmlHeight, isIframe, visio, downloadable})}
    </> : null
  }
  </>
)}

export default Media
