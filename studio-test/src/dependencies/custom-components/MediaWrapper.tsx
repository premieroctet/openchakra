import React from 'react'
import {IconButton} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'

export const getExtension = (filename: string) =>
  filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename

export const mediaWrapper = ({
  src,
  htmlHeight,
  htmlWidth,
  isIframe = false,
  canDownload,
}: {
  src: string
  htmlHeight?: string
  htmlWidth?: string
  isIframe?: boolean
  canDownload?: boolean
}) => {
  // const {htmlWidth, htmlHeight} = props

  /* TODO assign type to htmlWidth, htmlHeight */
  const doc = {
    width: htmlWidth || '100%',
    height: htmlHeight || '100%',
  }

  const forceExt = (src: string, isIframe:boolean) => {
     if (isIframe || isVideoProvider(src)) {
      return 'html'
     }
     return false
  }

  const isVideoProvider = (src: string) => {
    /* Detect YouTube and Vimeo url videos */
    const regex = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/g
    return regex.test(src)
  }
  function forceDownload(blob:any, filename:any) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Current blob size limit is around 500MB for browsers
  function downloadResource(url:string|undefined) {
    if (!url) { return}
    const filename = url?.split('\\')?.pop()?.split('/')?.pop();
    fetch(url,{
      headers: new Headers({
        'Origin': document.location.origin
      }),
      mode: 'cors'
    })
      .then(response => response.blob())
      .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch(e => console.error(e));
  }

  const Comp = () =>
    canDownload &&
      (
      <div style={{display:'flex', justifyContent:'center'}} ><IconButton
        aria-label='download'
        icon={<DownloadIcon />}
        onClick={() => downloadResource(src||undefined)}
      /></div>) || (null)

  const ext = forceExt(src?.toLowerCase(), isIframe) || getExtension(src.toLowerCase())

  switch (ext) {
    case 'mp4':
    case 'webm':
      return (
        <>
        <video
          width={doc.width}
          controls
          preload="none"
          poster="images/videocover.png"
        >
          <source src={src} type={`video/${ext}`} />
        </video>
        <Comp />
        </>
      )
    case 'pdf':
      return (
        <><object
          type="application/pdf"
          data={src}
          role={'document'}
          width={doc.width}
          height={doc.height}
        ></object>
        <Comp />
        </>
      )
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
      return (
        <>
        <iframe
          title={src}
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${src}`}
          width={htmlWidth}
          height={htmlHeight}
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <Comp />
        </>
      )
    case 'txt':
    case 'html':
      return (
        <>
        <iframe
          style={
            {
              height: 'inherit',
              width: 'inherit',
              minHeight: 'inherit',
              minWidth: 'inherit',
              borderRadius: 'inherit',
            }
          }
          loading="lazy"
          title={src}
          src={src}
          width={htmlWidth}
          height={htmlHeight}
          allowFullScreen
        ></iframe>
        <Comp />
        </>

      )
    default:
      return (
        <>
        <img
          loading="lazy"
          src={src}
          width={doc.width}
          height={doc.height}
          alt=""
        />
        <Comp />
        </>
      )
  }
}
