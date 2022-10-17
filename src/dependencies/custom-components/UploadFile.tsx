import { Box } from '@chakra-ui/react'
import React from 'react'

const UploadFile = ({dataSource, backend, children, ...props}: {dataSource: {_id: null} | null, backend: string, children: React.ReactChildren}) => {
  
  const handleUpload = (e: React.FormEvent) => {
    
    e.preventDefault()
    const [fileToUpload] = Array.from(e.target?.elements).filter(el => el.type === 'file')
    
    if (fileToUpload) {
      const theFile = fileToUpload?.files && fileToUpload?.files[0]

      /* 
        TODO
        1. upload file
        2. send post (domain/myAlfred/api/action, {action: 'setResourceFile', parent: <resource_id>, url: <s3_url>})
      */
    }
    
  }
  
  return (
    <Box {...props} >
      <form onSubmit={handleUpload}>
        {children}
      </form>
    </Box>
  )
}

export default UploadFile
