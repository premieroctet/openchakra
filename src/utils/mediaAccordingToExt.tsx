import React from 'react'

export const getExtension = (filename: string) => filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
filename

export const mediaAccordingToExt = (ext: string, src: string, props = {}) => {

  const document = {
    width: "100%",
    height: "100%"
  }

  const PreparedMedia = () => {

    switch (ext) {
      case 'mp4': 
      case 'webm': 
      return  <video 
        width={document.width} 
        controls
        preload='none'
        poster="images/videocover.png"
        >
        <source src={src} type={`video/${ext}`} />
          </video>  
      case 'pdf':
        return  <object
          type="application/pdf"
          data={src}
          role={'document'}
          width={document.width}
          height={document.height}
          ></object> 
      case 'html': 
      <iframe
        title={src}
        src={src}
        width={document.width}
        height={document.height}
      >
      </iframe>  
      default:
        return <img 
          loading="lazy"
          src={src} 
          width={document.width}
          height={document.height} 
          alt="" 
          />
    }
  } 

  return <PreparedMedia {...props} />
}

